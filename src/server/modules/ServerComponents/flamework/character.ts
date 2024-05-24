import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface Attributes {
	isAlive: boolean;
}

interface CharacterInstance extends StarterCharacter {
	Humanoid: Humanoid;
}

@Component({
	tag: "Character",
	defaults: {
		isAlive: false,
	},
})
export class Character
	extends BaseComponent<Attributes, CharacterInstance>
	implements OnStart
{
	onStart(): void {
		this.instance.AddTag("FallDamage");
	}

	kill(): void {
		this.attributes.isAlive = false;
	}

	snipe(): void {
		const particleAttachment = this.instance.Head.ParticleAttachment;

		particleAttachment.Critted.Play();
		particleAttachment.Sniped.Play();
		particleAttachment.Crit.Emit(1);
	}
}
