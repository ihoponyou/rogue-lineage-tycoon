import { Trove } from "@rbxts/trove";
import { Character } from "client/components/character";
import { SFX } from "shared/constants";
import { StateMachine } from "shared/state-machine";
import { InputController } from "../controllers/input-controller";
import { KeybindController } from "../controllers/keybind-controller";
import { Events } from "../networking";
import { CharacterState } from "./character-state";
import {
	createClimbTransition,
	createDashTransition,
	createRunTransition,
} from "./transitions";

export class ChargeManaState extends CharacterState {
	public readonly name = "ChargeMana";
	private chargeSound = SFX.Charging.Clone();
	private filledSound = SFX.FinishedCharging.Clone();

	private trove = new Trove();

	public constructor(
		stateMachine: StateMachine,
		character: Character,
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
		this.character.getHumanoid().WalkSpeed =
			this.character.getWalkSpeed() * 0.85;
		Events.mana.charge(true);
		this.chargeSound.Play();

		this.trove.add(
			Events.mana.filled.connect(() =>
				this.stateMachine.transitionTo("idle"),
			),
		);

		this.trove.add(
			createDashTransition(this.stateMachine, this.inputController),
		);

		this.trove.add(
			createClimbTransition(this.stateMachine, this.inputController),
		);

		this.trove.add(
			createRunTransition(this.stateMachine, this.inputController),
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

		this.trove.clean();
	}
}
