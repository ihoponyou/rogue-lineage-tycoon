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
}

@Component({
	tag: "Character",
	defaults: {
		isKnocked: false,
		isAlive: true,
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

	constructor(
		private dataService: DataService,
		private ragdoll: RagdollServer,
	) {
		super();
	}

	onStart(): void {
		const humanoid = this.instance.Humanoid;
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Dead, false);

		const profile = this.dataService.getProfile(this.getPlayer());
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

	getPlayer(): Player {
		const player = Players.GetPlayerFromCharacter(this.instance);
		if (!player)
			error(`Player not found from character ${this.instance.Name}`);
		return player;
	}

	knock(): void {
		if (this.attributes.isKnocked) return;
		this.attributes.isKnocked = true;
		this.ragdoll.toggle(true);
	}

	kill(): void {
		if (!this.attributes.isAlive) return;
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
