import { Components } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { Item } from "client/components/item";
import { GuiController } from "./gui-controller";

const MAX_HOTBAR_SLOTS = 12;

@Controller()
export class InventoryController implements OnStart {
	private activeItem?: Item;
	private hotbar = new Array<Tool>(MAX_HOTBAR_SLOTS);

	public constructor(
		private components: Components,
		private guiController: GuiController,
	) {}

	public onStart(): void {
		this.guiController.onToolSelected((tool) => this.switchItem(tool));
	}

	private switchItem(newItem: Tool | undefined) {
		if (newItem === this.activeItem) return; // this should basically never happen
		this.activeItem?.unequip();
		if (newItem === undefined) return;
		const item = this.components.getComponent<Item>(newItem);
		item?.equip();
		this.activeItem = item;
	}

	public equipItem(slot: number): void {
		print(`equipping ${slot}`);
		if (slot < 0 || slot > MAX_HOTBAR_SLOTS)
			error(`slot index must be within [0, ${MAX_HOTBAR_SLOTS}]`);
		this.switchItem(this.hotbar[slot]);
	}
}
