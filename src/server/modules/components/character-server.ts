import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Players } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import {
	DataService,
	PlayerProfile,
} from "server/modules/Services/flamework/data-service";
import { RagdollServer } from "./ragdoll-server";
import { OnRemoved } from "../../../../types/lifecycles";
import {
	Character,
	CharacterAttributes,
	CharacterInstance,
} from "shared/modules/components/character";
import { Events } from "../networking";

const FF_DURATION = 15;
const PROTECTED_DISTANCE = 5;
const BASE_REGEN_RATE = 0.5;
const MINIMUM_TEMPERATURE = 0;
const MAXIMUM_TEMPERATURE = 100;
const KNOCK_PERCENT_THRESHOLD = 0.15;

// all rates are per second
const BASE_STOMACH_DECAY_RATE = 0.1;
const BASE_TOXICITY_DECAY_RATE = 0.05;

const EVENTS = Events.characterEvents;

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
	private stats = {
		stomachDecayRate: BASE_STOMACH_DECAY_RATE,
		toxicityDecayRate: BASE_TOXICITY_DECAY_RATE,
	};
	private profile: PlayerProfile;

	constructor(
		private dataService: DataService,
		private ragdoll: RagdollServer,
	) {
		super();
		this.profile = this.dataService.getProfile(this.getPlayer());
	}

	override onStart(): void {
		super.onStart();
		let savedHealth = this.profile.Data.Health;
		if (savedHealth < 1) savedHealth = 100;
		this.instance.Humanoid.Health = savedHealth;

		for (const condition of this.profile.Data.Conditions) {
			this.instance.AddTag(condition);
		}

		this.instance.AddTag("FallDamage");
	}

	onTick(dt: number): void {
		if (!this.attributes.isAlive) return;

		this.decayStomach(dt);
		this.decayToxicity(dt);

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

		const profile = this.dataService.getProfile(this.getPlayer());
		profile.Data.Lives -= 1;
		if (profile.Data.Lives > 0) {
			this.dataService.resetLifeValues(profile.Data);
		} else {
			this.dataService.resetCharacterValues(profile.Data);
		}

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

	decayStomach(deltaTime: number): void {
		const data = this.profile.Data;
		if (data.Stomach <= 0) return;
		data.Stomach -= math.min(
			data.Stomach,
			deltaTime * this.stats.stomachDecayRate,
		);
		this.attributes.stomach = data.Stomach;
	}

	decayToxicity(deltaTime: number): void {
		const data = this.profile.Data;
		if (data.Toxicity <= 0) return;
		data.Toxicity -= math.min(
			data.Toxicity,
			deltaTime * this.stats.toxicityDecayRate,
		);
		this.attributes.toxicity = data.Toxicity;
	}
}
