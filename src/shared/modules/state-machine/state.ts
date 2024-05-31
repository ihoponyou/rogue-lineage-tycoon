import { StateMachine } from ".";

export abstract class State {
	abstract readonly name: string;

	protected enterTime = 0;

	constructor(protected readonly stateMachine: StateMachine) {}

	enter(...args: Array<unknown>): void {
		this.enterTime = tick();
		// print(`+ ${this.name}`);
	}

	update(deltaTime: number): void {}

	exit(): void {
		// print(`- ${this.name}`);
	}
}
