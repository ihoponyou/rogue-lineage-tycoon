import { Components } from "@flamework/components";
import { Service } from "@flamework/core";
import { Debris } from "@rbxts/services";
import { Character } from "server/components/character";
import { Events } from "server/network";
import { WeaponConfig } from "shared/configs/weapons";
import { AttackData } from "../../../types/AttackData";

@Service()
export class HitService {
	public constructor(private components: Components) {}

	public registerHit(
		hitter: Character,
		victimInstance: Model,
		weaponConfig: WeaponConfig,
		attackData: AttackData,
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
			if (attackData.breaksBlock) {
				print("broke block");
				Events.combat.unblock(victim.getPlayer());
			} else {
				Events.combat.blockHit(victim.getPlayer());
				Events.playEffect.broadcast(
					`BlockHit`,
					victimInstance,
					weaponConfig.type,
				);
				return;
			}
		}

		Events.playEffect.broadcast(`Hit`, victimInstance, weaponConfig.type);
		victim.takeDamage(weaponConfig.damage);

		victim.playAnimation(`Stunned${math.random(1, 3)}`);

		if (attackData.ragdollDuration > 0) {
			victim.toggleRagdoll(true);
			task.delay(attackData.ragdollDuration, () => {
				victim.toggleRagdoll(false);
			});
		}
		this.doKnockback(
			hitter,
			victim,
			attackData.knockbackForce,
			attackData.knockbackDuration,
		);
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

	private doKnockback(
		hitter: Character,
		victim: Character,
		force: number,
		duration: number,
	): void {
		const victimRootPart = victim.getHumanoidRootPart();
		const knockbackVelocity = new Instance("BodyVelocity");
		knockbackVelocity.MaxForce = new Vector3(
			1e6,
			force > 15 ? 0 : 1e6,
			1e6,
		);
		knockbackVelocity.Velocity = victimRootPart.Position.sub(
			hitter.getHumanoidRootPart().Position,
		)
			.Unit.mul(force)
			.mul(new Vector3(1, 0, 1));
		knockbackVelocity.Parent = victimRootPart;
		Debris.AddItem(knockbackVelocity, duration);
	}
}
