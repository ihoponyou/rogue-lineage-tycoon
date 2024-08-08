import { Players } from "@rbxts/services";

export const LOCAL_PLAYER = Players.LocalPlayer;
export const LOCAL_PLAYER_GUI = LOCAL_PLAYER.WaitForChild(
	"PlayerGui",
) as PlayerGui;

export const MAX_HOTBAR_SLOTS = 12;
