import { Networking } from "@flamework/networking";
import { CharacterClientEvents } from "./character";
import { CurrencyClientEvents, CurrencyServerFunctions } from "./currency";
import { ManaClientEvents, ManaServerEvents } from "./mana";
import { ReflexClientEvents, ReflexServerEvents } from "./reflex";

interface ServerEvents {
	reset(): void;
	mana: ManaServerEvents;
	reflex: ReflexServerEvents;
}

interface ClientEvents {
	kicked(): void;
	openDialogue(text: string): void;
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
