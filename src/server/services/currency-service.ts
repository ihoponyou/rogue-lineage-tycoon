import { Service } from "@flamework/core";
import { Events } from "server/networking";
import { Currency } from "../../../types/currency";
import { DataService } from "./data-service";

// TODO: make these producer actions

@Service()
export class CurrencyService {
	constructor(private dataService: DataService) {}

	public addCurrency(
		player: Player,
		currency: Currency,
		amount: number,
	): void {
		const playerData = this.dataService.getProfile(player).Data;
		const currencyData = playerData[currency];

		currencyData.Amount += amount * currencyData.Multiplier;
		Events.currency.changed(player, currency, currencyData.Amount);
	}

	public subtractCurrency(
		player: Player,
		currency: Currency,
		amount: number,
	): void {
		const playerData = this.dataService.getProfile(player).Data;
		const currencyData = playerData[currency];

		currencyData.Amount -= amount;
		Events.currency.changed(player, currency, currencyData.Amount);
	}
}
