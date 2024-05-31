import { Controller, Dependency } from "@flamework/core";
import {
	OnLocalCharacterAdded,
	OnLocalCharacterRemoving,
} from "../../../../types/lifecycles";
import { CharacterClient as Character } from "client/modules/components/character-client";
import { Components } from "@flamework/components";
import { ReplicatedStorage } from "@rbxts/services";

@Controller()
export class AnimationController
	implements OnLocalCharacterAdded, OnLocalCharacterRemoving
{
	private character?: Character;
	private loadedTracks = new Map<string, AnimationTrack>();

	onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components.waitForComponent<Character>(character).andThen((value) => {
			this.character = value;

			for (const animation of ReplicatedStorage.Animations.GetDescendants()) {
				if (!animation.IsA("Animation")) continue;
				this.loadAnimation(animation);
			}
		});
	}

	onLocalCharacterRemoving(character: Model): void {
		this.loadedTracks.clear();
	}

	loadAnimation(animation: Animation): boolean {
		const animator = this.character?.getAnimator();
		if (!animator) error(`animator unavailable;`);

		// TODO: handle missing AnimationClipProvider
		const track = animator.LoadAnimation(animation);
		this.loadedTracks.set(animation.Name, track);

		if (
			animation.Name === "ClimbUp" ||
			animation.Name === "ClimbRight" ||
			animation.Name === "ClimbLeft"
		) {
			track.Priority = Enum.AnimationPriority.Action2;
		}

		return true;
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
