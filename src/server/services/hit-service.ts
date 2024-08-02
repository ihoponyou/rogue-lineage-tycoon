import { Components } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { Character } from "server/components/character";
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
		const hitter = this.components.getComponent<Character>(
			player.Character,
		);
		if (hitter === undefined) return;
		const victim = this.components.getComponent<Character>(character);
		if (victim === undefined) return;
		if (!this.canHit(hitter, victim)) return;

		const blockable360 = false;
		const blocked =
			victim.attributes.isBlocking &&
			!blockable360 &&
			!hitter.isBehind(victim);
		if (blocked) {
			Events.combat.blockHit(player);
			Events.playEffect.broadcast(`BlockHit`, character, "Blunt");
			return;
		}

		Events.playEffect.broadcast(`Hit`, character, "Blunt");
		victim.takeDamage(10);
	}

	private canHit(hitter: Character, victim: Character): boolean {
		const bothAlive =
			hitter.attributes.isAlive && victim.attributes.isAlive;
		const neitherKnocked = !(
			hitter.attributes.isKnocked || victim.attributes.isKnocked
		);
		const neitherRagdolled = !(
			hitter.instance.GetAttribute("isRagdolled") === true &&
			victim.instance.GetAttribute("isRagdolled") === true
		);

		return bothAlive && neitherKnocked && neitherRagdolled;
	}
}
