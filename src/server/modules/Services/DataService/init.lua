local PRINT_ON_LOAD = false
local PRINT_EVENTS = false
local PRINT_GETS = true
local PRINT_SETS = true

local BASE_WALK_SPEED = 20
local BASE_MAX_HP = 100
local ReplicatedFirst = game:GetService("ReplicatedFirst")

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local ServerScriptService = game:GetService("ServerScriptService")
local ServerStorage = game:GetService("ServerStorage")
local Players = game:GetService("Players")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Trove = require(ReplicatedStorage.Packages.Trove)
local Timer = require(ReplicatedStorage.Packages.Timer)

local ManaService

local PROFILE_TEMPLATE = require(script.ProfileTemplate)
local ProfileService = require(ReplicatedStorage.libs.ProfileService)
local ProfileStore = ProfileService.GetProfileStore("Production", PROFILE_TEMPLATE)

-- responsible for handling session-specific/"dependent" data and saved data using ProfileService
--		- loading/saving player profiles
--		- loading leaderstats
--		- handling immediate stat changes (walkspeed, max hp, regen)

local DataService = Knit.CreateService {
	Name = "DataService";
	Profiles = {};

	ProfileLoaded = Signal.new();

	Client = {
		ProfileLoaded = Knit.CreateSignal();
	};
}

local PLAYER_DATA_TEMPLATE = ReplicatedFirst.Data

local function error404(player: Player): string
	return string.format("Profile not found for \"%s\"", player.Name)
end

local function loadedMessage(thingLoaded, player: Player): string
	local message = string.format("%s: %s loaded", player.Name, tostring(thingLoaded))
	return message
end

local function getProfile(player: Player)
	--if PRINT_GETS then print("Getting profile of ", player.Name, "in function:\n"..debug.traceback()) end
	local profile = DataService.Profiles[player.UserId]
	if not profile then error(error404(player)) end

	return profile
end

function DataService.Client:GetData(player: Player, key: string): table
	return self.Server.GetData(player, key)
end

function DataService.GetData(player: Player, key: string): table
	local profile = getProfile(player)

	if profile.Data[key] == nil then error(tostring(key).." in profile not found") end

	if PRINT_GETS and (key=="Injuries" or key=="Diseases") then print(player.Name..".Data."..key,"=",profile.Data[key]) end
	return profile.Data[key]
end

function DataService.SetData(player: Player, key: string, value)
	local profile = getProfile(player)

	if profile.Data[key] == nil then error(key.." in profile not found for "..player.Name) end
	if type(profile.Data[key]) ~= type(value) then error(string.format("type mismatch for %s and %s; %s vs. %s", key, tostring(value), type(profile.Data[key]), type(value))) end

	if PRINT_SETS and (key=="Injuries" or key=="Diseases") then print(player.Name..".Data."..key..":",profile.Data[key],"->",value) end
	profile.Data[key] = value
	if player.Data:FindFirstChild(key) then
		player.Data[key].Value = value
	end
end

function DataService.SetStatChange(player: Player, stat: string, value: number)
	local statChanges = player.Data.StatChanges
	local change = statChanges:FindFirstChild(stat)
	if change and type(change.Value) == type(value) then
		change.Value = value

		if stat == "SpeedBoost" then
			player.Character.Humanoid.WalkSpeed = BASE_WALK_SPEED + change.Value
		elseif stat == "HealthBoost" then
			player.Character.Humanoid.MaxHealth = BASE_MAX_HP * (1+change.Value)
		end

		if PRINT_SETS then print(string.format("%s.Data.StatChanges.%s: %s -> %s", player.Name, stat, tostring(statChanges[stat]), tostring(value))) end
	else
		error("Error in stat change.")
	end
end

function DataService.AddStatChange(player: Player, stat: string, value: number)
	local change = player.Data.StatChanges:FindFirstChild(stat)
	if change then
		DataService.SetStatChange(player, stat, change.Value + value)
	else
		warn(stat)
		warn(player.Data.StatChanges)
		error("Stat not found.")
	end
end

function DataService.ResetStatChanges(player: Player)
	local playerData = player:FindFirstChild("Data")
	if not playerData then error("Session data not found for "..player.Name) end
	local statChanges = playerData:FindFirstChild("StatChanges")
	if not statChanges then error("Stat changes folder not found for "..player.Name) end

	statChanges:Destroy()

	local new = PLAYER_DATA_TEMPLATE.StatChanges:Clone()
	new.Parent = playerData
end



local function giveLeaderStats(player: Player)
	local profile = DataService.Profiles[player.UserId]
	if not profile or not player.Character then return end

	local leaderstats = Instance.new("Folder")
	leaderstats.Parent = player
	leaderstats.Name = "leaderstats"

	local silver = Instance.new("NumberValue")
	silver.Parent = leaderstats
	silver.Name = "Silver"
	silver.Value = profile.Data.Silver

	local valu = Instance.new("NumberValue")
	valu.Parent = leaderstats
	valu.Name = "Valu"
	valu.Value = profile.Data.Valu

	local insight = Instance.new("NumberValue")
	insight.Parent = leaderstats
	insight.Name = "Insight"
	insight.Value = profile.Data.Insight
end

local function giveDataFolder(player: Player)
	local folder = PLAYER_DATA_TEMPLATE:Clone()
	folder.Parent = player
end

local function saveCFrame(player)
	local profile = DataService.Profiles[player.UserId]
	if not profile then return end

	local pos = player.Character.HumanoidRootPart.Position
	DataService.SetData(player, "Position", {X=pos.X, Y=pos.Y, Z=pos.Z})

	local dir = player.Character.HumanoidRootPart.CFrame.LookVector
	DataService.SetData(player, "Direction", {X=dir.X, Z=dir.Z})

	--print(string.format('saving pos (%d, %d, %d) & dir (%f, %f) for: %s', pos.X, pos.Y, pos.Z, dir.X, dir.Z, player.Name))
end

local function loadCFrame(character: Model)
	local player = Players:GetPlayerFromCharacter(character)
	local profile = DataService.Profiles[player.UserId]
	if not profile then return end

	local position = profile.Data.Position
	local direction = profile.Data.Direction

	--print(string.format('loading position (%d, %d, %d) for: %s', position.X, position.Y, position.Z, player.Name))
	local at = Vector3.new(position.X, position.Y, position.Z)
	local lookAt = at + Vector3.new(direction.X, 0, direction.Z)
	player.Character:PivotTo(CFrame.lookAt(at, lookAt))
end

local function chooseSpawn(): Part
	local spawns = workspace.TycoonSpawns:GetChildren()
	for _,part in ipairs(spawns) do
		if not part:GetAttribute("Occupied") then
			part:SetAttribute("Occupied", true)
		end
	end
end

function DataService.OnTick(deltaTime: number)
	for _,character: Model in workspace.Alive:GetChildren() do
		pcall(function()
			local player = Players:GetPlayerFromCharacter(character)
			if not player then return end
			if not player:GetAttribute("CFrameLoaded") then return end
			local humanoid: Humanoid = character:FindFirstChild("Humanoid")
			if not humanoid or humanoid.Health <= 1 then return end
			local hrp = character:FindFirstChild("HumanoidRootPart")
			if not hrp then return end

			task.spawn(saveCFrame, player)
		end)
	end
end

function DataService.OnProfileLoaded(player: Player)
	if PRINT_EVENTS then print(loadedMessage("Profile", player)) end
	local profile = DataService.Profiles[player.UserId]
	if PRINT_ON_LOAD then print(profile) end

	player.CharacterAdded:Wait()
	while player.Character.Parent ~= workspace.Alive do player.Character.AncestryChanged:Wait() end
	--loadCFrame(player.Character)
	player:SetAttribute("CFrameLoaded", true)
end

function DataService.OnPlayerAdded(player: Player)
	if PRINT_EVENTS then print(loadedMessage("Player", player)) end
	local key = "Player"..tostring(player.UserId)
	ProfileStore:WipeProfileAsync(key)
	local profile = ProfileStore:LoadProfileAsync(key)
	if not profile then
		player:Kick("data loading issue")
		return
	end

	profile:AddUserId(player.UserId)
	profile:Reconcile()
	profile:ListenToRelease(function()
		DataService.Profiles[player.UserId] = nil
		player:Kick("data loading issue")
	end)

	if player:IsDescendantOf(Players) then
		DataService.Profiles[player.UserId] = profile

		giveDataFolder(player)
		giveLeaderStats(player)

		DataService.ProfileLoaded:Fire(player)
		DataService.Client.ProfileLoaded:Fire(player)
	else
		profile:Release()
	end
end

function DataService.OnPlayerRemoving(player: Player)
	local profile = DataService.Profiles[player.UserId]
	if not profile then return end

	profile:Release()
end

function DataService:KnitInit()
	self._trove = Trove.new()

	self._timer = self._trove:Add(Timer.new(0.5))
end

function DataService:KnitStart()
	ManaService = Knit.GetService("ManaService")

	self._trove:Connect(self.ProfileLoaded, self.OnProfileLoaded)
	--self._trove:Connect(self._timer.Tick, self.OnTick)
	self._timer:Start()

	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return DataService
