import { Controller, OnStart } from "@flamework/core";
import { ContextActionService } from "@rbxts/services";
import { Events } from "client/modules/networking";

@Controller()
export class ManaController implements OnStart {
	private events = Events.manaEvents;

	onStart(): void {
		ContextActionService.BindAction(
			"ChargeMana",
			(_, state) => this.onChargeManaInput(state),
			true,
			Enum.KeyCode.G,
		);

		this.events.manaObtained.connect(() => print("obtained"));
		this.events.manaDisabled.connect(() => print("disabled"));
		this.events.manaFilled.connect(() => print("filled"));
		this.events.manaEmptied.connect(() => print("emptied"));
	}

	onChargeManaInput(state: Enum.UserInputState): void {
		print(state === Enum.UserInputState.Begin);
		this.events.charge(state === Enum.UserInputState.Begin);
	}
}
