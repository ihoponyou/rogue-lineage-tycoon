import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import { Events } from "server/networking";
import { DisposableComponent } from "shared/components/disposable-component";
import { Clickable } from "./interactable/clickable";

const OPTION_TEMPLATE = ReplicatedStorage.Assets.UI.Dialogue.OptionTemplate;

@Component({
	tag: "Dialogue",
})
export class Dialogue extends DisposableComponent implements OnStart {
	private openDialogues = new Map<Player, Array<ImageLabel>>();

	constructor(private clickable: Clickable) {
		super();
	}

	public onStart(): void {
		this.clickable.enable();
		this.clickable.onInteracted((player) => this.openDialogue(player));
	}

	private addOption(player: Player, text: string): ImageLabel {
		const option = OPTION_TEMPLATE.Clone();
		option.Parent = player.FindFirstChild("PlayerGui");
		option.OptionText.Text = text;
		option.OptionButton.MouseButton1Click.Connect(() => {
			print(`${text}`);
			this.closeDialogue(player);
		});

		this.openDialogues.get(player)?.push(option);

		return option;
	}

	private openDialogue(player: Player): void {
		if (this.openDialogues.has(player)) return; //error("player already in dialogue");

		this.openDialogues.set(player, []);

		Events.dialogue.open(player, "Aye, want some meat?", [
			this.addOption(player, "Yes"),
			this.addOption(player, "NO!!!!!!!"),
		]);
	}

	private closeDialogue(player: Player): void {
		this.openDialogues.get(player)?.forEach((option) => option.Destroy());
		this.openDialogues.delete(player);
		Events.dialogue.close(player);
	}
}
