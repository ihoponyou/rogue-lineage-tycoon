import { Components } from "@flamework/components";
import { Controller } from "@flamework/core";
import { CharacterClient as Character } from "client/components/character-client";
import { ANIMATIONS } from "shared/constants";
import { Inject } from "shared/inject";
import {
	OnLocalCharacterAdded,
	OnLocalCharacterRemoving,
} from "../../../types/lifecycles";

@Controller()
export class AnimationController
	implements OnLocalCharacterAdded, OnLocalCharacterRemoving
{
	private character?: Character;
	private loadedTracks = new Map<string, AnimationTrack>();

	@Inject
	private components!: Components;

	public onLocalCharacterAdded(character: Model): void {
		this.components
			.waitForComponent<Character>(character)
			.andThen((value) => {
				this.character = value;

				for (const animation of ANIMATIONS.GetDescendants()) {
					if (!animation.IsA("Animation")) continue;
					this.loadAnimation(animation);
				}
			});
	}

	public onLocalCharacterRemoving(): void {
		this.loadedTracks.clear();
	}

	public loadAnimation(animation: Animation): boolean {
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

	public play(trackName: string): void {
		const track = this.loadedTracks.get(trackName);
		if (!track) error(`${trackName} not found`);
		track.Play();
	}

	public stop(trackName: string): void {
		const track = this.loadedTracks.get(trackName);
		if (!track) error(`${trackName} not found`);
		track.Stop();
	}
}
