local PRINT_STARTS = false

local BASE_WALK_SPEED = 20

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local Knit = require(game:GetService("ReplicatedStorage").Packages.Knit)
local Signal = require(Knit.Util.Signal)
local Timer = require(Knit.Util.Timer)
local Trove = require(Knit.Util.Trove)
local DataService, ManaService
local GuiController, MovementController

local MagicController = Knit.CreateController {
	Name = "MagicController";

	Loaded = false;
}

function MagicController:ChargeMana(bool: boolean)
	if not self.ManaObtained then print("mana not obtained") return end
	if MovementController.Climbing or MovementController.Dashing then return end
	if self.Character:GetAttribute("Ragdolled") then return end

	if MovementController.Running then
		MovementController:RunStop()
	end

	local statChanges = Knit.Player.Data.StatChanges
	local speedBoost = statChanges.SpeedBoost.Value

	local BASE_PLAYER_SPEED = BASE_WALK_SPEED + speedBoost

	local doCharge = if bool == nil then true else bool

	if doCharge then
		self.ChargingSound:Play()
		self.Character.Humanoid.WalkSpeed = BASE_PLAYER_SPEED * .85
	else
		self.Character.Humanoid.WalkSpeed = BASE_PLAYER_SPEED
	end

	ManaService.ChargingMana:Fire(doCharge)
	self.ChargingMana = doCharge
end

function MagicController:Update(deltaTime: number)
	if not self.ChargingMana then
		return
	end

	if not self.ChargingSound.Playing then
		self.ChargingSound:Play()
	end
end

function MagicController:HasMana(): boolean
	local mana = Knit.Player.Data.ManaAmount.Value
	return mana > 0
end

function MagicController:OnManaObtained()
	self.ManaObtained = true
end

function MagicController:OnManaFilled()
	self.FilledSound:Play()
	self:ChargeMana(false)
end

function MagicController:OnCharacterAdded(character: Model)
	self.Loaded = false
	self.Character = character

	self.ChargingSound.Parent = character:WaitForChild("HumanoidRootPart")
	self.FilledSound.Parent = character.HumanoidRootPart

	self.ChargingMana = false

	self.Loaded = true
end

function MagicController:KnitInit()
	self._trove = Trove.new()

	self.ChargingSound = self._trove:Clone(ReplicatedStorage.Effects.Sounds.Charging)
	self.FilledSound = self._trove:Clone(ReplicatedStorage.Effects.Sounds.FinishedCharging)

	self.ManaObtained = false
end

function MagicController:KnitStart()
	DataService = Knit.GetService("DataService")
	ManaService = Knit.GetService("ManaService")

	MovementController = Knit.GetController("MovementController")

	if Knit.Player.Character then self:OnCharacterAdded() end
	self._trove:Connect(Knit.Player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)
	self._trove:Connect(Players.PlayerRemoving, function(...) self:OnPlayerRemoving(...) end)
	self._trove:BindToRenderStep("magic_update", Enum.RenderPriority.First.Value, function(...) self:Update(...) end)

	self._trove:Connect(DataService.ProfileLoaded, self.OnProfileLoaded)
	self._trove:Connect(ManaService.ManaObtained, function(...) self:OnManaObtained(...) end)
	self._trove:Connect(ManaService.ManaFilled, function(...) self:OnManaFilled(...) end)

	if PRINT_STARTS then print("MagicController started") end
end

function MagicController:Destroy()
	self._trove:Destroy()
end

return MagicController