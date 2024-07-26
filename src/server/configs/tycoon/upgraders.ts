interface UpgraderConfig {
	readonly multiplier: number;
}
export const UPGRADERS: { [name: string]: UpgraderConfig } = {
	Polisher: {
		multiplier: 1.25,
	},
	Appraiser: {
		multiplier: 1.5,
	},
};
