import { AbstractCharacter } from "shared/components/abstract-character";

export interface Useable {
	use(user: AbstractCharacter): void;
}
