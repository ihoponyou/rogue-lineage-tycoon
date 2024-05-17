local PRINT_ON_LOAD = false
local PRINT_GETS = false
local PRINT_SETS = false

local BASE_STOMACH_DECAY = 0.1
local BASE_STOMACH_CAPACITY = 100
local BASE_TOXICITY_DECAY = 0.05

local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local ServerScriptService = game:GetService("ServerScriptService")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(Knit.Util.Signal)
local Trove = require(Knit.Util.Trove)
local Timer = require(Knit.Util.Timer)

local DataService, HealthService

-- handles survival aspects
--		- hunger/stomach 
--		- toxicity
--		- temperature

local SurvivalService = Knit.CreateService {
	Name = "SurvivalService";
	
	_playerTroves = {};
	
	Client = {};
}

function SurvivalService.AdjustTemperature(player: Player, value: number)
	local data = player.Data
	if data then
		data.Temperature.Value = math.clamp(data.Temperature.Value + value, 0, 100)
		
		local newTemperature = data.Temperature.Value 
		if newTemperature <= 0 then
			HealthService.Frostbite(player, true)
		elseif  newTemperature >= 100 then
			HealthService.BurnScar(player, true)
		end
	end
end

function SurvivalService.DecayStomach(player: Player, deltaTime: number)
	local data = player:FindFirstChild("Data")
	if not data then return end
	
	local boost = data.StatChanges.StomachDecay.Value
	local hungerRate = BASE_STOMACH_DECAY * boost
	local stomach = data.Stomach
	if stomach.Value > 0 and hungerRate > 0 then	
		local dh = deltaTime*hungerRate
		stomach.Value = math.min(stomach.Value - dh, BASE_STOMACH_CAPACITY)
	end
end

function SurvivalService.DecayToxicity(player: Player, deltaTime: number)
	local data = player:FindFirstChild("Data")
	if not data then return end
	
	local toxicity = data.Toxicity
	if toxicity.Value > 0 then
		local dtox = deltaTime*BASE_TOXICITY_DECAY
		toxicity.Value = math.max(toxicity.Value - dtox, 0)
	end
end

function SurvivalService.Update(deltaTime: number)
	for _,player: Player in Players:GetPlayers() do
		task.spawn(SurvivalService.DecayStomach, player, deltaTime)
		task.spawn(SurvivalService.DecayToxicity, player, deltaTime)
	end
end



function SurvivalService.OnCharacterRemoving(character: Model)
	local player: Player = Players:GetPlayerFromCharacter(character)
	local data = player.Data
	
	if character.Parent == workspace.Dead then
		data.Stomach.Value = 100
		data.Toxicity.Value = 0
		data.Temperature.Value = 50
	end
	
	DataService.SetData(player, "Stomach", data.Stomach.Value)
	DataService.SetData(player, "Toxicity", data.Toxicity.Value)
	DataService.SetData(player, "Temperature", data.Temperature.Value)
end


function SurvivalService:KnitInit()
	self._trove = Trove.new()
end

function SurvivalService:KnitStart()
	DataService = Knit.GetService("DataService")
	HealthService = Knit.GetService("HealthService")

	self._trove:Connect(RunService.Heartbeat, self.Update)
		
	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return SurvivalService
