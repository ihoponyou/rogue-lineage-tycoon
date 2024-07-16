import React from "@rbxts/react";

interface LayerProps extends React.PropsWithChildren {
	name?: string;
}

export function Layer(props: LayerProps) {
	return (
		<screengui key={props.name} ResetOnSpawn={false} IgnoreGuiInset={true}>
			{props.children}
		</screengui>
	);
}
