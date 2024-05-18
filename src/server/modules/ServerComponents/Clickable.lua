local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(ReplicatedStorage.Packages.Trove)
local Component = require(ReplicatedStorage.Packages.Component)
local Logger = require(ReplicatedStorage.Source.Modules.Extensions.Logger)

local RagdollService

local Clickable = Component.new {
	Tag = "Clickable";
	Extensions = {
		Logger,
	};
}

function Clickable:Construct()
	self._trove = Trove.new()
	self.ClickDetector = self.Instance.ClickDetector
end

function Clickable:OnClicked(player: Player)
	local ragdoll: Model = game.Workspace.Alive.Ragdoll
	if not ragdoll:GetAttribute("Ragdolled") then
		ragdoll.PrimaryPart.AssemblyLinearVelocity = ragdoll.PrimaryPart.CFrame.LookVector * 50 + Vector3.new(0,100,0)
	end
	RagdollService.ToggleRagdoll(ragdoll)
	ragdoll:SetAttribute("Knocked", not ragdoll:GetAttribute("Knocked"))
end

function Clickable:Start()
	RagdollService = Knit.GetService("RagdollService")

	self._trove:Connect(self.ClickDetector.MouseClick, function(...) self:OnClicked(...) end)
end

function Clickable:Stop()
	self._trove:Destroy()
end

return Clickable
