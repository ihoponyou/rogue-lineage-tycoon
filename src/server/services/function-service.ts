import { Components } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { PlayerServer } from "server/components/player-server";
import { Weapon } from "server/components/weapon";
import { Functions } from "server/network";

// is this the best way to do things? probably not!

@Service()
export class FunctionService implements OnStart {
	constructor(private components: Components) {}

	onStart(): void {
		Functions.item.getCurrentlyEquippedWeaponInstance.setCallback(
			(player) => {
				const playerServer =
					this.components.getComponent<PlayerServer>(player);
				if (playerServer === undefined)
					error(
						`failed to find PlayerServer on ${player.GetFullName()}`,
					);
				const character = playerServer
					.getPlayerCharacter()
					.getCharacter();
				const equippedWeapon = character.getCurrentEquipped() as
					| Weapon
					| undefined;
				if (equippedWeapon === undefined) {
					return undefined;
				}
				const weapon = this.components.getComponent<Weapon>(
					equippedWeapon.instance,
				);
				return weapon?.instance;
			},
		);
	}
}
