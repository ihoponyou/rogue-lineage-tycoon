import { LOCAL_PLAYER } from "client/constants";
import { selectPlayerData } from "shared/store/selectors/players";

export function selectLocalPlayerData() {
	return selectPlayerData(LOCAL_PLAYER.UserId);
}
