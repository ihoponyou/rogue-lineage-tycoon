import { Components } from "@flamework/components";
import { Dependency, OnStart, Service } from "@flamework/core";
import { CharacterServer } from "server/components/character-server";
import { Events } from "server/networking";

@Service()
export class ResetService implements OnStart {
	private components = Dependency<Components>();

	onStart(): void {
		Events.reset.connect((player) => {
			if (!player.Character) return;

			const character = this.components.getComponent<CharacterServer>(
				player.Character,
			);
			if (!character) return;
			if (!character.attributes.isAlive) return;

			character.snipe();
			character.kill();
		});
	}
}
