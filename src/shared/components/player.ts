import { Component } from "@flamework/components";
import {
	SharedComponent,
	SharedComponentNetwork,
} from "@rbxts/shared-components-flamework";
import { DisposableComponent } from "./disposable-component";

@Component()
export abstract class AbstractPlayer extends DisposableComponent<{}, Player> {
	public readonly Name = this.instance.Name;
	public readonly UserId = this.instance.UserId;
}
