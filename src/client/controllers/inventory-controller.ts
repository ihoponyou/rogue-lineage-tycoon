import { Components } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { Equippable } from "client/components/equippable";
import { Item } from "client/components/item";
import { store } from "client/store";
import {
	selectActiveEquippable,
	selectGui,
} from "client/store/slices/gui/selectors";

@Controller()
export class InventoryController implements OnStart {
	private selectedEquippable?: Equippable;

	public constructor(private components: Components) {}

	public onStart(): void {
		store.subscribe(selectActiveEquippable(), (tool) => {
			print(tool?.instance.Name);
			this.switchEquippable(tool);
		});
	}

	public equipEquippableAtSlot(slot: number) {
		const guiState = store.getState(selectGui());
		const toolAtSlot = guiState.hotbar.get(slot);
		if (toolAtSlot === undefined) return;
		this.switchEquippable(toolAtSlot);
	}

	public dropSelectedItem(): void {
		if (this.selectedEquippable === undefined) return;
		const item = this.components.getComponent<Item>(
			this.selectedEquippable.instance,
		);
		item?.drop();
	}

	private switchEquippable(equippable?: Equippable) {
		this.selectedEquippable?.unequip();
		if (equippable === undefined) {
			this.selectedEquippable = undefined;
			return;
		}
		equippable.equip();
		this.selectedEquippable = equippable;
	}
}
