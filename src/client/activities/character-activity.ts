import { AbstractCharacter } from "shared/components/abstract-character";
import { Activity } from "shared/modules/abstract-activity";

export class CharacterActivity extends Activity {
	public constructor(protected character: AbstractCharacter) {
		super();
	}
}
