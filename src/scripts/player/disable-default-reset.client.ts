import { StarterGui } from "@rbxts/services";
import { Events } from "client//networking";

const resetBindable = new Instance("BindableEvent");
resetBindable.Event.Connect(() => {
	Events.reset();
});

let success = false;
while (!success) {
	const [succeeded] = pcall(
		(parameter: keyof SettableCores, args) => {
			StarterGui.SetCore(parameter, args);
		},
		"ResetButtonCallback",
		resetBindable,
	);
	success = succeeded;
	task.wait();
}
