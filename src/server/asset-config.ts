import { Currency } from "../../types/currency";

interface Asset {
	cost: number;
	currency: Currency;
	prerequisites: Array<string>;
}

export const ASSETS: { [name: string]: Asset } = {
	"Basic Door": {
		cost: 0,
		currency: "Silver",
		prerequisites: [],
	},
};
