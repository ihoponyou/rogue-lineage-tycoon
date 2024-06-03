import { CharacterState } from "./character-state";
import { StateMachine } from "shared/modules/state-machine";
import { CharacterClient } from "../components/character-client";
import { InputController } from "../controllers/input-controller";
import { ReplicatedStorage, UserInputService } from "@rbxts/services";
import { AnimationController } from "../controllers/animation-controller";
import { ManaController } from "../controllers/mana-controller";
import { Events } from "../networking";
import { KeybindController } from "../controllers/keybind-controller";

export class RunState extends CharacterState {
	readonly name = "Run";

	private manaTrail = this.newManaTrail();
	private dashConnection?: RBXScriptConnection;
	private manaEmptiedConnection?: RBXScriptConnection;
	private chargeManaConnection?: RBXScriptConnection;
	private climbConnection?: RBXScriptConnection;

	constructor(
		stateMachine: StateMachine,
		character: CharacterClient,

		private keybindController: KeybindController,
		private inputController: InputController,
		private manaController: ManaController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);
	}

	public override initialize(): void {
		Events.manaEvents.manaColorChanged.connect((color) => {
			this.manaTrail.Color = new ColorSequence(color);
		});
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

		this.chargeManaConnection =
			this.inputController.chargeManaTriggered.Connect((charging) => {
				if (charging) this.stateMachine.transitionTo("chargemana");
			});

		this.climbConnection = this.inputController.climbTriggered.Connect(
			(cast) => this.stateMachine.transitionTo("climb", cast),
		);
	}

	override update(): void {
		if (!this.keybindController.isKeyDown("forward"))
			this.stateMachine.transitionTo("idle");
	}

	override exit(): void {
		this.character.instance.Humanoid.WalkSpeed =
			this.character.getWalkSpeed();

		this.animationController.stop("Run");
		this.animationController.stop("ManaRun");
		this.manaTrail.Enabled = false;

		this.dashConnection?.Disconnect();
		this.manaEmptiedConnection?.Disconnect();
		this.chargeManaConnection?.Disconnect();
		this.climbConnection?.Disconnect();
	}

	private onManaEmptied(): void {
		this.animationController.stop("ManaRun");
		if (this.manaTrail) this.manaTrail.Enabled = false;
		this.run();
	}

	private run(): void {
		this.character.instance.Humanoid.WalkSpeed =
			this.character.getWalkSpeed() * 1.5;

		this.animationController.play("Run");
	}

	private manaRun(): void {
		this.character.instance.Humanoid.WalkSpeed =
			this.character.getWalkSpeed() * 2;

		this.animationController.play("ManaRun");

		this.manaTrail.Enabled = true;
	}

	private newManaTrail(): Trail {
		const trail = ReplicatedStorage.Effects.Visuals.ManaRunTrail.Clone();
		trail.Enabled = false;
		const torso = this.character.getTorso();
		trail.Parent = torso;
		trail.Attachment0 = torso.BodyFrontAttachment;
		trail.Attachment1 = torso.BodyBackAttachment;
		return trail;
	}
}
