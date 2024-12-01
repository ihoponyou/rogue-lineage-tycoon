export interface CharacterClientEvents {
	killed(): void;
	firstNameChanged(name: string): void;
	stopRun(): void;
}

export interface CharacterServerEvents {
	startRun(): void;
	stopRun(): void;
}
