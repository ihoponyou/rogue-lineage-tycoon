import { Component } from "@flamework/components";
import { OnTick } from "@flamework/core";
import { Players } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import { DataService } from "server/services/data-service";
import { store } from "server/store";
import {
	Character,
	CharacterAttributes,
	CharacterInstance,
} from "shared/components/character";
import { OnRemoved } from "../../../types/lifecycles";
import { Events } from "../networking";
import { RagdollServer } from "./ragdoll-server";

const FF_DURATION = 15;
const PROTECTED_DISTANCE = 5;
const BASE_REGEN_RATE = 0.5;
const MINIMUM_TEMPERATURE = 0;
const MAXIMUM_TEMPERATURE = 100;
const KNOCK_PERCENT_THRESHOLD = 0.15;

const EVENTS = Events.character;

@Component({
	tag: "Character",
	defaults: {
		isKnocked: false,
		isAlive: true,
		temperature: 50,
		stomach: 100,
		toxicity: 0,
		armor: "",
		manaColor: new Color3(1, 1, 1),
	},
})
export class CharacterServer
	extends Character<CharacterAttributes, CharacterInstance>
	implements OnTick, OnRemoved
{
	constructor(
		private dataService: DataService,
		private ragdoll: RagdollServer,
	) {
		super();
	}

	public override onStart(): void {
		super.onStart();

		let savedHealth =
			store.getState().players.resources[this.getPlayer().UserId]!.health;
		if (savedHealth < 1) savedHealth = 100;
		this.instance.Humanoid.Health = savedHealth;

		for (const condition of store.getState().players.conditions[
			this.getPlayer().UserId
		]!) {
			this.instance.AddTag(condition);
		}

		this.instance.AddTag("FallDamage");
	}

	onTick(dt: number): void {
		if (!this.attributes.isAlive) return;

		store.decayStomach(this.getPlayer().UserId, dt);
		store.decayToxicity(this.getPlayer().UserId, dt);

		const humanoid = this.instance.Humanoid;
		if (humanoid.Health >= humanoid.MaxHealth) return;

		const boost = 0; // TODO: health regen multiplier
		const regenRate = BASE_REGEN_RATE * (1 + boost);
		humanoid.TakeDamage(dt * -regenRate);
	}

	onRemoved(): void {
		this.trove.destroy();
	}

	override onHealthChanged(health: number): void {
		const percentHealth = health / this.instance.Humanoid.MaxHealth;
		if (this.attributes.isKnocked) {
			if (percentHealth > KNOCK_PERCENT_THRESHOLD) {
				if (this.instance.GetAttribute("isCarried")) return;
				this.attributes.isKnocked = false;
				this.ragdoll.toggle(false);
			}
			return;
		}

		if (health > 0) return;

		this.knock();
	}

	knock(): void {
		if (this.attributes.isKnocked) return;
		this.attributes.isKnocked = true;
		this.ragdoll.toggle(true);
	}

	breakJoints(): void {
		this.instance.GetDescendants().forEach((value) => {
			if (
				value.IsA("BallSocketConstraint") ||
				value.IsA("JointInstance")
			) {
				value.Destroy();
			}
		});
	}

	kill(): void {
		if (!this.attributes.isAlive) return;
		this.attributes.isAlive = false;

		this.instance.Humanoid.Health = 0;
		this.breakJoints();

		store.subtractLife(this.getPlayer().UserId);

		EVENTS.killed.fire(this.getPlayer());

		task.delay(Players.RespawnTime, () => this.getPlayer().LoadCharacter());
	}

	snipe(): void {
		const particleAttachment = this.getHead().ParticleAttachment;
		if (!particleAttachment) return;

		particleAttachment.Critted.Play();
		particleAttachment.Sniped.Play();
		particleAttachment.Crit.Emit(1);
	}

	giveForceField(): void {
		const ffTrove = this.trove.extend();
		const startPos = (this.instance as StarterCharacter).HumanoidRootPart
			.Position;
		const startTick = tick();
		const ff = ffTrove.add(new Instance("ForceField"));
		ff.Parent = this.instance;

		ffTrove.add(
			setInterval(() => {
				const timeExpired = tick() - startTick > FF_DURATION;

				const currentPos = (this.instance as StarterCharacter)
					.HumanoidRootPart.Position;
				const distanceFromStart = currentPos.sub(startPos).Magnitude;
				const leftSpawn = distanceFromStart > PROTECTED_DISTANCE;

				if (timeExpired || leftSpawn) ffTrove.destroy();
			}, 0.5),
		);
	}

	adjustTemperature(amount: number) {
		const profile = this.dataService.getProfile(this.getPlayer());
		const newTemperature = math.clamp(
			profile.Data.Temperature + amount,
			MINIMUM_TEMPERATURE,
			MAXIMUM_TEMPERATURE,
		);
		profile.Data.Temperature = newTemperature;
		this.attributes.temperature = newTemperature;

		if (newTemperature === MINIMUM_TEMPERATURE)
			this.instance.AddTag("Frostbite");
		else if (newTemperature === MAXIMUM_TEMPERATURE)
			this.instance.AddTag("BurnScar");
	}
}
