import { ReplicatedStorage, StarterGui } from "@rbxts/services";
import { Events } from "client/modules/networking";

const resetBindable = new Instance("BindableEvent");
resetBindable.Event.Connect(() => {
	Events.resetEvents.reset();
});

let success = false;
while (!success) {
	const [succeeded, message] = pcall(
		(parameter: keyof SettableCores, args) => {
			StarterGui.SetCore(parameter, args);
		},
		"ResetButtonCallback",
		resetBindable,
	);
	success = succeeded;
	task.wait();
}
