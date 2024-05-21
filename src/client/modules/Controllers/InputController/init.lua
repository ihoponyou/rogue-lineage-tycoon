local ContextActionService = game:GetService("ContextActionService")
local UserInputService = game:GetService("UserInputService")

local Knit = require(game:GetService("ReplicatedStorage").Packages.Knit)
local Trove = require(game:GetService("ReplicatedStorage").Packages.Trove)

local InteractionController, MagicController, MovementController

-- "bridges the gap" between controllers by linking functionality to inputs
local InputController = Knit.CreateController {
	Name = "InputController";
	Keybinds = {};
}

local PRINT_STARTS = false
local PRINT_INPUTS = false
local RUN_INTERVAL = 0.2

local DEFAULT_KEYBINDS = require(script.DefaultKeybinds)

function InputController:GetAxis(axis : string)
	local isRightDown = UserInputService:IsKeyDown(self.Keybinds.Right)
	local isLeftDown = UserInputService:IsKeyDown(self.Keybinds.Left)
	local isForwardDown = UserInputService:IsKeyDown(self.Keybinds.Forward)
	local isBackwardDown = UserInputService:IsKeyDown(self.Keybinds.Backward)
	if axis == "horizontal" then
		if isRightDown and isLeftDown then
			return 0
		elseif isRightDown then
			return 1
		elseif isLeftDown then
			return -1
		else
			return 0
		end
	elseif axis == "vertical" then
		if isForwardDown and isBackwardDown then
			return 0
		elseif isForwardDown then
			return 1
		elseif isBackwardDown then
			return -1
		else
			return 0
		end
	else
		print("getAxis("..axis..") failed")
	end
end

function InputController:IsMovementKeyDown(): boolean
	return UserInputService:IsKeyDown(self.Keybinds.Forward)
		or UserInputService:IsKeyDown(self.Keybinds.Backward)
		or UserInputService:IsKeyDown(self.Keybinds.Left)
		or UserInputService:IsKeyDown(self.Keybinds.Right)
end

function InputController:_Forward(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if PRINT_INPUTS then print("forward") end
	if userInputState == Enum.UserInputState.Begin then
		if (tick() - self._lastW) < RUN_INTERVAL then
			MovementController:AttemptRun()
		end
		self._lastW = tick()
	elseif userInputState == Enum.UserInputState.End then
		if MovementController.Running then
			MovementController:RunStop()
		end
	end
	--print("_Forward called:", actionName, tostring(userInputState), tostring(inputObject))
end

function InputController:_Jump(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if PRINT_INPUTS then print("jump") end
	if userInputState == Enum.UserInputState.Begin then
		MovementController:HandleJump()
	end
end

function InputController:_Dash(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
		if PRINT_INPUTS then print("dash") end
		if userInputState == Enum.UserInputState.Begin then
		MovementController:AttemptDash()
	end
end

function InputController:_ChargeMana(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if PRINT_INPUTS then print("chargeMana") end
	if userInputState == Enum.UserInputState.Begin then
		MagicController:ChargeMana()
	elseif userInputState == Enum.UserInputState.End then
		MagicController:ChargeMana(false)
	end
end

function InputController:_LightAttack(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if userInputState == Enum.UserInputState.Begin then
		if PRINT_INPUTS then print('light attack') end
	end
end

function InputController:_HeavyAttack(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if userInputState == Enum.UserInputState.Begin then
		if PRINT_INPUTS then print('heavy attack') end
	end
end

function InputController:_Block(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if userInputState == Enum.UserInputState.Begin then
		if PRINT_INPUTS then print('block up') end
	elseif userInputState == Enum.UserInputState.End then
		if PRINT_INPUTS then print("block down") end
	end
end

function InputController:_Interact(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if userInputState == Enum.UserInputState.Begin then
		if PRINT_INPUTS then print("interact") end
	end
end

function InputController:_Carry(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if userInputState == Enum.UserInputState.Begin then
		if PRINT_INPUTS then print('carry') end
		InteractionController:AttemptInteraction("Carry")
	end
end

function InputController:_Grip(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if userInputState == Enum.UserInputState.Begin then
		if PRINT_INPUTS then print('grip') end
		InteractionController:AttemptInteraction("Grip")
	end
end

function InputController:_Injure(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if userInputState == Enum.UserInputState.Begin then
		if PRINT_INPUTS then print("injure") end
		InteractionController:AttemptInteraction("Injure")
	end
end

function InputController:_ForceFeed(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
	if userInputState == Enum.UserInputState.Begin then
		if PRINT_INPUTS then print("force feed") end
		InteractionController:AttemptInteraction("ForceFeed")
	end
end

function InputController:LoadKeybind(action: string, keybind: Enum.KeyCode, log: boolean)
	if not self["_"..action] then
		if log then print(string.format("%-12s could not be loaded @ %32s", action, tostring(keybind))) end
		return
	end

	ContextActionService:BindAction(
		"input_"..action,
		function(...)
			self["_"..action](self, ...)
			return Enum.ContextActionResult.Pass
		end,
		false,
		keybind
	)

	if log then print(string.format("%-12s loaded @ %32s", action, tostring(keybind))) end
end

function InputController:UnloadKeybind(action: string, log: boolean)
	ContextActionService:UnbindAction("input_"..action)
	if log then print(string.format("%-12s unloaded", action)) end
end

function InputController:LoadKeybinds(log: boolean)
	for action,keybind in pairs(self.Keybinds) do
		self:LoadKeybind(action, keybind, log)
	end
end

function InputController:UnloadKeybinds(log: boolean)
	for action,_ in pairs(self.Keybinds) do
		self:UnloadKeybind(action, log)
	end
end

function InputController:ReloadKeybinds(log: boolean)
	self:UnloadKeybinds(log)
	self:LoadKeybinds(log)
end

function InputController:ResetKeybinds()
	for action,_ in pairs(self.Keybinds) do
		self:UnloadKeybind(action, false)
	end
	for action,keybind in pairs(DEFAULT_KEYBINDS) do
		self:LoadKeybind(action, keybind, false)
	end
	print("Keybinds reset.")
end

function InputController:ChangeKeybind(action: string, keyToChange: Enum.KeyCode, newKey: Enum.KeyCode)
	self:UnloadKeybind(action, keyToChange)
	self:LoadKeybind(action, newKey)
end

function InputController:KnitInit()
	self._trove = Trove.new()

	self._lastW = 0

	self.Keybinds = table.clone(DEFAULT_KEYBINDS)
end

function InputController:KnitStart()
	MagicController = Knit.GetController("MagicController")
	MovementController = Knit.GetController("MovementController")
	InteractionController = Knit.GetController("InteractionController")

	self:LoadKeybinds()

	ContextActionService:BindAction(
		"reset_keybinds",
		function(actionName: string, userInputState: Enum.UserInputState, inputObject: InputObject)
			if userInputState == Enum.UserInputState.Begin then
				self:ResetKeybinds()
				return Enum.ContextActionResult.Pass
			end
		end,
		false,
		Enum.KeyCode.BackSlash
	)

	if PRINT_STARTS then print("InputController started") end
end

return InputController
