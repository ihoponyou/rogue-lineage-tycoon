import { BaseComponent, Component } from "@flamework/components";
import { OnRemoved } from "../../../../types/lifecycles";
import { Trove } from "@rbxts/trove";

@Component()
export abstract class DisposableComponent<A extends {}, I extends Instance>
	extends BaseComponent<A, I>
	implements OnRemoved
{
	protected trove = new Trove();

	onRemoved(): void {
		this.trove.destroy();
	}
}
