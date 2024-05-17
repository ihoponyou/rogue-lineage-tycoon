local PRINT_EVENTS = false

local BASE_RAGDOLL_DURATION = 1
local MINS_PER_DAY = 1
local SECS_PER_DAY = MINS_PER_DAY*60

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local ServerScriptService = game:GetService("ServerScriptService")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(Knit.Util.Signal)
local Trove = require(Knit.Util.Trove)

local ActionService, DangerService, DataService, HealthService, IdentityService,
ManaService, ProgressionService, RagdollService, SurvivalService

-- handle common setup/cleanup events; playeradded, characteradded, etc.
-- 		- guarantees loading order

local SetupService = Knit.CreateService {
	Name = "SetupService";
	
	_playerTroves = {};
	
	Client = {};
}



function SetupService:OnProfileLoaded(player: Player)
	if PRINT_EVENTS then print(player.Name, ": PROFILE LOADED") end
	
	local data = player.Data
	data.Stomach.Value = DataService.GetData(player, "Stomach")
	data.Toxicity.Value = DataService.GetData(player, "Toxicity")
	data.Temperature.Value = DataService.GetData(player, "Temperature")
	
	player:LoadCharacter()
	player:SetAttribute("ProfileLoaded", true)
end

function SetupService:OnPlayerAdded(player: Player)
	if PRINT_EVENTS then print(player.Name, ": PLAYER ADDED") end
	local playerTrove = self._trove:Extend()
	self._playerTroves[player.UserId] = playerTrove
	
	DataService.OnPlayerAdded(player)
	
	ActionService.OnPlayerAdded(player)
	HealthService.OnPlayerAdded(player)
	ProgressionService.OnPlayerAdded(player)

	if player.Character then self:OnCharacterAdded(player.Character) end
	playerTrove:Connect(player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)
	playerTrove:Connect(player.CharacterRemoving, self.OnCharacterRemoving)
end

function SetupService:OnCharacterAdded(character: Model)
	if PRINT_EVENTS then print(character.Name, ": CHARACTER ADDED") end
	local player: Player = Players:GetPlayerFromCharacter(character)
	local characterTrove = self._playerTroves[player.UserId]:Extend()
	
	while not character:IsDescendantOf(workspace) do character.AncestryChanged:Wait() end
	local humanoid: Humanoid = character.Humanoid
	
	DataService.ResetStatChanges(player)
	IdentityService.OnCharacterAdded(character)
	ProgressionService.OnCharacterAdded(character)
	HealthService.OnCharacterAdded(character)
	DangerService.OnCharacterAdded(character)
	
	characterTrove:Connect(humanoid:GetPropertyChangedSignal("Health"), function()
		if character:GetAttribute("Knocked") and humanoid.Health/humanoid.MaxHealth > 0.15 and not character:GetAttribute("Carried") then
			character:SetAttribute("Knocked", false)
			RagdollService.ToggleRagdoll(character, false)
		end
		
		if character:GetAttribute("Knocked") or humanoid.Health > 0 then return end
		humanoid.Health = 0
		HealthService.Knock(player)
	end)
	
	character.Parent = workspace.Alive
end

function SetupService.OnCharacterRemoving(character: Model)
	if PRINT_EVENTS then print(character.Name, ": CHARACTER REMOVING") end
	
	IdentityService.OnCharacterRemoving(character)
	ProgressionService.OnCharacterRemoving(character)
	SurvivalService.OnCharacterRemoving(character)
	HealthService.OnCharacterRemoving(character)
end

function SetupService:OnPlayerRemoving(player: Player)
	if PRINT_EVENTS then print(player.Name, ": PLAYER REMOVING") end
	
	ActionService.OnPlayerRemoving(player)
	DangerService.OnPlayerRemoving(player)
	HealthService.OnPlayerRemoving(player)
	ManaService.OnPlayerRemoving(player)
	
	DataService.OnPlayerRemoving(player)
	
	self._playerTroves[player.UserId]:Destroy()
	self._playerTroves[player.UserId] = nil
end

function SetupService:KnitInit()
	self._trove = Trove.new()
end

function SetupService:KnitStart()
	ActionService = Knit.GetService("ActionService")
	DangerService = Knit.GetService("DangerService")
	DataService = Knit.GetService("DataService")
	HealthService = Knit.GetService("HealthService")
	IdentityService = Knit.GetService("IdentityService")
	ManaService = Knit.GetService("ManaService")
	ProgressionService = Knit.GetService("ProgressionService")
	RagdollService = Knit.GetService("RagdollService")
	SurvivalService = Knit.GetService("SurvivalService")

	for _,player in Players:GetPlayers() do self:OnPlayerAdded(player) end
	self._trove:Connect(Players.PlayerAdded, function(...) self:OnPlayerAdded(...) end)
	self._trove:Connect(Players.PlayerRemoving, function(...) self:OnPlayerRemoving(...) end)
	
	self._trove:Connect(DataService.ProfileLoaded, function(...) self:OnProfileLoaded(...) end)
	
	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return SetupService
