// server
export interface OnPlayerAdded {
	onPlayerAdded(player: Player): void;
}

export interface OnPlayerRemoving {
	onPlayerRemoving(player: Player): void;
}

export interface OnCharacterAdded {
	onCharacterAdded(character: StarterCharacter): void;
}

export interface OnCharacterRemoving {
	onCharacterRemoving(character: StarterCharacter): void;
}

// client
export interface OnLocalCharacterAdded {
	onLocalCharacterAdded(character: Model): void;
}

export interface OnLocalCharacterRemoving {
	onLocalCharacterRemoving(character: Model): void;
}

// shared
export interface OnRemoved {
	onRemoved(): void;
}