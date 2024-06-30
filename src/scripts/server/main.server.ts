import { Flamework, Modding } from "@flamework/core";
import { Cmdr } from "@rbxts/cmdr";
import Log, { Logger } from "@rbxts/log";
import { GROUP_ID, MINIMUM_ADMIN_RANK } from "server/configs/group";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Cmdr.RegisterHook("BeforeRun", (context) => {
	if (
		context.Group !== "DefaultAdmin" ||
		context.Executor.GetRankInGroup(GROUP_ID) < MINIMUM_ADMIN_RANK
	) {
		return "not owner; not permission";
	}
});
Cmdr.RegisterDefaultCommands();

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/server/components");

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.ignite();
