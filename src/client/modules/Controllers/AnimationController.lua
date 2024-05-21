local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(game:GetService("ReplicatedStorage").Packages.Knit)
local Trove = require(game:GetService("ReplicatedStorage").Packages.Trove)

local InputController

local AnimationController = Knit.CreateController {
	Name = "AnimationController";
	Tracks = {}
}

local PRINT_STARTS = false
local PRINT_LOADS = false

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

	local map = {
		Forward = "ClimbUp",
		Backward = "ClimbDown",
		Left = "ClimbLeft",
		Right = "ClimbRight"
	}

	if not (key == keybinds.Forward or key == keybinds.Backward or key == keybinds.Left or key == keybinds.Right) then
		return
	end

	if inputObj.UserInputState == Enum.UserInputState.Begin then
		self:Stop("ClimbIdle")
		for direction, animName in map do
			if key == keybinds[direction] then
				self:Play(animName)
				break
			end
		end
	elseif inputObj.UserInputState == Enum.UserInputState.End then
		for direction, animName in map do
			if key == keybinds[direction] then
				self:Stop(animName)
				break
			end
		end
	end

	if not InputController:IsMovementKeyDown() then self:Play("ClimbIdle") end
end

function AnimationController:OnCharacterAdded(character: Model)
	self.Character = character
	local humanoid: Humanoid = self.Character:WaitForChild("Humanoid")
	self.Animator = humanoid:WaitForChild("Animator") :: Animator

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
