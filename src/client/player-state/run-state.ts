import { LOCAL_PLAYER } from "client/constants";
import { store } from "client/store";
import { VFX } from "shared/constants";
import { deserializeColor3 } from "shared/serialized-color3";
import { StateMachine } from "shared/state-machine";
import { selectManaColor } from "shared/store/slices/players/slices/identity/selectors";
import { selectMana } from "shared/store/slices/players/slices/mana/selectors";
import { CharacterClient } from "../components/character-client";
import { AnimationController } from "../controllers/animation-controller";
import { InputController } from "../controllers/input-controller";
import { KeybindController } from "../controllers/keybind-controller";
import { Events } from "../networking";
import { CharacterState } from "./character-state";

export class RunState extends CharacterState {
	public readonly name = "Run";

	private manaTrail = this.newManaTrail();
	private dashConnection?: RBXScriptConnection;
	private manaEmptiedConnection?: RBXScriptConnection;
	private chargeManaConnection?: RBXScriptConnection;
	private climbConnection?: RBXScriptConnection;

	public constructor(
		stateMachine: StateMachine,
		character: CharacterClient,
		private keybindController: KeybindController,
		private inputController: InputController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);
	}

	public override initialize(): void {
		store.subscribe(
			selectManaColor(LOCAL_PLAYER.UserId),
			(serializedColor) =>
				(this.manaTrail.Color = new ColorSequence(
					deserializeColor3(serializedColor ?? new Color3()),
				)),
		);
	}

	public override enter(): void {
		const manaData = store.getState(selectMana(LOCAL_PLAYER.UserId));
		const canManaRun = (manaData?.amount ?? 0) > 0 && manaData?.runEnabled;
		canManaRun ? this.manaRun() : this.run();

		this.dashConnection = this.inputController.dashTriggered.Connect(
			(direction) => {
				this.stateMachine.transitionTo("dash", direction);
			},
		);

		this.manaEmptiedConnection = Events.mana.emptied.connect(() =>
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

	public override update(): void {
		if (!this.keybindController.isKeyDown("forward"))
			this.stateMachine.transitionTo("idle");
	}

	public override exit(): void {
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
		const trail = VFX.ManaRunTrail.Clone();
		trail.Enabled = false;
		const torso = this.character.getTorso();
		trail.Parent = torso;
		trail.Attachment0 = torso.BodyFrontAttachment;
		trail.Attachment1 = torso.BodyBackAttachment;
		return trail;
	}
}
