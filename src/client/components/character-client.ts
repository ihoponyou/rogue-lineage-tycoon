import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { AbstractCharacter } from "shared/components/abstract-character";

@Component({
	tag: AbstractCharacter.TAG,
})
export class CharacterClient
	extends BaseComponent<{}, Model>
	implements OnStart
{
	onStart(): void {
		promiseR6(this.instance).then((character) => {
			character.Humanoid.SetStateEnabled(
				Enum.HumanoidStateType.Dead,
				false,
			);
		});
	}
}
