import { CharacterClient } from "client/components/character-client";
import { InputController } from "client/controllers/input-controller";
import { StateMachine } from "shared/state-machine";

export function createRunTransition(
	stateMachine: StateMachine,
	inputController: InputController,
) {
	return inputController.runTriggered.Connect(() => {
		stateMachine.transitionTo("run");
	});
}

export function createChargeManaTransition(
	stateMachine: StateMachine,
	inputController: InputController,
) {
	return inputController.chargeManaTriggered.Connect((charging) => {
		if (charging) stateMachine.transitionTo("chargemana");
	});
}

export function createDashTransition(
	stateMachine: StateMachine,
	inputController: InputController,
) {
	return inputController.dashTriggered.Connect((direction) =>
		stateMachine.transitionTo("dash", direction),
	);
}

export function createClimbTransition(
	stateMachine: StateMachine,
	inputController: InputController,
) {
	return inputController.climbTriggered.Connect((cast) =>
		stateMachine.transitionTo("climb", cast),
	);
}

export function createAttackTransition(
	stateMachine: StateMachine,
	inputController: InputController,
	character: CharacterClient,
) {
	return inputController.onLightAttackTriggered(() => {
		if (character.canLightAttack()) stateMachine.transitionTo("attack");
	});
}
