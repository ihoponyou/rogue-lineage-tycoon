import { Components } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { Equippable } from "client/components/equippable";
import { Item } from "client/components/item";
import { store } from "client/store";
import { selectActiveTool, selectGui } from "client/store/slices/gui/selectors";

@Controller()
export class InventoryController implements OnStart {
	private selectedEquippable?: Equippable;

	public constructor(private components: Components) {}

	public onStart(): void {
		store.subscribe(selectActiveTool(), (tool) => {
			print(tool?.Name);
			this.switchTool(tool);
		});
	}

	public switchSlot(slot: number) {
		const guiState = store.getState(selectGui());
		const toolAtSlot = guiState.hotbar.get(slot);
		if (toolAtSlot === undefined) return;
		store.setActiveTool(
			toolAtSlot === guiState.activeTool ? undefined : toolAtSlot,
		);
	}

	public dropSelectedItem(): void {
		if (this.selectedEquippable === undefined) return;
		const item = this.components.getComponent<Item>(
			this.selectedEquippable.instance,
		);
		item?.drop();
	}

	private switchTool(tool?: Tool) {
		this.selectedEquippable?.unequip();

		if (tool === undefined) {
			this.selectedEquippable = undefined;
			return;
		}

		const equippable = this.components.getComponent<Equippable>(tool);
		if (equippable === undefined) {
			error(`failed to get Item from ${tool}`);
		}
		equippable.equip();
		this.selectedEquippable = equippable;
	}
}
