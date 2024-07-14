import { Flamework, Modding } from "@flamework/core";
import { CmdrClient as Cmdr } from "@rbxts/cmdr";
import Log, { Logger } from "@rbxts/log";
import { beforeRun } from "shared/cmdr/hooks/before-run";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Cmdr.SetActivationKeys([Enum.KeyCode.RightBracket]);
Cmdr.Registry.RegisterHook("BeforeRun", beforeRun);

Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.ignite();
