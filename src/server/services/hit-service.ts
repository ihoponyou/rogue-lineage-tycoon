import { Components } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { CharacterServer } from "server/components/character/character-server";
import { Events } from "server/networking";

@Service()
export class HitService implements OnStart {
	public constructor(private components: Components) {}

	public onStart(): void {
		Events.combat.damage.connect((player, characters) =>
			characters.forEach((character) =>
				this.registerHit(player, character),
			),
		);
	}

	private registerHit(player: Player, character: Model): void {
		if (player.Character === undefined) return;
		const hitter = this.components.getComponent<CharacterServer>(
			player.Character,
		);
		if (hitter === undefined) return;
		const victim = this.components.getComponent<CharacterServer>(character);
		if (victim === undefined) return;
		if (!this.canHit(hitter, victim)) return;

		victim.takeDamage(10);
	}

	private canHit(hitter: CharacterServer, victim: CharacterServer): boolean {
		return (
			hitter.attributes.isAlive &&
			!hitter.attributes.isKnocked &&
			victim.attributes.isAlive &&
			!victim.attributes.isKnocked
		);
	}
}
