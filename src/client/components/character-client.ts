import { Component, Components } from "@flamework/components";
import { ConstructorRef } from "@flamework/components/out/utility";
import { OnTick } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { BlockActivity } from "client/activities/block-activity";
import { ChargeManaActivity } from "client/activities/charge-mana-activity";
import { ClimbActivity } from "client/activities/climb-activity";
import { DashActivity } from "client/activities/dash-activity";
import { RunActivity } from "client/activities/run-activity";
import { LOCAL_PLAYER } from "client/configs/constants";
import { AnimationController } from "client/controllers/animation-controller";
import { InputController } from "client/controllers/input-controller";
import { KeybindController } from "client/controllers/keybind-controller";
import { store } from "client/store";
import { AbstractCharacter } from "shared/components/abstract-character";
import { Equippable } from "shared/modules/equippable";
import { Events } from "../network";
import { ItemClient } from "./item-client";
import { RagdollClient } from "./ragdoll-client";
import { SkillClient } from "./skill-client";

@Component({
	tag: AbstractCharacter.TAG,
	predicate: (instance) => {
		return instance === LOCAL_PLAYER.Character;
	},
})
export class CharacterClient extends AbstractCharacter implements OnTick {
	protected override inventoryFolder: Folder = this.instance.WaitForChild(
		"Inventory",
	) as Folder;
	protected override skillsFolder: Folder = this.instance.WaitForChild(
		"Skills",
	) as Folder;

	private trove = new Trove();

	private run!: RunActivity;
	private dash!: DashActivity;
	private climb!: ClimbActivity;
	private chargeMana!: ChargeManaActivity;
	private block!: BlockActivity;

	constructor(
		private components: Components,
		protected ragdoll: RagdollClient,
		private animationController: AnimationController,
		private keybindController: KeybindController,
		private inputController: InputController,
	) {
		super();
		this.run = new RunActivity(this, animationController);
		this.dash = new DashActivity(
			this,
			animationController,
			keybindController,
			inputController,
		);
		this.climb = new ClimbActivity(
			this,
			animationController,
			inputController,
			keybindController,
		);
		this.chargeMana = new ChargeManaActivity(this, keybindController);
		this.block = new BlockActivity(
			this,
			animationController,
			keybindController,
		);
	}

	override destroy(): void {
		this.trove.clean();
		super.destroy();
	}

	override onStart(): void {
		super.onStart();

		this.inputController.onRunTriggered(() => this.tryRun());
		this.inputController.onDashTriggered(() => this.tryDash());
		this.inputController.onClimbTriggered((castResult) =>
			this.tryClimb(castResult),
		);
		this.inputController.onChargeManaTriggered((charging) => {
			charging ? this.tryChargeMana() : this.chargeMana.stop();
		});
		this.inputController.onBlockTriggered(() => this.tryBlock());
		this.inputController.onLightAttackTriggered(() =>
			this.tryLightAttack(),
		);
		this.inputController.onHeavyAttackTriggered(() =>
			this.tryHeavyAttack(),
		);

		this.trove.add(Events.character.killed.connect(() => this.onKilled()));

		for (const instance of this.inventoryFolder.GetChildren()) {
			this.retrieveEquippable(instance, ItemClient);
		}
		this.inventoryFolder.ChildAdded.Connect((child) =>
			this.retrieveEquippable(child, ItemClient),
		);

		for (const instance of this.skillsFolder.GetChildren()) {
			this.retrieveEquippable(instance, SkillClient);
		}
		this.skillsFolder.ChildAdded.Connect((child) => {
			this.retrieveEquippable(child, SkillClient);
		});
	}

	override canAttack(): boolean {
		return (
			super.canAttack() &&
			!(this.climb.isActive() || this.block.isActive())
		);
	}

	override canBlock(): boolean {
		return super.canBlock() && !this.dash.isActive();
	}

	onTick(_dt: number): void {
		if (!this.keybindController.isKeyDown("block")) return;
		if (this.block.isActive()) return;
		this.tryBlock();
	}

	// waitForComponent<Equippable>() does not work
	private retrieveEquippable<T extends Equippable>(
		instance: Instance,
		componentSpecifier: ConstructorRef<T>,
	) {
		const equippable = this.components
			.waitForComponent(instance, componentSpecifier)
			.expect();
		store.addEquippable(instance.Name, equippable);
	}

	private onKilled(): void {
		const camera = Workspace.CurrentCamera;
		if (!camera) return;
		camera.CameraSubject = this.getHead();
	}

	private tryRun(): void {
		if (
			this.attributes.isAttacking ||
			this.attributes.isBlocking ||
			this.attributes.isKnocked ||
			this.attributes.isStunned
		)
			return;
		this.chargeMana.stop();
		this.run.start();
	}

	private tryClimb(wallCastResult: RaycastResult): void {
		this.run.stop();
		this.dash.stop();
		this.climb.start(wallCastResult);
	}

	private tryDash(): void {
		if (
			this.attributes.isBlocking ||
			this.attributes.isKnocked ||
			this.attributes.isStunned
		)
			return;
		this.run.stop();
		this.dash.start();
	}

	private tryLightAttack(): void {
		if (!this.canLightAttack()) return;
		this.chargeMana.stop();
		this.run.stop();
		Events.combat.lightAttack();
	}

	private tryBlock(): void {
		if (!this.canBlock()) return;
		this.run.stop();
		this.block.start();
	}

	private tryHeavyAttack() {
		if (!this.canHeavyAttack()) return;
		this.chargeMana.stop();
		this.run.stop();
		Events.combat.heavyAttack();
	}

	private tryChargeMana() {
		if (
			this.attributes.isBlocking ||
			this.attributes.isKnocked ||
			this.attributes.isStunned ||
			this.attributes.isAttacking
		)
			return;
		this.run.stop();
		this.chargeMana.start();
	}
}
