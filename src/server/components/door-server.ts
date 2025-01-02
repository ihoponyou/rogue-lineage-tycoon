import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractDoor } from "shared/components/abstract-door";
import { KeyInteractable } from "./interactable/key-interactable";

@Component({
	tag: AbstractDoor.TAG,
	defaults: {
		isUnlocked: true,
		isOpen: false,
		openCFrameOffset: CFrame.Angles(0, math.pi / 2, 0),
	},
})
export class DoorServer extends AbstractDoor implements OnStart {
	constructor(private keyInteractable: KeyInteractable) {
		super();
	}

	onStart(): void {
		this.keyInteractable.toggle(this.attributes.isUnlocked);
		this.trove.add(
			this.onAttributeChanged("isUnlocked", (newValue) => {
				this.keyInteractable.toggle(newValue);
			}),
		);

		this.keyInteractable.onInteracted((_player) => {
			this.attributes.isOpen = !this.attributes.isOpen;

			const goalHingeCFrame = this.attributes.isOpen
				? this.openedHingeCFrame
				: this.closedHingeCFrame;

			task.delay(
				AbstractDoor.TWEEN_DURATION + 0.1,
				() => (this.instance.Hinge.CFrame = goalHingeCFrame),
			);
		});
	}
}
