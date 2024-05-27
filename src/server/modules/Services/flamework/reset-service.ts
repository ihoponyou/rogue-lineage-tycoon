import { OnStart, Service } from "@flamework/core";
import { Events } from "server/modules/networking";

@Service()
export class ResetService implements OnStart {
	onStart(): void {
		Events.reset.connect((player) => {
			print(`${player.Name} wants to reset`);
		});
	}
}
