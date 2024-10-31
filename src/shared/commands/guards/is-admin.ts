import { CommandGuard } from "@rbxts/centurion";
import { RunService } from "@rbxts/services";
import { GROUP_ID, MINIMUM_ADMIN_RANK } from "shared/configs/group";

const isAdmin: CommandGuard = (ctx) => {
	if (RunService.IsStudio()) {
		return true;
	}
	if (ctx.executor.GetRankInGroup(GROUP_ID) < MINIMUM_ADMIN_RANK) {
		ctx.error("Insufficient permission!");
		return false;
	}
	return true;
};

export = isAdmin;
