import { BaseComponent, Component } from "@flamework/components";

type ProximityInteractableInstance = Instance & {
	Interact: RemoteEvent;
};

@Component({
	tag: "ProximityInteractable",
})
export class ProximityInteractableClient extends BaseComponent<
	{},
	ProximityInteractableInstance
> {
	interact(): void {
		this.instance.Interact.FireServer();
	}
}
