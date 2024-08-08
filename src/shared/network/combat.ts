export interface CombatServerEvents {
	lightAttack(): void;
	damage(characters: Model[]): void;
	block(blockUp: boolean): void;
}

export interface CombatClientEvents {
	unblock(): void;
	blockHit(): void;
}
