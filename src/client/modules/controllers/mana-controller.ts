import { Controller, Dependency, OnStart, OnTick } from "@flamework/core";
import { Events } from "client/modules/networking";
import { ReplicatedStorage } from "@rbxts/services";
import { OnLocalCharacterAdded } from "../../../../types/lifecycles";
import { CharacterClient as Character } from "client/modules/components/character-client";
import { Components } from "@flamework/components";

const EVENTS = Events.manaEvents;

const SFX = ReplicatedStorage.Effects.Sounds;

@Controller()
export class ManaController implements OnStart {
	manaEnabled = false;
	mana = 0;

	onStart(): void {
		EVENTS.manaObtained.connect(() => (this.manaEnabled = true));
		EVENTS.manaDisabled.connect(() => (this.manaEnabled = false));
		EVENTS.manaChanged.connect((value) => (this.mana = value));
	}

	hasMana(): boolean {
		return this.mana > 0;
	}
}
