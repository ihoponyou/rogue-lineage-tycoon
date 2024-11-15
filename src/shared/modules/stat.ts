export class Stat {
	private calculatedValue: number;
	private shouldRecalculate = false;

	private multipliers = new Map<string, number>();
	private addends = new Map<string, number>();

	constructor(private readonly baseValue: number) {
		this.calculatedValue = this.baseValue;
	}

	getBaseValue(): number {
		return this.baseValue;
	}

	getCalculatedValue(): number {
		if (!this.shouldRecalculate) {
			return this.calculatedValue;
		}
		this.calculatedValue = this.recalculateValue();
		return this.calculatedValue;
	}

	addMultiplier(
		source: string,
		value: number,
		overwrite: boolean = false,
	): void {
		this.addBonus(this.multipliers, source, value, overwrite);
	}

	removeMultiplier(source: string): void {
		this.removeBonus(this.multipliers, source);
	}

	addAddend(source: string, value: number, overwrite: boolean = false): void {
		this.addBonus(this.addends, source, value, overwrite);
	}

	removeAddend(source: string): void {
		this.removeBonus(this.addends, source);
	}

	private addBonus(
		bonusMap: Map<string, number>,
		source: string,
		value: number,
		overwrite: boolean = false,
	) {
		let newValue = value;
		if (!overwrite) {
			newValue += bonusMap.get(source) ?? 0;
		}
		bonusMap.set(source, newValue);
		this.shouldRecalculate = true;
	}

	private removeBonus(bonusMap: Map<string, number>, source: string) {
		bonusMap.delete(source);
		this.shouldRecalculate = true;
	}

	private recalculateValue(): number {
		let result = this.baseValue;
		for (const [_source, multiplier] of this.multipliers) {
			result *= multiplier;
		}
		for (const [_source, addend] of this.addends) {
			result += addend;
		}
		this.shouldRecalculate = false;
		return result;
	}
}
