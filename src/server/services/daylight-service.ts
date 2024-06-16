import { OnTick, Service } from "@flamework/core";
import { Lighting } from "@rbxts/services";

export const MINUTES_PER_DAY = 1;
export const SECONDS_PER_DAY = MINUTES_PER_DAY * 60;

@Service()
export class DaylightService implements OnTick {
	onTick(dt: number): void {
		Lighting.ClockTime = ((tick() * 24) / SECONDS_PER_DAY) % 24;
	}
}
