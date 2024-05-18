local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(ReplicatedStorage.Packages.Trove)
local Component = require(ReplicatedStorage.Packages.Component)
local Logger = require(ReplicatedStorage.Source.Modules.Extensions.Logger)

local RagdollService

local Carriable = Component.new {
	Tag = "Carriable";
	Extensions = {
		Logger,
	};
}

function Carriable:Construct()
	self._trove = Trove.new()

	self.IsCarried = false
end

function Carriable:PickUp(player: Player)
	local carrier: Model = player.Character
	print(carrier.Name, "picking up", self.Instance.Name)
	self._carryTrove = self._trove:Extend()
	self._carryTrove:Connect(carrier:GetAttributeChangedSignal("Ragdolled"), function()
		print(carrier.Name, "ragdolled; releasing", self.Instance.Name)
		self:Release(player)
	end)

	self.IsCarried = true
	local model: Model = self.Instance
	local carryAtt: Attachment = carrier.HumanoidRootPart.CarryAttachment

	RagdollService.Client.PickingUp:Fire(player)
	model.PrimaryPart:SetNetworkOwner(player)

	model:SetAttribute("Carried", true)
	carrier:SetAttribute("Carrying", model.Name)

	local humanoid = model:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		CollectionService:RemoveTag(humanoid, "Burning")
	end

	for _,child in model:GetChildren() do
		if child:IsA("BasePart") then
			child.CollisionGroup = "Carried"
			child.Massless = true
		end
	end

	--model:PivotTo(carryAtt.WorldCFrame)
	--model.Torso.CarryWeld.Part1 = carrier.Torso
	--model.PrimaryPart.CarryConstraint.Attachment1 = carryAtt
	model.PrimaryPart.CarryOrientation.Attachment1 = carryAtt
	model.PrimaryPart.CarryPosition.Attachment1 = carryAtt
end

function Carriable:Release(player: Player)
	self._carryTrove:Destroy()

	self.IsCarried = false
	local model: Model = self.Instance
	local carrier: Model = player.Character
	if model.Parent == workspace.Dead then return end

	RagdollService.Client.Throwing:Fire(player)
	model.PrimaryPart:SetNetworkOwner(Players:GetPlayerFromCharacter(self.Instance))
	-- also resets it to server if npc!! yippee!!

	model:SetAttribute("Carried", false)
	carrier:SetAttribute("Carrying", nil)

	local cast = workspace:Spherecast(carrier.Head.Position, 2, carrier.PrimaryPart.CFrame.LookVector*2)
	if cast then
		model:PivotTo(CFrame.new(cast.Position + cast.Normal))
	else
		model.Head.AssemblyLinearVelocity = Vector3.new(0,50,0)
		model.PrimaryPart.AssemblyLinearVelocity = carrier.PrimaryPart.CFrame.LookVector*35 + Vector3.new(0,50,0)
	end

	for _,child in model:GetChildren() do
		if child:IsA("BasePart") then
			child.CollisionGroup = "Characters"
			child.Massless = false
		end
	end

	--model.Torso.CarryWeld.Part1 = nil
	--model.PrimaryPart.CarryConstraint.Attachment1 = nil
	model.PrimaryPart.CarryOrientation.Attachment1 = nil
	model.PrimaryPart.CarryPosition.Attachment1 = nil
end

--function Carriable:OnTriggered(player: Player)
--	if player.Character == self.Instance then return end

--	if not self.isCarried then
--		self:PickUp(player)
--	else
--		self:Release(player)
--	end
--end

--function Carriable:OnKnocked(...)
--	self.Prompt.Enabled = self.Instance:GetAttribute("Knocked") or false
--end

function Carriable:Start()
	RagdollService = Knit.GetService("RagdollService")

	--self._trove:Connect(self.Prompt.Triggered, function(...) self:OnTriggered(...) end)
	--self._trove:Connect(self.Instance:GetAttributeChangedSignal("Knocked"), function(...) self:OnKnocked(...) end)
end

function Carriable:Stop()
	self._trove:Destroy()
end

return Carriable
