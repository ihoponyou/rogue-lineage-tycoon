export = {
	Name: "teleport",
	Aliases: ["tp"],
	Description: "Teleports a player or set of players to one target.",
	Group: "Admin",
	Args: [
		{
			Type: "players",
			Name: "from",
			Description: "The players to teleport",
		},
		{
			Type: "player",
			Name: "to",
			Description: "The player to teleport to",
		},
	],
};
