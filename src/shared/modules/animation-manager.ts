export class AnimationManager {
	private tracks = new Map<string, AnimationTrack>();

	public constructor(private animator: Animator) {}

	/**
	 * this also **REMOVES** any already loaded animations
	 */
	public loadAnimations(animations: Animation[]): void {
		this.stopPlayingAnimations(0);

		this.tracks.clear();
		for (const animation of animations) {
			const track = this.animator.LoadAnimation(animation);
			if (track.Name.match("[iI]dle")[0] !== undefined) {
				track.Priority = Enum.AnimationPriority.Idle;
			}
			this.tracks.set(animation.Name, track);
		}
	}

	public getTrack(name: string): AnimationTrack | undefined {
		const track = this.tracks.get(name);
		if (!track) {
			warn(`No loaded animation named "${name}"`);
		}
		return track;
	}

	public playTrack(
		name: string,
		fadeTime = 0.100000001,
		weight = 1,
		speed = 1,
	) {
		this.getTrack(name)?.Play(fadeTime, weight, speed);
	}

	public stopTrack(name: string, fadeTime = 0.100000001) {
		this.getTrack(name)?.Stop(fadeTime);
	}

	public stopPlayingAnimations(fadeTime = 0.100000001) {
		this.tracks.forEach((track) => track.Stop(fadeTime));
	}

	public connectToTrackMarker(
		trackName: string,
		markerName: string,
		callback: (param?: string) => void,
	) {
		return this.getTrack(trackName)
			?.GetMarkerReachedSignal(markerName)
			.Connect(callback);
	}

	public destroy() {
		this.stopPlayingAnimations(0);
	}
}
