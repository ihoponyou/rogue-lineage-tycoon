import { Components } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { Item } from "client/components/item";
import { store } from "client/store";
import { selectActiveTool, selectGui } from "client/store/slices/gui/selectors";

@Controller()
export class InventoryController implements OnStart {
	private selectedItem?: Item;

	public constructor(private components: Components) {}

	public onStart(): void {
		store.subscribe(selectActiveTool(), (tool) => {
			this.switchItem(tool);
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

	private switchItem(tool?: Tool) {
		this.selectedItem?.unequip();

		if (tool === undefined) {
			this.selectedItem = undefined;
			return;
		}

		const item = this.components.getComponent<Item>(tool);
		if (item === undefined) {
			error(`failed to get Item from ${tool}`);
		}
		item.equip();
		this.selectedItem = item;
	}
}
