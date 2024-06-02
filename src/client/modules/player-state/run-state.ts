import { CharacterState } from "./character-state";
import { StateMachine } from "shared/modules/state-machine";
import { CharacterClient } from "../components/character-client";
import { InputController } from "../controllers/input-controller";
import { ReplicatedStorage, UserInputService } from "@rbxts/services";
import { AnimationController } from "../controllers/animation-controller";
import { ManaController } from "../controllers/mana-controller";
import { Events } from "../networking";

export class RunState extends CharacterState {
	readonly name = "Run";

	private runTrail = this.newRunTrail();
	private dashConnection?: RBXScriptConnection;
	private manaEmptiedConnection?: RBXScriptConnection;

	constructor(
		stateMachine: StateMachine,
		character: CharacterClient,
		private inputController: InputController,
		private manaController: ManaController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);
	}

	override enter(): void {
		this.manaController.hasMana() ? this.manaRun() : this.run();

		this.dashConnection = this.inputController.dashTriggered.Connect(
			(direction) => {
				this.stateMachine.transitionTo("dash", direction);
			},
		);

		this.manaEmptiedConnection = Events.manaEvents.manaEmptied.connect(() =>
			this.onManaEmptied(),
		);
	}

	override update(deltaTime: number): void {
		if (!UserInputService.IsKeyDown(Enum.KeyCode.W))
			this.stateMachine.transitionTo("idle");
	}

	override exit(): void {
		this.character.instance.Humanoid.WalkSpeed =
			this.character.getWalkspeed();

		this.animationController.stop("Run");
		this.animationController.stop("ManaRun");
		this.runTrail.Enabled = false;

		if (this.dashConnection) this.dashConnection.Disconnect();
		if (this.manaEmptiedConnection) this.manaEmptiedConnection.Disconnect();
	}

	private onManaEmptied(): void {
		this.animationController.stop("ManaRun");
		if (this.runTrail) this.runTrail.Enabled = false;
		this.run();
	}

	private run(): void {
		this.character.instance.Humanoid.WalkSpeed =
			this.character.getWalkspeed() * 1.5;

		this.animationController.play("Run");
	}

	private manaRun(): void {
		this.character.instance.Humanoid.WalkSpeed =
			this.character.getWalkspeed() * 2;

		this.animationController.play("ManaRun");

		this.runTrail.Enabled = true;
	}

	private newRunTrail(): Trail {
		const trail = ReplicatedStorage.Effects.Visuals.ManaRunTrail.Clone();
		trail.Enabled = false;
		const torso = this.character.getTorso();
		trail.Parent = torso;
		trail.Attachment0 = torso.BodyFrontAttachment;
		trail.Attachment1 = torso.BodyBackAttachment;
		return trail;
	}
}
