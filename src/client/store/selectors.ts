import { LOCAL_PLAYER } from "client/constants";
import { selectPlayerData } from "shared/store/slices/players/selectors";

export const selectLocalPlayerData = selectPlayerData(LOCAL_PLAYER.UserId);
