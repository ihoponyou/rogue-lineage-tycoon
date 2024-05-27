import { BaseComponent, Component, Components } from "@flamework/components";
import { Trove } from "@rbxts/trove";
import { OnRemoved } from "../../../../../types/lifecycles";
import { DisposableComponent } from "shared/modules/components/disposable-component";
import { Character } from "./character";
import { Dependency, OnStart } from "@flamework/core";
import { RagdollServer } from "./ragdoll-server";
import { Players, Workspace } from "@rbxts/services";
import { Interactable } from "./interactable";

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
	extends DisposableComponent<Attributes, Model>
	implements OnStart
{
	private components = Dependency<Components>();
	private carryTrove: Trove | undefined;

	constructor(
		private character: Character,
		private interactable: Interactable,
	) {
		super();
	}

	onStart(): void {
		// hide the proximity prompt for local player

		this.trove.connect(
			this.interactable.proximityPrompt.Triggered,
			(player) => {
				if (!player.Character) return;
				const characterComponent =
					this.components.getComponent<Character>(player.Character);
				if (!characterComponent) return;
				this.pickUp(characterComponent);
			},
		);
	}

	override onRemoved(): void {
		super.onRemoved();
	}

	pickUp(carrier: Character): void {
		if (this.carryTrove) this.carryTrove.clean();
		this.carryTrove = this.trove.extend();
		const components = Dependency<Components>();
		const ragdoll = components.getComponent<RagdollServer>(
			carrier.instance,
		);
		if (ragdoll) {
			this.carryTrove.add(
				ragdoll.onAttributeChanged("isRagdolled", (newValue) => {
					if (newValue) this.drop(carrier);
				}),
			);
		}

		this.attributes.isCarried = true;
		this.instance.PrimaryPart?.SetNetworkOwner(carrier.getPlayer());
		this.instance.RemoveTag("Burning");

		// tell carrier to play carrying animation
		// tell this to play carried animation

		const carrierAttachment = carrier.getHumanoidRootPart().CarryAttachment;
		const humanoidRootPart = this.character.getHumanoidRootPart();
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

	drop(carrier: Character): void {
		this.carryTrove?.clean();

		this.attributes.isCarried = false;
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
