import { CommandContext } from "@rbxts/cmdr";

export = function (
	context: CommandContext,
	fromPlayers: Array<Player>,
	toPlayer: Player,
) {
	const toCharacter = toPlayer.Character;
	const toHumanoidRootPart = toCharacter?.FindFirstChild(
		"HumanoidRootPart",
	) as Part | undefined;

	if (!(toCharacter || toHumanoidRootPart))
		return "Target player has no character.";

	const toPosition = toHumanoidRootPart!.CFrame;

	for (const player of fromPlayers) {
		const character = player.Character;
		const humanoidRootPart = character?.FindFirstChild(
			"HumanoidRootPart",
		) as Part | undefined;
		if (!(character || humanoidRootPart)) continue;
		humanoidRootPart!.CFrame = toPosition;
	}

	return "Teleported players.";
};
