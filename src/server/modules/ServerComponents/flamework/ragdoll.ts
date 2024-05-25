import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Character } from "./character";
import Trove from "../../../../../Packages/_Index/sleitnick_trove@1.3.0/trove";

type RagdollJoint = {
	motor: Motor6D;
	socket: BallSocketConstraint;
};

interface Attributes {
	isActive: boolean;
}

type SocketAngle = {
	UpperAngle: number;
	TwistAngle: number;
};

@Component()
export class Ragdoll
	extends BaseComponent<Attributes, StarterCharacter>
	implements OnStart
{
	readonly SOCKET_ANGLES: {
		[socketType: string]: SocketAngle;
	} = {
		Hip: {
			UpperAngle: 30,
			TwistAngle: 135,
		},
		Shoulder: {
			UpperAngle: 100,
			TwistAngle: 45,
		},
		Neck: {
			UpperAngle: 10,
			TwistAngle: 30,
		},
	};
	private trove = new Trove();
	private joints = new Map<string, RagdollJoint>();

	constructor(private character: Character) {
		super();
	}

	private createJoint(
		motor: Motor6D,
		socketType: string,
		jointName: string,
	): RagdollJoint {
		const attachment0 = new Instance("Attachment");
		attachment0.Name = jointName + "Attachment0";
		attachment0.Parent = motor.Part0;

		const attachment1 = new Instance("Attachment");
		attachment0.Name = jointName + "Attachment1";
		attachment0.Parent = motor.Part0;

		if (socketType === "Hip") {
			const c0Position = motor.C0.Position;
			const legC0 = new CFrame(
				c0Position.X / 2,
				c0Position.Y,
				c0Position.Z,
			).mul(motor.C0.Rotation);
			attachment0.CFrame = legC0;

			const c1Position = motor.C1.Position;
			const legC1 = new CFrame(0, c1Position.Y, c1Position.Z).mul(
				motor.C1.Rotation,
			);
			attachment1.CFrame = legC1;
		} else {
			attachment0.CFrame = motor.C0;
			attachment1.CFrame = motor.C1;
		}

		const socket = new Instance("BallSocketConstraint");
		socket.Name = jointName + "Socket";
		socket.Parent = motor.Part1;
		socket.Attachment0 = attachment0;
		socket.Attachment1 = attachment1;
		socket.LimitsEnabled = true;
		socket.MaxFrictionTorque = 100;
		socket.Restitution = 0.25;
		socket.UpperAngle = this.SOCKET_ANGLES[socketType].UpperAngle;
		socket.TwistLimitsEnabled = socketType !== "Shoulder";
		if (socket.TwistLimitsEnabled) {
			const twistAngle = this.SOCKET_ANGLES[socketType].TwistAngle;
			socket.TwistUpperAngle = twistAngle;
			socket.TwistLowerAngle = -twistAngle;
		}

		return { motor: motor, socket: socket };
	}

	onStart(): void {
		const humanoid = this.character.instance.Humanoid;
		humanoid.BreakJointsOnDeath = false;
		humanoid.SetStateEnabled(Enum.HumanoidStateType.FallingDown, false);
		humanoid.SetStateEnabled(Enum.HumanoidStateType.Ragdoll, false);

		for (const motor of this.instance.GetDescendants()) {
			if (!motor.IsA("Motor6D")) continue;
			if (motor.Name === "RootJoint") continue;

			const socketType =
				// eslint-disable-next-line roblox-ts/lua-truthiness
				motor.Name.match("Hip")[0] ||
				motor.Name.match("Shoulder")[0] ||
				motor.Name.match("Neck")[0];
			if (socketType === undefined)
				error(`${motor.Name} does not contain Hip/Shoulder/Neck`);

			const jointName = motor.Name.gsub(" ", "")[0];
			const newJoint = this.createJoint(
				motor,
				socketType as string,
				jointName,
			);
			this.joints.set(jointName, newJoint);

			this.trove.Connect(motor.GetPropertyChangedSignal("Parent"), () => {
				if (motor.Parent) return;

				newJoint.socket.Destroy();
				if (motor.Part1) motor.Part1.CanCollide = true;

				this.joints.delete(jointName);
			});
		}
	}

	toggle(on: boolean): void {
		const humanoid = this.character.instance.Humanoid;
		humanoid.ChangeState(
			on
				? Enum.HumanoidStateType.Physics
				: Enum.HumanoidStateType.GettingUp,
		);
		humanoid.AutoRotate = false;
	}
}
