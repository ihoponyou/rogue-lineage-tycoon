import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Players } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import { Trove } from "@rbxts/trove";
import {
	DataService,
	PlayerProfile,
} from "server/modules/Services/flamework/data-service";
import { RagdollServer } from "./ragdoll-server";
import { OnRemoved } from "../../../../types/lifecycles";

interface Attributes {
	isKnocked: boolean;
	isAlive: boolean;
	temperature: number;
	armor: string;
	manaColor: Color3;
}

const FF_DURATION = 15;
const PROTECTED_DISTANCE = 5;
const BASE_REGEN_RATE = 0.5;
const MINIMUM_TEMPERATURE = 0;
const MAXIMUM_TEMPERATURE = 100;
const KNOCK_PERCENT_THRESHOLD = 0.15;

// all rates are per second
const BASE_STOMACH_DECAY_RATE = 0.1;
const BASE_TOXICITY_DECAY_RATE = 0.05;

@Component({
	tag: "Character",
	defaults: {
		isKnocked: false,
		isAlive: true,
		temperature: 50,
		armor: "",
		manaColor: new Color3(1, 1, 1),
	},
})
export class Character
	extends BaseComponent<Attributes, Model>
	implements OnStart, OnTick, OnRemoved
{
	private trove: Trove = new Trove();
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

	onStart(): void {
		const humanoid = this.getHumanoid();
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Dead, false);

		const profile = this.dataService.getProfile(this.getPlayer());
		let savedHealth = profile.Data.Health;
		if (savedHealth < 1) savedHealth = 100;
		humanoid.Health = savedHealth;

		for (const condition of profile.Data.Conditions) {
			this.instance.AddTag(condition);
		}

		this.instance.AddTag("FallDamage");

		this.trove.connect(humanoid.HealthChanged, (health) =>
			this.onHealthChanged(health, humanoid),
		);
	}

	onTick(dt: number): void {
		this.decayStomach(dt);
		this.decayToxicity(dt);

		const humanoid = this.getHumanoid();
		if (humanoid.Health >= humanoid.MaxHealth) return;

		const boost = 0; // TODO: health regen multiplier
		const regenRate = BASE_REGEN_RATE * (1 + boost);
		humanoid.TakeDamage(dt * -regenRate);
	}

	onRemoved(): void {
		this.trove.destroy();
	}

	onHealthChanged(health: number, humanoid: Humanoid): void {
		const percentHealth = health / humanoid.MaxHealth;
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

	getHumanoid(): Humanoid {
		const humanoid = this.instance.FindFirstChild("Humanoid") as
			| Humanoid
			| undefined;
		if (!humanoid)
			error(`Humanoid not found in character ${this.instance.Name}`);
		return humanoid;
	}

	getAnimator(): Animator {
		const animator = this.getHumanoid().FindFirstChild("Animator") as
			| Animator
			| undefined;
		if (!animator)
			error(`Animator not found in character ${this.instance.Name}`);
		return animator;
	}

	getPlayer(): Player {
		const player = Players.GetPlayerFromCharacter(this.instance);
		if (!player)
			error(`Player not found from character ${this.instance.Name}`);
		return player;
	}

	getHead(): Head {
		const head = this.instance.FindFirstChild("Head") as Head | undefined;
		if (!head) error(`Head not found in character ${this.instance.Name}`);
		return head;
	}

	getTorso(): Torso {
		const torso = this.instance.FindFirstChild("Torso") as
			| Torso
			| undefined;
		if (!torso) error(`Torso not found in character ${this.instance.Name}`);
		return torso;
	}

	getHumanoidRootPart(): HumanoidRootPart {
		const humanoidRootPart = this.instance.FindFirstChild(
			"HumanoidRootPart",
		) as HumanoidRootPart | undefined;
		if (!humanoidRootPart)
			error(`HRP not found in character ${this.instance.Name}`);
		return humanoidRootPart;
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

		this.getHumanoid().Health = 0;
		this.breakJoints();

		const profile = this.dataService.getProfile(this.getPlayer());
		profile.Data.Lives -= 1;
		if (profile.Data.Lives > 0) {
			this.dataService.resetLifeValues(profile.Data);
		} else {
			this.dataService.resetCharacterValues(profile.Data);
		}

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
	}

	decayToxicity(deltaTime: number): void {
		const data = this.profile.Data;
		if (data.Toxicity <= 0) return;
		data.Toxicity -= math.min(
			data.Toxicity,
			deltaTime * this.stats.toxicityDecayRate,
		);
	}
}