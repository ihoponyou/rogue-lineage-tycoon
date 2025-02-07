export interface CombatServerEvents {
	lightAttack(): void;
	heavyAttack(): void;
	damage(characters: Model[]): void;
	block(blockUp: boolean): void;
	carryInput(): void;
}

export interface CombatClientEvents {
	unblock(): void;
	blockHit(): void;
}
