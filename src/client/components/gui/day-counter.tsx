import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectDays } from "client/gui/producer";
import { getDigit } from "shared/get-digit";
import { Digit } from "./digit";

export function DayCounter() {
	const days = useSelector(selectDays);

	return (
		<React.Fragment>
			<Digit
				key="DayHundreds"
				value={getDigit(days, 3)}
				// call me a wizard how many magic numbers i got
				position={new UDim2(0, 29, 0, 0)}
			/>
			<Digit
				key="DayTens"
				value={getDigit(days, 2)}
				position={new UDim2(0, 42, 0, 0)}
			/>
			<Digit
				key="DayOnes"
				value={getDigit(days, 1)}
				position={new UDim2(0, 55, 0, 0)}
			/>
		</React.Fragment>
	);
}
