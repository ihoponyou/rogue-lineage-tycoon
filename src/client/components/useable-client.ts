import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ContextActionService } from "@rbxts/services";
import { Events } from "client/network";
import { AbstractUseable } from "shared/components/abstract-useable";
import { Equippable } from "./equippable";

@Component({
	tag: UseableClient.TAG,
})
export class UseableClient extends AbstractUseable implements OnStart {
	private readonly USE_ACTION_NAME = `Useable_use_${this.instance.Name}`;

	public constructor(protected equippable: Equippable) {
		super();
	}

	public onStart(): void {
		print("started useable");
		this.equippable.onAttributeChanged("isEquipped", (isEquipped) => {
			print("equipped", this.USE_ACTION_NAME, isEquipped);
			if (isEquipped) {
				ContextActionService.BindAction(
					this.USE_ACTION_NAME,
					(_actionName, state, _inputObject) =>
						this.handleInput(state),
					true,
					Enum.UserInputType.MouseButton1,
				);
			} else {
				ContextActionService.UnbindAction(this.USE_ACTION_NAME);
			}
		});
	}

	public override use(): void {
		print("asking");
		Events.item.use(this.instance);
	}

	private handleInput(
		inputState: Enum.UserInputState,
	): Enum.ContextActionResult {
		print("click");
		if (inputState !== Enum.UserInputState.Begin)
			return Enum.ContextActionResult.Pass;

		this.use();

		return Enum.ContextActionResult.Sink;
	}
}
