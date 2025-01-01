import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { store } from "server/store";
import { selectPlayerCurrencies } from "server/store/selectors";
import { ANIMATIONS, SFX, VFX } from "shared/constants";
import { raycastWithVisualizer } from "shared/modules/raycasting";
import { CharacterServer } from "./character-server";
import { KeyInteractable } from "./interactable/key-interactable";
import { PlayerCharacter } from "./player-character";
import { RagdollServer } from "./ragdoll-server";

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
	extends KeyInteractable<Attributes, Model>
	implements OnStart
{
	private gripTrove = this.trove.extend();

	public constructor(
		private components: Components,
		private character: CharacterServer,
		private ragdoll: RagdollServer,
	) {
		super();
	}

	public override onStart(): void {
		super.onStart();

		this.toggle(false);
		this.setKey(Enum.KeyCode.B);
		this.trove.add(
			this.ragdoll.onAttributeChanged("isRagdolled", (newValue) => {
				this.toggle(newValue);
			}),
		);
	}

	public override interact(player: Player): void {
		if (!player.Character) return;
		const characterComponent =
			this.components.getComponent<CharacterServer>(player.Character);
		if (!characterComponent) return;
		// print(this.attributes.gettingGripped);
		this.attributes.gettingGripped
			? this.release(characterComponent)
			: this.grip(characterComponent);
	}

	public grip(gripper: CharacterServer): void {
		const grippeePosition = this.character.getHumanoidRootPart().Position;
		const params = new RaycastParams();
		params.AddToFilter(this.instance);
		const floorCheck = raycastWithVisualizer(
			grippeePosition,
			Vector3.yAxis.mul(-4),
			params,
		);

		if (!floorCheck) error(`${this.instance.Name} is mid-air`);

		this.attributes.gettingGripped = true;

		const ragdoll = this.components.getComponent<RagdollServer>(
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

		const gripperHumanoid = gripper.getHumanoid();
		const grippeeHumanoid = this.character.getHumanoid();

		grippeeHumanoid.AutoRotate = false;
		gripperHumanoid.AutoRotate = false;

		const torso = this.character.getTorso();
		const head = this.character.getHead();
		const hitSound = this.gripTrove.clone(SFX.FistsHit);
		const hitParticle = this.gripTrove.clone(VFX.Torso.FistsHit);
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
		this.gripTrove.connect(
			grippingAnimationTrack.KeyframeReached,
			(keyframeName) => {
				if (keyframeName !== "FinalHit") return;
				hitSound.Play();
				hitParticle.Emit(1);
				grippingAnimationTrack.Play();

				if (++ticks < 5) return;
				this.release(gripper);
				this.character.kill();

				// steal silver
				const grippeePlayer = this.components
					.getComponent<PlayerCharacter>(this.instance)
					?.getPlayer();
				if (grippeePlayer === undefined) return;
				const gripperPlayer = this.components
					.getComponent<PlayerCharacter>(gripper.instance)
					?.getPlayer();
				if (gripperPlayer === undefined) return;
				const grippeeSilver =
					store.getState(
						selectPlayerCurrencies(grippeePlayer.instance),
					)?.Silver.amount ?? 0;
				const silverToLose = math.ceil(grippeeSilver / 2);
				store.addCurrency(
					gripperPlayer.instance,
					"Silver",
					silverToLose,
				);
				store.addCurrency(
					grippeePlayer.instance,
					"Silver",
					-silverToLose,
				);
			},
		);
		this.gripTrove.add(() => grippingAnimationTrack.Stop());

		grippingAnimationTrack.Play();
		// gripee may need to have motor6ds reenabled because of ragdoll
		grippedAnimationTrack.Play(0, 1, 0);

		this.snapToGround(floorCheck, gripper, this.character);
	}

	public release(gripper: CharacterServer): void {
		this.attributes.gettingGripped = false;

		this.gripTrove.clean();

		const gripperRootPart = gripper.getHumanoidRootPart();
		const grippeeRootPart = this.character.getHumanoidRootPart();
		gripper.getHumanoid().AutoRotate = true;
		grippeeRootPart.Anchored = false;
		gripperRootPart.Anchored = false;

		// redisable motor6ds if ragdolled
	}

	private snapToGround(
		floorCheck: RaycastResult,
		gripper: CharacterServer,
		grippee: CharacterServer,
	) {
		const gripperRootPart = gripper.getHumanoidRootPart();
		const grippeeRootPart = grippee.getHumanoidRootPart();
		const goalPos = floorCheck.Position.add(Vector3.yAxis.mul(3));

		// the animation needs the grippee to face opposite of the gripper
		// with the grippee slightly in front of the gripper
		grippeeRootPart.Anchored = true;
		grippee.instance.PivotTo(
			CFrame.lookAt(
				goalPos,
				goalPos.sub(gripperRootPart.CFrame.LookVector),
			),
		);

		gripperRootPart.Anchored = true;
		gripper.instance.PivotTo(
			CFrame.lookAt(
				goalPos.add(gripperRootPart.CFrame.LookVector.mul(-2.5)),
				goalPos,
			),
		);
	}
}
