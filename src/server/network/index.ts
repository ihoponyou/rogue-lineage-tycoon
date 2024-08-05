import { GlobalEvents, GlobalFunctions } from "shared/network";

export const Events = GlobalEvents.createServer({});
export const Functions = GlobalFunctions.createServer({});

GlobalEvents.registerHandler("onBadRequest", (player) =>
	print(player, "sent a bad request!"),
);
GlobalFunctions.registerHandler("onBadResponse", (player) =>
	print(player, "returned a bad response!"),
);
