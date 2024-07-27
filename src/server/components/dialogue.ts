import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import { DIALOGUE } from "server/configs/dialogue";
import { Events } from "server/networking";
import { DisposableComponent } from "shared/components/disposable-component";
import { Clickable } from "./interactable/clickable";

const OPTION_TEMPLATE = ReplicatedStorage.Assets.UI.Dialogue.OptionTemplate;

@Component({
	tag: "Dialogue",
})
export class Dialogue extends DisposableComponent implements OnStart {
	private static openDialogues = new Map<Player, Array<ImageLabel>>();
	private config = DIALOGUE[this.instance.Name];

	public constructor(private clickable: Clickable) {
		super();
	}

	public onStart(): void {
		if (this.config === undefined)
			error(`missing ${this.instance.Name} dialogue cfg`);
		if (this.config["Open"] === undefined)
			error('missing "Open" dialogue cfg');

		this.clickable.enable();
		this.clickable.onInteracted((player) => {
			this.open(player);
		});
	}

	private addOption(
		player: Player,
		text: string,
		onClick: (component: Dialogue, player: Player) => void,
	): ImageLabel {
		const option = OPTION_TEMPLATE.Clone();
		option.Parent = player.FindFirstChild("PlayerGui");
		option.OptionText.Text = text;
		option.OptionButton.MouseButton1Click.Connect(() =>
			onClick(this, player),
		);

		Dialogue.openDialogues.get(player)?.push(option);

		return option;
	}

	public clearOptions(player: Player): void {
		const dialogue = Dialogue.openDialogues.get(player);
		if (dialogue === undefined) return;
		dialogue.forEach((option) => option.Destroy());
		dialogue.clear();
	}

	public open(player: Player): void {
		if (Dialogue.openDialogues.has(player)) return; //error("player already in dialogue");

		Dialogue.openDialogues.set(player, []);

		this.speak(player, "Open");
	}

	public close(player: Player): void {
		this.clearOptions(player);
		Dialogue.openDialogues.delete(player);
		Events.dialogue.close(player);
	}

	public speak(player: Player, topic: string): void {
		const topicConfig = this.config[topic];
		if (topicConfig === undefined)
			error(`cannot find dialogue cfg: ${this.instance.Name}/${topic}`);
		this.clearOptions(player);

		const options: Array<ImageLabel> = [];
		topicConfig.options.forEach((optionConfig) => {
			options.push(
				this.addOption(
					player,
					optionConfig.label,
					optionConfig.onClick,
				),
			);
		});

		Events.dialogue.open(
			player,
			this.instance.Name,
			topicConfig.speech,
			options,
		);
	}
}
