local PRINT_ON_LOAD = false
local PRINT_GETS = false
local PRINT_SETS = false

local BASE_REGEN_RATE = .5
local FF_DURATION = 15

local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local ServerScriptService = game:GetService("ServerScriptService")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Trove = require(ReplicatedStorage.Packages.Trove)
local Timer = require(ReplicatedStorage.Packages.Timer)

local DataService, IdentityService, ManaService, ProgressionService, RagdollService

-- handles player health (omg): injuries, diseases, other miscellaneous medical conditions
-- 		- regenerating player health

local HealthService = Knit.CreateService {
	Name = "HealthService";
	
	SessionData = {};
	_playerTroves = {};
	
	Client = {
		Knocked = Knit.CreateSignal();
		Killed = Knit.CreateSignal();
	};
}



local function err404(thingNotFound, query, player: Player): string
	local message = string.format("%s: \"%s\" not found with query \"%s\"", player.Name, tostring(thingNotFound), tostring(query))
	return message
end

local function doInjureEffects(character: Model)
	local torso = character:FindFirstChild("Torso")
	if not torso then return end
	local sound = torso:FindFirstChild("Injured")
	if sound then sound:Play() end
	local visual = torso:FindFirstChild("Injure")
	if visual then visual:Emit(1) end
end



function HealthService.Frostbite(player: Player, doEffects: boolean)
	local character = player.Character
	if not character then warn(err404("Character", "", player)) return end
	local humanoid: Humanoid = character.Humanoid
	if not humanoid then warn(err404("Humanoid", "", player)) return end
	
	local conditions = HealthService.SessionData[player.UserId].Conditions
	local index = table.find(conditions, "Frostbite")
	if index then
		return
	else
		table.insert(conditions, "Frostbite")
		
		while not player:GetAttribute("SkinColor") do RunService.Heartbeat:Wait() end
		local h,s,v = player:GetAttribute("SkinColor"):ToHSV()
		IdentityService.SetSkinColor(player, Color3.fromHSV(h, s/2, v))
		
		CollectionService:AddTag(humanoid, "Frostbite")	
		
		if player.Data.Temperature.Value == 0 then
			player.Data.Temperature.Value = 15
		end
			
		if doEffects then doInjureEffects(character) end
	end
end

function HealthService.BurnScar(player: Player, doEffects: boolean)
	local character = player.Character
	if not character then warn(err404("Character", "", player)) return end
	local humanoid: Humanoid = character.Humanoid
	if not humanoid then warn(err404("Humanoid", "", player)) return end
	
	local conditions = HealthService.SessionData[player.UserId].Conditions
	local index = table.find(conditions, "BurnScar")
	if index then
		return
	else
		table.insert(conditions, "BurnScar")
		
		ReplicatedStorage.Appearance.FacialExtras.Scars.BurnScar:Clone().Parent = character.Head
		
		CollectionService:AddTag(humanoid, "BurnScar")
		
		if player.Data.Temperature.Value == 100 then
			player.Data.Temperature.Value = 70
		end
		
		if doEffects then doInjureEffects(character) end
	end
end

function HealthService.RemoveCondition(player: Player, conditionName: string)
	local sessionData = HealthService.SessionData[player.UserId]
	local conditions = sessionData.Conditions 
	local index = table.find(conditions, conditionName)
	if index == 0 then return end
	CollectionService:RemoveTag(player, conditions[index])
	table.remove(conditions, index)
end

function HealthService.GiveForcefield(character: Model)
	local ffTrove = Trove.new()
	
	local spawnPos = character.HumanoidRootPart.Position
	local spawnTick = tick()
	local ff = ffTrove:Add(Instance.new("ForceField"))
	ff.Parent = character

	local ffTimer = ffTrove:Add(Timer.new(0.5))
	ffTrove:Connect(ffTimer.Tick, function()
		local nowPos = character.HumanoidRootPart.Position
		if tick()-spawnTick > FF_DURATION or (nowPos-spawnPos).Magnitude > 5 then
			ffTrove:Destroy()
		end
	end)
	ffTimer:StartNow()
end

function HealthService.Knock(player: Player)
	local character = player.Character
	if not character then return end
	if character:GetAttribute("Knocked") then return end
	
	print(player.Name, ": KNOCKED")
	HealthService.Client.Knocked:Fire(player)
	character:SetAttribute("Knocked", true)
	RagdollService.ToggleRagdoll(character, true)
end

function HealthService.Kill(player: Player)
	local character = player.Character
	if not character then return end
	
	print(player.Name, ": KILLED")
	HealthService.Client.Killed:Fire(player)
	character.Parent = workspace.Dead
	character:SetAttribute("Dead", true)
	character.HumanoidRootPart.CanCollide = false
	
	local humanoid = character:FindFirstChild("Humanoid")
	humanoid.Health = 0
	
	local torso = character:FindFirstChild("Torso")
	if not torso then return end
	for _,child in torso:GetChildren() do
		if child:IsA("BallSocketConstraint") or child:IsA("JointInstance") then
			child:Destroy()
		end
	end
	
	local lifeCount = DataService.GetData(player, "Lives")
	if lifeCount > 1 then
		player.Data.Lives.Value -= 1
		DataService.SetData(player, "Lives", player.Data.Lives.Value)

		ProgressionService.NewLife(player)
	else
		warn(player.Name, ": WIPED")
		ProgressionService.NewLineage(player)
	end
	
	wait(Players.RespawnTime)
	player:LoadCharacter()
end



function HealthService.Update(deltaTime: number)
	for _,player: Player in Players:GetPlayers() do
		task.spawn(function()
			local character = player.Character
			if not character then return end
			if character.Parent ~= workspace.Alive then return end
			local humanoid: Humanoid = character.Humanoid
			if not humanoid then return end
			if humanoid.Health == humanoid.MaxHealth then return end

			local boost = player.Data.StatChanges.HealthRegen.Value
			local regenRate = BASE_REGEN_RATE * (1+boost)

			if humanoid.Health < humanoid.MaxHealth then	
				local dh = deltaTime*regenRate
				humanoid:TakeDamage(-dh)
			end
		end)
	end
end



function HealthService.OnPlayerAdded(player: Player)
	HealthService.SessionData[player.UserId] = {
		Conditions = {};
	}
end

function HealthService.OnCharacterAdded(character: Model)
	local player = Players:GetPlayerFromCharacter(character)
	if not player then return end
	
	HealthService.GiveForcefield(character)
	
	local humanoid: Humanoid = character.Humanoid
	humanoid:SetStateEnabled(Enum.HumanoidStateType.FallingDown, false)
	humanoid:SetStateEnabled(Enum.HumanoidStateType.Ragdoll, false) 
	humanoid:SetStateEnabled(Enum.HumanoidStateType.Dead, false)
	
	local savedHealth = DataService.GetData(player, "Health")
	local savedConditions = DataService.GetData(player, "Conditions")

	--print("LLLlLllLlLLllLLLlLLOADING:")
	--print("hp:", savedHealth)
	--print("conditions:", savedConditions)
	
	if savedHealth < 1 then savedHealth = 100 end
	humanoid.Health = savedHealth
	
	for _,condition in savedConditions do
		HealthService[condition](player)
	end
end

function HealthService.OnCharacterRemoving(character: Model)
	local player: Player = Players:GetPlayerFromCharacter(character)
	local humanoid: Humanoid = character.Humanoid
	
	local sessionData = HealthService.SessionData[player.UserId]
	
	if character.Parent == workspace.Dead then
		for _,condition in sessionData.Conditions do
			HealthService.RemoveCondition(player, condition)
		end
	end
	
	--print("SSSSSSSSSSSSSSSSAVING:")
	--print("hp:", humanoid.Health)
	--print("conditions:", sessionData.Conditions)

	DataService.SetData(player, "Health", humanoid.Health)
	DataService.SetData(player, "Conditions", sessionData.Conditions)
end

function HealthService.OnPlayerRemoving(player: Player)
	HealthService.SessionData[player.UserId] = nil
end

function HealthService:KnitInit()
	self._trove = Trove.new()
end

function HealthService:KnitStart()
	DataService = Knit.GetService("DataService")
	IdentityService = Knit.GetService("IdentityService")
	ManaService = Knit.GetService("ManaService")
	ProgressionService = Knit.GetService("ProgressionService")
	RagdollService = Knit.GetService("RagdollService")

	self._trove:Connect(RunService.Heartbeat, self.Update)
	
	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return HealthService
