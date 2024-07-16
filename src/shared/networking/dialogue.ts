export interface DialogueClientEvents {
	open(name: string, text: string, options: Array<ImageLabel>): void;
	close(): void;
}
