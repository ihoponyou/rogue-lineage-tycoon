import Signal from "@rbxts/signal";

export enum StatModifierType {
	Multiplier,
	Addend,
}

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
		modifierType: StatModifierType,
		value: number,
		overwrite: boolean = true,
	) {
		// this is troll but the enum makes things readable i promise
		const modifierMap =
			modifierType === StatModifierType.Addend
				? this.addends
				: this.multipliers;
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
		source: string,
		modifierType: StatModifierType,
		value: number,
		duration: number,
		overwrite: boolean = true,
	) {
		this.addModifier(source, value, modifierType, overwrite);
		const cleanupTask = task.delay(duration, () => {
			this.removeModifier(source, modifierType);
		});
		return () => {
			task.cancel(cleanupTask);
			this.removeModifier(source, modifierType);
		};
	}

	removeModifier(source: string, modifierType: StatModifierType) {
		const modifierMap =
			modifierType === StatModifierType.Addend
				? this.addends
				: this.multipliers;
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
