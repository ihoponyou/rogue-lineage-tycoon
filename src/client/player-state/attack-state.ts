import { Debris, Workspace } from "@rbxts/services";
import { Character } from "client/components/character";
import { AnimationController } from "client/controllers/animation-controller";
import { Events } from "client/networking";
import { StateMachine } from "shared/state-machine";
import { InputController } from "../controllers/input-controller";
import { CharacterState } from "./character-state";

const VISUALIZE_HITBOXES = false;

export class AttackState extends CharacterState {
	public readonly name = "Attack";

	// stun transition
	private playEffectsConn?: RBXScriptConnection;
	private registerHitConn?: RBXScriptConnection;

	public constructor(
		stateMachine: StateMachine,
		character: Character,
		private inputController: InputController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);
	}

	public override enter(): void {
		Events.combat.lightAttack();
		const animationName = `Punch${this.character.attributes.combo + 1}`;

		let playedSound = false;
		this.playEffectsConn = this.animationController.connectToMarkerReached(
			animationName,
			"swing",
			() => {
				// also replicate to other clients
				playedSound = true;
				print("play sound");
			},
		);
		this.registerHitConn = this.animationController.connectToMarkerReached(
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
				this.playEffectsConn?.Disconnect();
				this.registerHitConn?.Disconnect();
				this.stateMachine.transitionTo("idle");
			},
		);
		this.animationController.play(animationName);
	}

	public override exit(): void {
		this.playEffectsConn?.Disconnect();
		this.registerHitConn?.Disconnect();
	}

	// TODO: hitbox module
	private spawnHitbox(size: Vector3): Model[] {
		const overlapParams = new OverlapParams();
		overlapParams.AddToFilter(this.character.instance);
		overlapParams.CollisionGroup = "Characters";
		overlapParams.FilterType = Enum.RaycastFilterType.Exclude;

		const rootPartCFrame = this.character.getHumanoidRootPart().CFrame;
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
