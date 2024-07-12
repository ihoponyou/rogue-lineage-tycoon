import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ASSETS } from "server/configs/tycoon";
import { store } from "server/store";
import { DisposableComponent } from "shared/components/disposable-component";
import { Inject } from "shared/inject";
import { selectCurrency } from "shared/store/selectors/players";
import { PlayerServer } from "../../player-server";
import { Pad } from "../pad";

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

		const currencyData = store.getState(
			selectCurrency(player.UserId, this.config.currency),
		);
		if (currencyData === undefined) return;
		if (currencyData.amount < this.config.cost) {
			print(playerServer.Name, "error = broke");
			return;
		}
		store.addCurrency(
			player.UserId,
			this.config.currency,
			-this.config.cost,
		);

		print(`unlocked ${this.attributes.assetName}`);
		playerServer.addAsset(this.attributes.assetName);
		this.pad.hide();
		this.pad.disable();

		this.unlock(playerServer);
	}

	public abstract unlock(player: PlayerServer): void;
}
