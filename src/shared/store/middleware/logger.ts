import { ProducerMiddleware } from "@rbxts/reflex";

export const loggerMiddleware: ProducerMiddleware = () => {
	return (nextAction, name) => {
		return (...args) => {
			print(`${time()}: dispatching ${name}:`, ...args);
			return nextAction(...args);
		};
	};
};
