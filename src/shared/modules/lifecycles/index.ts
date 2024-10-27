// server
export interface OnPlayerAdded {
	onPlayerAdded(player: Player): void;
}

export interface OnPlayerRemoving {
	onPlayerRemoving(player: Player): void;
}

export interface OnCharacterAdded {
	onCharacterAdded(character: Model): void;
}

export interface OnCharacterRemoving {
	onCharacterRemoving(character: Model): void;
}

// client
export interface OnLocalCharacterAdded {
	onLocalCharacterAdded(character: Model): void;
}

export interface OnLocalCharacterRemoving {
	onLocalCharacterRemoving(character: Model): void;
}
