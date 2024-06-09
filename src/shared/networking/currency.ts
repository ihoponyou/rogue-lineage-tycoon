import { Currency } from "../../../types/currency";

export interface CurrencyServerToClientEvents {
	changed(currency: Currency, value: number): void;
}

export interface CurrencyClientToServerFunctions {
	getSilver(): number;
}
