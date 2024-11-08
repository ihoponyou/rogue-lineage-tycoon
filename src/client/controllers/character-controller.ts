import { Components } from "@flamework/components";
import { Controller } from "@flamework/core";
import { CharacterClient } from "client/components/character-client";
import { LOCAL_PLAYER } from "client/configs/constants";
import { OnLocalCharacterAdded } from "shared/modules/lifecycles";

@Controller()
export class CharacterController implements OnLocalCharacterAdded {
	private character?: CharacterClient;

	constructor(private components: Components) {}

	onLocalCharacterAdded(model: Model): void {
		this.components
			.waitForComponent<CharacterClient>(model)
			.andThen((characterClient) => {
				this.character = characterClient;
			});
		LOCAL_PLAYER.CharacterAdded.Connect((newCharacter) => {
			this.components
				.waitForComponent<CharacterClient>(newCharacter)
				.andThen((characterClient) => {
					this.character = characterClient;
				});
		});
	}

	getCharacter(): CharacterClient | undefined {
		return this.character;
	}
}
