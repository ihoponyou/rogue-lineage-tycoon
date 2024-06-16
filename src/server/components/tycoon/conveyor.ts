import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";

interface ConveyorAttributes {
	enabled: boolean;
	speed: number;
}

type ConveyorInstance = BasePart;

@Component({
	tag: "Conveyor",
	defaults: {
		enabled: false,
		speed: 1,
	},
})
export class Conveyor
	extends BaseComponent<ConveyorAttributes, ConveyorInstance>
	implements OnStart
{
	public onStart(): void {
		this.onAttributeChanged("enabled", (newValue) =>
			newValue ? this.onEnabled() : this.onDisabled(),
		);
		this.attributes.enabled ? this.onEnabled() : this.onDisabled();
	}

	private onEnabled(): void {
		this.instance.AssemblyLinearVelocity =
			this.instance.CFrame.LookVector.mul(this.attributes.speed);
	}

	private onDisabled(): void {
		this.instance.AssemblyLinearVelocity = Vector3.zero;
	}
}
