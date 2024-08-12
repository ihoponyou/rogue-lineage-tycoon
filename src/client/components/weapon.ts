import { Component, Components } from "@flamework/components";
import { LOCAL_PLAYER } from "client/constants";
import { Events } from "client/network";
import { AbstractWeapon } from "shared/components/abstract-weapon";
import { Item } from "./item";
import { PlayerClient } from "./player-client";

@Component({
	tag: Weapon.TAG,
})
export class Weapon extends AbstractWeapon {
	private player!: PlayerClient;

	public constructor(
		protected item: Item,
		private components: Components,
	) {
		super();
		this.player = this.components
			.waitForComponent<PlayerClient>(LOCAL_PLAYER)
			.expect();
	}

	public use(): void {
		const character = this.player.getCharacter();
		if (!character.canLightAttack()) return;
		Events.combat.lightAttack();
	}
}
