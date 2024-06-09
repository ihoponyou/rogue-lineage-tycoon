import { Service } from "@flamework/core";
import { CurrencyData, DataService } from "./data-service";
import { Events } from "server/networking";
import { Currency } from "../../../types/currency";

@Service()
export class CurrencyService {
	constructor(private dataService: DataService) {}

	public getCurrencyData(player: Player, currency: Currency): CurrencyData {
		return this.dataService.getProfile(player).Data[currency];
	}

	public addCurrency(
		player: Player,
		currency: Currency,
		amount: number,
	): void {
		const playerData = this.dataService.getProfile(player).Data;
		const currencyData = playerData[currency];

		currencyData.Amount += amount;
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
