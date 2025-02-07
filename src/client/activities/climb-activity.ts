import {
	ContextActionService,
	RunService,
	TweenService,
	UserInputService,
	Workspace,
} from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { LocalCharacter } from "client/components/local-character";
import { AnimationController } from "client/controllers/animation-controller";
import {
	Direction,
	InputController,
} from "client/controllers/input-controller";
import { KeybindController } from "client/controllers/keybind-controller";
import { store } from "client/store";
import { hasLineOfSight } from "shared/modules/line-of-sight";
import { selectManaAmount } from "shared/store/slices/mana/selectors";
import { CharacterActivity } from "./character-activity";

const BASE_CLIMB_SPEED = 10;
const TRAINED_CLIMB_BONUS_DURATION = 10;
const CLIMB_DIRECTION_TO_ANIMATION_NAME = {
	forward: "ClimbUp",
	backward: "ClimbDown",
	left: "ClimbLeft",
	right: "ClimbRight",
};

export class ClimbActivity extends CharacterActivity {
	private trove = new Trove();

	private goalPart = this.newGoalPart();
	private goalAttachment = this.newGoalAttachment();
	private climbForce = this.newClimbForce();
	private climbConstraint = this.newClimbConstraint();

	public constructor(
		character: LocalCharacter,
		private animationController: AnimationController,
		private inputController: InputController,
		private keybindController: KeybindController,
	) {
		super(character);
	}

	public override start(wallCastResult: RaycastResult): void {
		super.start();

		const humanoid = this.character.getHumanoid();
		humanoid.AutoRotate = false;
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Freefall, false);
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Running, false);
		humanoid.ChangeState(Enum.HumanoidStateType.Climbing);

		this.climbConstraint.Enabled = true;
		this.climbForce.Enabled = true;

		this.alignCharacterToWall(0, wallCastResult);

		const input = this.inputController.getInputVector();
		if (input.Y !== 0) {
			this.animationController.play("ClimbUp");
		} else if (input.X === 1) {
			this.animationController.play("ClimbRight");
		} else if (input.X === -1) {
			this.animationController.play("ClimbLeft");
		} else {
			this.animationController.play("ClimbIdle");
		}

		ContextActionService.BindAction(
			"input_cancel_climb",
			(_, state) => {
				if (state !== Enum.UserInputState.Begin)
					return Enum.ContextActionResult.Pass;
				this.stop();
			},
			false,
			this.keybindController.keybinds.jump,
		);

		this.trove.connect(UserInputService.InputBegan, (input, gpe) =>
			this.handleClimbAnimations(input, gpe),
		);
		this.trove.connect(UserInputService.InputEnded, (input, gpe) =>
			this.handleClimbAnimations(input, gpe),
		);

		this.trove.connect(RunService.RenderStepped, (deltaTime) =>
			this.update(deltaTime),
		);
	}

	public override stop(): void {
		super.stop();

		const humanoid = this.character.getHumanoid();
		humanoid.AutoRotate = true;
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Freefall, true);
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Running, true);

		this.climbConstraint.Enabled = false;
		this.climbForce.Enabled = false;

		this.animationController.stop("ClimbUp");
		this.animationController.stop("ClimbDown");
		this.animationController.stop("ClimbLeft");
		this.animationController.stop("ClimbRight");
		this.animationController.stop("ClimbIdle");

		ContextActionService.UnbindAction("input_cancel_climb");

		this.trove.clean();
	}

	private update(deltaTime: number): void {
		const manaAmount = store.getState(selectManaAmount()) ?? 0;
		if (manaAmount <= 0) {
			this.stop();
			return;
		}

		const humanoidRootPart = this.character.getHumanoidRootPart();
		const params = this.character.getRaycastParams();
		const upVector = humanoidRootPart.CFrame.UpVector;

		const floorCheck = Workspace.Raycast(
			humanoidRootPart.Position.sub(Vector3.yAxis.mul(0.5)),
			upVector.mul(-1),
			params,
		);
		if (floorCheck) {
			// print("too close to floor");
			this.stop();
			return;
		}

		const inputVector = this.inputController.getInputVector();
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
				params,
			);
			diagonalOut = Workspace.Raycast(
				outOrigin,
				outPoint.sub(outOrigin),
				params,
			);
			sideways = Workspace.Raycast(
				humanoidRootPart.Position,
				withInput.mul(2),
				params,
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
			params,
		);

		if (!(blockForwardCast || diagonalIn || diagonalOut)) {
			// print("wall not found");
			this.stop();
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
				params,
			)
		) {
			const to = humanoidRootPart.Position.add(lookVector.mul(1.5)).add(
				Vector3.yAxis,
			);
			seesTop = hasLineOfSight(headCastOrigin.Position, to, params);
		}

		const centerForward = Workspace.Raycast(
			humanoidRootPart.Position,
			doubledLookVector,
			params,
		);

		if (seesTop) {
			this.tryLedgeClimb(humanoidRootPart, lookVector, params);
		} else if (diagonalIn && !diagonalOut) {
			this.alignCharacterToWall(deltaTime, diagonalIn);
		} else if (sideways) {
			this.alignCharacterToWall(deltaTime, sideways);
		} else if (centerForward) {
			this.alignCharacterToWall(deltaTime, centerForward);
		}

		const lateral = rightVector.mul(inputVector.X);
		const vertical = upVector.mul(inputVector.Y);
		let combined = lateral.add(vertical);
		if (combined.Magnitude > 1) combined = combined.Unit;
		this.climbForce.VectorVelocity = combined.mul(
			this.calculateClimbSpeed(100, 0, 0),
		); // TODO: calculate climb speed based on mana, training, and passive boosts
	}

	private tryLedgeClimb(
		humanoidRootPart: BasePart,
		lookVector: Vector3,
		params: RaycastParams,
	): void {
		const ledgeCastOrigin = humanoidRootPart.CFrame.mul(
			CFrame.Angles(math.rad(-10), 0, 0),
		).add(Vector3.yAxis);
		const ledgeCastSize = new Vector3(0.01, 2, 0.01);
		const ledgeCast = Workspace.Blockcast(
			ledgeCastOrigin,
			ledgeCastSize,
			lookVector,
			params,
		);

		if (ledgeCast) {
			this.climbUp(
				new CFrame(ledgeCast.Position).mul(
					humanoidRootPart.CFrame.Rotation,
				),
			);
		} else {
			// print("ledge not found");
			this.stop();
			return;
		}
	}

	private newGoalPart(): Part {
		const part = new Instance("Part");
		part.Size = new Vector3(4, 1.2, 2);
		part.CanCollide = false;
		part.CanQuery = false;
		part.CanTouch = false;
		part.Anchored = true;
		part.Transparency = 1;
		part.Parent = this.character.getHumanoidRootPart();
		return part;
	}

	private newGoalAttachment(): Attachment {
		const attachment = new Instance("Attachment");
		attachment.Parent = this.goalPart;
		return attachment;
	}

	private newClimbForce(): LinearVelocity {
		const force = new Instance("LinearVelocity");
		force.MaxForce = math.huge;
		force.Enabled = false;
		force.Parent = this.character.instance;
		force.Attachment0 = this.character.getHumanoidRootPart().RootAttachment;
		return force;
	}

	private newClimbConstraint(): AlignOrientation {
		const constraint = new Instance("AlignOrientation");
		constraint.Enabled = false;
		constraint.AlignType = Enum.AlignType.Parallel;
		constraint.MaxTorque = 1e7;
		constraint.Parent = this.character.instance;
		constraint.Attachment0 =
			this.character.getHumanoidRootPart().RootAttachment;
		constraint.Attachment1 = this.goalAttachment;
		return constraint;
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

	private handleClimbAnimations(
		input: InputObject,
		gameProcessedEvent: boolean,
	): void {
		if (gameProcessedEvent) return;
		if (!this.keybindController.isDirectionalKey(input.KeyCode)) return;
		const actionName = this.keybindController.getKeyActionName(
			input.KeyCode,
		) as Direction | undefined;
		if (!actionName) return;

		if (input.UserInputState === Enum.UserInputState.Begin) {
			this.animationController.stop("ClimbIdle");
			this.animationController.play(
				CLIMB_DIRECTION_TO_ANIMATION_NAME[actionName],
			);
		} else if (input.UserInputState === Enum.UserInputState.End) {
			this.animationController.stop(
				CLIMB_DIRECTION_TO_ANIMATION_NAME[actionName],
			);
		}

		if (this.keybindController.isDirectionalKeyDown())
			this.animationController.play("ClimbIdle");
	}

	private climbUp(goal: CFrame) {
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
		// TODO: secure this?
		tween.Completed.Once(() => {
			humanoidRootPart.Anchored = false;
			// print("climbed up");
			this.stop();
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
}
