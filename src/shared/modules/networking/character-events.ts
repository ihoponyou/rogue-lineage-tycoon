export interface CharacterServerToClientEvents {
	killed(): void;
	firstNameChanged(name: string): void;
}

export interface CharacterClientToServerEvents {}
