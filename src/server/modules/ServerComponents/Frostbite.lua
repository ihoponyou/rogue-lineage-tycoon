local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Trove = require(ReplicatedStorage.Packages.Trove)
local Component = require(ReplicatedStorage.Packages.Component)
local Logger = require(ReplicatedStorage.Source.Modules.Extensions.Logger)

local HealthService

local Frostbite = Component.new {
	Tag = "Frostbite";

	Extensions = {
		Logger,
	};
}

function Frostbite:Construct()
	self._trove = Trove.new()
end

function Frostbite:HeartbeatUpdate(deltaTime: number)
	local character: Model = self.Instance.Parent
	if not character then return end
	local player: Player = Players:GetPlayerFromCharacter(character)
	if not player then return end
	local data = player.Data
	if not data then return end
	if data.Temperature.Value >= 5 then return end

	local damage = math.min(self.Instance.Health, (self.Instance.MaxHealth/5)*deltaTime)
	self.Instance:TakeDamage(damage)

	if self.Instance.Health <= 0 then
		warn("blud froze to death innit")
		CollectionService:RemoveTag(self.Instance, "Frostbite")

		for _,child: Instance in self.Instance.Parent:GetChildren() do
			if not child:IsA("BasePart") then continue end
			if child.Transparency > 0.5 then continue end
			if child.Name == "Handle" then continue end

			task.spawn(function()
				child.Transparency = 1
				child.Anchored = true

				local frozen = child:Clone()
				frozen.Anchored = true
				frozen.Parent = workspace
				frozen:ClearAllChildren()
				frozen.CFrame = child.CFrame
				frozen.Size = child.Size
				frozen.Color = Color3.fromRGB(152, 194, 219)
				frozen.Material = "Ice"
				frozen.Transparency = 0.5

				local mesh = child:FindFirstChild("Mesh")
				if mesh then mesh:Clone().Parent = frozen end
			end)
		end

		if not self.Instance:IsDescendantOf(workspace.Dead) then
			HealthService.Kill(player)
		end
	end
end

function Frostbite:Start()
	HealthService = Knit.GetService("HealthService")
end

function Frostbite:Stop()
	self._trove:Destroy()
end

return Frostbite
