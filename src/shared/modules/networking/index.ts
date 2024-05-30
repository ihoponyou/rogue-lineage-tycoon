import { Networking } from "@flamework/networking";
import { ResetEvents } from "./reset-events";
import {
	ManaClientToServerEvents,
	ManaServerToClientEvents,
} from "./mana-events";
import {
	CharacterClientToServerEvents,
	CharacterServerToClientEvents,
} from "./character-events";

interface ServerToClientEvents {
	manaEvents: ManaServerToClientEvents;
	characterEvents: CharacterServerToClientEvents;
}

interface ClientToServerEvents {
	resetEvents: ResetEvents;
	manaEvents: ManaClientToServerEvents;
	characterEvents: CharacterClientToServerEvents;
}

export const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();
