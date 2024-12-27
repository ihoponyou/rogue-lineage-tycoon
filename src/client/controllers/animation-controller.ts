import { Components } from "@flamework/components";
import { Controller } from "@flamework/core";
import { LocalCharacter } from "client/components/local-character";
import { ANIMATIONS } from "shared/constants";
import {
	OnLocalCharacterAdded,
	OnLocalCharacterRemoving,
} from "shared/modules/lifecycles";

@Controller()
export class AnimationController
	implements OnLocalCharacterAdded, OnLocalCharacterRemoving
{
	private character?: LocalCharacter;
	private loadedTracks = new Map<string, AnimationTrack>();

	constructor(private components: Components) {}

	public onLocalCharacterAdded(character: Model): void {
		this.character = this.components
			.waitForComponent<LocalCharacter>(character)
			.expect();
		for (const animation of ANIMATIONS.GetDescendants()) {
			if (!animation.IsA("Animation")) continue;
			this.loadAnimation(animation);
		}
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

	public play(
		trackName: string,
		fadeTime = 0.100000001,
		weight = 1,
		speed = 1,
	): void {
		this.getTrack(trackName).Play(fadeTime, weight, speed);
	}

	public stop(trackName: string): void {
		this.getTrack(trackName).Stop();
	}

	public setSpeed(trackName: string, speed: number): void {
		this.getTrack(trackName).AdjustSpeed(speed);
	}

	public connectToMarkerReached(
		trackName: string,
		markerName: string,
		callback: () => void,
		once: boolean = false,
	): RBXScriptConnection {
		const signal =
			this.getTrack(trackName).GetMarkerReachedSignal(markerName);
		return once ? signal.Once(callback) : signal.Connect(callback);
	}

	public connectToAnimationTrackStopped(
		trackName: string,
		callback: Callback,
		once = false,
	): RBXScriptConnection {
		const signal = this.getTrack(trackName).Stopped;
		return once ? signal.Once(callback) : signal.Connect(callback);
	}

	private getTrack(trackName: string): AnimationTrack {
		const track = this.loadedTracks.get(trackName);
		if (!track) error(`${trackName} not found`);
		return track;
	}
}
