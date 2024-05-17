local BASE_WALK_SPEED = 20

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(Knit.Util.Trove)

local RagdollService
local AnimationController

local RagdollController = Knit.CreateController {
	Name = "RagdollController";
}

function RagdollController.OnRagdolled(bool: boolean)
	local character = Knit.Player.Character
	local humanoid: Humanoid? = character:WaitForChild("Humanoid")
	local torso = character:WaitForChild("Torso")

	if bool then
		humanoid:ChangeState(Enum.HumanoidStateType.Physics)
	else
		humanoid:ChangeState(Enum.HumanoidStateType.GettingUp)
	end

	torso:ApplyImpulse(torso.CFrame.LookVector*100)
end

function RagdollController:OnCharacterAdded(character: Model)
	self.Character = character

	while character.Parent ~= workspace.Alive do character.AncestryChanged:Wait() end

	self.Character.Humanoid.Died:Connect(function()
		local torso = self.Character:FindFirstChild("Torso")
		if not torso then return end
		for _,child in torso:GetChildren() do
			if child:IsA("BallSocketConstraint") then
				child:Destroy()
			end
		end
	end)
end

function RagdollController:OnPlayerRemoving(player: Player)
	if player == Knit.Player then
		self:Destroy()
	end
end

function RagdollController.OnPickingUp()
	local data = Knit.Player:FindFirstChild("Data")
	if not data then return end
	local statChanges = data:FindFirstChild("StatChanges")
	if not statChanges then return end

	local speedBoost = statChanges.SpeedBoost.Value

	local BASE_PLAYER_SPEED = BASE_WALK_SPEED + speedBoost
	Knit.Player.Character.Humanoid.WalkSpeed = 0
	AnimationController:Play("Carrying")
	AnimationController:Play("PickUp").Stopped:Wait()
	Knit.Player.Character.Humanoid.WalkSpeed = BASE_PLAYER_SPEED
end

function RagdollController.OnThrowing()
	AnimationController:Stop("Carrying")
	AnimationController:Play("Throw")
end

function RagdollController:KnitInit()
	self._trove = Trove.new()
end

function RagdollController:KnitStart()
	RagdollService = Knit.GetService("RagdollService")

	AnimationController = Knit.GetController("AnimationController")

	if Knit.Player.Character then self.OnRagdolled(Knit.Player.Character) end
	self._trove:Connect(Knit.Player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)

	self._trove:Connect(RagdollService.Ragdolled, self.OnRagdolled)
	self._trove:Connect(RagdollService.PickingUp, self.OnPickingUp)
	self._trove:Connect(RagdollService.Throwing, self.OnThrowing)
end

function RagdollController:Destroy()
	self._trove:Destroy()
end

return RagdollController
