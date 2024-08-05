import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { Workspace } from "@rbxts/services";
import { getItemConfig } from "server/configs/items";
import { ModelComponent } from "shared/components/model";
import { TouchableModel } from "./interactable/touchable/touchable-model";
import { PlayerServer } from "./player-server";

const DEFAULT_ROOT_JOINT_C0 = new CFrame(0, -1, 0).mul(
	CFrame.Angles(math.rad(-90), 0, 0),
);

@Component({
	tag: Item.TAG,
})
export class Item extends BaseComponent<{}, Tool> implements OnStart {
	public static readonly TAG = "Item";

	private config = getItemConfig(this.instance.Name);
	private worldModel!: ModelComponent;
	private rootJoint!: Motor6D;
	private touchable!: TouchableModel;
	private owner?: PlayerServer;

	private equipped = false;

	public constructor(private components: Components) {
		super();
	}

	public onStart(): void {
		this.instance.CanBeDropped = false;
		this.instance.ManualActivationOnly = true;

		const worldModel = this.config.worldModel.Clone();
		worldModel.Parent = this.instance;
		worldModel.Name = "WorldModel";
		worldModel.AddTag(ModelComponent.TAG);
		this.worldModel = this.components
			.waitForComponent<ModelComponent>(worldModel)
			.expect();

		this.rootJoint = new Instance("Motor6D");
		this.rootJoint.Parent = worldModel.PrimaryPart;
		this.rootJoint.Name = "RootJoint";
		this.rootJoint.Part1 = worldModel.PrimaryPart;
		this.rootJoint.C0 = DEFAULT_ROOT_JOINT_C0;

		worldModel.AddTag(TouchableModel.TAG);
		this.touchable = this.components
			.waitForComponent<TouchableModel>(worldModel)
			.expect();

		this.touchable.onInteracted((player) => {
			if (this.owner !== undefined) return;
			this.pickUp(player);
		});
		this.touchable.enable();
	}

	public pickUp(player: Player): void {
		if (this.owner !== undefined) return;
		const playerServer = this.components.getComponent<PlayerServer>(player);
		if (playerServer === undefined) return;
		this.touchable.disable();
		this.owner = playerServer;
		this.instance.Parent = this.owner.instance;
		this.equip();
	}

	public drop(): void {
		this.owner = undefined;
		this.instance.Parent = Workspace;
	}

	public equip(): void {
		if (this.owner === undefined) return;
		const character = this.owner.getCharacter();
		this.worldModel.instance.Parent = character.instance;
		const rig = promiseR6(character.instance).expect();
		this.rootJoint.Part0 = rig["Right Arm"];
	}

	public unequip(): void {
		if (this.owner === undefined) return;
		this.worldModel.instance.Parent = this.instance;
	}
}
