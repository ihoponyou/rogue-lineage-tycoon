import { createContext } from "@rbxts/react";
import Signal from "@rbxts/signal";

export type ToolSelectedCallback = (tool?: Tool) => void;

const defaultSignal = new Signal<ToolSelectedCallback>();
defaultSignal.Connect(() => {
	warn("fired the fallback signal; GuiController failed to provide a value?");
});
export const signalContext = createContext(defaultSignal);

export const appContext = createContext<
	React.MutableRefObject<ScreenGui | undefined> | undefined
>(undefined);
