import Signal from "@rbxts/signal";

export class Stat {
	private calculatedValue: number;
	private shouldRecalculate = false;

	private multipliers = new Map<string, number>();
	private addends = new Map<string, number>();
	private modifiersChanged = new Signal();

	constructor(public readonly baseValue: number) {
		this.calculatedValue = this.baseValue;
	}

	getCalculatedValue(): number {
		if (!this.shouldRecalculate) {
			return this.calculatedValue;
		}
		this.calculatedValue = this.recalculateValue();
		return this.calculatedValue;
	}

	onModifiersChanged(callback: Callback): RBXScriptConnection {
		return this.modifiersChanged.Connect(callback);
	}

	addModifier(
		source: string,
		value: number,
		flat: boolean,
		overwrite: boolean = true,
	) {
		const modifierMap = flat ? this.addends : this.multipliers;
		let newValue = value;
		if (!overwrite) {
			newValue += modifierMap.get(source) ?? 0;
		}
		modifierMap.set(source, newValue);
		this.shouldRecalculate = true;
		this.modifiersChanged.Fire();
	}

	/**
	 * @returns a callback that instantly removes the added modifier
	 */
	addTemporaryModifier(
		duration: number,
		source: string,
		value: number,
		flat: boolean,
		overwrite: boolean = true,
	) {
		this.addModifier(source, value, flat, overwrite);
		const cleanupTask = task.delay(duration, () => {
			this.removeModifier(source, flat);
		});
		return () => {
			task.cancel(cleanupTask);
			this.removeModifier(source, flat);
		};
	}

	removeModifier(source: string, flat: boolean) {
		const modifierMap = flat ? this.addends : this.multipliers;
		modifierMap.delete(source);
		this.shouldRecalculate = true;
		this.modifiersChanged.Fire();
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
