import { BaseComponent, Component } from "@flamework/components";
import { Trove } from "@rbxts/trove";

@Component()
export abstract class DisposableComponent<
	A extends {} = {},
	I extends Instance = Instance,
> extends BaseComponent<A, I> {
	protected trove = new Trove();

	public override destroy(): void {
		this.trove.destroy();
		super.destroy();
	}
}
