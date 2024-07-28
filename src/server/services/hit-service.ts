import { Components } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { CharacterServer } from "server/components/character/character-server";
import { Events } from "server/networking";

@Service()
export class HitService implements OnStart {
	public constructor(private components: Components) {}

	public onStart(): void {
		Events.combat.damage.connect((player, characters) =>
			this.handleDamage(player, characters),
		);
	}

	private handleDamage(player: Player, characters: Model[]): void {
		if (player.Character === undefined) return;
		const hitter = this.components.getComponent<CharacterServer>(
			player.Character,
		);
		if (hitter === undefined) return;
		characters.forEach((victimInstance) => {
			const victim =
				this.components.getComponent<CharacterServer>(victimInstance);
			if (victim === undefined) return;
			if (!this.canHit(hitter, victim)) return;
			victim.takeDamage(10);
		});
	}

	private canHit(hitter: CharacterServer, victim: CharacterServer): boolean {
		return true;
	}
}
