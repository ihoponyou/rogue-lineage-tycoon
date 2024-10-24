import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ContextActionService } from "@rbxts/services";
import { Events } from "client/network";
import { AbstractSkill } from "shared/components/abstract-skill";

@Component({
	tag: AbstractSkill.TAG,
})
export class SkillClient extends AbstractSkill implements OnStart {
	onStart(): void {
		this.onEquipChanged((isEquipped) => {
			if (isEquipped) {
				this.onEquipped();
			} else {
				this.onUnequipped();
			}
		});
	}

	override equip(): void {
		Events.item.equip.fire(this.instance);
	}

	override unequip(): void {
		Events.item.unequip.fire(this.instance);
	}

	override use(): void {
		Events.item.use.fire(this.instance);
	}

	private onEquipped(): void {
		ContextActionService.BindAction(
			`use_${this.instance.Name}`,
			(_, inputState) => {
				if (inputState !== Enum.UserInputState.Begin) return;
				if (!this.isEquipped()) {
					// i wasn't equipped or the equip failed
					ContextActionService.UnbindAction(
						`use_${this.instance.Name}`,
					);
					return;
				}
				this.use();
			},
			true,
			Enum.UserInputType.MouseButton1,
		);
	}

	private onUnequipped(): void {
		ContextActionService.UnbindAction(`use_${this.instance.Name}`);
	}
}
