import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { store } from "server/store";
import { AbstractItem } from "shared/components/abstract-item";
import { ModelComponent } from "shared/components/model";
import { getItemConfig } from "shared/configs/items";
import { TouchableModel } from "./interactable/touchable/touchable-model";
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
	private owner?: PlayerServer;

	public constructor(private components: Components) {
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
					if (this.owner !== undefined) return;
					this.pickUp(player);
				});
				component.enable();
			});

		Events.item.equip.connect((player, tool) => {
			if (tool !== this.instance) return;
			if (this.owner === undefined) return;
			if (this.owner.instance !== player) return;
			this.equip();
		});

		Events.item.unequip.connect((player, tool) => {
			if (tool !== this.instance) return;
			if (this.owner === undefined) return;
			if (this.owner.instance !== player) return;
			this.unequip();
		});

		Events.item.drop.connect((player, tool) => {
			if (tool !== this.instance) return;
			if (this.owner === undefined) return;
			if (this.owner.instance !== player) return;
			this.drop();
		});
	}

	public pickUp(player: Player): void {
		if (this.owner !== undefined) return;
		const playerServer = this.components.getComponent<PlayerServer>(player);
		if (playerServer === undefined) return;

		this.touchable.disable();

		this.owner = playerServer;
		this.instance.Parent = player;
		this.worldModel.instance.PrimaryPart!.CanCollide = false;

		const character = playerServer.getCharacter();
		this.worldModel.instance.Parent = character.instance;
		character.holsterItem(this);

		if (this.config.hideOnHolster) {
			this.worldModel.hide();
		}

		store.giveItem(player, this.instance);
	}

	public drop(): void {
		if (this.attributes.isEquipped) this.unequip();
		this.propWeld.Part0 = undefined;
		this.propWeld.C0 = new CFrame();

		if (this.owner) store.takeItem(this.owner.instance, this.instance);
		this.owner = undefined;
		this.instance.Parent = Workspace;
		this.worldModel.instance.Parent = this.instance;
		this.worldModel.instance.PrimaryPart!.CanCollide = true;
	}

	public equip(): void {
		if (this.attributes.isEquipped) return;
		if (this.owner === undefined) return;

		const character = this.owner.getCharacter();
		character.holdItem(this);

		if (this.config.hideOnHolster) {
			this.worldModel.show();
		}

		this.attributes.isEquipped = true;
	}

	public unequip(): void {
		if (!this.attributes.isEquipped) return;
		if (this.owner === undefined) return;

		const character = this.owner.getCharacter();
		character.holsterItem(this);

		if (this.config.hideOnHolster) {
			this.worldModel.hide();
		}
		// this.rigToLimb(this.config.holsterLimb, this.config.holsterC0);

		this.attributes.isEquipped = false;
	}

	public weldTo(part: BasePart, c0?: CFrame): void {
		this.propWeld.Part0 = part;
		if (c0 !== undefined) this.propWeld.C0 = c0;
	}
}
