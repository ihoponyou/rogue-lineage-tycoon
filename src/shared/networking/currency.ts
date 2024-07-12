import { Currency } from "../../../types/currency";

export interface CurrencyClientEvents {
	changed(currency: Currency, value: number): void;
}

export interface CurrencyServerFunctions {
	getSilver(): number;
}
