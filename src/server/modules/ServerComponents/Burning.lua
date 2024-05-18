local HEAT_AMOUNT = 1.5
local BURN_DAMAGE = 6
local BURN_INTERVAL = 0.5
local TICKS_TO_DIE = 8

local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local TweenService = game:GetService("TweenService")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Timer = require(ReplicatedStorage.Packages.Timer)
local Trove = require(ReplicatedStorage.Packages.Trove)
local Component = require(ReplicatedStorage.Packages.Component)
local Logger = require(ReplicatedStorage.Source.Modules.Extensions.Logger)

local HealthService, RagdollService, SurvivalService

local Burning = Component.new {
	Tag = "Burning";

	Extensions = {
		Logger,
	};
}

function Burning:Construct()
	self._trove = Trove.new()
	self._timer = Timer.new(BURN_INTERVAL)
	self._killTicks = 0

	self.Character = self.Instance.Parent
	self.Torso = self.Character:FindFirstChild("Torso")
	self.FireParticles = self.Torso:FindFirstChild("OrangeFire")
	self.BurningSound = self.Torso:FindFirstChild("Burning")
	self.ExtinguishSound = self.Torso:FindFirstChild("Extinguish")
end

function Burning:OnTick()
	local player = Players:GetPlayerFromCharacter(self.Character)
	if not player then return end
	local data = player.Data
	if not data then return end

	local ragdolled = player.Character:GetAttribute("Knocked")
	if ragdolled then
		self._killTicks += 1
	else
		self._killTicks = 0
	end

	if self._killTicks >= TICKS_TO_DIE then
		warn("blud burned to death innit")

		CollectionService:RemoveTag(self.Instance, "Burning")
		self.FireParticles.Enabled = false
		self.ExtinguishSound:Play()

		for _,child in self.Character:GetChildren() do
			if child:IsA("Part") then
				child.Material = "Slate"
				local tween = TweenService:Create(child, TweenInfo.new(Players.RespawnTime*.75, Enum.EasingStyle.Linear), {Size = Vector3.zero}):Play()
			elseif child:IsA("Clothing") then
				child:Destroy()
			end
		end

		HealthService.Kill(player)
	else
		if self._killTicks >= TICKS_TO_DIE/2 then
			HealthService.BurnScar(player, true)
		end

		local damage = math.min(self.Instance.Health, BURN_DAMAGE)
		self.Instance:TakeDamage(damage)
		SurvivalService.AdjustTemperature(player, HEAT_AMOUNT)
	end
end

function Burning:Start()
	HealthService = Knit.GetService("HealthService")
	SurvivalService = Knit.GetService("SurvivalService")

	self.FireParticles.Enabled = true
	self.BurningSound:Play()

	self._trove:Connect(self._timer.Tick, function()
		self:OnTick()
	end)

	self._timer:Start()
end

function Burning:Stop()
	if self.FireParticles.Enabled then self.FireParticles.Enabled = false end
	if not self.ExtinguishSound.IsPlaying then self.ExtinguishSound:Play() end
	self.BurningSound:Stop()
	self._trove:Destroy()
end

return Burning
