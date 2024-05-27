export interface ManaServerToClientEvents {
	manaObtained(): void;
	manaEmptied(): void;
	manaFilled(): void;
	manaDisabled(): void;
}

export interface ManaClientToServerEvents {
	charge(bool: boolean): void;
}
