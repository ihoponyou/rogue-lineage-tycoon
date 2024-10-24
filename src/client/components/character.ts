import { Component } from "@flamework/components";
import { OnTick } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { BlockActivity } from "client/activities/block-activity";
import { ChargeManaActivity } from "client/activities/charge-mana-activity";
import { ClimbActivity } from "client/activities/climb-activity";
import { DashActivity } from "client/activities/dash-activity";
import { RunActivity } from "client/activities/run-activity";
import { AnimationController } from "client/controllers/animation-controller";
import { InputController } from "client/controllers/input-controller";
import { KeybindController } from "client/controllers/keybind-controller";
import { AbstractCharacter } from "shared/components/abstract-character";
import { Events } from "../network";
import { RagdollClient } from "./ragdoll-client";

// manually created by the local player's Player component
@Component()
export class Character extends AbstractCharacter implements OnTick {
	private run!: RunActivity;
	private dash!: DashActivity;
	private climb!: ClimbActivity;
	private chargeMana!: ChargeManaActivity;
	private block!: BlockActivity;

	public constructor(
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

	public override onStart(): void {
		super.onStart();

		this.inputController.onRunTriggered(() => this.tryRun());
		this.inputController.onDashTriggered(() => this.tryDash());
		this.inputController.onClimbTriggered((castResult) =>
			this.tryClimb(castResult),
		);
		this.inputController.onChargeManaTriggered((charging) => {
			charging ? this.chargeMana.start() : this.chargeMana.stop();
		});
		this.inputController.onBlockTriggered(() => this.tryBlock());
		this.inputController.onLightAttackTriggered(() =>
			this.tryLightAttack(),
		);
		this.inputController.onHeavyAttackTriggered(() =>
			this.tryHeavyAttack(),
		);

		this.trove.add(Events.character.killed.connect(() => this.onKilled()));
	}

	public override canAttack(): boolean {
		return (
			super.canAttack() &&
			!(this.climb.isActive() || this.block.isActive())
		);
	}

	public override canBlock(): boolean {
		return super.canBlock() && !this.dash.isActive();
	}

	public onTick(_dt: number): void {
		if (!this.keybindController.isKeyDown("block")) return;
		if (this.block.isActive()) return;
		this.tryBlock();
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
}
