import { Lighting } from "@rbxts/services";
import { Events } from "client/network";

Events.kicked.connect(() => {
	const blur = new Instance("BlurEffect");
	blur.Size = 50;
	blur.Parent = Lighting;
});
