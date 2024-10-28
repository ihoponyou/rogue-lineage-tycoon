import {
	useProducer,
	UseProducerHook,
	useSelector,
	UseSelectorHook,
} from "@rbxts/react-reflex";
import { store } from "client/store";

export const useRootProducer: UseProducerHook<typeof store> = useProducer;
export const useRootSelector: UseSelectorHook<typeof store> = useSelector;
