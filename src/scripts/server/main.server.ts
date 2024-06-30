import { Flamework, Modding } from "@flamework/core";
import { Cmdr, CommandDefinition } from "@rbxts/cmdr";
import Log, { Logger } from "@rbxts/log";
import { RunService, ServerStorage } from "@rbxts/services";
import { GROUP_ID, MINIMUM_ADMIN_RANK } from "server/configs/group";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Cmdr.RegisterHook("BeforeRun", (context) => {
	if (RunService.IsStudio()) return;
	if (context.Executor.GetRankInGroup(GROUP_ID) < MINIMUM_ADMIN_RANK) {
		return "lacking permissions";
	}
});
Cmdr.RegisterDefaultCommands();
Cmdr.RegisterCommandsIn(ServerStorage.Source.commands);

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/server/components");

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.ignite();
