import { Currency } from "../../types/currency";

interface Asset {
	cost: number;
	currency: Currency;
	prerequisites: Array<string>;
}

export const ASSETS: { [name: string]: Asset } = {
	Door: {
		cost: 0,
		currency: "Silver",
		prerequisites: [],
	},
	Walls: {
		cost: 0,
		currency: "Silver",
		prerequisites: ["Door"],
	},
};
