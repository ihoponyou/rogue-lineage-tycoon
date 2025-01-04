import { UserInputService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { LocalCharacter } from "client/components/local-character";
import { AnimationController } from "client/controllers/animation-controller";
import { Events } from "client/network";
import { store } from "client/store";
import { VFX } from "shared/constants";
import { selectMana } from "shared/store/slices/mana/selectors";
import { selectSkills } from "shared/store/slices/skills/selectors";
import { CharacterActivity } from "./character-activity";

export class RunActivity extends CharacterActivity {
	private trove = new Trove();
	private manaTrail = this.newManaTrail();

	public constructor(
		character: LocalCharacter,
		private animationController: AnimationController,
	) {
		super(character);
	}

	public override start(): void {
		super.start();

		Events.character.startRun();

		const hasManaRun = store.getState(selectSkills()).has("Mana Run");
		const manaData = store.getState(selectMana());
		const canManaRun = (manaData?.amount ?? 0) > 0 && hasManaRun;
		if (canManaRun) {
			this.trove.add(
				Events.mana.emptied.connect(() => {
					if (this.manaTrail) this.manaTrail.Enabled = false;
				}),
			);

			this.manaTrail.Enabled = true;
		}

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
