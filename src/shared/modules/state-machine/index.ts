import { State } from "./state";

export class StateMachine {
	private currentState: State;

	constructor(initialState: State) {
		this.currentState = initialState;
		initialState.enter();
	}

	transitionTo(state: State): boolean {
		if (!this.currentState.hasTransitionTo(state)) {
			warn(
				`transition not found (${this.currentState.name} -> ${state.name})`,
			);
			return false;
		}

		if (this.currentState.isBusy()) {
			warn(`${this.currentState} is busy`);
			return false;
		}

		const oldState = this.currentState;

		this.currentState.exit();
		this.currentState = state;
		this.currentState.enter();

		print(`${oldState.name} -> ${this.currentState.name}`);

		return true;
	}
}
