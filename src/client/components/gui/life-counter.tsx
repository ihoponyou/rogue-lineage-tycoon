import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectLives } from "client/gui/producer";
import { Digit } from "./digit";

interface LifeCounterProps {
	position: UDim2;
}

export function LifeCounter(props: LifeCounterProps) {
	const lives = useSelector(selectLives);

	return <Digit key="Lives" value={lives} position={props.position} />;
}
