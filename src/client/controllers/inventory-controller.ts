import { Controller, OnStart } from "@flamework/core";
import { ContextActionService } from "@rbxts/services";
import { store } from "client/store";
import { MAX_HOTBAR_SLOTS } from "shared/configs/constants";
import { CharacterController } from "./character-controller";

const SLOT_KEYS: Array<Enum.KeyCode> = [
	Enum.KeyCode.One,
	Enum.KeyCode.Two,
	Enum.KeyCode.Three,
	Enum.KeyCode.Four,
	Enum.KeyCode.Five,
	Enum.KeyCode.Six,
	Enum.KeyCode.Seven,
	Enum.KeyCode.Eight,
	Enum.KeyCode.Nine,
	Enum.KeyCode.Zero,
	Enum.KeyCode.Minus,
	Enum.KeyCode.Equals,
];

@Controller()
export class InventoryController implements OnStart {
	constructor(private characterController: CharacterController) {}

	onStart(): void {
		for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
			ContextActionService.BindAction(
				`switch_slot_${i}`,
				(_, inputState) => {
					if (inputState !== Enum.UserInputState.Begin)
						return Enum.ContextActionResult.Pass;
					const character = this.characterController.getCharacter();
					if (character === undefined)
						return Enum.ContextActionResult.Pass;

					const state = store.getState();
					const equippableIdAtSlot = state.hotbar[i];
					if (equippableIdAtSlot === "")
						return Enum.ContextActionResult.Pass;

					const equippable =
						state.equippables.get(equippableIdAtSlot);
					if (equippable?.isEquipped()) {
						equippable.unequip(character);
					} else {
						equippable?.equip(character);
					}
				},
				false,
				SLOT_KEYS[i],
			);
		}
	}
}
