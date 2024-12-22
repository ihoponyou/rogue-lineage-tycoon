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

		Events.character.stopRun();
		this.manaTrail.Enabled = false;

		this.trove.clean();
	}

	private run(): void {
		Events.character.startRun();
	}

	private manaRun(): void {
		this.trove.add(
			Events.mana.emptied.connect(() => {
				if (this.manaTrail) this.manaTrail.Enabled = false;
				this.run();
			}),
		);

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
