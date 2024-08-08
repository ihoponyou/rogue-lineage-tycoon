export interface CharacterClientEvents {
	killed(): void;
	firstNameChanged(name: string): void;
	stopRun(): void;
}
