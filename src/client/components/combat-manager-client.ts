import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Debris, Workspace } from "@rbxts/services";
import { LOCAL_PLAYER } from "client/constants";
import { AnimationController } from "client/controllers/animation-controller";
import { InputController } from "client/controllers/input-controller";
import { Events } from "client/networking";
import { SharedComponents } from "shared/components/combat-manager";
import { PlayerClient } from "./player-client";

const VISUALIZE_HITBOXES = true;

@Component({
	tag: SharedComponents.CombatManager.TAG,
	predicate: (instance) => instance === LOCAL_PLAYER,
})
export class CombatManager
	extends SharedComponents.CombatManager
	implements OnStart
{
	public constructor(
		private animationController: AnimationController,
		private inputController: InputController,
		private playerClient: PlayerClient,
	) {
		super();
	}

	public onStart(): void {
		this.inputController.onLightAttackTriggered(() => this.lightAttack());
	}

	private lightAttack(): void {
		if (!this.canLightAttack()) return;

		Events.combat.lightAttack();

		const animationName = `Punch${this.attributes.combo + 1}`;

		let playedSound = false;
		const swingSoundConn = this.animationController.connectToMarkerReached(
			animationName,
			"swing",
			() => {
				// also replicate to other clients
				playedSound = true;
				print("play sound");
			},
		);
		const tryDamageConn = this.animationController.connectToMarkerReached(
			animationName,
			"contact",
			() => Events.combat.damage(this.spawnHitbox(new Vector3(6, 6, 5))),
		);
		this.animationController.connectToAnimationTrackStopped(
			animationName,
			() => {
				if (!playedSound)
					warn(
						`swing sound did not play for ${animationName}: keyframe markers may be missing`,
					);
				swingSoundConn.Disconnect();
				tryDamageConn.Disconnect();
			},
		);
		this.animationController.play(animationName);
	}

	private spawnHitbox(size: Vector3): Model[] {
		const character = this.playerClient.getCharacter();
		const overlapParams = new OverlapParams();
		overlapParams.AddToFilter(character.instance);
		overlapParams.CollisionGroup = "Characters";
		overlapParams.FilterType = Enum.RaycastFilterType.Exclude;

		const rootPartCFrame = character.getHumanoidRootPart().CFrame;
		const hitboxCFrame = rootPartCFrame.add(
			rootPartCFrame.LookVector.mul(size.Z / 2),
		);
		const parts = Workspace.GetPartBoundsInBox(
			hitboxCFrame,
			size,
			overlapParams,
		);
		if (VISUALIZE_HITBOXES) this.spawnVisualizer(hitboxCFrame, size);
		const hits: Model[] = [];
		parts.forEach((basePart) => {
			const parent = basePart.Parent as Model | undefined;
			if (parent === undefined) return;
			if (parent.ClassName !== "Model") return;
			if (hits.includes(parent)) return;
			if (!parent.HasTag("Character")) return;
			hits.push(parent);
		});

		return hits;
	}

	private spawnVisualizer(
		cframe: CFrame,
		size: Vector3,
		duration = 0.5,
	): void {
		const part = new Instance("Part");
		part.Parent = Workspace;
		part.Anchored = true;
		part.Color = Color3.fromRGB(255);
		part.CFrame = cframe;
		part.Size = size;
		part.Transparency = 0.8;
		part.CanCollide = false;
		part.CanQuery = false;
		part.CanTouch = false;
		Debris.AddItem(part, duration);
	}
}
