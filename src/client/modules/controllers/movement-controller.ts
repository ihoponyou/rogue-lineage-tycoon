import { Controller, Dependency, OnStart } from "@flamework/core";
import {
	ReplicatedStorage,
	TweenService,
	UserInputService,
	Workspace,
} from "@rbxts/services";
import { OnLocalCharacterAdded } from "../../../../types/lifecycles";
import { Components } from "@flamework/components";
import { CharacterClient as Character } from "client/modules/components/character-client";
import { Trove } from "@rbxts/trove";
import { InputController } from "./input-controller";
import { hasLineOfSight } from "shared/modules/line-of-sight";
import { Events } from "client/modules/networking";
import { AnimationController } from "./animation-controller";
import { KeybindController } from "./keybind-controller";
import { ManaController } from "./mana-controller";

const BASE_CLIMB_SPEED = 10;
const BASE_WALK_SPEED = 20;
const DASH_DURATION = 0.4;
const DASH_COOLDOWN = 1;
const TRAINED_CLIMB_BONUS_DURATION = 10;

const VFX = ReplicatedStorage.Effects.Visuals;
const SFX = ReplicatedStorage.Effects.Sounds;

const CLIMB_DIRECTION_TO_ANIMATION_NAME = {
	forward: "ClimbUp",
	backward: "ClimbDown",
	left: "ClimbLeft",
	right: "ClimbRight",
};

export type Direction = "forward" | "backward" | "left" | "right";

const directionToAngle: { [direction: string]: number } = {
	forward: 0,
	backward: 180,
	left: 90,
	right: -90,
};

@Controller()
export class MovementController implements OnStart, OnLocalCharacterAdded {
	private raycastParams = new RaycastParams();
	private character: Character | undefined;

	isRunning = false;
	private runTrail?: Trail = this.newRunTrail();

	isClimbing = false;
	private climbTrove = new Trove();
	private climbForce: LinearVelocity | undefined;
	private climbConstraint: AlignOrientation | undefined;
	private goalPart: Part | undefined;
	private goalAttachment: Attachment | undefined;

	isDodging = false;
	dashDebounce = false;
	private manaDashSound = this.newDashSound();
	private manaDashParticles = this.newDashParticles();
	private dashTrove = new Trove();
	private dashVelocity: BodyVelocity | undefined;

	constructor(
		private animationController: AnimationController,
		private keybindController: KeybindController,
		private manaController: ManaController,
	) {}

	onStart(): void {
		this.raycastParams.CollisionGroup = "Characters";
		this.raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
		this.raycastParams.IgnoreWater = true;

		Events.manaEvents.manaEmptied.connect(() => this.onManaEmptied());
		Events.manaEvents.manaColorChanged.connect((color) =>
			this.onManaColorChanged(color),
		);
	}

	onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components
			.waitForComponent<Character>(character)
			.andThen((value) => (this.character = value));

		this.raycastParams.AddToFilter(character);

		const humanoidRootPart = character.WaitForChild("HumanoidRootPart");
		const torso = character.WaitForChild("Torso") as Torso;
		if (!torso) error("wtf");

		if (this.runTrail) {
			this.runTrail.Parent = torso;
			this.runTrail.Attachment0 = torso.BodyFrontAttachment;
			this.runTrail.Attachment1 = torso.BodyBackAttachment;
		}

		if (this.manaDashSound) {
			this.manaDashSound.Parent = humanoidRootPart;
		}

		if (this.manaDashParticles) {
			this.manaDashParticles.Parent = torso;
		}
	}

	onManaEmptied(): void {
		if (this.isRunning) {
			this.animationController.stop("ManaRun");
			if (this.runTrail) this.runTrail.Enabled = false;
			const BASE_PLAYER_SPEED = BASE_WALK_SPEED; // + speedBoost
			this.run(BASE_PLAYER_SPEED);
		} else if (this.isClimbing) {
			this.stopClimb();
		}
	}

	onManaColorChanged(color: Color3): void {
		while (!(this.runTrail && this.manaDashParticles)) task.wait();
		const colorSequence = new ColorSequence(color);
		this.runTrail.Color = colorSequence;
		this.manaDashParticles.Color = colorSequence;
	}

	private newDashSound(): Sound {
		return SFX.ManaDash.Clone();
	}

	private newDashParticles(): ParticleEmitter {
		return VFX.ManaStopParticle.Clone();
	}

	private newRunTrail(): Trail {
		const trail = VFX.ManaRunTrail.Clone();
		trail.Enabled = false;
		return trail;
	}

	private newClimbForce(): LinearVelocity {
		const force = new Instance("LinearVelocity");
		force.MaxForce = math.huge;
		return force;
	}

	private newClimbConstraint(): AlignOrientation {
		const constraint = new Instance("AlignOrientation");
		constraint.AlignType = Enum.AlignType.Parallel;
		constraint.MaxTorque = 1e7;
		return constraint;
	}

	private newGoalPart(): Part {
		const part = new Instance("Part");
		part.Size = new Vector3(4, 1.2, 2);
		part.CanCollide = false;
		part.CanQuery = false;
		part.CanTouch = false;
		part.Anchored = true;
		part.Transparency = 1;
		return part;
	}

	private newDashVelocity(): BodyVelocity {
		const bv = new Instance("BodyVelocity");
		bv.MaxForce = new Vector3(1e10, 0, 1e10);
		bv.P = 1250;
		return bv;
	}

	private alignCharacterToWall(
		deltaTime: number,
		wallCastResult: RaycastResult,
	): void {
		if (!this.goalPart) return;
		const goal = CFrame.lookAt(
			wallCastResult.Position.add(wallCastResult.Normal),
			wallCastResult.Position,
		);
		this.goalPart.CFrame = goal;

		if (!this.character) return;
		const humanoidRootPart = this.character.getHumanoidRootPart();
		humanoidRootPart.CFrame = humanoidRootPart.CFrame.Lerp(
			goal,
			1 - math.pow(1e-9, deltaTime),
		);
	}

	startClimb(wallCastResult: RaycastResult) {
		if (!this.character) return;
		if (!this.manaController.hasMana()) return;
		this.manaController.onChargeManaInput(Enum.UserInputState.End);

		this.isClimbing = true;

		const characterRootPart = this.character.getHumanoidRootPart();

		this.goalPart = this.climbTrove.add(this.newGoalPart());
		this.goalPart.Parent = characterRootPart;

		this.goalAttachment = this.climbTrove.add(new Instance("Attachment"));
		this.goalAttachment.Parent = this.goalPart;

		this.climbForce = this.climbTrove.add(this.newClimbForce());
		this.climbForce.Parent = this.character.instance;
		this.climbForce.Attachment0 = characterRootPart.RootAttachment;

		this.climbConstraint = this.climbTrove.add(this.newClimbConstraint());
		this.climbConstraint.Parent = this.character.instance;
		this.climbConstraint.Attachment0 = characterRootPart.RootAttachment;
		this.climbConstraint.Attachment1 = this.goalAttachment;

		const humanoid = this.character.instance.Humanoid;

		humanoid.AutoRotate = false;
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Freefall, false);
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Running, false);
		humanoid.ChangeState(Enum.HumanoidStateType.Climbing);

		this.alignCharacterToWall(0, wallCastResult);

		const input = InputController.inputVector;
		if (input.Y !== 0) {
			this.animationController.play("ClimbUp");
		} else if (input.X === 1) {
			this.animationController.play("ClimbRight");
		} else if (input.X === -1) {
			this.animationController.play("ClimbLeft");
		} else {
			this.animationController.play("ClimbIdle");
		}

		this.climbTrove.bindToRenderStep(
			"climb_update",
			Enum.RenderPriority.Character.Value,
			(deltaTime) => {
				const input = InputController.inputVector;
				this.updateClimb(deltaTime, input);
			},
		);
		this.climbTrove.connect(UserInputService.InputBegan, (input, gpe) =>
			this.handleClimbAnimations(input, gpe),
		);
		this.climbTrove.connect(UserInputService.InputEnded, (input, gpe) =>
			this.handleClimbAnimations(input, gpe),
		);
	}

	climbUp(goal: CFrame) {
		if (!this.character) return;

		const humanoidRootPart = this.character.getHumanoidRootPart();

		humanoidRootPart.Anchored = true;
		const lookVector = humanoidRootPart.CFrame.LookVector;
		const upVector = humanoidRootPart.CFrame.UpVector;

		goal = goal.add(lookVector.mul(0.5).add(upVector));
		const tween = TweenService.Create(
			humanoidRootPart,
			new TweenInfo(0.3, Enum.EasingStyle.Linear),
			{ CFrame: goal },
		);
		tween.Completed.Once(() => {
			humanoidRootPart.Anchored = false;
			this.stopClimb();
		});
		tween.Play();
		this.animationController.play("LedgeClimbUp");
	}

	private calculateClimbSpeed(
		mana: number,
		climbTrains: number,
		climbBoost: number,
	) {
		return (
			(-1e-3 * mana * (mana - 200) +
				BASE_CLIMB_SPEED +
				climbTrains / TRAINED_CLIMB_BONUS_DURATION) *
			(1 + climbBoost)
		);
	}

	updateClimb(deltaTime: number, inputVector: Vector2): void {
		if (!this.character) return;
		if (!this.manaController.hasMana()) {
			this.stopClimb();
			return;
		}

		const humanoidRootPart = this.character.getHumanoidRootPart();
		const upVector = humanoidRootPart.CFrame.UpVector;

		const floorCheck = Workspace.Raycast(
			humanoidRootPart.Position.sub(Vector3.yAxis.mul(0.5)),
			upVector.mul(-1),
			this.raycastParams,
		);
		if (floorCheck) {
			this.stopClimb();
			return;
		}

		const lookVector = humanoidRootPart.CFrame.LookVector;
		const rightVector = humanoidRootPart.CFrame.RightVector;

		const doubledLookVector = lookVector.mul(2);
		const withInput = rightVector.mul(inputVector.X);

		let diagonalIn, diagonalOut, sideways;
		if (inputVector.X !== 0) {
			const againstInput = withInput.mul(-1);

			const inOrigin = humanoidRootPart.Position.add(withInput);
			const inPoint =
				humanoidRootPart.Position.add(againstInput).add(
					doubledLookVector,
				);
			const outOrigin = humanoidRootPart.Position.add(againstInput);
			const outPoint =
				humanoidRootPart.Position.add(withInput).add(doubledLookVector);

			diagonalIn = Workspace.Raycast(
				inOrigin,
				inPoint.sub(inOrigin),
				this.raycastParams,
			);
			diagonalOut = Workspace.Raycast(
				outOrigin,
				outPoint.sub(outOrigin),
				this.raycastParams,
			);
			sideways = Workspace.Raycast(
				humanoidRootPart.Position,
				withInput.mul(2),
				this.raycastParams,
			);
		}

		const blockSize = new Vector3(
			humanoidRootPart.Size.X,
			humanoidRootPart.Size.Y / 2,
			0.1,
		);
		const blockForwardCast = Workspace.Blockcast(
			humanoidRootPart.CFrame,
			blockSize,
			doubledLookVector,
			this.raycastParams,
		);

		if (!(blockForwardCast || diagonalIn || diagonalOut)) {
			this.stopClimb();
			return;
		}

		let seesTop = false;
		const headCastOrigin = humanoidRootPart.CFrame.add(
			upVector.mul(1.5),
		).sub(lookVector.mul(0.5));
		const headCastSize = new Vector3(2, 0.1, 0.1);
		if (
			!Workspace.Blockcast(
				headCastOrigin,
				headCastSize,
				doubledLookVector,
				this.raycastParams,
			)
		) {
			const to = humanoidRootPart.Position.add(lookVector.mul(1.5)).add(
				Vector3.yAxis,
			);
			seesTop = hasLineOfSight(
				headCastOrigin.Position,
				to,
				this.raycastParams,
			);
		}

		const centerForward = Workspace.Raycast(
			humanoidRootPart.Position,
			doubledLookVector,
			this.raycastParams,
		);

		if (seesTop) {
			const ledgeCastOrigin = humanoidRootPart.CFrame.mul(
				CFrame.Angles(math.rad(-10), 0, 0),
			).add(Vector3.yAxis);
			const ledgeCastSize = new Vector3(0.01, 2, 0.01);
			const ledgeCast = Workspace.Blockcast(
				ledgeCastOrigin,
				ledgeCastSize,
				lookVector,
				this.raycastParams,
			);

			if (ledgeCast)
				this.climbUp(
					new CFrame(ledgeCast.Position).mul(
						humanoidRootPart.CFrame.Rotation,
					),
				);
			else this.stopClimb();
		} else if (diagonalIn && !diagonalOut)
			this.alignCharacterToWall(deltaTime, diagonalIn);
		else if (sideways) this.alignCharacterToWall(deltaTime, sideways);
		else if (centerForward)
			this.alignCharacterToWall(deltaTime, centerForward);

		if (this.climbForce) {
			const lateral = rightVector.mul(inputVector.X);
			const vertical = upVector.mul(inputVector.Y);
			let combined = lateral.add(vertical);
			if (combined.Magnitude > 1) combined = combined.Unit;
			this.climbForce.VectorVelocity = combined.mul(
				this.calculateClimbSpeed(100, 0, 0),
			); // TODO: fix this
		}
	}

	stopClimb(): void {
		if (!this.character) return;

		this.isClimbing = false;
		this.climbTrove.clean();

		const humanoid = this.character.instance.Humanoid;
		humanoid.AutoRotate = true;
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Freefall, true);
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Running, true);

		this.animationController.stop("ClimbUp");
		this.animationController.stop("ClimbDown");
		this.animationController.stop("ClimbLeft");
		this.animationController.stop("ClimbRight");
		this.animationController.stop("ClimbIdle");
	}

	handleClimbAnimations(
		input: InputObject,
		gameProcessedEvent: boolean,
	): void {
		if (gameProcessedEvent) return;
		if (!this.keybindController.isDirectionalKey(input.KeyCode)) return;
		const actionName = this.keybindController.getKeyActionName(
			input.KeyCode,
		) as Direction | undefined;
		if (!actionName) return;

		switch (input.UserInputState) {
			case Enum.UserInputState.Begin:
				this.animationController.stop("ClimbIdle");
				this.animationController.play(
					CLIMB_DIRECTION_TO_ANIMATION_NAME[actionName],
				);
				break;
			case Enum.UserInputState.End:
				this.animationController.stop(
					CLIMB_DIRECTION_TO_ANIMATION_NAME[actionName],
				);
		}

		if (this.keybindController.isDirectionalKeyDown())
			this.animationController.play("ClimbIdle");
	}

	private manaRun(baseSpeed: number): void {
		if (!this.character) return;

		this.character.instance.Humanoid.WalkSpeed = baseSpeed * 2;
		this.animationController.play("ManaRun");
		if (this.runTrail) this.runTrail.Enabled = true;
	}

	private run(baseSpeed: number): void {
		if (!this.character) return;

		this.character.instance.Humanoid.WalkSpeed = baseSpeed * 1.5;
		this.animationController.play("Run");
	}

	startRun(hasMana: boolean): void {
		if (this.isClimbing || this.isRunning || this.isDodging) return;
		if (!this.character) return;
		if (this.character.attributes.isRagdolled) return;

		this.isRunning = true;

		const BASE_PLAYER_SPEED = BASE_WALK_SPEED; // + speedBoost

		hasMana ? this.manaRun(BASE_PLAYER_SPEED) : this.run(BASE_PLAYER_SPEED);
	}

	stopRun(): void {
		if (!this.character) return;
		if (!this.isRunning) return;

		this.isRunning = false;

		const BASE_PLAYER_SPEED = BASE_WALK_SPEED; // + speedBoost
		this.character.instance.Humanoid.WalkSpeed = BASE_PLAYER_SPEED;

		this.animationController.stop("Run");
		this.animationController.stop("ManaRun");
		if (this.runTrail) this.runTrail.Enabled = false;
	}

	directionToDashAnimationName(direction: Direction): string {
		return (
			"Dash" +
			direction.gsub(
				"^%l",
				string.char(direction.byte(1)[0]).upper(),
				1,
			)[0]
		);
	}

	startDodge(hasMana: boolean, direction: Direction): void {
		if (this.isClimbing || this.isDodging) return;
		if (this.dashDebounce) return;
		if (!this.character) return;
		if (this.character.attributes.isRagdolled) return;

		if (this.isRunning) this.stopRun();

		this.isDodging = true;

		const directionAngle = directionToAngle[direction];
		const humanoidRootPart = this.character.getHumanoidRootPart();

		this.dashVelocity = this.dashTrove.add(this.newDashVelocity());
		this.dashVelocity.Parent = humanoidRootPart;
		this.dashVelocity.Velocity = humanoidRootPart.CFrame.mul(
			CFrame.Angles(0, math.rad(directionAngle), 0),
		).LookVector.mul(hasMana ? 60 : 50);

		if (hasMana) {
			this.manaController.onChargeManaInput(Enum.UserInputState.End);
			if (this.manaDashSound) this.manaDashSound.Play();
			if (this.manaDashParticles) this.manaDashParticles.Enabled = true;
		}

		task.delay(DASH_DURATION, () => this.stopDodge());

		this.dashTrove.bindToRenderStep(
			"dash_update",
			Enum.RenderPriority.Character.Value,
			() => this.updateDodge(directionAngle),
		);

		this.animationController.play(
			this.directionToDashAnimationName(direction),
		);
	}

	updateDodge(angle: number): void {
		if (!this.character) return;
		if (!Workspace.CurrentCamera) return;

		const humanoidRootPart = this.character.getHumanoidRootPart();
		if (this.dashVelocity && this.isDodging) {
			humanoidRootPart.CFrame = new CFrame(
				humanoidRootPart.Position,
				humanoidRootPart.Position.add(
					Workspace.CurrentCamera.CFrame.LookVector.mul(
						new Vector3(1, 0, 1),
					),
				),
			);
			const speed = math.round(this.dashVelocity.Velocity.Magnitude);
			this.dashVelocity.Velocity = humanoidRootPart.CFrame.mul(
				CFrame.Angles(0, math.rad(angle), 0),
			).LookVector.mul(speed);
		} else {
			this.stopDodge();
		}
	}

	stopDodge(): void {
		this.dashTrove.clean();

		this.isDodging = false;
		this.dashDebounce = true;

		if (this.manaDashParticles) this.manaDashParticles.Enabled = false;

		task.delay(DASH_COOLDOWN, () => (this.dashDebounce = false));
	}

	handleJump(): void {
		if (!this.character) return;

		if (this.isClimbing) {
			this.stopClimb();
			return;
		}

		const humanoidRootPart = this.character?.getHumanoidRootPart();
		const forwardCast = Workspace.Raycast(
			humanoidRootPart.Position,
			humanoidRootPart.CFrame.LookVector.mul(new Vector3(2, 0, 2)),
			this.raycastParams,
		);

		const inAir =
			this.character.instance.Humanoid.FloorMaterial ===
			Enum.Material.Air;
		if (forwardCast && inAir) {
			const castInstance = forwardCast.Instance;
			if (
				castInstance.Anchored &&
				castInstance.CanCollide &&
				!castInstance.IsA("TrussPart")
			) {
				this.startClimb(forwardCast);
			}
		}
	}
}
