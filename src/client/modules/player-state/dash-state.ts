import { CharacterState } from "./character-state";

export class DashState extends CharacterState {
	public readonly name = "Dash";

	private bodyVelocity = new Instance("BodyVelocity");

	public enter(...args: Array<unknown>): void {
		super.enter();

		this.bodyVelocity.MaxForce = Vector3.one.sub(Vector3.yAxis).mul(1e10);

		const humanoidRootPart = this.character.getHumanoidRootPart();

		this.bodyVelocity.Parent = humanoidRootPart;
		this.bodyVelocity.Velocity = humanoidRootPart.CFrame.LookVector.mul(50);
	}

	public update(deltaTime: number): void {
		if (tick() - this.tickEntered >= 0.4)
			this.stateMachine.transitionTo("idle");
	}

	public exit(): void {
		this.bodyVelocity.Parent = this.character.instance;
	}
}
