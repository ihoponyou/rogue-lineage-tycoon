import { BaseComponent, Component } from "@flamework/components";
import { IOwnable } from "server/modules/ownable";
import { CharacterServer } from "./character-server";

@Component({
	tag: Ownable.TAG,
})
export class Ownable extends BaseComponent implements IOwnable {
	static readonly TAG = "Ownable";

	private owner?: CharacterServer;

	getOwner(): CharacterServer | undefined {
		return this.owner;
	}

	setOwner(owner?: CharacterServer) {
		this.owner = owner;
	}

	hasOwner(): boolean {
		return this.owner !== undefined;
	}

	isOwnedBy(character: CharacterServer): boolean {
		return this.owner === character;
	}
}
