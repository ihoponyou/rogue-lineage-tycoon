import { Networking } from "@flamework/networking";
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
	mana: ManaServerToClientEvents;
	character: CharacterServerToClientEvents;
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
	ServerToClientEvents
>();
