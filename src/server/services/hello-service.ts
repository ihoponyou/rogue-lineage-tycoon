import { Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/network";
import { OnPlayerAdded } from "../../../types/lifecycles";

@Service()
export class HelloService implements OnPlayerAdded {
	public onPlayerAdded(chatter: Player): void {
		chatter.Chatted.Connect((message) => {
			const tokens = message.split(" ");
			for (let i = 0; i < tokens.size(); i++) {
				if (i === 0) {
					if (tokens[i].lower() === "hi") continue;
					else return;
				}
				if (tokens[i] === "") continue;
				const player = Players.GetPlayers().find(
					(value) => value.Name === tokens[i],
				);
				if (player === undefined) return;
				Events.greeted(player, chatter);
			}
		});
	}
}
