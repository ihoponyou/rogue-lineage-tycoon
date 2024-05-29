import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/modules/networking";
import { MovementController } from "./movement-controller";

@Controller()
export class ManaController implements OnStart {
	private events = Events.manaEvents;
	
	hasMana = false;

	constructor(private movementController: MovementController) {}

	onStart(): void {
		this.events.manaObtained.connect(() => print("obtained"));
		this.events.manaDisabled.connect(() => print("disabled"));
		this.events.manaFilled.connect(() => print("filled"));
		this.events.manaEmptied.connect(() => this.onManaEmptied());
	}

	onChargeManaInput(state: Enum.UserInputState): void {
		this.events.charge(state === Enum.UserInputState.Begin);
		this.movementController.stopRun();
	}

	onManaEmptied(): void {
		print("emptied")
	}
}
