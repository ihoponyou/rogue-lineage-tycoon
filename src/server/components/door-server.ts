import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractDoor } from "shared/components/abstract-door";
import { SFX } from "shared/constants";
import { ProximityInteractable } from "./interactable/proximity-interactable";

@Component({
	tag: AbstractDoor.TAG,
	defaults: {
		isUnlocked: true,
		isOpen: false,
		openCFrameOffset: CFrame.Angles(0, math.pi / 2, 0),
	},
})
export class DoorServer extends AbstractDoor implements OnStart {
	private closeDoorThread?: thread;
	private knockSound = this.trove.clone(SFX.DoorKnock);

	constructor(private interactable: ProximityInteractable) {
		super();
	}

	onStart(): void {
		this.knockSound.Parent = this.instance;

		this.interactable.toggle(this.attributes.isUnlocked);
		this.trove.add(
			this.onAttributeChanged("isUnlocked", (newValue) => {
				this.interactable.toggle(newValue);
			}),
		);

		this.interactable.onInteracted((_player) => {
			this.attributes.isOpen = !this.attributes.isOpen;

			const goalHingeCFrame = this.attributes.isOpen
				? this.openedHingeCFrame
				: this.closedHingeCFrame;

			if (this.closeDoorThread !== undefined) {
				task.cancel(this.closeDoorThread);
				this.trove.remove(this.closeDoorThread);
			}
			this.closeDoorThread = this.trove.add(
				task.delay(AbstractDoor.TWEEN_DURATION + 0.1, () => {
					this.instance.Hinge.CFrame = goalHingeCFrame;
					this.closeDoorThread = undefined;
				}),
			);
		});

		this.interactable.onInteractFailed(() => {
			this.knockSound.Play();
		});
	}

	toggleUnlocked(bool?: boolean): void {
		this.attributes.isUnlocked = bool ?? !this.attributes.isUnlocked;
	}
}
