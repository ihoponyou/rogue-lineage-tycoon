import { RunService, Workspace } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { LocalCharacter } from "client/components/local-character";
import { AnimationController } from "client/controllers/animation-controller";
import {
	Direction,
	InputController,
} from "client/controllers/input-controller";
import { KeybindController } from "client/controllers/keybind-controller";
import { Events } from "client/network";
import { store } from "client/store";
import { SFX, VFX } from "shared/constants";
import { deserializeColor3 } from "shared/modules/serialized-color3";
import { uppercaseFirstChar } from "shared/modules/uppercase-first-char";
import { selectManaColor } from "shared/store/slices/identity/selectors";
import { selectMana } from "shared/store/slices/mana/selectors";
import { selectSkills } from "shared/store/slices/skills/selectors";
import { CharacterActivity } from "./character-activity";

const DIRECTION_TO_ANGLE: { [direction: string]: number } = {
	forward: 0,
	backward: 180,
	left: 90,
	right: -90,
};

const XZ_AXES = new Vector3(1, 0, 1);
const DASH_DURATION = 0.4;
const DASH_COOLDOWN_DURATION = 1.5;

export class DashActivity extends CharacterActivity {
	private dashAngle = 0;
	private tickStarted = 0;
	private onCooldown = false;
	private trove = new Trove();
	private dashVelocity = this.newDashVelocity();
	private manaParticles = VFX.ManaStopParticle.Clone();
	private manaDashSound = SFX.ManaDash.Clone();

	constructor(
		character: LocalCharacter,
		private animationController: AnimationController,
		private keybindController: KeybindController,
		private inputController: InputController,
	) {
		super(character);

		this.manaDashSound.Parent = character.getTorso();
		this.manaParticles.Parent = character.getTorso();

		store.subscribe(
			selectManaColor(),
			(serializedColor) =>
				(this.manaParticles.Color = new ColorSequence(
					deserializeColor3(serializedColor ?? new Color3()),
				)),
		);
	}

	override start(): void {
		if (this.onCooldown || this.isActive()) return;
		super.start();

		Events.character.dash.fire();

		this.tickStarted = tick();

		let direction: Direction = "backward";
		if (this.keybindController.isKeyDown("forward")) {
			direction = "forward";
		} else if (this.keybindController.isKeyDown("left")) {
			direction = "left";
		} else if (this.keybindController.isKeyDown("right")) {
			direction = "right";
		}
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

		const hasSpearDash = store.getState(selectSkills()).has("Spear Dash");
		this.animationController.play(
			`${hasSpearDash && direction !== "forward" ? "Spear" : ""}Dash${uppercaseFirstChar(direction)}`,
		);

		this.trove.connect(RunService.Stepped, () => {
			if (tick() - this.tickStarted >= DASH_DURATION) {
				this.stop();
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
		});
	}

	override stop(): void {
		super.stop();

		this.dashVelocity.Parent = this.character.instance;
		this.manaParticles.Enabled = false;

		this.onCooldown = true;
		task.delay(DASH_COOLDOWN_DURATION, () => (this.onCooldown = false));

		this.trove.clean();
	}

	private newDashVelocity(): BodyVelocity {
		const bodyVelocity = new Instance("BodyVelocity");
		bodyVelocity.MaxForce = new Vector3(1e10, 0, 1e10);
		return bodyVelocity;
	}
}
