import { StateMachine } from ".";

export abstract class State {
	abstract readonly name: string;

	protected tickEntered = 0;

	constructor(protected readonly stateMachine: StateMachine) {}

	initialize(): void {}

	enter(...args: Array<unknown>): void {
		this.tickEntered = tick();
		// print(`+ ${this.name}`);
	}

	update(deltaTime: number): void {}

	exit(): void {
		// print(`- ${this.name}`);
	}
}
