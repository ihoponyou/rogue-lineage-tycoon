import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { CharacterState } from "./character-state";
import { StateMachine } from "shared/modules/state-machine";
import { CharacterClient } from "../components/character-client";
import { Events } from "../networking";
import { KeybindController } from "../controllers/keybind-controller";
import { ManaController } from "../controllers/mana-controller";
import { AnimationController } from "../controllers/animation-controller";
import { Direction } from "../controllers/input-controller";

const DIRECTION_TO_ANGLE: { [direction: string]: number } = {
	forward: 0,
	backward: 180,
	left: 90,
	right: -90,
};

const XZ_AXES = new Vector3(1, 0, 1);
const DASH_LENGTH = 0.4;

export class DashState extends CharacterState {
	public readonly name = "Dash";

	private dashVelocity = this.newDashVelocity();
	private manaParticles = this.newDashParticles();
	private manaDashSound = this.newDashSound();
	private dashAngle = 0;

	constructor(
		stateMachine: StateMachine,
		character: CharacterClient,
		private keybindController: KeybindController,
		private manaController: ManaController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);

		Events.manaEvents.manaColorChanged.connect((color) => {
			this.manaParticles.Color = new ColorSequence(color);
		});
	}

	// TODO: direction does not need to be an arg
	public enter(direction: Direction): void {
		super.enter();

		this.dashAngle = DIRECTION_TO_ANGLE[direction];
		const humanoidRootPart = this.character.getHumanoidRootPart();
		const hasMana = this.manaController.hasMana();

		this.dashVelocity.Parent = humanoidRootPart;
		this.dashVelocity.Velocity = humanoidRootPart.CFrame.mul(
			CFrame.Angles(0, math.rad(this.dashAngle), 0),
		).LookVector.mul(hasMana ? 60 : 50);

		if (hasMana) {
			this.manaController.onChargeManaInput(Enum.UserInputState.End);
			this.manaDashSound.Play();
			this.manaParticles.Enabled = true;
		}

		this.animationController.play(
			this.directionToDashAnimationName(direction),
		);
	}

	public update(deltaTime: number): void {
		if (tick() - this.tickEntered >= DASH_LENGTH) {
			this.stateMachine.transitionTo("idle");
			return;
		}

		if (!Workspace.CurrentCamera) return;

		const humanoidRootPart = this.character.getHumanoidRootPart();
		humanoidRootPart.CFrame = new CFrame(
			humanoidRootPart.Position,
			humanoidRootPart.Position.add(
				Workspace.CurrentCamera.CFrame.LookVector.mul(XZ_AXES),
			),
		);

		const speed = math.round(this.dashVelocity.Velocity.Magnitude);
		this.dashVelocity.Velocity = humanoidRootPart.CFrame.mul(
			CFrame.Angles(0, math.rad(this.dashAngle), 0),
		).LookVector.mul(speed);
	}

	public exit(): void {
		this.dashVelocity.Parent = this.character.instance;

		// cooldown

		this.manaParticles.Enabled = false;
	}

	private newDashVelocity(): BodyVelocity {
		const bv = new Instance("BodyVelocity");
		bv.MaxForce = new Vector3(1e10, 0, 1e10);
		return bv;
	}

	private newDashSound(): Sound {
		return ReplicatedStorage.Effects.Sounds.ManaDash.Clone();
	}

	private newDashParticles(): ParticleEmitter {
		return ReplicatedStorage.Effects.Visuals.ManaStopParticle.Clone();
	}

	private directionToDashAnimationName(direction: Direction): string {
		return (
			"Dash" +
			direction.gsub(
				"^%l",
				string.char(direction.byte(1)[0]).upper(),
				1,
			)[0]
		);
	}
}
