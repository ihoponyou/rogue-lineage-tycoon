import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Inject } from "shared/inject";
import { Character } from ".";
import { KeyInteractable } from "../interactable/key-interactable";
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

	@Inject
	private components!: Components;

	public constructor(
		private character: Character,
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
		const characterComponent = this.components.getComponent<Character>(
			player.Character,
		);
		if (!characterComponent) return;

		this.attributes.isCarried
			? this.drop(characterComponent)
			: this.pickUp(characterComponent);
	}

	public pickUp(carrier: Character): void {
		this.attributes.isCarried = true;

		const ragdoll = this.components.getComponent<RagdollServer>(
			carrier.instance,
		);
		if (ragdoll) {
			this.carryTrove?.add(
				ragdoll.onAttributeChanged("isRagdolled", (newValue) => {
					if (newValue) {
						// print("carrier got ragdolled");
						this.drop(carrier);
					}
				}),
			);
		}

		this.instance.PrimaryPart?.SetNetworkOwner(carrier.getPlayer());
		this.instance.RemoveTag("Burning");

		// tell carrier to play carrying animation
		// tell this to play carried animation

		const humanoidRootPart = this.character.getHumanoidRootPart();
		const carrierAttachment = carrier.getHumanoidRootPart().CarryAttachment;
		humanoidRootPart.CarryOrientation.Attachment1 = carrierAttachment;
		humanoidRootPart.CarryPosition.Attachment1 = carrierAttachment;
		this.character.getTorso().CarryCollision.Part1 = carrier.getTorso();
		this.character.getHead().CarryCollision.Part1 = carrier.getHead();

		for (const child of this.instance.GetChildren()) {
			if (!child.IsA("BasePart")) continue;
			child.CollisionGroup = "Carried";
			child.Massless = true;
		}

		this.character
			.getHumanoid()
			.ChangeState(Enum.HumanoidStateType.Physics);
	}

	public drop(carrier: Character): void {
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

		humanoidRootPart.CarryOrientation.Attachment1 = undefined;
		humanoidRootPart.CarryPosition.Attachment1 = undefined;
		this.character.getTorso().CarryCollision.Part1 = undefined;
		this.character.getHead().CarryCollision.Part1 = undefined;

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
