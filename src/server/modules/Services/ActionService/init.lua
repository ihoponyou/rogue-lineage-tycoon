local PRINT_STARTS = false
local PRINT_STOPS = false
local ACTIONS = require(script.Actions)

local CollectionService = game:GetService("CollectionService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Trove = require(ReplicatedStorage.Packages.Trove)

local ManaService
local Burning = require(ServerStorage.Source.ServerComponents.Burning)

local ActionService = Knit.CreateService {
	Name = "ActionService";
	SessionData = {};

	ActionStarted = Signal.new();
	ActionStopped = Signal.new();

	Client = {
		ActionStarted = Knit.CreateSignal();
		ActionStopped = Knit.CreateSignal();
	};
}

local function CheckAction(action : string): boolean
	if type(action) ~= "string" then error("\""..tostring(action).."\" is not a string") return false
	elseif not table.find(ACTIONS, action) then error("\""..action.."\" is not a valid action") return false
	else return true end
end

function ActionService.Client:AttemptAction(player, action)
	local success = false
	if not CheckAction(action) then return success end

	if ActionService:Can(player, action) then
		self.ActionStarted:Fire(player, action)
		--ActionService.Client.ActionStarted:Fire(player, action)
		success = true
	else
		success = false
	end

	print(player, "attempted", action, ":", if success then "success" else "failed")
	return success
end

function ActionService.Client:Can(player: Player, action: string): boolean
	return self.Server:Can(player, action)
end

function ActionService:Can(player: Player, action: string): boolean
	if not CheckAction(action) then return end

	local canDo = false

	local activity = ActionService.SessionData[player.Name]
	local fighting = activity.attack or activity.block or activity.cast
	local hasMana = ManaService:HasMana(player)

	if action == "climb"
		and hasMana
		and not (activity.climb or 									fighting) then
		canDo = true
	elseif action == "run"
		and not (activity.climb or activity.run or activity.dash or fighting) then
		canDo = true
	elseif action == "dash"
		and not (activity.climb or 				   activity.dash or fighting) then
		canDo = true
	elseif action == "attack"
		and not (activity.climb or 				   activity.dash or fighting) then
		canDo = true
	elseif action == "block"
		and not (activity.climb or 				   activity.dash or fighting) then
		canDo = true
	elseif action == "cast"
		and hasMana
		and not (activity.climb or activity.run or activity.dash or fighting) then
		canDo = true
	elseif action == "chargeMana"
		and not (activity.climb or activity.run or activity.dash or fighting) then
		canDo = true
	end

	--print(player, if canDo then "can" else "cannot", action)

	return canDo
end

function ActionService.Client:IsCurrently(player: Player, action: string): boolean
	return ActionService:IsCurrently(player, action)
end

function ActionService:IsCurrently(player: Player, action: string): boolean
	if not CheckAction(action) then return end
	return ActionService.SessionData[player.Name][action]
end



local function onDash(player: Player, state: string)
	local character = player.Character
	if not character then return end
	local humanoid = character:FindFirstChild("Humanoid")
	if not humanoid then return end
	local burnComponent = Burning:FromInstance(humanoid)
	if not burnComponent then return end

	if state == "start" then
		burnComponent.FireParticles.Enabled = false
		burnComponent.ExtinguishSound:Play()
	elseif state == "stop" then
		CollectionService:RemoveTag(humanoid, "Burning")
	end
end

function ActionService:OnActionStarted(player, action)
	if not CheckAction(action) then return end

	if action == "dash" then
		onDash(player, "start")
	end

	ActionService.SessionData[player.Name][action] = true
	if PRINT_STARTS then print(player, "started", action) end
end

function ActionService:OnActionStopped(player, action)
	if not CheckAction(action) then return end

	if action == "dash" then
		onDash(player, "stop")
	end

	ActionService.SessionData[player.Name][action] = false
	if PRINT_STOPS then print(player, "stopped", action) end
end

function ActionService.OnPlayerAdded(player)
	ActionService.SessionData[player.Name] = {}
	for _,action in ipairs(ACTIONS) do
		ActionService.SessionData[player.Name][action] = false
	end
end

function ActionService.OnPlayerRemoving(player)
	ActionService.SessionData[player.Name] = nil
end

function ActionService:KnitInit()
	self._trove = Trove.new()
end

function ActionService:KnitStart()
	ManaService = Knit.GetService("ManaService")

	self._trove:Connect(self.Client.ActionStarted, function(...)
		self:OnActionStarted(...)
	end)
	self._trove:Connect(self.Client.ActionStopped, function(...)
		self:OnActionStopped(...)
	end)

	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return ActionService
