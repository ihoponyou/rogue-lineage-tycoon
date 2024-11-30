import { UserInputService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { CharacterClient } from "client/components/character-client";
import { AnimationController } from "client/controllers/animation-controller";
import { Events } from "client/network";
import { store } from "client/store";
import { VFX } from "shared/constants";
import { selectMana } from "shared/store/slices/mana/selectors";
import { CharacterActivity } from "./character-activity";

export class RunActivity extends CharacterActivity {
	private trove = new Trove();
	private manaTrail = this.newManaTrail();

	public constructor(
		character: CharacterClient,
		private animationController: AnimationController,
	) {
		super(character);
	}

	public override start(): void {
		super.start();

		const manaData = store.getState(selectMana());
		const canManaRun = (manaData?.amount ?? 0) > 0 && manaData?.runEnabled;
		canManaRun ? this.manaRun() : this.run();

		this.trove.connect(UserInputService.InputEnded, (input, gpe) => {
			if (gpe) return;
			if (input.KeyCode !== Enum.KeyCode.W) return;
			this.stop();
		});
	}

	public override stop(): void {
		super.stop();

		this.character.resetWalkSpeed();
		this.animationController.stop("Run");
		this.animationController.stop("ManaRun");
		this.manaTrail.Enabled = false;

		this.trove.clean();
	}

	private run(): void {
		this.character.setWalkSpeed(this.character.getWalkSpeed() * 1.5);
		this.animationController.play("Run");
	}

	private manaRun(): void {
		this.trove.add(Events.mana.emptied.connect(() => this.onManaEmptied()));

		this.character.setWalkSpeed(this.character.getWalkSpeed().get * 2);
		this.animationController.play("ManaRun");
		this.manaTrail.Enabled = true;
	}

	private onManaEmptied(): void {
		this.animationController.stop("ManaRun");
		if (this.manaTrail) this.manaTrail.Enabled = false;
		this.run();
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
