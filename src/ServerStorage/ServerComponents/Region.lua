local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(Knit.Util.Trove)
local Component = require(Knit.Util.Component)
local Logger = require(script.Parent.Extensions.Logger)

local SurvivalService

local Region = Component.new {
	Tag = "Region";

	Extensions = {
		Logger,
	};
}

local overlapParams = OverlapParams.new()
overlapParams.FilterType = Enum.RaycastFilterType.Include

function Region:Construct()
	self._trove = Trove.new()
	self._debounce = {}

	self.Temperature = self.Instance:GetAttribute("Temperature");
end

function Region:HeartbeatUpdate(deltaTime: number)
	local processedPlayers = {}
	for _,part in workspace:GetPartBoundsInBox(self.Instance.CFrame, self.Instance.Size, overlapParams) do
		local parent = part.Parent
		if not parent then continue end
		local player = Players:GetPlayerFromCharacter(parent)
		if player == nil then continue end

		if not table.find(processedPlayers, player) then
			table.insert(processedPlayers, player)

			local data = player.Data
			if not data then continue end

			task.spawn(function()
				local deltaTemperature = 0
				if self.Temperature < 50 then
					local timeToFrostbite = 120 * data.StatChanges.ColdResist.Value + 10
					deltaTemperature = -deltaTime/timeToFrostbite*60
				elseif data.Temperature.Value < self.Temperature then
					local timeToOverheat = 120 * data.StatChanges.HeatResist.Value + 10
					deltaTemperature = deltaTime/timeToOverheat*60
				end

				SurvivalService.AdjustTemperature(player, deltaTemperature)
			end)
		end
	end
end

function Region:OnPlayerAdded(player)
	player.CharacterAdded:Wait()
	local character = player.Character
	overlapParams:AddToFilter(character)
	self._trove:Connect(player.CharacterAdded, function(character)
		overlapParams:AddToFilter(character)
	end)
end

function Region:Start()
	SurvivalService = Knit.GetService("SurvivalService")

	self._trove:Connect(Players.PlayerAdded, function(...) self:OnPlayerAdded(...) end)
end

function Region:Stop()
	self._trove:Destroy()
end

return Region
