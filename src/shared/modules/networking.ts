import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	reset(): void;
}

interface ServerToClientEvents {}

export const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();
