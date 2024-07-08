import { Players } from "@rbxts/services";
import { selectPlayerData } from "shared/store/selectors/players";

export function selectLocalPlayerData() {
	return selectPlayerData(Players.LocalPlayer.UserId);
}
