import { Component, Components } from "@flamework/components";
import { OnTick } from "@flamework/core";
import { Players } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import { Events } from "server/networking";
import { DataService } from "server/services/data-service";
import { store } from "server/store";
import { AbstractCharacter } from "shared/components/abstract-character";
import { Inject } from "shared/inject";
import {
	deserializeVector3,
	serializeVector3,
} from "shared/serialized-vector3";
import { selectConditions } from "shared/store/slices/players/slices/conditions/selectors";
import {
	selectHealth,
	selectTemperature,
} from "shared/store/slices/players/slices/resources/selectors";
import { selectTransform } from "shared/store/slices/players/slices/transform/selectors";
import { PlayerServer } from "../player-server";
import { RagdollServer } from "./ragdoll-server";

const FF_DURATION = 15;
const PROTECTED_DISTANCE = 5;
const BASE_REGEN_RATE = 0.5;
const MINIMUM_TEMPERATURE = 0;
const MAXIMUM_TEMPERATURE = 100;
const KNOCK_PERCENT_THRESHOLD = 0.15;
const DEFAULT_JUMP_POWER = 50;

const EVENTS = Events.character;

@Component({
	tag: "Character",
	defaults: {
		isKnocked: false,
		isAlive: true,
	},
})
// consider using server/client/shared namespaces to allow name overlap
export class CharacterServer extends AbstractCharacter implements OnTick {
	private disconnectReleaseListener?: () => void;

	@Inject
	private components!: Components;

	@Inject
	private dataService!: DataService;

	public constructor(private ragdoll: RagdollServer) {
		super();
	}

	public override onStart(): void {
		super.onStart();

		this.instance.AddTag("FallDamage");

		const player = this.getPlayer();
		this.disconnectReleaseListener = this.dataService.connectToPreRelease(
			player,
			(profile) => {
				const pivot = this.instance.GetPivot();
				const yRotation = pivot.ToEulerAnglesXYZ()[1];
				profile.Data.transform.position = serializeVector3(
					pivot.Position,
				);
				profile.Data.transform.yRotation = yRotation;
			},
		);
	}

	public onTick(dt: number): void {
		if (!this.attributes.isAlive) return;

		const player = this.getPlayer();

		store.decayStomach(player.UserId, dt);
		store.decayToxicity(player.UserId, dt);

		const humanoid = this.humanoid;
		if (humanoid.Health >= humanoid.MaxHealth) return;

		const boost = 0; // TODO: health regen multiplier
		const regenRate = BASE_REGEN_RATE * (1 + boost);
		humanoid.TakeDamage(dt * -regenRate);
	}

	public override onHealthChanged(health: number): void {
		store.setHealth(this.getPlayer().UserId, health);
		const percentHealth = health / this.humanoid.MaxHealth;
		if (this.attributes.isKnocked) {
			if (percentHealth > KNOCK_PERCENT_THRESHOLD) {
				if (this.instance.GetAttribute("isCarried") === true) return;
				this.attributes.isKnocked = false;
				this.ragdoll.toggle(false);
			}
			return;
		}

		if (health > 0) return;

		this.knock();
	}

	public loadHealth(): void {
		let savedHealth = store.getState(selectHealth(this.getPlayer().UserId));
		if (savedHealth === undefined) error("health not found");
		if (savedHealth < 1) savedHealth = 100;
		this.humanoid.Health = savedHealth;
	}

	public loadConditions(): void {
		const conditions = store.getState(
			selectConditions(this.getPlayer().UserId),
		);
		if (conditions === undefined) error("conditions not found");
		for (const condition of conditions) {
			this.instance.AddTag(condition);
		}
	}

	public loadTransform(): void {
		const savedTransform = store.getState(
			selectTransform(this.getPlayer().UserId),
		);
		if (savedTransform === undefined) error("transform not found");
		this.instance.PivotTo(
			new CFrame(deserializeVector3(savedTransform.position)).mul(
				CFrame.fromOrientation(0, savedTransform.yRotation, 0),
			),
		);
	}

	public knock(): void {
		if (this.attributes.isKnocked) return;
		this.attributes.isKnocked = true;
		this.ragdoll.toggle(true);
	}

	public breakJoints(): void {
		this.instance.GetDescendants().forEach((value) => {
			if (
				value.IsA("BallSocketConstraint") ||
				value.IsA("JointInstance")
			) {
				value.Destroy();
			}
		});
	}

	public kill(): void {
		if (!this.attributes.isAlive) return;
		this.attributes.isAlive = false;

		this.humanoid.Health = 0;
		this.breakJoints();

		const player = this.getPlayer();
		const playerId = player.UserId;

		store.subtractLife(playerId);

		EVENTS.killed.fire(player);

		this.components
			.waitForComponent<PlayerServer>(this.getPlayer())
			.andThen((playerServer) => {
				task.wait(Players.RespawnTime);
				playerServer.loadCharacter().catch(warn);
			});
	}

	public snipe(): void {
		const particleAttachment = this.getHead().ParticleAttachment;
		if (!particleAttachment) return;

		particleAttachment.Critted.Play();
		particleAttachment.Sniped.Play();
		particleAttachment.Crit.Emit(1);

		this.kill();
	}

	public giveForceField(): void {
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

	public adjustTemperature(amount: number) {
		const player = this.getPlayer();
		const temperature = store.getState(selectTemperature(player.UserId));
		if (temperature === undefined) error("no data");

		const newTemperature = math.clamp(
			temperature + amount,
			MINIMUM_TEMPERATURE,
			MAXIMUM_TEMPERATURE,
		);
		store.setTemperature(tostring(player.UserId), newTemperature);

		if (newTemperature === MINIMUM_TEMPERATURE)
			this.instance.AddTag("Frostbite");
		else if (newTemperature === MAXIMUM_TEMPERATURE)
			this.instance.AddTag("BurnScar");
	}

	public toggleJump(enable: boolean): void {
		this.humanoid.JumpPower = enable ? DEFAULT_JUMP_POWER : 0;
	}

	public takeDamage(amount: number): void {
		this.humanoid.TakeDamage(math.min(this.humanoid.Health, amount));
	}
}
