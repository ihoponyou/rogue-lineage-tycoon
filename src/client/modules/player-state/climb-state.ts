import { StateMachine } from "shared/modules/state-machine";
import { Direction, InputController } from "../controllers/input-controller";
import { CharacterState } from "./character-state";
import { CharacterClient } from "../components/character-client";
import { AnimationController } from "../controllers/animation-controller";
import { TweenService, UserInputService, Workspace } from "@rbxts/services";
import { KeybindController } from "../controllers/keybind-controller";
import { ManaController } from "../controllers/mana-controller";
import { hasLineOfSight } from "shared/modules/line-of-sight";

const BASE_CLIMB_SPEED = 10;
const TRAINED_CLIMB_BONUS_DURATION = 10;

const CLIMB_DIRECTION_TO_ANIMATION_NAME = {
	forward: "ClimbUp",
	backward: "ClimbDown",
	left: "ClimbLeft",
	right: "ClimbRight",
};

export class ClimbState extends CharacterState {
	public readonly name = "Climb";

	constructor(
		stateMachine: StateMachine,
		character: CharacterClient,
		private keybindController: KeybindController,
		private manaController: ManaController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);
	}

	private goalPart = this.newGoalPart();
	private goalAttachment = this.newGoalAttachment();
	private climbForce = this.newClimbForce();
	private climbConstraint = this.newClimbConstraint();

	private inputBeganConnection?: RBXScriptConnection;
	private inputEndedConnection?: RBXScriptConnection;

	public override enter(wallCastResult: RaycastResult): void {
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

		this.inputBeganConnection = UserInputService.InputBegan.Connect(
			(input, gpe) => {
				if (input.KeyCode === Enum.KeyCode.Space)
					this.stateMachine.transitionTo("idle");
				else this.handleClimbAnimations(input, gpe);
			},
		);
		this.inputEndedConnection = UserInputService.InputEnded.Connect(
			(input, gpe) => this.handleClimbAnimations(input, gpe),
		);
	}

	public override update(deltaTime: number): void {
		if (!this.manaController.hasMana()) {
			this.stateMachine.transitionTo("idle");
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
			this.stateMachine.transitionTo("idle");
			return;
		}

		const inputVector = InputController.inputVector;
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
			this.stateMachine.transitionTo("idle");
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
				this.stateMachine.transitionTo("idle");
				return;
			}
		} else if (diagonalIn && !diagonalOut) {
			this.alignCharacterToWall(deltaTime, diagonalIn);
		} else if (sideways) {
			this.alignCharacterToWall(deltaTime, sideways);
		} else if (centerForward) {
			this.alignCharacterToWall(deltaTime, centerForward);
		}

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

	public override exit(): void {
		if (this.inputBeganConnection) this.inputBeganConnection.Disconnect();
		if (this.inputEndedConnection) this.inputEndedConnection.Disconnect();
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
		force.Parent = this.character.instance;
		force.Attachment0 = this.character.getHumanoidRootPart().RootAttachment;
		return force;
	}

	private newClimbConstraint(): AlignOrientation {
		const constraint = new Instance("AlignOrientation");
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
		// TODO: make this frame independent
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
		tween.Completed.Once(() => {
			humanoidRootPart.Anchored = false;
			this.stateMachine.transitionTo("idle");
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
