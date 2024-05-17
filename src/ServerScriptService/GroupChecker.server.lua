local BRAINBLOX_ID = 15553074
local MINIMUM_RANK = 1

local function OnPlayerAdded(player: Player)
	if player:GetRankInGroup(BRAINBLOX_ID) < MINIMUM_RANK then
		game.ReplicatedStorage.Kicked:FireClient(player)
		player:Kick("not in group")
	end
end

if not game:GetService("RunService"):IsStudio() then 
	for _,player: Player in game.Players:GetPlayers() do
		OnPlayerAdded(player)
	end
	game.Players.PlayerAdded:Connect(OnPlayerAdded)
end