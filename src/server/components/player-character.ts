import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/network";
import { store } from "server/store";
import {
	selectPlayerInventory,
	selectPlayerSkills,
} from "server/store/selectors";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/configs/skills";
import { CharacterServer } from "./character-server";
import { PlayerServer } from "./player-server";

@Component({
	tag: CharacterServer.TAG,
	predicate: (instance) => {
		return Players.GetPlayerFromCharacter(instance) !== undefined;
	},
})
export class PlayerCharacter
	extends BaseComponent<{}, Model>
	implements OnStart
{
	private player!: PlayerServer;
	private unsubscribeFromInventory!: Callback;
	private unsubscribeFromSkills!: Callback;

	constructor(
		private components: Components,
		private character: CharacterServer,
	) {
		super();
	}

	onStart(): void {
		this.player = this.components
			.waitForComponent<PlayerServer>(
				Players.GetPlayerFromCharacter(this.instance)!,
			)
			.expect();

		const currentInventory = store.getState(
			selectPlayerInventory(this.player.instance),
		);
		this.updateInventoryFromState(currentInventory, false);
		this.unsubscribeFromInventory = store.subscribe(
			selectPlayerInventory(this.player.instance),
			(state, _prevState) => this.updateInventoryFromState(state),
		);

		const currentSkills = store.getState(
			selectPlayerSkills(this.player.instance),
		);
		this.updateSkillsFromState(currentSkills, undefined, false);
		this.unsubscribeFromSkills = store.subscribe(
			selectPlayerSkills(this.player.instance),
			(state, prevState) => this.updateSkillsFromState(state, prevState),
		);

		// TODO: this fires twice?
		Events.item.addToHotbar.connect((player, id, slot) => {
			store.addToHotbar(player, id, slot);
		});
		Events.item.removeFromHotbar.connect((player, id) => {
			store.removeFromHotbar(player, id);
		});
	}

	override destroy(): void {
		this.unsubscribeFromInventory();
		this.unsubscribeFromSkills();

		super.destroy();
	}

	private updateInventoryFromState(
		items?: ReadonlyMap<ItemId, number>,
		autoHotbar = false,
	) {
		if (items === undefined) return;
		for (const [itemId, quantity] of items) {
			const existingItem = this.character.getItem(itemId);
			if (existingItem) {
				if (existingItem.attributes.quantity !== quantity) {
					existingItem.attributes.quantity = quantity;
				}
				continue;
			}

			this.character.giveItem(itemId, quantity);
			if (autoHotbar) {
				store.addToHotbar(this.player.instance, itemId);
			}
		}
	}

	private updateSkillsFromState(
		skills?: ReadonlySet<SkillId>,
		prevSkills?: ReadonlySet<SkillId>,
		autoHotbar = false,
	) {
		if (skills === undefined) return;
		for (const skillId of skills) {
			if (prevSkills && prevSkills.has(skillId)) continue;
			this.character.learnSkill(skillId);
			if (autoHotbar) {
				store.addToHotbar(this.player.instance, skillId);
			}
		}
	}
}
