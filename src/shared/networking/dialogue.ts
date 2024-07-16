export interface DialogueClientEvents {
	open(text: string, options: Array<ImageLabel>): void;
	close(): void;
}
