local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Trove = require(ReplicatedStorage.Packages.Trove)
local Component = require(ReplicatedStorage.Packages.Component)
local Logger = require(ReplicatedStorage.Source.Modules.Extensions.Logger)

local BurnScar = Component.new {
	Tag = "BurnScar";

	Extensions = {
		Logger,
	};
}

function BurnScar:Construct()
	self._trove = Trove.new()
end

function BurnScar:HeartbeatUpdate(deltaTime: number)
	local player = Players:GetPlayerFromCharacter(self.Instance.Parent)
	if not player then return end
	local data = player:FindFirstChild("Data")
	if not data then return end
	if data.Temperature.Value <= 95 then return end
	if CollectionService:HasTag(self.Instance, "Burning") then return end

	if self.Instance.Health <= 0 then warn("a") end
	CollectionService:AddTag(self.Instance, "Burning")
end

function BurnScar:Stop()
	self._trove:Destroy()
end

return BurnScar
