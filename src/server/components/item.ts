import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { store } from "server/store";
import { AbstractItem } from "shared/components/abstract-item";
import { ModelComponent } from "shared/components/model";
import { getItemConfig } from "shared/configs/items";
import { Equippable } from "./equippable";
import { TouchableModel } from "./interactable/touchable/touchable-model";
import { Ownable } from "./ownable";
import { PlayerServer } from "./player-server";

@Component({
	tag: Item.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class Item extends AbstractItem implements OnStart {
	public readonly config = getItemConfig(this.instance.Name);
	private worldModel!: ModelComponent;
	private rootJoint!: Motor6D;
	private propWeld!: Weld;
	private touchable!: TouchableModel;

	public constructor(
		private components: Components,
		protected equippable: Equippable,
		private ownable: Ownable,
	) {
		super();
	}

	public onStart(): void {
		this.instance.CanBeDropped = false;
		this.instance.ManualActivationOnly = true;

		const worldModel = this.config.worldModel.Clone();
		worldModel.Name = "WorldModel";
		worldModel.AddTag(ModelComponent.TAG);
		worldModel.Parent = this.instance;
		this.worldModel = this.components
			.waitForComponent<ModelComponent>(worldModel)
			.expect();

		if (worldModel.PrimaryPart === undefined) {
			warn(`${this.config.worldModel} has unassigned PrimaryPart`);
			worldModel.PrimaryPart =
				worldModel.FindFirstChildWhichIsA("BasePart");
			if (worldModel.PrimaryPart === undefined) {
				error(
					`could not assign temporary PrimaryPart for ${this.config.worldModel.Name}`,
				);
			}
		}

		// this.rootJoint = new Instance("Motor6D");
		// this.rootJoint.Name = "RootJoint";
		// this.rootJoint.Part1 = worldModel.PrimaryPart;
		// this.rootJoint.Parent = worldModel.PrimaryPart;

		this.propWeld = new Instance("Weld");
		this.propWeld.Name = "PropWeld";
		this.propWeld.Part1 = worldModel.PrimaryPart;
		this.propWeld.Parent = worldModel.PrimaryPart;

		worldModel.AddTag(TouchableModel.TAG);
		this.components
			.waitForComponent<TouchableModel>(worldModel)
			.andThen((component) => {
				this.touchable = component;
				component.onInteracted((player) => {
					this.pickUp(player);
				});
				component.enable();
			});

		Events.item.drop.connect((player, tool) => {
			if (tool !== this.instance) return;
			if (!this.ownable.ownedBy(player)) return;
			this.drop();
		});

		this.equippable.onEquipped(() => this.onEquipped());
		this.equippable.onUnequipped(() => this.onUnequipped());
	}

	public pickUp(player: Player): void {
		if (this.ownable.hasOwner()) return;
		const playerServer = this.components.getComponent<PlayerServer>(player);
		if (playerServer === undefined) return;

		this.touchable.disable();

		this.ownable.setOwner(playerServer);

		this.instance.Parent = player;
		this.worldModel.instance.PrimaryPart!.CanCollide = false;
		const character = playerServer.getCharacter();
		this.worldModel.instance.Parent = character.instance;
		character.holsterItem(this);

		if (this.config.hideOnHolster) {
			this.worldModel.hide();
		}

		store.giveTool(player, this.instance);
	}

	public drop(): void {
		if (this.equippable.attributes.isEquipped) this.onUnequipped();
		this.propWeld.Part0 = undefined;
		this.propWeld.C0 = new CFrame();

		if (this.ownable.hasOwner())
			store.takeTool(this.ownable.getOwner()!.instance, this.instance);
		this.ownable.setOwner(undefined);

		this.instance.Parent = Workspace;
		this.worldModel.instance.Parent = this.instance;
		this.worldModel.instance.PrimaryPart!.CanCollide = true;
	}

	public onEquipped(): void {
		const owner = this.ownable.getOwner();
		if (owner === undefined) return;
		const character = owner.getCharacter();
		character.holdItem(this);

		if (this.config.hideOnHolster) {
			this.worldModel.show();
		}
	}

	public onUnequipped(): void {
		const owner = this.ownable.getOwner();
		if (owner === undefined) return;
		const character = owner.getCharacter();
		character.holsterItem(this);

		if (this.config.hideOnHolster) {
			this.worldModel.hide();
		}
	}

	public weldTo(part: BasePart, c0?: CFrame): void {
		this.propWeld.Part0 = part;
		if (c0 !== undefined) this.propWeld.C0 = c0;
	}
}
