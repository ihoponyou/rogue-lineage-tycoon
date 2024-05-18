import { ReplicatedStorage, StarterGui } from "@rbxts/services";

const resetBindable = new Instance("BindableEvent");
const resetRequest = ReplicatedStorage.WaitForChild("ResetRequest") as RemoteEvent;
resetBindable.Event.Connect(() => resetRequest.FireServer());

function setCore() {
	return new Promise(() => pcall(() => StarterGui.SetCore("ResetButtonCallback", resetBindable)));
}

Promise.retry(setCore, 10);
