export abstract class State {
	private transitions = new Set<State>();
	protected busy = false;
	protected enterTime = 0;

	abstract name: string;

	enter(): void {
		this.enterTime = tick();
		// print(`+ ${this.name}`);
	}

	exit(): void {
		// print(`- ${this.name}`);
	}

	isBusy(): boolean {
		return this.busy;
	}

	addTransitionTo(state: State) {
		this.transitions.add(state);
	}

	hasTransitionTo(state: State) {
		return this.transitions.has(state);
	}
}
