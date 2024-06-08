import { Networking } from "@flamework/networking";
import {
	ManaClientToServerEvents,
	ManaServerToClientEvents,
} from "./mana-events";
import {
	CharacterClientToServerEvents,
	CharacterServerToClientEvents,
} from "./character-events";
import { SilverServerToClientEvents } from "./silver-events";

interface ServerToClientEvents {
	kicked(): void;
	mana: ManaServerToClientEvents;
	character: CharacterServerToClientEvents;
	silver: SilverServerToClientEvents;
}

interface ClientToServerEvents {
	reset(): void;
	mana: ManaClientToServerEvents;
	character: CharacterClientToServerEvents;
}

interface ServerToClientFunctions {}

interface ClientToServerFunctions {}

export const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();

export const GlobalFunctions = Networking.createFunction<
	ClientToServerFunctions,
	ServerToClientFunctions
>();