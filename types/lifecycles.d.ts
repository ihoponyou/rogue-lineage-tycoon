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
