local PRINT_STARTS = false
local PRINT_LOADS = false

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Knit = require(game:GetService("ReplicatedStorage").Packages.Knit)
local Trove = require(game:GetService("ReplicatedStorage").Packages.Trove)

local InputController

local AnimationController = Knit.CreateController {
	Name = "AnimationController";
	Tracks = {}
}

local ANIMATIONS = ReplicatedStorage.Animations

function AnimationController:LoadAnimation(anim: Animation, log: boolean): AnimationTrack
	if not anim:IsA("Animation") then if log then warn("\""..anim.Name.."\" is not an Animation") end return end
	if log then print("Loading", anim.Name, "for "..Knit.Player.Name) end

	self.Tracks[anim.Name] = self._trove:Add(self.Animator:LoadAnimation(anim))

	if PRINT_LOADS then print("anim loaded @ AnimationController."..anim.Name) end
end

function AnimationController:LoadAnimations(log: boolean)
	for _,anim: Animation in ANIMATIONS:GetDescendants() do
		self:LoadAnimation(anim, log)
	end
end

function AnimationController:Play(animName: string): AnimationTrack
	local animTrack: AnimationTrack = self.Tracks[animName]
	if animTrack == nil then error("Animation \""..animName.."\" not found for "..Knit.Player.Name) end
	animTrack:Play()
	return animTrack
end

function AnimationController:Stop(animName: string)
	local animTrack: AnimationTrack = self.Tracks[animName]
	if animTrack == nil then error("Animation \""..animName.."\" not found for "..Knit.Player.Name) end
	animTrack:Stop()
end

function AnimationController:HandleClimbAnims(inputObj: InputObject, gpe: boolean)
	if gpe then return end

	local key = inputObj.KeyCode
	local keybinds = InputController.Keybinds

	if key == keybinds.Forward or key == keybinds.Backward or key == keybinds.Left or key == keybinds.Right then
		if inputObj.UserInputState == Enum.UserInputState.Begin then
			self.Tracks.ClimbIdle:Stop()
			if key == keybinds.Forward then
				self:Play("ClimbUp")
			elseif key == keybinds.Backward then
				self:Play("ClimbDown")
			elseif key == keybinds.Left then
				self:Play("ClimbLeft")
			elseif key == keybinds.Right then
				self:Play("ClimbRight")
			end
		elseif inputObj.UserInputState == Enum.UserInputState.End then
			if key == keybinds.Forward then
				self:Stop("ClimbUp")
			elseif key == keybinds.Backward then
				self:Stop("ClimbDown")
			elseif key == keybinds.Left then
				self:Stop("ClimbLeft")
			elseif key == keybinds.Right then
				self:Stop("ClimbRight")
			end
		end

		if not InputController:IsWasdDown() then self:Play("ClimbIdle") end
	end
end

function AnimationController:OnCharacterAdded(character: Model)
	self.Character = character
	local humanoid: Humanoid = self.Character:WaitForChild("Humanoid")
	self.Animator = humanoid:WaitForChild("Animator")

	self:LoadAnimations(false)
	self.Tracks.ClimbUp.Priority = Enum.AnimationPriority.Action2

	if self._characterTrove then self._characterTrove:Destroy() end
	self._characterTrove = self._trove:Extend()
end

function AnimationController:KnitInit()
	self._trove = Trove.new()
end

function AnimationController:KnitStart()
	InputController = Knit.GetController("InputController")

	if Knit.Player.Character then self:OnCharacterAdded() end
	self._trove:Connect(Knit.Player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)

	if PRINT_STARTS then print("AnimationController started") end
end

function AnimationController:Destroy()
	self._trove:Destroy()
end

return AnimationController
