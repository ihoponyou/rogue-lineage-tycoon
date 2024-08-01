import { Components } from "@flamework/components";
import { Dependency, OnStart, Service } from "@flamework/core";
import { Character } from "server/components/character/character";
import { Events } from "server/networking";

@Service()
export class ResetService implements OnStart {
	private components = Dependency<Components>();

	public onStart(): void {
		Events.reset.connect((player) => {
			if (!player.Character) return;

			const character = this.components.getComponent<Character>(
				player.Character,
			);
			if (!character) return;
			if (!character.attributes.isAlive) return;

			character.snipe();
			character.kill();
		});
	}
}
