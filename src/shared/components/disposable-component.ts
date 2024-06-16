import { BaseComponent, Component } from "@flamework/components";
import { OnRemoved } from "../../../types/lifecycles";
import { Trove } from "@rbxts/trove";
import { Reflect } from "@flamework/core";

@Component()
export abstract class DisposableComponent<A extends {}, I extends Instance>
	extends BaseComponent<A, I>
	implements OnRemoved
{
	protected trove = new Trove();

	onRemoved(): void {
		// print(Reflect.getMetadata(this, "identifier"));
		this.trove.destroy();
	}
}
