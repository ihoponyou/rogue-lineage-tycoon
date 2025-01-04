import { Currency } from "../../../shared/modules/currency";

interface ProductConfig {
	readonly currency: Currency;
	readonly value: number;
}

export const PRODUCTS: { [name: string]: ProductConfig } = {
	shilling: {
		currency: "Silver",
		value: 1,
	},
	"???": {
		currency: "Silver",
		value: 50,
	},
	Diamond: {
		currency: "Silver",
		value: 35,
	},
	Ruby: {
		currency: "Silver",
		value: 14,
	},
	Emerald: {
		currency: "Silver",
		value: 14,
	},
	Sapphire: {
		currency: "Silver",
		value: 14,
	},
	Opal: {
		currency: "Silver",
		value: 9,
	},
	"Idol of the Forgotten": {
		currency: "Silver",
		value: 8,
	},
	Amulet: {
		currency: "Silver",
		value: 7,
	},
	Ring: {
		currency: "Silver",
		value: 7,
	},
	"Old Amulet": {
		currency: "Silver",
		value: 6,
	},
	"Old Ring": {
		currency: "Silver",
		value: 6,
	},
	Goblet: {
		currency: "Silver",
		value: 5,
	},
	Scroll: {
		currency: "Silver",
		value: 15,
	},
	Godscroll: {
		currency: "Silver",
		value: 50,
	},
};
