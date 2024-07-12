import { Networking } from "@flamework/networking";
import { ManaServerEvents, ManaClientEvents } from "./mana";
import { CurrencyServerFunctions, CurrencyClientEvents } from "./currency";
import { CharacterClientEvents } from "./character";
import { ReflexClientEvents, ReflexServerEvents } from "./reflex";

interface ServerEvents {
	reset(): void;
	mana: ManaServerEvents;
	reflex: ReflexServerEvents;
}

interface ClientEvents {
	kicked(): void;
	mana: ManaClientEvents;
	character: CharacterClientEvents;
	currency: CurrencyClientEvents;
	reflex: ReflexClientEvents;
}

interface ServerFunctions {
	currency: CurrencyServerFunctions;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<
	ServerEvents,
	ClientEvents
>();

export const GlobalFunctions = Networking.createFunction<
	ServerFunctions,
	ClientFunctions
>();
