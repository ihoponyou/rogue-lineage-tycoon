import { Controller, OnStart } from "@flamework/core";
import { EFFECTS } from "client/effects";
import { Events } from "client/networking";

@Controller()
export class EffectController implements OnStart {
	public onStart(): void {
		Events.playEffect.connect((name, ...args: unknown[]) => {
			print(name, ...args);
			EFFECTS[name](...args);
		});
	}
}
