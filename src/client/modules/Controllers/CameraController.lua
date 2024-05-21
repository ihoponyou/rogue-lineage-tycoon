local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Trove = require(ReplicatedStorage.Packages.Trove)

local HealthService, RagdollService

local CameraController = Knit.CreateController {
	Name = "CameraController";
}

function CameraController:OnKilled()
	print("killed D:")
	workspace.CurrentCamera.CameraSubject = self.Character.Head
end

function CameraController:OnCharacterAdded(character: Model)
	self.Character = character
	local humanoid: Humanoid = character:WaitForChild("Humanoid")
	workspace.CurrentCamera.CameraSubject = humanoid
end

function CameraController:KnitInit()
	self._trove = Trove.new()
end

function CameraController:KnitStart()
	HealthService = Knit.GetService("HealthService")

	if Knit.Player.Character then self:OnCharacterAdded(Knit.Player.Character) end
	self._trove:Connect(Knit.Player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)
	self._trove:Connect(HealthService.Killed, function(...) self:OnKilled(...) end)
end

return CameraController
