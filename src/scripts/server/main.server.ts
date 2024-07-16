import { Flamework, Modding } from "@flamework/core";
import { Cmdr } from "@rbxts/cmdr";
import Log, { Logger } from "@rbxts/log";
import { ServerStorage } from "@rbxts/services";
import { beforeRun } from "shared/cmdr/hooks/before-run";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Cmdr.RegisterTypesIn(ServerStorage.src.cmdr.types);
Cmdr.RegisterHook("BeforeRun", beforeRun);
Cmdr.RegisterDefaultCommands();
Cmdr.RegisterCommandsIn(ServerStorage.src.cmdr.commands);

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/server/components");

Modding.registerDependency<Logger>((ctor) => Log.ForContext(ctor));

Flamework.ignite();
