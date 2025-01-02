import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { TweenService } from "@rbxts/services";
import { AbstractDoor } from "shared/components/abstract-door";
import { SFX } from "shared/constants";

@Component({
	tag: AbstractDoor.TAG,
})
export class DoorClient extends AbstractDoor implements OnStart {
	private tween?: Tween;
	private conn?: RBXScriptConnection;
	private tweenInfo = new TweenInfo(
		AbstractDoor.TWEEN_DURATION,
		Enum.EasingStyle.Quad,
		Enum.EasingDirection.Out,
	);
	private openSound = this.trove.clone(SFX.WoodDoorOpen);
	private closeSound = this.trove.clone(SFX.WoodDoorClose);

	onStart(): void {
		this.openSound.Parent = this.instance;
		this.closeSound.Parent = this.instance;

		this.trove.add(
			this.onAttributeChanged("isOpen", (newValue) => {
				const sound = newValue ? this.openSound : this.closeSound;
				sound.Play();

				const goalHingeCFrame = newValue
					? this.openedHingeCFrame
					: this.closedHingeCFrame;
				if (this.tween !== undefined) {
					this.tween.Cancel();
				}
				this.tween = TweenService.Create(
					this.instance.Hinge,
					this.tweenInfo,
					{ CFrame: goalHingeCFrame },
				);
				this.tween.Play();
				this.conn = this.trove.connect(
					this.tween.Completed,
					(playbackState) => {
						if (playbackState !== Enum.PlaybackState.Completed)
							return;
						this.tween = undefined;
						if (this.conn !== undefined) {
							this.conn.Disconnect();
							this.trove.remove(this.conn);
						}
					},
				);
			}),
		);
	}
}
