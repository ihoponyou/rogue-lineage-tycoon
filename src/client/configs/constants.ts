import { Players } from "@rbxts/services";

export const LOCAL_PLAYER = Players.LocalPlayer;
export const LOCAL_PLAYER_GUI = LOCAL_PLAYER.WaitForChild(
	"PlayerGui",
) as PlayerGui;

// TODO: change with custom binds
export const SLOT_LABELS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"0",
	"-",
	"=",
];
