import { Flamework, Modding } from "@flamework/core";
import { Centurion } from "@rbxts/centurion";
import { CenturionUI } from "@rbxts/centurion-ui";
import Log, { Logger } from "@rbxts/log";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

// Cmdr.SetActivationKeys([Enum.KeyCode.RightBracket]);
// Cmdr.Registry.RegisterHook("BeforeRun", beforeRun);
Centurion.client()
	.start()
	.then(() => CenturionUI.start(Centurion.client(), {}))
	.catch((err) => warn(`Centurion failed to start: ${err}`));

Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.ignite();
