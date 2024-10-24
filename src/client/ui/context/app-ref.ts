import { createContext } from "@rbxts/react";

export const appRefContext = createContext<
	React.MutableRefObject<ScreenGui | undefined> | undefined
>(undefined);
