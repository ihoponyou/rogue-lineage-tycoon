import { CommandContext } from "@rbxts/cmdr";
import { RunService } from "@rbxts/services";
import { GROUP_ID, MINIMUM_ADMIN_RANK } from "shared/configs/group";

export function beforeRun(context: CommandContext) {
	if (RunService.IsStudio()) return;
	if (context.Executor.GetRankInGroup(GROUP_ID) < MINIMUM_ADMIN_RANK) {
		return "lacking permissions";
	}
}
