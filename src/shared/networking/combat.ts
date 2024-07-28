export interface CombatServerEvents {
	lightAttack(): void;
	damage(characters: Model[]): void;
}
