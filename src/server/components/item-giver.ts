import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { store } from "server/store";
import { Toggleable } from "shared/components/toggleable";
import { isItemId, ItemId } from "shared/configs/items";
import { Clickable } from "./interactable/clickable";

interface Attributes {
	itemId: ItemId;
}

@Component({
	tag: "ItemGiver",
	defaults: {
		itemId: "Goblet",
	},
})
export class ItemGiver
	extends BaseComponent<Attributes, Instance>
	implements OnStart
{
	constructor(
		private clickable: Clickable,
		private toggleable: Toggleable,
	) {
		super();
	}

	onStart(): void {
		this.toggleable.toggle(false);

		if (!isItemId(this.attributes.itemId)) {
			warn(`${this.attributes.itemId} is not a valid ItemId`);
			return;
		}

		this.clickable.onInteracted((player) => {
			store.addItem(player, this.attributes.itemId as ItemId);
		});
	}
}
