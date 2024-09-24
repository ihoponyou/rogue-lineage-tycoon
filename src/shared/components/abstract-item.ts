import { BaseComponent, Component } from "@flamework/components";

@Component()
export abstract class AbstractItem<
	A extends {} = {},
	I extends Tool = Tool,
> extends BaseComponent<A, I> {
	public static readonly TAG = "Item";
}
