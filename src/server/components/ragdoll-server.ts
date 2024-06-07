import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Trove } from "@rbxts/trove";
import { Ragdoll } from "shared/components/ragdoll";

type SocketType = "Hip" | "Shoulder" | "Neck";

type SocketAngles = {
	UpperAngle: number;
	TwistAngle: number;
};

type RagdollJoint = {
	motor: Motor6D;
	socket: BallSocketConstraint;
};

const SOCKET_ANGLES: { [key: string]: SocketAngles } = {
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

@Component({
	tag: "Ragdoll",
	defaults: {
		isRagdolled: false,
	},
})
export class RagdollServer extends Ragdoll implements OnStart {
	private trove = new Trove();
	private joints = new Map<string, RagdollJoint>();

	private newJoint(
		motor: Motor6D,
		socketType: SocketType,
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

		const socket = this.newSocket(jointName, socketType);
		socket.Parent = motor.Part1;
		socket.Attachment0 = attachment0;
		socket.Attachment1 = attachment1;

		return { motor: motor, socket: socket };
	}

	private newSocket(
		jointName: string,
		socketType: SocketType,
	): BallSocketConstraint {
		const socket = new Instance("BallSocketConstraint");
		socket.Name = `${jointName}Socket`;
		socket.LimitsEnabled = true;
		socket.MaxFrictionTorque = 100;
		socket.Restitution = 0.25;
		socket.UpperAngle = SOCKET_ANGLES[socketType].UpperAngle;
		socket.TwistLimitsEnabled = socketType !== "Shoulder";
		if (socket.TwistLimitsEnabled) {
			const twistAngle = SOCKET_ANGLES[socketType].TwistAngle;
			socket.TwistUpperAngle = twistAngle;
			socket.TwistLowerAngle = -twistAngle;
		}
		return socket;
	}

	onStart(): void {
		this.configureHumanoid();

		for (const motor of this.instance.GetDescendants()) {
			if (!motor.IsA("Motor6D")) continue;
			if (motor.Name === "RootJoint") continue;

			const socketType = (motor.Name.match("Hip")[0] ||
				motor.Name.match("Shoulder")[0] ||
				motor.Name.match("Neck")[0]) as SocketType;
			if (!socketType)
				error(`${motor.Name} does not contain Hip/Shoulder/Neck`);

			const jointName = motor.Name.gsub(" ", "")[0];
			const newJoint = this.newJoint(motor, socketType, jointName);
			this.joints.set(jointName, newJoint);

			this.trove.connect(motor.GetPropertyChangedSignal("Parent"), () => {
				if (motor.Parent) return;

				newJoint.socket.Destroy();
				if (motor.Part1) motor.Part1.CanCollide = true;

				this.joints.delete(jointName);
			});
		}
	}

	toggle(on: boolean): void {
		this.attributes.isRagdolled = on;

		this.humanoid.AutoRotate = !on;
		this.changeHumanoidState(on);

		for (const [name, joint] of this.joints) {
			joint.motor.Enabled = !on;
			if (joint.motor.Part1) joint.motor.Part1.CanCollide = on;
		}
	}
}
