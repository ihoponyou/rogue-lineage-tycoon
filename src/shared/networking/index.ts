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
import { Currency } from "../../../types/currency";

interface ServerToClientEvents {
	kicked(): void;
	mana: ManaServerToClientEvents;
	character: CharacterServerToClientEvents;
	currency: { changed(currency: Currency, value: number): void };
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
