import { CharacterServer } from "server/components/character-server";

export interface IOwnable {
	getOwner(): CharacterServer | undefined;
	setOwner(character?: CharacterServer): void;
	hasOwner(): boolean;
	isOwnedBy(character: CharacterServer): boolean;
}
