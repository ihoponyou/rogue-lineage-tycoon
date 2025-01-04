import { BaseComponent, Component } from "@flamework/components";
import { Trove } from "@rbxts/trove";

interface DoorAttributes {
	openCFrameOffset: CFrame;
	isOpen: boolean;
	isUnlocked: boolean;
}

type DoorInstance = BasePart & {
	Hinge: BasePart;
};

@Component()
export abstract class AbstractDoor extends BaseComponent<
	DoorAttributes,
	DoorInstance
> {
	static readonly TAG = "Door";
	static readonly TWEEN_DURATION = 0.4;

	protected trove = new Trove();
	protected closedHingeCFrame = this.instance.Hinge.CFrame;
	protected openedHingeCFrame = this.closedHingeCFrame.mul(
		this.attributes.openCFrameOffset,
	);
}
