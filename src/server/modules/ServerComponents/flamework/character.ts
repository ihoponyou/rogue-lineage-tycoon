import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Players } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import { Trove } from "@rbxts/trove";
import {
	DataService,
	PlayerProfile,
} from "server/modules/Services/flamework/data-service";

interface Attributes {
	isKnocked: boolean;
	isAlive: boolean;
}

interface CharacterInstance extends StarterCharacter {
	Humanoid: Humanoid;
}

@Component({
	tag: "Character",
	defaults: {
		isKnocked: false,
		isAlive: false,
	},
})
export class Character
	extends BaseComponent<Attributes, CharacterInstance>
	implements OnStart, OnTick
{
	private trove: Trove = new Trove();
	private FF_DURATION = 15;
	private PROTECTED_DISTANCE = 5;
	private BASE_REGEN_RATE = 0.5;

	constructor(private dataService: DataService) {
		super();
	}

	onStart(): void {
		this.instance.AddTag("FallDamage");

		const humanoid = this.instance.Humanoid;
		humanoid.SetStateEnabled(Enum.HumanoidStateType.FallingDown, false);
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Ragdoll, false);
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Dead, false);

		const profile = this.profile();
		let savedHealth = profile.Data.Health;
		if (savedHealth < 1) savedHealth = 100;
		humanoid.Health = savedHealth;

		for (const condition of profile.Data.Conditions) {
			this.instance.AddTag(condition);
		}
	}

	onTick(dt: number): void {
		const humanoid = this.instance.Humanoid;
		if (humanoid.Health >= humanoid.MaxHealth) return;

		const boost = 0; // TODO: health regen multiplier
		const regenRate = this.BASE_REGEN_RATE * (1 + boost);
		humanoid.TakeDamage(dt * -regenRate);
	}

	player(): Player {
		const player = Players.GetPlayerFromCharacter(this.instance);
		if (!player)
			error(`Player not found from character ${this.instance.Name}`);
		return player;
	}

	profile(): PlayerProfile {
		return this.dataService.getProfile(this.player());
	}

	knock(): void {
		if (this.attributes.isKnocked) return;
		this.attributes.isKnocked = true;
		// TODO: ragdoll
	}

	kill(): void {
		this.attributes.isAlive = false;

		this.instance.Humanoid.Health = 0;
		this.instance.GetChildren().forEach((value) => {
			if (
				value.IsA("BallSocketConstraint") ||
				value.IsA("JointInstance")
			) {
				value.Destroy();
			}
		});

		const profile = this.profile();
		profile.Data.Lives -= 1;
		if (profile.Data.Lives > 0) {
			this.dataService.resetLifeValues(profile.Data);
		} else {
			this.dataService.resetCharacterValues(profile.Data);
		}

		task.delay(Players.RespawnTime, () => this.player().LoadCharacter());
	}

	snipe(): void {
		const particleAttachment = this.instance.Head.ParticleAttachment;

		particleAttachment.Critted.Play();
		particleAttachment.Sniped.Play();
		particleAttachment.Crit.Emit(1);
	}

	giveForceField(): void {
		const ffTrove = this.trove.extend();
		const startPos = this.instance.HumanoidRootPart.Position;
		const startTick = tick();
		const ff = ffTrove.add(new Instance("ForceField"));
		ff.Parent = this.instance;

		ffTrove.add(
			setInterval(() => {
				const timeExpired = tick() - startTick > this.FF_DURATION;

				const currentPos = this.instance.HumanoidRootPart.Position;
				const distanceFromStart = currentPos.sub(startPos).Magnitude;
				const leftSpawn = distanceFromStart > this.PROTECTED_DISTANCE;

				if (timeExpired || leftSpawn) ffTrove.destroy();
			}, 0.5),
		);
	}
}
