import { Controller, Dependency, OnStart, OnTick } from "@flamework/core";
import { Events } from "client/modules/networking";
import { MovementController } from "./movement-controller";
import { ReplicatedStorage } from "@rbxts/services";
import { OnLocalCharacterAdded } from "../../../../../types/lifecycles";
import { CharacterClient as Character } from "client/modules/components/character-client";
import { Components } from "@flamework/components";

const EVENTS = Events.manaEvents;

const SFX = ReplicatedStorage.Effects.Sounds;

@Controller()
export class ManaController implements OnStart, OnTick, OnLocalCharacterAdded {
	private character?: Character
	private chargeSound?: Sound
	private filledSound?: Sound
	
	isCharging = false;
	manaEnabled = false;
	mana = 0;

	constructor(private movementController: MovementController) {}

	onStart(): void {
		this.chargeSound = SFX.Charging.Clone();
		this.filledSound = SFX.FinishedCharging.Clone();

		EVENTS.manaObtained.connect(() => this.manaEnabled = true);
		EVENTS.manaDisabled.connect(() => this.manaEnabled = false);
		EVENTS.manaFilled.connect(() => this.onManaFilled());
		EVENTS.manaEmptied.connect(() => this.onManaEmptied());
		EVENTS.manaChanged.connect((value) => {
			// print(value);
			this.mana = value;
		});
		EVENTS.charge.connect((isCharging) => {
			// print(isCharging);
			this.isCharging = isCharging;
		});
	}

	onTick(dt: number): void {
		if (!this.isCharging) return;
		if (!this.chargeSound?.IsPlaying) this.chargeSound?.Play();
	}

	onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components.waitForComponent<Character>(character)
			.andThen((value) => this.character = value);

		const humanoidRootPart = character.WaitForChild("HumanoidRootPart");
		if (this.chargeSound) this.chargeSound.Parent = humanoidRootPart;
		if (this.filledSound) this.filledSound.Parent = humanoidRootPart;
	}

	onChargeManaInput(state: Enum.UserInputState): void {
		if (!this.manaEnabled) return;
		if (this.movementController.isClimbing || this.movementController.isDodging) return;
		if (this.character?.instance.GetAttribute("isRagdolled")) return;
		// print(state === Enum.UserInputState.Begin)
		const doCharge = state === Enum.UserInputState.Begin
		EVENTS.charge(doCharge);

		if (doCharge) {
			this.movementController.stopRun();
			this.chargeSound?.Play();
			// reduce walkspeed
		} else {
			// reset walkspeed if slowed
		}
	}

	onManaFilled(): void {
		this.filledSound?.Play();
	}

	onManaEmptied(): void {
		print("emptied")
	}

	hasMana(): boolean {
		return this.mana > 0;
	}
}
