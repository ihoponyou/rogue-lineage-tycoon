import React, { useState } from "@rbxts/react";
import { Backpack } from "./backpack";
import { Hotbar } from "./hotbar";

export function Inventory() {
	const [activeTool, setActiveTool] = useState<Tool | undefined>(undefined);

	return (
		<>
			<Backpack activeTool={activeTool} setActiveTool={setActiveTool} />
			<Hotbar activeTool={activeTool} setActiveTool={setActiveTool} />
		</>
	);
}
