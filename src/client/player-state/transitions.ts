import { Character } from "client/components/character";
import { InputController } from "client/controllers/input-controller";
import { StateMachine } from "shared/modules/state-machine";

export function createRunTransition(
	stateMachine: StateMachine,
	inputController: InputController,
	character: Character,
) {
	return inputController.runTriggered.Connect(() => {
		if (character.instance.GetAttribute("isRagdolled") === true) return;
		stateMachine.transitionTo("run");
	});
}

export function createChargeManaTransition(
	stateMachine: StateMachine,
	inputController: InputController,
	character: Character,
) {
	return inputController.chargeManaTriggered.Connect((charging) => {
		if (character.instance.GetAttribute("isRagdolled") === true) return;
		if (charging) stateMachine.transitionTo("chargemana");
	});
}

export function createDashTransition(
	stateMachine: StateMachine,
	inputController: InputController,
	character: Character,
) {
	return inputController.dashTriggered.Connect((direction) => {
		if (character.instance.GetAttribute("isRagdolled") === true) return;
		stateMachine.transitionTo("dash", direction);
	});
}

export function createClimbTransition(
	stateMachine: StateMachine,
	inputController: InputController,
	character: Character,
) {
	return inputController.climbTriggered.Connect((cast) => {
		if (character.instance.GetAttribute("isRagdolled") === true) return;
		stateMachine.transitionTo("climb", cast);
	});
}

export function createAttackTransition(
	stateMachine: StateMachine,
	inputController: InputController,
	character: Character,
) {
	return inputController.onLightAttackTriggered(() => {
		if (character.instance.GetAttribute("isRagdolled") === true) return;
		if (character.canLightAttack()) stateMachine.transitionTo("attack");
	});
}

export function createBlockTransition(
	stateMachine: StateMachine,
	inputController: InputController,
	character: Character,
) {
	return inputController.onBlockTriggered(() => {
		if (character.instance.GetAttribute("isRagdolled") === true) return;
		stateMachine.transitionTo("block");
	});
}
