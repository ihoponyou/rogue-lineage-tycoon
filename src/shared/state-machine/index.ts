import { State } from "./state";

class NullState extends State {
	name = "null/nil/undefined";
}

export class StateMachine {
	private states = new Map<string, State>();
	private currentState = new NullState(this);
	private initialized = false;

	initialize(initialState: State) {
		if (this.initialized) return;

		this.currentState = initialState;
		initialState.enter();

		this.initialized = true;
	}

	getCurrentState(): State {
		return this.currentState;
	}

	addState(state: State): void {
		this.states.set(state.name.lower(), state);
		state.initialize();
	}

	addStates(states: Array<State>): void {
		states.forEach((value) => this.addState(value));
	}

	update(deltaTime: number): void {
		// print("updating sm", this.currentState.name);
		this.currentState.update(deltaTime);
	}

	transitionTo(newStateName: string, ...args: Array<unknown>) {
		const newState = this.states.get(newStateName.lower());
		if (!newState) {
			warn(`no ${newStateName}`);
			return;
		}

		const oldStateName = this.currentState.name;

		this.currentState.exit();
		this.currentState = newState;
		newState.enter(...args);

		// print(`${oldStateName} -> ${newState.name}`);
	}
}
