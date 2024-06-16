export interface ManaServerToClientEvents {
	obtained(): void;
	emptied(): void;
	filled(): void;
	disabled(): void;
	changed(value: number): void;
	colorChanged(color: Color3): void;
	charge(bool: boolean): void;
}

export interface ManaClientToServerEvents {
	charge(bool: boolean): void;
}
