import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { IdentityService } from "server/services/identity-service";

interface Attributes {
	armorToSet: string;
}

@Component({
	tag: "ArmorPortal",
	defaults: {
		armorToSet: "SpiderCloak",
	},
})
export class ArmorPortal
	extends BaseComponent<Attributes, BasePart>
	implements OnStart
{
	private trove = new Trove();
	private debounce = new Array<Player>();

	public constructor(private identityService: IdentityService) {
		super();
	}

	public onStart(): void {
		this.trove.connect(this.instance.Touched, (otherPart) =>
			this.onTouched(otherPart),
		);
	}

	override destroy(): void {
		this.trove.clean();
		super.destroy();
	}

	public onTouched(otherPart: BasePart): void {
		const character = otherPart.Parent as Model | undefined;
		if (!character) return;
		const player = Players.GetPlayerFromCharacter(character);
		if (!player) return;
		if (this.debounce.includes(player)) return;

		const index = this.debounce.push(player) - 1;
		this.identityService.applyArmor(character, this.attributes.armorToSet);

		task.delay(2, () => this.debounce.remove(index));
	}
}
