import { Components } from "@flamework/components";
import { Controller } from "@flamework/core";
import { LocalCharacter } from "client/components/local-character";
import { LOCAL_PLAYER } from "client/configs/constants";
import { OnLocalCharacterAdded } from "shared/modules/lifecycles";

@Controller()
export class CharacterController implements OnLocalCharacterAdded {
	private character?: LocalCharacter;

	constructor(private components: Components) {}

	onLocalCharacterAdded(model: Model): void {
		this.components
			.waitForComponent<LocalCharacter>(model)
			.andThen((characterClient) => {
				this.character = characterClient;
			});
		LOCAL_PLAYER.CharacterAdded.Connect((newCharacter) => {
			this.components
				.waitForComponent<LocalCharacter>(newCharacter)
				.andThen((characterClient) => {
					this.character = characterClient;
				});
		});
	}

	getCharacter(): LocalCharacter | undefined {
		return this.character;
	}
}
