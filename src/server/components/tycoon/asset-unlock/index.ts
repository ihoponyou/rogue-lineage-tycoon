import { Component, Components } from "@flamework/components";
import { DisposableComponent } from "shared/components/disposable-component";
import { Pad } from "../pad";
import { OnStart } from "@flamework/core";
import { ASSETS } from "server/configs/tycoon";
import { PlayerServer } from "../../player-server";
import { CurrencyService } from "server/services/currency-service";
import { Inject } from "shared/inject";

export interface UnlockAttributes {
	assetName: string;
}

@Component()
export abstract class AssetUnlock<
		A extends UnlockAttributes = UnlockAttributes,
		I extends Instance = Instance,
	>
	extends DisposableComponent<A, I>
	implements OnStart
{
	protected config = ASSETS[this.attributes.assetName];

	@Inject
	protected components!: Components;

	constructor(
		private pad: Pad,
		private currencyService: CurrencyService,
		// protected components: Components,
	) {
		super();
	}

	public onStart(): void {
		this.pad.onInteracted((player) => this.handleInteract(player));
	}

	private handleInteract(player: Player): void {
		const playerServer = this.components.getComponent<PlayerServer>(player);
		if (!playerServer) return;
		if (!playerServer.hasAssetPrerequisites(this.attributes.assetName)) {
			print(playerServer.Name, "missing prerequisites");
			return;
		}

		const currencyData = this.currencyService.getCurrencyData(
			player,
			this.config.currency,
		);
		if (currencyData.Amount < this.config.cost) {
			print(playerServer.Name, "error = broke");
			return;
		}
		this.currencyService.subtractCurrency(
			player,
			this.config.currency,
			this.config.cost,
		);

		print(`unlocked ${this.attributes.assetName}`);
		playerServer.addAsset(this.attributes.assetName);
		this.pad.hide();
		this.pad.disable();

		this.unlock(playerServer);
	}

	public abstract unlock(player: PlayerServer): void;
}
