import { Flamework, Modding } from "@flamework/core";
import { Cmdr } from "@rbxts/cmdr";
import Log, { Logger } from "@rbxts/log";
import { RunService, ServerStorage } from "@rbxts/services";
import { GROUP_ID, MINIMUM_ADMIN_RANK } from "server/configs/group";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Cmdr.RegisterTypesIn(ServerStorage.Source.cmdr.types);
Cmdr.RegisterHook("BeforeRun", (context) => {
	if (RunService.IsStudio()) return;
	if (context.Executor.GetRankInGroup(GROUP_ID) < MINIMUM_ADMIN_RANK) {
		return "lacking permissions";
	}
});
Cmdr.RegisterDefaultCommands();
Cmdr.RegisterCommandsIn(ServerStorage.Source.cmdr.commands);

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/server/components");

Modding.registerDependency<Logger>((ctor) => Log.ForContext(ctor));

Flamework.ignite();
