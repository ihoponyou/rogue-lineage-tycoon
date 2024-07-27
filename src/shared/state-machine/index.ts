import { State } from "./state";

class NullState extends State {
	public name = "Null";
}

export class StateMachine {
	private initialized = false;
	private currentState = new NullState(this);
	private states = new Map<string, State>([["null", this.currentState]]);

	public initialize(initialState: State) {
		if (this.initialized) return;

		this.currentState = initialState;
		initialState.enter();

		this.initialized = true;
	}

	public getCurrentState(): State {
		return this.currentState;
	}

	public addState(state: State): void {
		this.states.set(state.name.lower(), state);
		state.initialize();
	}

	public addStates(states: Array<State>): void {
		states.forEach((value) => this.addState(value));
	}

	public update(deltaTime: number): void {
		// print("updating sm", this.currentState.name);
		this.currentState.update(deltaTime);
	}

	public transitionTo(newStateName: string, ...args: Array<unknown>) {
		const newState = this.states.get(newStateName.lower());
		if (!newState) {
			warn(`no ${newStateName}`);
			return;
		}

		// const oldStateName = this.currentState.name;

		this.currentState.exit();
		this.currentState = newState;
		newState.enter(...args);

		// print(`${oldStateName} -> ${newState.name}`);
	}

	public destroy(): void {
		this.transitionTo("Null");
	}
}
