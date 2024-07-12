import {
	useProducer,
	UseProducerHook,
	useSelector,
	UseSelectorHook,
} from "@rbxts/react-reflex";
import { RootStore } from "client/store";

export const useRootProducer: UseProducerHook<RootStore> = useProducer;
export const useRootSelector: UseSelectorHook<RootStore> = useSelector;
