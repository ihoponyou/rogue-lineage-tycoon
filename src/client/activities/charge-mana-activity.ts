import { RunService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { Character } from "client/components/character";
import { KeybindController } from "client/controllers/keybind-controller";
import { Events } from "client/network";
import { SFX } from "shared/constants";
import { CharacterActivity } from "./character-activity";

export class ChargeManaActivity extends CharacterActivity {
	private chargeSound = SFX.Charging.Clone();
	private filledSound = SFX.FinishedCharging.Clone();

	private trove = new Trove();

	public constructor(
		character: Character,
		private keybindController: KeybindController,
	) {
		super(character);
		this.chargeSound.Parent = this.character.getTorso();
		this.filledSound.Parent = this.character.getTorso();
	}

	public override start(): void {
		super.start();

		this.character.getHumanoid().WalkSpeed =
			this.character.getWalkSpeed() * 0.85;
		Events.mana.charge(true);
		this.chargeSound.Play();

		this.trove.add(Events.mana.filled.connect(() => this.stop()));
		this.trove.connect(RunService.RenderStepped, () => this.update());
	}

	public override stop(): void {
		this.character.resetWalkSpeed();
		Events.mana.charge(false);

		this.trove.clean();
	}

	private update(): void {
		if (!this.keybindController.isKeyDown("chargeMana")) {
			this.stop();
			return;
		}
		if (!this.chargeSound.IsPlaying) this.chargeSound.Play();
	}
}
