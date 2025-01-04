import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { DIALOGUE } from "server/configs/dialogue";
import { Events } from "server/network";
import { Clickable } from "./interactable/clickable";
import { PlayerServer } from "./player-server";

const OPTION_TEMPLATE = ReplicatedStorage.Assets.UI.Dialogue.OptionTemplate;

type SpokeCallback = (topic: string) => void;

@Component({
	tag: "Dialogue",
})
export class Dialogue extends BaseComponent implements OnStart {
	private static openDialogues = new Map<Player, Array<ImageLabel>>();

	private config = DIALOGUE[this.instance.Name];
	private spoke = new Signal<SpokeCallback>();

	public constructor(
		private components: Components,
		private clickable: Clickable,
	) {
		super();
	}

	public onStart(): void {
		if (this.config === undefined)
			error(`missing ${this.instance.Name} dialogue cfg`);
		if (this.config["Open"] === undefined)
			error('missing "Open" dialogue cfg');

		this.clickable.toggle(true);
		this.clickable.onInteracted((player) => {
			this.open(player);
		});
	}

	private addOption(
		player: Player,
		text: string,
		onClick: (component: Dialogue, player: PlayerServer) => void,
	): ImageLabel {
		const option = OPTION_TEMPLATE.Clone();
		option.Parent = player.FindFirstChild("PlayerGui");
		option.OptionText.Text = text;
		option.OptionButton.MouseButton1Click.Connect(() =>
			onClick(
				this,
				this.components.waitForComponent<PlayerServer>(player).expect(),
			),
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

		if (this.instance.Name === "Alfric") {
			this.instance
				.FindFirstChild("HumanoidRootPart")
				?.FindFirstChildOfClass("Sound")
				?.Play();
		}
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

		this.spoke.Fire(topic);
	}

	public onSpoke(callback: SpokeCallback): RBXScriptConnection {
		return this.spoke.Connect(callback);
	}
}
