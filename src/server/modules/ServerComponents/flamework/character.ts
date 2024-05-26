import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Players } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import { Trove } from "@rbxts/trove";
import { DataService } from "server/modules/Services/flamework/data-service";
import { RagdollServer } from "./ragdoll-server";

interface Attributes {
	isKnocked: boolean;
	isAlive: boolean;
	temperature: number;
}

const FF_DURATION = 15;
const PROTECTED_DISTANCE = 5;
const BASE_REGEN_RATE = 0.5;
const MINIMUM_TEMPERATURE = 0;
const MAXIMUM_TEMPERATURE = 100;

@Component({
	tag: "Character",
	defaults: {
		isKnocked: false,
		isAlive: true,
		temperature: 50,
	},
})
export class Character
	extends BaseComponent<Attributes, Model>
	implements OnStart, OnTick
{
	private trove: Trove = new Trove();

	constructor(
		private dataService: DataService,
		private ragdoll: RagdollServer,
	) {
		super();
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
	}

	onTick(dt: number): void {
		const humanoid = this.getHumanoid();
		if (humanoid.Health >= humanoid.MaxHealth) return;

		const boost = 0; // TODO: health regen multiplier
		const regenRate = BASE_REGEN_RATE * (1 + boost);
		humanoid.TakeDamage(dt * -regenRate);
	}

	getHumanoid(): Humanoid {
		const humanoid = this.instance.FindFirstChild("Humanoid") as
			| Humanoid
			| undefined;
		if (!humanoid)
			error(`Humanoid not found in character ${this.instance.Name}`);
		return humanoid;
	}

	getPlayer(): Player {
		const player = Players.GetPlayerFromCharacter(this.instance);
		if (!player)
			error(`Player not found from character ${this.instance.Name}`);
		return player;
	}

	getHead(): Head {
		const head = this.instance.FindFirstChild("Head") as Head | undefined;
		if (head === undefined)
			error(`Head not found in character ${this.instance.Name}`);
		return head;
	}

	getTorso(): Torso {
		const torso = this.instance.FindFirstChild("Torso") as
			| Torso
			| undefined;
		if (torso === undefined)
			error(`Torso not found in character ${this.instance.Name}`);
		return torso;
	}

	adjustTemperature(amount: number) {
		const profile = this.dataService.getProfile(this.getPlayer());
		const newTemperature = math.clamp(
			profile.Data.Temperature + amount,
			MINIMUM_TEMPERATURE,
			MAXIMUM_TEMPERATURE,
		);
		profile.Data.Temperature = newTemperature;

		if (newTemperature === MINIMUM_TEMPERATURE)
			this.instance.AddTag("Frostbite");
		else if (newTemperature === MAXIMUM_TEMPERATURE)
			this.instance.AddTag("BurnScar");

		print(newTemperature);
	}

	knock(): void {
		if (this.attributes.isKnocked) return;
		this.attributes.isKnocked = true;
		this.ragdoll.toggle(true);
	}

	breakJoints(): void {
		this.instance.GetChildren().forEach((value) => {
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

		this.trove.add(
			task.delay(Players.RespawnTime, () =>
				this.getPlayer().LoadCharacter(),
			),
		);
	}

	snipe(): void {
		const particleAttachment = this.getHead().ParticleAttachment;
		if (particleAttachment === undefined) return;

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
}
