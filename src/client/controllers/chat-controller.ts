import { Controller, OnStart } from "@flamework/core";
import { TextChatService } from "@rbxts/services";
import { LOCAL_PLAYER } from "client/constants";
import { Events } from "client/network";

@Controller()
export class ChatController implements OnStart {
	private generalChannel!: TextChannel;

	public onStart(): void {
		this.generalChannel = TextChatService.WaitForChild(
			"TextChannels",
		).WaitForChild("RBXGeneral") as TextChannel;

		Events.greeted.connect((player) => {
			this.generalChannel.SendAsync(
				`Hi ${player}, I'm ${LOCAL_PLAYER.Name}!`,
			);
		});
	}
}
