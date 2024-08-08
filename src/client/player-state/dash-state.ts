import { Workspace } from "@rbxts/services";
import { store } from "client/store";
import { SFX, VFX } from "shared/constants";
import { deserializeColor3 } from "shared/modules/serialized-color3";
import { StateMachine } from "shared/modules/state-machine";
import { selectManaColor } from "shared/store/slices/identity/selectors";
import { selectMana } from "shared/store/slices/mana/selectors";
import { Character } from "../components/character";
import { AnimationController } from "../controllers/animation-controller";
import { Direction } from "../controllers/input-controller";
import { CharacterState } from "./character-state";

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

	public constructor(
		stateMachine: StateMachine,
		character: Character,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);

		this.manaDashSound.Parent = character.getTorso();
		this.manaParticles.Parent = character.getTorso();
	}

	public override initialize(): void {
		store.subscribe(
			selectManaColor(),
			(serializedColor) =>
				(this.manaParticles.Color = new ColorSequence(
					deserializeColor3(serializedColor ?? new Color3()),
				)),
		);
	}

	// TODO: direction does not need to be an arg
	public enter(direction: Direction): void {
		super.enter();

		this.dashAngle = DIRECTION_TO_ANGLE[direction];
		const humanoidRootPart = this.character.getHumanoidRootPart();

		const manaData = store.getState(selectMana());
		const canManaDash =
			(manaData?.amount ?? 0) > 0 && manaData?.dashEnabled;

		this.dashVelocity.Parent = humanoidRootPart;
		this.dashVelocity.Velocity = humanoidRootPart.CFrame.mul(
			CFrame.Angles(0, math.rad(this.dashAngle), 0),
		).LookVector.mul(canManaDash ? 60 : 50);

		if (canManaDash) {
			this.manaDashSound.Play();
			this.manaParticles.Enabled = true;
		}

		this.animationController.play(
			this.directionToDashAnimationName(direction),
		);
	}

	public update(): void {
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
		return SFX.ManaDash.Clone();
	}

	private newDashParticles(): ParticleEmitter {
		return VFX.ManaStopParticle.Clone();
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
