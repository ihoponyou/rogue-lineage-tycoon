import { Component } from "@flamework/components";
import { DisposableComponent } from "./disposable-component";

export namespace SharedComponents {
	interface CombatManagerAttributes {
		stunned: boolean;
		combo: number;
		lightAttackCooldown: boolean;
	}

	@Component()
	export abstract class CombatManager extends DisposableComponent<CombatManagerAttributes> {
		public static readonly TAG = "CombatManager";

		protected canAttack(): boolean {
			return !this.attributes.stunned;
		}

		protected canLightAttack(): boolean {
			return this.canAttack() && !this.attributes.lightAttackCooldown;
		}
	}
}
