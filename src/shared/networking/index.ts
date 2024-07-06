import { Networking } from "@flamework/networking";
import { CharacterClientEvents } from "./character";
import { CurrencyClientEvents, CurrencyServerFunctions } from "./currency";
import { ManaClientEvents, ManaServerEvents } from "./mana";
import { ReflexClientEvents, ReflexServerEvents } from "./reflex";

interface ClientEvents {
	kicked(): void;
	mana: ManaClientEvents;
	character: CharacterClientEvents;
	currency: CurrencyClientEvents;
	reflex: ReflexClientEvents;
}

interface ServerEvents {
	reset(): void;
	mana: ManaServerEvents;
	reflex: ReflexServerEvents;
}

interface ClientFunctions {}

interface ServerFunctions {
	currency: CurrencyServerFunctions;
}

export const GlobalEvents = Networking.createEvent<
	ServerEvents,
	ClientEvents
>();

export const GlobalFunctions = Networking.createFunction<
	ServerFunctions,
	ClientFunctions
>();
