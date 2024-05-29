export interface ManaServerToClientEvents {
	manaObtained(): void;
	manaEmptied(): void;
	manaFilled(): void;
	manaDisabled(): void;
	manaChanged(value: number): void;
	charge(bool: boolean): void;
}

export interface ManaClientToServerEvents {
	charge(bool: boolean): void;
}
