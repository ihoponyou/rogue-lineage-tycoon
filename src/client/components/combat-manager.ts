import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { LOCAL_PLAYER } from "client/constants";
import { InputController } from "client/controllers/input-controller";
import { Events } from "client/networking";
import { SharedComponents } from "shared/components/combat-manager";

@Component({
	tag: SharedComponents.CombatManager.TAG,
	predicate: (instance) => instance === LOCAL_PLAYER,
})
export class CombatManager
	extends SharedComponents.CombatManager
	implements OnStart
{
	public constructor(private inputController: InputController) {
		super();
	}

	public onStart(): void {
		this.inputController.onLightAttackTriggered(() =>
			Events.combat.lightAttack(),
		);
	}
}
