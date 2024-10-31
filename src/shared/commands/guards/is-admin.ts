import { CommandGuard } from "@rbxts/centurion";
import { GROUP_ID, MINIMUM_ADMIN_RANK } from "shared/configs/group";

const isAdmin: CommandGuard = (ctx) => {
	if (ctx.executor.GetRankInGroup(GROUP_ID) < MINIMUM_ADMIN_RANK) {
		ctx.error("Insufficient permission!");
		return false;
	}
	return true;
};

export = isAdmin;
