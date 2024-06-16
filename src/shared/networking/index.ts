import { Networking } from "@flamework/networking";
import {
	ManaClientToServerEvents,
	ManaServerToClientEvents,
} from "./mana-events";
import {
	CharacterClientToServerEvents,
	CharacterServerToClientEvents,
} from "./character-events";
import {
	CurrencyClientToServerFunctions,
	CurrencyServerToClientEvents,
} from "./currency";

interface ServerToClientEvents {
	kicked(): void;
	mana: ManaServerToClientEvents;
	character: CharacterServerToClientEvents;
	currency: CurrencyServerToClientEvents;
}

interface ClientToServerEvents {
	reset(): void;
	mana: ManaClientToServerEvents;
	character: CharacterClientToServerEvents;
}

interface ServerToClientFunctions {}

interface ClientToServerFunctions {
	currency: CurrencyClientToServerFunctions;
}

export const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();

export const GlobalFunctions = Networking.createFunction<
	ClientToServerFunctions,
	ServerToClientFunctions
>();
