import { State } from "./state";

export class StateMachine {
	currentState: State

	constructor(initialState: State) {
		this.currentState = initialState;
		initialState.enter();
	}

	transitionTo(state: State): boolean {
		if (!this.currentState.transitions.has(state)) {
			warn(`transition not found (${this.currentState.name} -> ${state.name})`);
			return false;
		}
		
		if (this.currentState.isBusy) {
			warn(`${this.currentState} is busy`);
			return false;
		}

		this.currentState.exit();
		this.currentState = state;
		this.currentState.enter();

		return true;
	}
}