import { Controller, Dependency } from "@flamework/core";
import { OnLocalCharacterAdded } from "../../../../../types/lifecycles";
import { CharacterClient as Character } from "client/modules/components/character-client";
import { Components } from "@flamework/components";
import { ReplicatedStorage } from "@rbxts/services";

@Controller()
export class AnimationController implements OnLocalCharacterAdded {
	private character?: Character;
	private animationQueue = new Set<Animation>();
	private loadedTracks = new Map<string, AnimationTrack>();

	onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components.waitForComponent<Character>(character)
			.andThen((value) => this.character = value);

		character.WaitForChild("Humanoid").WaitForChild("Animator");
		
		for (const animation of ReplicatedStorage.Animations.GetDescendants()) {
			if (!animation.IsA("Animation")) continue;
			this.loadAnimation(animation);
		}
	}

	loadAnimation(animation: Animation): boolean {
		const animator = this.character?.getAnimator();
		if (!animator) error(`animator unavailable;`);
		
		const track = animator.LoadAnimation(animation);
		this.loadedTracks.set(animation.Name, track);
		
		if (animation.Name === "ClimbUp")
			track.Priority = Enum.AnimationPriority.Action2;

		return true;
	}

	loadQueuedAnimations(): void {
		this.animationQueue.forEach((animation) => {
			const success = this.loadAnimation(animation);
			if (success) this.animationQueue.delete(animation);
		});
	}

	play(trackName: string): void {
		const track = this.loadedTracks.get(trackName);
		if (!track) error(`${trackName} not found`);
		track.Play();
	}

	stop(trackName: string): void {
		const track = this.loadedTracks.get(trackName);
		if (!track) error(`${trackName} not found`);
		track.Stop();
	}
}