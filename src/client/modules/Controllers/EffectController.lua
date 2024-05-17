local PRINT_STARTS = false
local PRINT_LOADS = false

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local Knit = require(game:GetService("ReplicatedStorage").Packages.Knit)
local Trove = require(game:GetService("ReplicatedStorage").Packages.Trove)

local InputController

-- this only works for client sided effects

local EffectController = Knit.CreateController {
	Name = "EffectController";

	ParticleEmitters = {};
	Trails = {};
	Sounds = {};
}

function EffectController:LoadEffect<E>(effect: E, log: boolean)
	local isValidType = effect:IsA("ParticleEmitter") or effect:IsA("Trail") or effect:IsA("Sound")
	if not isValidType then if log then error("\""..effect.ClassName.."\" is not a valid effect type.") end end
	if log then print("Loading", effect.Name, "for "..Knit.Player.Name) end

	local clone = self._trove:Clone(effect)
	self[effect.ClassName.."s"][effect.Name] = clone
	clone.Parent = self.Character:WaitForChild("Torso")

	if PRINT_LOADS or log then print("Effect loaded @ EffectController."..effect.Name) end
end

function EffectController:LoadEffects(folder: Folder, log: boolean)
	for _,item in folder:GetChildren() do
		self:LoadEffect(item, log)
	end
end

function EffectController:OnCharacterAdded(character: Model)
	self.Character = character
end

function EffectController:KnitInit()
	self._trove = Trove.new()
end

function EffectController:KnitStart()
	if Knit.Player.Character then self:OnCharacterAdded() end
	self._trove:Connect(Knit.Player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)
	self._trove:Connect(Players.PlayerRemoving, function(...) self:OnPlayerRemoving(...) end)

	if PRINT_STARTS then print("EffectController started") end
end

function EffectController:Destroy()
	self._trove:Destroy()
end

return EffectController
