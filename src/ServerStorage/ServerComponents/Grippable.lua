local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(ReplicatedStorage.Packages.Trove)
local Component = require(ReplicatedStorage.Packages.Component)
local Logger = require(ReplicatedStorage.Extensions.Logger)

local HealthService, RagdollService

local Grippable = Component.new {
	Tag = "Grippable";
	Extensions = {
		Logger,
	};
}

function Grippable:Construct()
	self._trove = Trove.new()

	self.gettingGripped = false
end

function Grippable:Grip(player: Player, raycastResult: RaycastResult)
	local gripper: Model = player.Character
	print(gripper.Name, "gripping", self.Instance.Name)

	self._gripTrove = self._trove:Extend()
	self._gripTrove:Connect(gripper:GetAttributeChangedSignal("Ragdolled"), function()
		print(gripper.Name, "ragdolled; releasing", self.Instance.Name)
		self:Release(player)
	end)
	self._gripTrove:Connect(gripper:GetAttributeChangedSignal("Dead"), function()
		print(self.Instance.Name, "died; releasing", gripper.Name)
		self:Release(player)
	end)

	self.gettingGripped = true
	local grippee: Model = self.Instance

	grippee:SetAttribute("GettingGripped", true)
	gripper:SetAttribute("Gripping", grippee.Name)

	local grippeeHumanoid = grippee:FindFirstChildWhichIsA("Humanoid")
	local gripperHumanoid = gripper:FindFirstChildWhichIsA("Humanoid")
	if not grippeeHumanoid then error("nil humanoid(s)") end
	CollectionService:RemoveTag(grippeeHumanoid, "Burning")
	grippeeHumanoid.AutoRotate = false
	gripperHumanoid.AutoRotate = false

	local grippeeAnimator: Animator = grippeeHumanoid.Animator
	local gripperAnimator: Animator = gripperHumanoid.Animator

	local hitSound: Sound = grippee.Torso:FindFirstChild("PunchHit") or self._trove:Clone(ReplicatedStorage.Effects.Sounds.PunchHit)
	hitSound.Parent = grippee.Torso
	local hitParticle: ParticleEmitter = grippee.Head:FindFirstChild("PunchEmit") or self._trove:Clone(ReplicatedStorage.Effects.Visuals.PunchEmit)
	hitParticle.Parent = grippee.Head

	self.Gripped = grippeeAnimator:LoadAnimation(ReplicatedStorage.Animations.Combat.Gripped)
	self._gripTrove:Connect(self.Gripped.KeyframeReached, function(keyframeName)
		if keyframeName == "Resting" then
			self.Gripped:AdjustSpeed(0)
		end
	end)

	self.Gripping = gripperAnimator:LoadAnimation(ReplicatedStorage.Animations.Combat.Gripping)
	self._gripTrove:Connect(self.Gripping.KeyframeReached, function(keyframeName)
		if keyframeName == "FinalHit" then
			self.Gripped:Play()
			hitSound:Play()
			hitParticle:Emit(1)
			self._ticks += 1
			if self._ticks >= 5 then
				print("grip complete")

				grippeeHumanoid.Health = 0
				local grippedPlayer = Players:GetPlayerFromCharacter(grippee)
				if grippedPlayer ~= nil then HealthService.Kill(grippedPlayer) end
				RagdollService.Pop(grippee)

				gripper.HumanoidRootPart.RootJoint.Enabled = false
				RunService.Stepped:Wait()
				gripper.HumanoidRootPart.RootJoint.Enabled = true

				hitSound.Ended:Wait()
				self:Release(player)
			end
		end
	end)

	self._ticks = 0
	self.Gripping:Play()
	self.Gripped:Play(0, 1, 0)

	grippee.PrimaryPart.Anchored = true
	local pos = raycastResult.Position + Vector3.yAxis*0.5
	local zRotation = grippee.PrimaryPart.Orientation.Z
	grippee:PivotTo(CFrame.lookAt(pos, pos + Vector3.yAxis))
	grippee:PivotTo(grippee:GetPivot() * CFrame.Angles(0, 0, math.rad(zRotation)))

	for _,joint in grippee.Torso:GetChildren() do
		if joint:IsA("Motor6D") then
			joint.Enabled = true
		end
	end

	local positionOffset = Vector3.new(0,2.5,0) + -grippee.PrimaryPart.CFrame.UpVector * 3
	local rotationOffset = CFrame.Angles(math.rad(90), math.rad(0), math.rad(180))
	gripper.PrimaryPart.Anchored = true
	gripper:PivotTo(grippee:GetPivot() * rotationOffset + positionOffset)
end

function Grippable:Release(player: Player)
	self._gripTrove:Destroy()

	self.gettingGripped = false
	self._ticks = 0

	self.Gripping:Stop()
	self.Gripped:Stop()
	self.Gripping = nil
	self.Gripped = nil

	local grippee: Model = self.Instance
	local gripper: Model = player.Character
	if grippee.Parent == workspace.Dead then return end

	local humanoid = gripper:FindFirstChildWhichIsA("Humanoid")
	humanoid.AutoRotate = true
	for _,joint in grippee.Torso:GetChildren() do
		if joint:IsA("Motor6D") then
			joint.Enabled = false
		end
	end

	grippee:SetAttribute("GettingGripped", nil)
	gripper:SetAttribute("Gripping", nil)

	grippee.PrimaryPart.Anchored = false
	gripper.PrimaryPart.Anchored = false
end

--function Grippable:OnTriggered(player: Player)
--	if player.Character == self.Instance then return end

--	if not self.isCarried then
--		self:PickUp(player)
--	else
--		self:Release(player)
--	end
--end

--function Grippable:OnKnocked(...)
--	self.Prompt.Enabled = self.Instance:GetAttribute("Knocked") or false
--end

function Grippable:Start()
	HealthService = Knit.GetService("HealthService")
	RagdollService = Knit.GetService("RagdollService")

	--self._trove:Connect(self.Prompt.Triggered, function(...) self:OnTriggered(...) end)
	--self._trove:Connect(self.Instance:GetAttributeChangedSignal("Knocked"), function(...) self:OnKnocked(...) end)
end

function Grippable:Stop()
	self._trove:Destroy()
end

return Grippable
