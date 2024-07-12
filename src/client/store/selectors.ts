import { LOCAL_PLAYER } from "client/constants";
import { selectPlayerData } from "shared/store/slices/players/selectors";

export function selectLocalPlayerData() {
	return selectPlayerData(LOCAL_PLAYER.UserId);
}
