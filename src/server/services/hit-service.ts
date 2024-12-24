import { Components } from "@flamework/components";
import { Service } from "@flamework/core";
import { Debris } from "@rbxts/services";
import { CharacterServer } from "server/components/character-server";
import { PlayerCharacter } from "server/components/player-character";
import { Events } from "server/network";
import { WeaponConfig } from "shared/configs/weapons";
import { AttackData } from "../modules/attack-data";

const BLOCK_BREAK_STUN_DURATION = 1.5;

@Service()
export class HitService {
	public constructor(private components: Components) {}

	registerHit(
		hitter: CharacterServer,
		victimInstance: Model,
		weaponConfig: WeaponConfig,
		attackData: AttackData,
	): void {
		if (hitter === undefined) return;
		const victim =
			this.components.getComponent<CharacterServer>(victimInstance);
		if (victim === undefined) return;
		if (!this.canHit(hitter, victim)) return;

		const blockable360 = false;
		const blocked = blockable360
			? victim.attributes.isBlocking
			: victim.attributes.isBlocking && !hitter.isBehind(victim);
		const blockBroken = blocked && attackData.breaksBlock;

		const victimPlayerCharacter =
			this.components.getComponent<PlayerCharacter>(victim.instance);
		const victimPlayer = victimPlayerCharacter?.getPlayer().instance;
		if (blocked) {
			if (blockBroken) {
				// print("broke block");
				victim.stun(BLOCK_BREAK_STUN_DURATION);
				if (victimPlayer !== undefined) {
					Events.combat.unblock(victimPlayer);
				}
			} else {
				if (victimPlayer !== undefined) {
					Events.combat.blockHit(victimPlayer);
				}
				Events.playEffect.broadcast(
					`BlockHit`,
					victimInstance,
					weaponConfig.type,
				);
				this.doKnockback(
					hitter,
					victim,
					attackData.knockbackForce / 2,
					attackData.knockbackDuration / 2,
				);
				return;
			}
		}

		Events.playEffect.broadcast(`Hit`, victimInstance, weaponConfig.type);
		victim.takeDamage(weaponConfig.damage);
		victim.stun(weaponConfig.damage / 15);
		victim.playAnimation(`Stunned${math.random(1, 3)}`);

		if (blockBroken) {
			Events.playEffect.broadcast(`BlockBreak`, victimInstance);
			return;
		}

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

	private canHit(hitter: CharacterServer, victim: CharacterServer): boolean {
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
		hitter: CharacterServer,
		victim: CharacterServer,
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
