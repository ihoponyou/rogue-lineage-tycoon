import { StateMachine } from ".";

export abstract class State {
	public abstract readonly name: string;

	protected tickEntered = 0;

	public constructor(protected readonly stateMachine: StateMachine) {}

	public initialize(): void {}

	public enter(..._args: Array<unknown>): void {
		this.tickEntered = tick();
		// print(`+ ${this.name}`);
	}

	public update(_deltaTime: number): void {}

	public exit(): void {
		// print(`- ${this.name}`);
	}
}
