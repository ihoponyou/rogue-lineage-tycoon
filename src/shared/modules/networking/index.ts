import { Networking } from "@flamework/networking";
import { ResetEvents } from "./reset-events";
import {
	ManaClientToServerEvents,
	ManaServerToClientEvents,
} from "./mana-events";

interface ClientToServerEvents {
	resetEvents: ResetEvents;
	manaEvents: ManaClientToServerEvents;
}

interface ServerToClientEvents {
	manaEvents: ManaServerToClientEvents;
}

export const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();
