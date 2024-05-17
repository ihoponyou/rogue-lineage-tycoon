local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(Knit.Util.Trove)

local RagdollService

local InteractionController = Knit.CreateController {
	Name = "InteractionController";
}

function InteractionController:OnCharacterAdded(character: Model)
	self.Character = character

	local overlapParams = OverlapParams.new()
	overlapParams.FilterDescendantsInstances = {self.Character}
	overlapParams.FilterType = Enum.RaycastFilterType.Exclude
	self._params = overlapParams
end

local torsoInteractions = {"Carry", "ForceFeed", "Grip", "Injure"}
function InteractionController:AttemptInteraction(interaction: string)
	--print("attempting", interaction)

	if not table.find(torsoInteractions, interaction) then
		error("invalid interaction")
	end

	local position = self.Character.PrimaryPart.CFrame.Position
	local radius = 4.5

	local parts = workspace:GetPartBoundsInRadius(position, radius, self._params)

	for _,part: Part in parts do
		if part.Name ~= "Torso" then continue end

		RagdollService[interaction.."Request"]:Fire(part.Parent)

		break
	end
end

function InteractionController:KnitInit()
	self._trove = Trove.new()
end

function InteractionController:KnitStart()
	RagdollService = Knit.GetService("RagdollService")

	if Knit.Player.Character then self:OnCharacterAdded(Knit.Player.Character) end
	self._trove:Connect(Knit.Player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)
end

function InteractionController:Destroy()
	self._trove:Destroy()
end

return InteractionController
