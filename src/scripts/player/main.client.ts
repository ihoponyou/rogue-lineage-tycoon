import { Flamework, Modding } from "@flamework/core";
import { CmdrClient as Cmdr } from "@rbxts/cmdr";
import Log, { Logger } from "@rbxts/log";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Cmdr.SetActivationKeys([Enum.KeyCode.RightBracket]);

Flamework.addPaths("src/shared//components");
Flamework.addPaths("src/client//components");
Flamework.addPaths("src/client//controllers");

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.ignite();
