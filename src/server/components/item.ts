import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { store } from "server/store";
import { AbstractItem } from "shared/components/abstract-item";
import { ModelComponent } from "shared/components/model";
import { BodyPart, getItemConfig } from "shared/configs/items";
import { TouchableModel } from "./interactable/touchable/touchable-model";
import { PlayerServer } from "./player-server";

@Component({
	tag: Item.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class Item extends AbstractItem implements OnStart {
	private config = getItemConfig(this.instance.Name);
	private worldModel!: ModelComponent;
	private rootJoint!: Motor6D;
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
		// animations require Hilt part
		worldModel.PrimaryPart.Name = "Hilt";

		this.rootJoint = new Instance("Motor6D");
		this.rootJoint.Name = "RootJoint";
		this.rootJoint.Part1 = worldModel.PrimaryPart;
		this.rootJoint.Parent = worldModel.PrimaryPart;

		worldModel.AddTag(TouchableModel.TAG);
		this.touchable = this.components
			.waitForComponent<TouchableModel>(worldModel)
			.expect();

		this.touchable.onInteracted((player) => {
			if (this.owner !== undefined) return;
			this.pickUp(player);
		});
		this.touchable.enable();

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
	}

	public pickUp(player: Player): void {
		if (this.owner !== undefined) return;
		const playerServer = this.components.getComponent<PlayerServer>(player);
		if (playerServer === undefined) return;

		this.touchable.disable();

		this.owner = playerServer;
		this.instance.Parent = player;
		this.worldModel.instance.PrimaryPart!.CanCollide = false;

		if (this.config.hideOnHolster) {
			this.worldModel.hide();
		}
		this.rigToLimb(this.config.holsterLimb, this.config.holsterC0);

		store.giveItem(player, this.instance);
	}

	public drop(): void {
		if (this.attributes.isEquipped) this.unequip();

		this.owner = undefined;
		this.instance.Parent = Workspace;
		this.worldModel.instance.PrimaryPart!.CanCollide = true;

		this.rootJoint.Part0 = undefined;
	}

	public equip(): void {
		if (this.attributes.isEquipped) return;
		if (this.owner === undefined) return;

		const character = this.owner.getCharacter();
		character.setHeldItem(this);
		if (this.config.idleAnimation) {
			character.playAnimation(this.config.idleAnimation.Name);
		}

		if (this.config.hideOnHolster) {
			this.worldModel.show();
		}
		this.rigToLimb(this.config.equipLimb, this.config.equipC0);

		this.attributes.isEquipped = true;
	}

	public unequip(): void {
		if (!this.attributes.isEquipped) return;
		if (this.owner === undefined) return;

		const character = this.owner.getCharacter();
		character.setHeldItem(this);
		if (this.config.idleAnimation) {
			character.stopAnimation(this.config.idleAnimation.Name);
		}

		if (this.config.hideOnHolster) {
			this.worldModel.hide();
		}
		this.rigToLimb(this.config.holsterLimb, this.config.holsterC0);

		this.attributes.isEquipped = false;
	}

	private rigToLimb(limb: BodyPart, c0: CFrame = new CFrame()): void {
		if (this.owner === undefined) return;
		const character = this.owner.getCharacter();
		this.worldModel.instance.Parent = character.instance;
		const rig = promiseR6(character.instance).expect();
		this.rootJoint.Part0 = rig[limb];
		this.rootJoint.C0 = c0;
	}
}
