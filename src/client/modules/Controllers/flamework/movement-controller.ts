import { Controller, Dependency, OnStart } from "@flamework/core";
import { ReplicatedStorage, TweenService, UserInputService, Workspace } from "@rbxts/services";
import { OnLocalCharacterAdded } from "../../../../../types/lifecycles";
import { Components } from "@flamework/components";
import { CharacterClient as Character } from "client/modules/components/character-client";
import { Trove } from "@rbxts/trove";
import { InputController } from "./input-controller";
import { hasLineOfSight } from "shared/modules/line-of-sight";
import { Events } from "client/modules/networking";

const BASE_CLIMB_SPEED = 10;
const BASE_WALK_SPEED = 20;
const DASH_DURATION = 0.4;
const TRAINED_CLIMB_BONUS_DURATION = 10;

const VFX = ReplicatedStorage.Effects.Visuals;
const SFX = ReplicatedStorage.Effects.Sounds;

export type Direction = "forward" | "backward" | "left" | "right";

const directionToAngle: {[direction: string]: number} = {
	forward: 0,
	backward: 180,
	left: 90,
	right: -90
}

@Controller()
export class MovementController implements OnStart, OnLocalCharacterAdded {
	private raycastParams = new RaycastParams();
	private character: Character | undefined;

	private climbTrove = new Trove();
	private climbForce: LinearVelocity | undefined;
	private climbConstraint: AlignOrientation | undefined;
	private goalPart: Part | undefined;
	private goalAttachment: Attachment | undefined;

	private dashTrove = new Trove();
	private dashVelocity: BodyVelocity | undefined;

	isRunning = false;
	isClimbing = false;
	isDodging = false;

	onStart(): void {
		this.raycastParams.CollisionGroup = "Characters";
		this.raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
		this.raycastParams.IgnoreWater = true;

		Events.manaEvents.manaEmptied.connect(() => this.onManaEmptied());
	}

	onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components.waitForComponent<Character>(character).andThen((value) => this.character = value);
		this.raycastParams.AddToFilter(character);
	}

	onManaEmptied(): void {
		if (this.isRunning) {
			// downgrade from manarun to normal run
		} else if (this.isClimbing) {
			this.stopClimb();
		}
	}

	private alignCharacterToWall(deltaTime: number, wallCastResult: RaycastResult): void {
		if (!this.goalPart) return;
		const goal = CFrame.lookAt(wallCastResult.Position.add(wallCastResult.Normal), wallCastResult.Position)
		this.goalPart.CFrame = goal;

		if (!this.character) return;
		const humanoidRootPart = this.character.getHumanoidRootPart();
		humanoidRootPart.CFrame = humanoidRootPart.CFrame.Lerp(goal, 1-math.pow(1e-9, deltaTime));
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

	startClimb(wallCastResult: RaycastResult) {
		if (!this.character) return;

		this.isClimbing = true;

		const characterRootPart = this.character.getHumanoidRootPart();

		this.goalPart = this.climbTrove.add(this.newGoalPart());
		this.goalPart.Parent = characterRootPart

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
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Freefall, false)
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Running, false)
		humanoid.ChangeState(Enum.HumanoidStateType.Climbing);

		this.alignCharacterToWall(0, wallCastResult);

		this.climbTrove.bindToRenderStep(
			"climb_update",
			Enum.RenderPriority.Character.Value,
			(deltaTime) => {
				const input = InputController.inputVector;
				this.updateClimb(deltaTime, input);
			}
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
			{ CFrame: goal }
		)
		tween.Completed.Once(() => {
			humanoidRootPart.Anchored = false;
			this.stopClimb();
		})
		tween.Play();
	}

	private calculateClimbSpeed(mana: number, climbTrains: number, climbBoost: number) {
		return (-1e-3 * mana * (mana-200) + BASE_CLIMB_SPEED + climbTrains/TRAINED_CLIMB_BONUS_DURATION) * (1+climbBoost)
	}

	updateClimb(deltaTime: number, inputVector: Vector2): void {
		if (!this.character) return;
		
		const humanoidRootPart = this.character.getHumanoidRootPart();
		const upVector = humanoidRootPart.CFrame.UpVector;

		const floorCheck = Workspace.Raycast(
			humanoidRootPart.Position.sub(Vector3.yAxis.mul(0.5)),
			upVector.mul(-1),
			this.raycastParams
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
			const inPoint = humanoidRootPart.Position.add(againstInput).add(doubledLookVector);
			const outOrigin = humanoidRootPart.Position.add(againstInput);
			const outPoint = humanoidRootPart.Position.add(withInput).add(doubledLookVector);

			diagonalIn = Workspace.Raycast(inOrigin, inPoint.sub(inOrigin), this.raycastParams);
			diagonalOut = Workspace.Raycast(outOrigin, outPoint.sub(outOrigin), this.raycastParams);
			sideways = Workspace.Raycast(humanoidRootPart.Position, withInput.mul(2), this.raycastParams);
		}

		const blockSize = new Vector3(humanoidRootPart.Size.X, humanoidRootPart.Size.Y/2, 0.1);
		const blockForwardCast = Workspace.Blockcast(humanoidRootPart.CFrame, blockSize, doubledLookVector, this.raycastParams);

		if (!(blockForwardCast || diagonalIn || diagonalOut)) {
			this.stopClimb();
			return;
		}

		let seesTop = false;
		const headCastOrigin =
			humanoidRootPart.CFrame
				.add(upVector.mul(1.5))
				.sub(lookVector.mul(0.5));
		const headCastSize = new Vector3(2, 0.1, 0.1);
		if (!Workspace.Blockcast(headCastOrigin, headCastSize, doubledLookVector, this.raycastParams)) {
			const to = humanoidRootPart.Position
				.add(lookVector.mul(1.5))
				.add(Vector3.yAxis);
			seesTop = hasLineOfSight(headCastOrigin.Position, to, this.raycastParams);
		}

		const centerForward = Workspace.Raycast(humanoidRootPart.Position, doubledLookVector, this.raycastParams);

		if (seesTop) {
			const ledgeCastOrigin = humanoidRootPart.CFrame
				.mul(CFrame.Angles(math.rad(-10), 0, 0))
				.add(Vector3.yAxis);
			const ledgeCastSize = new Vector3(0.01, 2, 0.01);
			const ledgeCast = Workspace.Blockcast(ledgeCastOrigin, ledgeCastSize, lookVector, this.raycastParams);

			if (ledgeCast)
				this.climbUp(new CFrame(ledgeCast.Position).mul(humanoidRootPart.CFrame.Rotation));
			else
				this.stopClimb();
		} else if (diagonalIn && !diagonalOut)
			this.alignCharacterToWall(deltaTime, diagonalIn);
		else if (sideways)
			this.alignCharacterToWall(deltaTime, sideways);
		else if (centerForward)
			this.alignCharacterToWall(deltaTime, centerForward);

		if (this.climbForce) {
			const lateral = rightVector.mul(inputVector.X)
			const vertical = upVector.mul(inputVector.Y)
			let combined = lateral.add(vertical);
			if (combined.Magnitude > 1) combined = combined.Unit;
			this.climbForce.VectorVelocity = combined
				.mul(this.calculateClimbSpeed(100, 0, 0)); // TODO: fix this
		}
	}

	stopClimb(): void {
		if (!this.character) return;
		
		this.isClimbing = false;
		this.climbTrove.clean();

		const humanoid = this.character.instance.Humanoid;
		humanoid.AutoRotate = true;
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Freefall, true)
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Running, true)
	}

	startRun(): void {
		if (this.isClimbing || this.isRunning || this.isDodging) return;
		if (!this.character) return;
		if (this.character.instance.GetAttribute("isRagdolled")) return;

		this.isRunning = true;

		const BASE_PLAYER_SPEED = BASE_WALK_SPEED; // + speedBoost
		this.character.instance.Humanoid.WalkSpeed = BASE_PLAYER_SPEED * 1.5;
	}

	stopRun(): void {
		if (!this.character) return;
		if (!this.isRunning) return;

		this.isRunning = false;

		const BASE_PLAYER_SPEED = BASE_WALK_SPEED; // + speedBoost
		this.character.instance.Humanoid.WalkSpeed = BASE_PLAYER_SPEED;
	}

	startDodge(hasMana: boolean, direction: Direction): void {
		if (this.isClimbing || this.isDodging) return;
		if (!this.character) return;
		if (this.character.instance.GetAttribute("isRagdolled")) return;

		if (this.isRunning) this.stopRun();

		this.isDodging = true;

		let directionAngle = directionToAngle[direction];
		const humanoidRootPart = this.character.getHumanoidRootPart();

		this.dashVelocity = this.dashTrove.add(this.newDashVelocity());
		this.dashVelocity.Parent = humanoidRootPart;
		this.dashVelocity.Velocity = humanoidRootPart.CFrame
			.mul(CFrame.Angles(0, math.rad(directionAngle), 0))
			.LookVector
			.mul(hasMana ? 60 : 50);

		task.delay(DASH_DURATION, () => this.stopDodge());
		
		this.dashTrove.bindToRenderStep(
			"dash_update",
			Enum.RenderPriority.Character.Value,
			() => this.updateDodge(directionAngle)
		);
	}

	updateDodge(angle: number): void {
		if (!this.character) return;
		if (!Workspace.CurrentCamera) return;

		const humanoidRootPart = this.character.getHumanoidRootPart();
		if (this.dashVelocity && this.isDodging) {
			humanoidRootPart.CFrame = new CFrame(
				humanoidRootPart.Position,
				humanoidRootPart.Position
					.add(
						Workspace.CurrentCamera.CFrame.LookVector
						.mul(new Vector3(1, 0, 1))
					)
				)
			const speed = math.round(this.dashVelocity.Velocity.Magnitude)
			this.dashVelocity.Velocity = humanoidRootPart.CFrame
				.mul(CFrame.Angles(0, math.rad(angle), 0))
				.LookVector
				.mul(speed);
		} else {
			this.stopDodge();
		}
	}

	stopDodge(): void {
		this.isDodging = false;
		this.dashTrove.clean();
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
			this.raycastParams
		);

		const inAir = this.character.instance.Humanoid.FloorMaterial === Enum.Material.Air;
		if (forwardCast && inAir) {
			const castInstance = forwardCast.Instance;
			if (castInstance.Anchored &&
				castInstance.CanCollide &&
				!castInstance.IsA("TrussPart")
			) {
				this.startClimb(forwardCast);
			}
		}
	}
}