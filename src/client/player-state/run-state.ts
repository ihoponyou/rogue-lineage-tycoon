import { Trove } from "@rbxts/trove";
import { store } from "client/store";
import { VFX } from "shared/constants";
import { deserializeColor3 } from "shared/serialized-color3";
import { StateMachine } from "shared/state-machine";
import { selectManaColor } from "shared/store/slices/identity/selectors";
import { selectMana } from "shared/store/slices/mana/selectors";
import { Character } from "../components/character";
import { AnimationController } from "../controllers/animation-controller";
import { InputController } from "../controllers/input-controller";
import { KeybindController } from "../controllers/keybind-controller";
import { Events } from "../networking";
import { CharacterState } from "./character-state";
import {
	createAttackTransition,
	createChargeManaTransition,
	createClimbTransition,
} from "./transitions";

export class RunState extends CharacterState {
	public readonly name = "Run";

	private manaTrail = this.newManaTrail();
	private trove = new Trove();

	public constructor(
		stateMachine: StateMachine,
		character: Character,
		private keybindController: KeybindController,
		private inputController: InputController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);
	}

	public override initialize(): void {
		store.subscribe(
			selectManaColor(),
			(serializedColor) =>
				(this.manaTrail.Color = new ColorSequence(
					deserializeColor3(serializedColor ?? new Color3()),
				)),
		);
	}

	public override enter(): void {
		const manaData = store.getState(selectMana());
		const canManaRun = (manaData?.amount ?? 0) > 0 && manaData?.runEnabled;
		canManaRun ? this.manaRun() : this.run();

		this.trove.add(
			this.inputController.dashTriggered.Connect((direction) =>
				this.stateMachine.transitionTo("dash", direction),
			),
		);

		this.trove.add(Events.mana.emptied.connect(() => this.onManaEmptied()));

		this.trove.add(
			createChargeManaTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);

		this.trove.add(
			createClimbTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);

		this.trove.add(
			createAttackTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);

		this.trove.add(
			Events.character.stopRun.connect(() =>
				this.stateMachine.transitionTo("idle"),
			),
		);
	}

	public override update(): void {
		if (!this.keybindController.isKeyDown("forward"))
			this.stateMachine.transitionTo("idle");
	}

	public override exit(): void {
		this.character.getHumanoid().WalkSpeed = this.character.getWalkSpeed();

		this.animationController.stop("Run");
		this.animationController.stop("ManaRun");
		this.manaTrail.Enabled = false;

		this.trove.clean();
	}

	private onManaEmptied(): void {
		this.animationController.stop("ManaRun");
		if (this.manaTrail) this.manaTrail.Enabled = false;
		this.run();
	}

	private run(): void {
		this.character.getHumanoid().WalkSpeed =
			this.character.getWalkSpeed() * 1.5;

		this.animationController.play("Run");
	}

	private manaRun(): void {
		this.character.getHumanoid().WalkSpeed =
			this.character.getWalkSpeed() * 2;

		this.animationController.play("ManaRun");

		this.manaTrail.Enabled = true;
	}

	private newManaTrail(): Trail {
		const trail = VFX.ManaRunTrail.Clone();
		trail.Enabled = false;
		const torso = this.character.getTorso();
		trail.Parent = torso;
		trail.Attachment0 = torso.BodyFrontAttachment;
		trail.Attachment1 = torso.BodyBackAttachment;
		return trail;
	}
}
