import { Components } from "@flamework/components";
import { Service } from "@flamework/core";
import { Character } from "server/components/character";
import { Events } from "server/network";
import { WeaponConfig } from "shared/configs/weapons";

@Service()
export class HitService {
	public constructor(private components: Components) {}

	public registerHit(
		hitter: Character,
		victimInstance: Model,
		weaponConfig: WeaponConfig,
	): void {
		if (hitter === undefined) return;
		const victim = this.components.getComponent<Character>(victimInstance);
		if (victim === undefined) return;
		if (!this.canHit(hitter, victim)) return;

		const blockable360 = false;
		const blocked =
			victim.attributes.isBlocking &&
			!blockable360 &&
			!hitter.isBehind(victim);
		if (blocked) {
			Events.combat.blockHit(victim.getPlayer());
			Events.playEffect.broadcast(
				`BlockHit`,
				victimInstance,
				weaponConfig.type,
			);
			return;
		}

		Events.playEffect.broadcast(`Hit`, victimInstance, weaponConfig.type);
		victim.takeDamage(weaponConfig.damage);
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
