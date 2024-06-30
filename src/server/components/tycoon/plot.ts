import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";
import { PlayerServer } from "../player-server";
import { Inject } from "shared/inject";
import { TouchablePart } from "../interactable/touchable/touchable-part";

type PlotInstance = Model & {
	Teller: Teller;
	ClaimDoor: BasePart;
};

@Component({
	tag: "Plot",
})
export class Plot
	extends DisposableComponent<{}, PlotInstance>
	implements OnStart
{
	private static totalPlots = 0;

	private id = -1;
	private bank: { [currency in Currency]: number } = {
		Silver: 0,
		Insight: 0,
		Valu: 0,
		Alignment: 0,
	};
	private owner?: PlayerServer;
	private teller!: ClickInteractable;
	private claimDoor!: TouchablePart;

	@Inject
	private components!: Components;

	constructor(private currencyService: CurrencyService) {
		super();
	}

	public onStart(): void {
		this.id = ++Plot.totalPlots;

		this.teller = this.components.getComponent<ClickInteractable>(
			this.instance.Teller,
		)!;
		if (!this.teller) error("teller is not clickable");
		this.teller.onInteracted((player) => this.onTellerInteracted(player));

		this.claimDoor = this.components.getComponent<TouchablePart>(
			this.instance.ClaimDoor,
		)!;
		if (!this.claimDoor) error("door is not touchable");
		this.claimDoor.onInteracted((player) =>
			this.onClaimDoorInteracted(player),
		);
		this.claimDoor.enable();
	}

	private onTellerInteracted(player: Player): void {
		if (!this.owner) return;
		if (player !== this.owner.instance) return;
		this.currencyService.addCurrency(
			this.owner.instance,
			"Silver",
			this.bank.Silver,
		);
		this.bank.Silver = 0;
		this.instance.Teller.SurfaceGui.TextLabel.Text = `0`;
	}

	private onClaimDoorInteracted(player: Player): void {
		if (this.owner !== undefined) return;
		this.owner = this.components.getComponent<PlayerServer>(player);
		if (!this.owner) return;

		print(`${this.instance} claimed by ${this.owner.instance.Name}`);

		this.claimDoor.disable();

		this.instance.ClaimDoor.Transparency = 1;
	}

	public getOwner(): PlayerServer | undefined {
		return this.owner;
	}

	public deposit(currency: Currency, value: number): void {
		this.bank[currency] += value;
		this.instance.Teller.SurfaceGui.TextLabel.Text = `${this.bank[currency]}`;
	}
}
