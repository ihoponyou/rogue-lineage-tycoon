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
	kicked(): void;
	manaEvents: ManaServerToClientEvents;
	characterEvents: CharacterServerToClientEvents;
}

interface ClientToServerEvents {
	resetEvents: ResetEvents;
	manaEvents: ManaClientToServerEvents;
	characterEvents: CharacterClientToServerEvents;
}

interface ServerToClientFunctions {}

interface ClientToServerFunctions {}

export const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();

export const GlobalFunctions = Networking.createFunction<
	ClientToServerFunctions,
	ServerToClientEvents
>();
