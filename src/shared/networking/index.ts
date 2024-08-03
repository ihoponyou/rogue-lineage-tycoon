import { Networking } from "@flamework/networking";
import { CharacterClientEvents } from "./character";
import { CombatClientEvents, CombatServerEvents } from "./combat";
import { CurrencyClientEvents, CurrencyServerFunctions } from "./currency";
import { DialogueClientEvents } from "./dialogue";
import { ManaClientEvents, ManaServerEvents } from "./mana";
import { ReflexClientEvents, ReflexServerEvents } from "./reflex";

interface ServerEvents {
	reset(): void;
	mana: ManaServerEvents;
	combat: CombatServerEvents;
	reflex: ReflexServerEvents;
}

interface ClientEvents {
	kicked(): void;
	greeted(player: Player): void;
	playEffect(name: string, ...args: unknown[]): void;
	mana: ManaClientEvents;
	character: CharacterClientEvents;
	currency: CurrencyClientEvents;
	reflex: ReflexClientEvents;
	dialogue: DialogueClientEvents;
	combat: CombatClientEvents;
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
