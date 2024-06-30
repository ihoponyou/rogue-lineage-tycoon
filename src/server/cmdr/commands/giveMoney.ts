export = {
	Name: "giveMoney",
	Description: "Adds currency to the given player's current balance",
	Group: "Admin",
	Args: [
		{
			Type: "player",
			Name: "player",
			Description: "The player to bless",
		},
		{
			Type: "currency",
			Name: "currency",
		},
		{
			Type: "integer",
			Name: "amount",
		},
	],
};
