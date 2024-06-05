import { ReplicatedStorage, UserInputService } from "@rbxts/services";
import { Events } from "../networking";
import { CharacterState } from "./character-state";
import { StateMachine } from "shared/modules/state-machine";
import { CharacterClient } from "../components/character-client";
import { KeybindController } from "../controllers/keybind-controller";
import { InputController } from "../controllers/input-controller";

export class ChargeManaState extends CharacterState {
	public readonly name = "ChargeMana";
	private chargeSound = ReplicatedStorage.Effects.Sounds.Charging.Clone();
	private filledSound =
		ReplicatedStorage.Effects.Sounds.FinishedCharging.Clone();

	private dashConnection?: RBXScriptConnection;
	private climbConnection?: RBXScriptConnection;
	private manaFilledConnection?: RBXScriptConnection;
	private runConnection?: RBXScriptConnection;

	constructor(
		stateMachine: StateMachine,
		character: CharacterClient,
		private keybindController: KeybindController,
		private inputController: InputController,
	) {
		super(stateMachine, character);
	}

	public override initialize(): void {
		this.chargeSound.Parent = this.character.getTorso();
		this.filledSound.Parent = this.character.getTorso();
	}

	public override enter(): void {
		this.character.instance.Humanoid.WalkSpeed =
			this.character.getWalkSpeed() * 0.85;
		Events.mana.charge(true);
		this.chargeSound.Play();

		this.dashConnection = this.inputController.dashTriggered.Connect(
			(direction) => this.stateMachine.transitionTo("dash", direction),
		);

		this.manaFilledConnection = Events.mana.filled.connect(() =>
			this.stateMachine.transitionTo("idle"),
		);

		this.climbConnection = this.inputController.climbTriggered.Connect(
			(cast) => this.stateMachine.transitionTo("climb", cast),
		);

		this.runConnection = this.inputController.runTriggered.Connect(() =>
			this.stateMachine.transitionTo("run"),
		);
	}

	public override update(): void {
		if (!this.keybindController.isKeyDown("chargeMana")) {
			this.stateMachine.transitionTo("idle");
			return;
		}
		if (!this.chargeSound.IsPlaying) this.chargeSound.Play();
	}

	public override exit(): void {
		this.character.resetToWalkSpeed();
		Events.mana.charge(false);

		this.dashConnection?.Disconnect();
		this.climbConnection?.Disconnect();
		this.manaFilledConnection?.Disconnect();
		this.runConnection?.Disconnect();
	}
}
