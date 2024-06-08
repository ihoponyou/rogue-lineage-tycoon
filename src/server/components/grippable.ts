import { Component, Components } from "@flamework/components";
import { CharacterServer } from "./character-server";
import { Dependency, OnStart } from "@flamework/core";
import { RagdollServer } from "./ragdoll-server";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { KeyInteractable } from "./interactable/key-interactable";
import { ANIMATIONS, SFX, VFX } from "shared/constants";
import { DisposableComponent } from "shared/components/disposable-component";

interface Attributes {
	gettingGripped: boolean;
}

const GETTING_GRIPPED_ANIMATION = ANIMATIONS.Combat.Gripped;
const GRIPPING_ANIMATION = ANIMATIONS.Combat.Gripping;

@Component({
	tag: "Grippable",
	defaults: {
		gettingGripped: false,
	},
})
export class Grippable
	extends DisposableComponent<Attributes, Model>
	implements OnStart
{
	private gripTrove = this.trove.extend();
	private interactable: KeyInteractable;

	constructor(
		private character: CharacterServer,
		private ragdoll: RagdollServer,
	) {
		super();

		const components = Dependency<Components>();
		this.interactable = this.trove.add(
			components.addComponent<KeyInteractable>(this.instance),
		);
	}

	public onStart(): void {
		this.interactable.toggle(false);
		this.interactable.setKey(Enum.KeyCode.V);
		this.interactable.onInteracted((player) => this.onInteracted(player));
		this.trove.add(
			this.ragdoll.onAttributeChanged("isRagdolled", (newValue) => {
				this.interactable.toggle(newValue);
			}),
		);
	}

	private onInteracted(player: Player): void {
		if (!player.Character) return;
		const components = Dependency<Components>();
		const characterComponent = components.getComponent<CharacterServer>(
			player.Character,
		);
		if (!characterComponent) return;
		print(this.attributes.gettingGripped);
		this.attributes.gettingGripped
			? this.release(characterComponent)
			: this.grip(characterComponent);
	}

	grip(gripper: CharacterServer): void {
		const floorCheck = Workspace.Raycast(
			this.character.getHumanoidRootPart().Position,
			Vector3.yAxis.mul(-4),
		);

		if (!floorCheck) error(`${this.instance.Name} is mid-air`);

		this.attributes.gettingGripped = true;

		const components = Dependency<Components>();
		const ragdoll = components.getComponent<RagdollServer>(
			gripper.instance,
		);
		if (ragdoll) {
			this.gripTrove.add(
				ragdoll.onAttributeChanged("isRagdolled", (newValue) => {
					if (newValue) this.release(gripper);
				}),
			);
		}

		// detect gripper death/disconnect

		this.instance.RemoveTag("Burning");

		const gripperHumanoid = gripper.instance.Humanoid;
		const humanoid = this.character.instance.Humanoid;

		humanoid.AutoRotate = false;
		gripperHumanoid.AutoRotate = false;

		const torso = this.character.getTorso();
		const head = this.character.getHead();
		const hitSound = this.gripTrove.clone(SFX.PunchHit);
		const hitParticle = this.gripTrove.clone(VFX.PunchEmit);
		hitSound.Parent = torso;
		hitParticle.Parent = head;

		const grippedAnimationTrack = this.character
			.getAnimator()
			.LoadAnimation(GETTING_GRIPPED_ANIMATION);
		this.gripTrove.add(() => grippedAnimationTrack.Stop());
		this.gripTrove.connect(
			grippedAnimationTrack.KeyframeReached,
			(keyframeName) => {
				if (keyframeName === "Resting")
					grippedAnimationTrack.AdjustSpeed(0);
			},
		);

		let ticks = 0;
		const grippingAnimationTrack = gripper
			.getAnimator()
			.LoadAnimation(GRIPPING_ANIMATION);
		this.gripTrove.add(() => grippingAnimationTrack.Stop());
		this.gripTrove.connect(
			grippingAnimationTrack.KeyframeReached,
			(keyframeName) => {
				if (keyframeName !== "FinalHit") return;

				grippingAnimationTrack.Play();
				hitSound.Play();
				hitParticle.Emit(1);

				ticks++;
				if (ticks < 5) return;

				this.character.kill();

				hitSound.Ended.Wait();
				this.release(gripper);
			},
		);

		grippingAnimationTrack.Play();

		// gripee may need to have motor6ds reenabled because of ragdoll
		grippedAnimationTrack.Play(0, 1, 0);

		this.snapToGround(floorCheck, gripper, this.character);
	}

	snapToGround(
		floorCheck: RaycastResult,
		gripper: CharacterServer,
		grippee: CharacterServer,
	) {
		const gripperRootPart = gripper.getHumanoidRootPart();
		const grippeeRootPart = grippee.getHumanoidRootPart();
		const zRotation = grippeeRootPart.Orientation.Z;

		const goalPos = floorCheck.Position.add(Vector3.yAxis.mul(0.5));

		grippeeRootPart.Anchored = true;
		grippee.instance.PivotTo(
			CFrame.lookAt(goalPos, goalPos.add(Vector3.yAxis)),
		);
		const grippeePivot = grippee.instance.GetPivot();
		grippee.instance.PivotTo(
			grippeePivot.mul(CFrame.Angles(0, 0, zRotation)),
		);

		const gripperPosOffset = Vector3.yAxis
			.mul(2.5)
			.add(grippeeRootPart.CFrame.UpVector.mul(3));
		const gripperRotOffset = CFrame.Angles(math.rad(90), 0, math.rad(180));

		gripperRootPart.Anchored = true;
		gripper.instance.PivotTo(
			grippeePivot.mul(gripperRotOffset).add(gripperPosOffset),
		);
	}

	release(gripper: CharacterServer): void {
		this.attributes.gettingGripped = false;

		this.gripTrove.clean();

		gripper.instance.Humanoid.AutoRotate = true;
		gripper.getHumanoidRootPart().Anchored = false;
		this.character.getHumanoidRootPart().Anchored = false;

		// redisable motor6ds if ragdolled
	}
}
