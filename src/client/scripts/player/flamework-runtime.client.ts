import { Flamework, Modding } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Flamework.addPaths("src/shared/modules/components");
Flamework.addPaths("src/client/modules/components");

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.ignite();
