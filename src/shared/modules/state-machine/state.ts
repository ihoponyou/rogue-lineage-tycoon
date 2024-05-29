import { StateMachine } from ".";

export abstract class State {
	transitions = new Set<State>();
	isBusy = false;
	protected enterTime = 0;

	abstract name: string;

	constructor(transitions?: Set<State>) {
		if (transitions) this.transitions = transitions;
	}

	enter(): void {
		this.enterTime = tick();
		print(`+ ${this.name}`)
	}

	exit(): void {
		print(`- ${this.name}`)
	}

	addTransition(state: State) {
		this.transitions.add(state);
	}
}