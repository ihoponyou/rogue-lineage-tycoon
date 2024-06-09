import {
	useProducer,
	useSelector,
	UseProducerHook,
	UseSelectorHook,
} from "@rbxts/react-reflex";
import { RootProducer } from "../producer";

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
export const useRootSelector: UseSelectorHook<RootProducer> = useSelector;
