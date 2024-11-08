import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { CharacterServer } from "./character-server";
import { KeyInteractable } from "./interactable/key-interactable";
import { PlayerCharacter } from "./player-character";
import { RagdollServer } from "./ragdoll-server";

interface Attributes {
	isCarried: boolean;
}

@Component({
	tag: "Carriable",
	defaults: {
		isCarried: false,
	},
})
export class Carriable
	extends KeyInteractable<Attributes, Model>
	implements OnStart
{
	private carryTrove = this.trove.extend();

	public constructor(
		private components: Components,
		private character: CharacterServer,
		private ragdoll: RagdollServer,
	) {
		super();
	}

	public override onStart(): void {
		super.onStart();

		this.toggle(false);
		this.setKey(Enum.KeyCode.V);
		this.trove.add(
			this.ragdoll.onAttributeChanged("isRagdolled", (newValue) => {
				this.toggle(newValue);
			}),
		);
	}

	public override interact(player: Player): void {
		if (!player.Character) return;
		const characterComponent =
			this.components.getComponent<CharacterServer>(player.Character);
		if (!characterComponent) return;

		this.attributes.isCarried
			? this.drop(characterComponent)
			: this.pickUp(characterComponent);
	}

	public pickUp(carrier: CharacterServer): void {
		this.attributes.isCarried = true;

		const ragdoll = this.components.getComponent<RagdollServer>(
			carrier.instance,
		);
		if (ragdoll) {
			this.carryTrove.add(
				ragdoll.onAttributeChanged("isRagdolled", (newValue) => {
					if (newValue) {
						// print("carrier got ragdolled");
						this.drop(carrier);
					}
				}),
			);
		}

		const playerCharacter = this.components.getComponent<PlayerCharacter>(
			this.instance,
		);
		if (playerCharacter) {
			this.instance.PrimaryPart?.SetNetworkOwner(
				playerCharacter.getPlayer().instance,
			);
		}
		this.instance.RemoveTag("Burning");

		const carrierAttachment = carrier.getCarryAttachment();
		this.character.setAlignOrientationAtt1(carrierAttachment);
		this.character.setAlignPositionAtt1(carrierAttachment);
		this.character.setTorsoCollisionPart1(carrier.getTorso());
		this.character.setHeadCollisionPart1(carrier.getHead());

		for (const child of this.instance.GetChildren()) {
			if (!child.IsA("BasePart")) continue;
			child.CollisionGroup = "Carried";
			child.Massless = true;
		}

		this.character
			.getHumanoid()
			.ChangeState(Enum.HumanoidStateType.Physics);
	}

	public drop(carrier: CharacterServer): void {
		this.attributes.isCarried = false;

		this.carryTrove.clean();

		this.instance.PrimaryPart?.SetNetworkOwner(
			Players.GetPlayerFromCharacter(this.instance),
		);

		const humanoidRootPart = this.character.getHumanoidRootPart();
		const carrierRootPart = carrier.getHumanoidRootPart();
		const wallCheck = Workspace.Spherecast(
			carrier.getHead().Position,
			2,
			carrierRootPart.CFrame.LookVector.mul(2),
		);
		if (wallCheck) {
			this.instance.PivotTo(
				new CFrame(wallCheck.Position.add(wallCheck.Normal)),
			);
		} else {
			const up = Vector3.yAxis.mul(50);
			this.character.getHead().AssemblyLinearVelocity = up;
			humanoidRootPart.AssemblyLinearVelocity =
				carrierRootPart.CFrame.LookVector.mul(35).add(up);
		}

		this.character.setAlignOrientationAtt1(undefined);
		this.character.setAlignPositionAtt1(undefined);
		this.character.setTorsoCollisionPart1(undefined);
		this.character.setHeadCollisionPart1(undefined);

		for (const child of this.instance.GetChildren()) {
			if (!child.IsA("BasePart")) continue;
			child.CollisionGroup = "Characters";
			child.Massless = false;
		}

		this.character
			.getHumanoid()
			.ChangeState(Enum.HumanoidStateType.GettingUp);
	}
}
