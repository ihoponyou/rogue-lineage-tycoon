import { OnStart, Service } from "@flamework/core";
import { Events, Functions } from "server/networking";
import { store } from "server/store";
import { CurrencyData } from "shared/store/slices/players/types";
import { Currency } from "../../../types/currency";

@Service()
export class CurrencyService implements OnStart {
	public onStart(): void {
		Functions.currency.getSilver.setCallback(
			(player) => this.getCurrencyData(player, "Silver").amount,
		);
	}

	public getCurrencyData(player: Player, currency: Currency): CurrencyData {
		const data = store.getState().players.currency[player.UserId];
		if (!data) error(`could not get ${currency} for ${player.Name}`);
		return data[currency];
	}

	public addCurrency(
		player: Player,
		currency: Currency,
		amount: number,
	): void {
		const oldAmount = this.getCurrencyData(player, currency).amount;
		store.setCurrencyAmount(player.UserId, currency, oldAmount + amount);
		Events.currency.changed(player, currency, oldAmount + amount);
	}

	public subtractCurrency(
		player: Player,
		currency: Currency,
		amount: number,
	): void {
		const oldAmount = this.getCurrencyData(player, currency).amount;
		store.setCurrencyAmount(player.UserId, currency, oldAmount - amount);
		Events.currency.changed(player, currency, oldAmount - amount);
	}
}
