local BASE_MAX_HP = 100
local MINS_PER_DAY = 1
local SECS_PER_DAY = MINS_PER_DAY*60

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local ServerScriptService = game:GetService("ServerScriptService")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(Knit.Util.Signal)
local Timer = require(Knit.Util.Timer)
local Trove = require(Knit.Util.Trove)

local DataService

local ProgressionService = Knit.CreateService {
	Name = "ProgressionService";
	
	SessionData = {};

	Client = {};
}



function ProgressionService.NewLife(player: Player)
	DataService.SetData(player, "Weapon", "")
	DataService.SetData(player, "Enchant", "")
	DataService.SetData(player, "Conditions", {})
	DataService.SetData(player, "Health", BASE_MAX_HP)
	DataService.SetData(player, "Stomach", 100)
	DataService.SetData(player, "Toxicity", 0)
	DataService.SetData(player, "Temperature", 50)
	DataService.SetData(player, "Position", {X=0,Y=0,Z=0})
	DataService.SetData(player, "Direction", {X=0,Z=0})
	DataService.SetData(player, "ResGrip", false)
end


function ProgressionService.NewCharacter(player: Player)
	DataService.SetData(player, "FirstName", "")
	DataService.SetData(player, "ManaColor", {R=0,G=0,B=0})
	DataService.SetData(player, "Phenotype", "")
	DataService.SetData(player, "Gender", "")
	DataService.SetData(player, "Personality", "")
	DataService.SetData(player, "Armor", "")
	DataService.SetData(player, "Lives", 3)
	DataService.SetData(player, "Days", 0)
	DataService.SetData(player, "Seconds", 0)

	ProgressionService.NewLife(player)
end


function ProgressionService.NewLineage(player: Player)
	DataService.SetData(player, "Race", "")

	ProgressionService.NewLife(player)
	ProgressionService.NewCharacter(player)
end

function ProgressionService.Update(deltaTime: number)
	game.Lighting.ClockTime = (tick()*24/(MINS_PER_DAY*60)) % 24
end



function ProgressionService.OnPlayerAdded(player: Player)
	ProgressionService.SessionData[player.UserId] = {JoinTick = 0}
end

function ProgressionService.OnCharacterAdded(character: Model)
	local player: Player = Players:GetPlayerFromCharacter(character)
	
	local savedSeconds = DataService.GetData(player, "Seconds")
	local savedDays = DataService.GetData(player, "Days")
	local savedLives = DataService.GetData(player, "Lives")
	while savedSeconds >= SECS_PER_DAY do
		savedDays += 1
		savedSeconds -= SECS_PER_DAY
	end
	
	--print("LOADING:")
	--print("sec:", savedSeconds)
	--print("days:", savedDays)
	--print("lives:", savedLives)
	
	player.Data.Seconds.Value = savedSeconds
	player.Data.Days.Value = savedDays
	player.Data.Lives.Value = savedLives
	
	ProgressionService.SessionData[player.UserId].JoinTick = math.round(tick())
end

function ProgressionService.OnCharacterRemoving(character: Model)
	local player: Player = Players:GetPlayerFromCharacter(character)
	
	--print("SAVING:")
	--print("sec:", player.Data.Seconds.Value)
	--print("days:", player.Data.Days.Value)
	--print("lives:", player.Data.Lives.Value)
	
	DataService.SetData(player, "Seconds", player.Data.Seconds.Value)
	DataService.SetData(player, "Days", player.Data.Days.Value)
	DataService.SetData(player, "Lives", player.Data.Lives.Value)
end

function ProgressionService:KnitInit()
	self._trove = Trove.new()
	
	self._dayTimer = Timer.new(1)
end

function ProgressionService:KnitStart()
	DataService = Knit.GetService("DataService")
	
	self._trove:Connect(RunService.Heartbeat, self.Update)
	
	self._trove:Connect(self._dayTimer.Tick, function()
		for _,player: Player in Players:GetPlayers() do
			local data = player:FindFirstChild("Data")
			if not data then continue end
			if data.Seconds.Value >= (60*MINS_PER_DAY) then
				data.Days.Value += 1
				data.Seconds.Value -= (60*MINS_PER_DAY)
			end
			data.Seconds.Value += 1
		end
	end)
	
	self._dayTimer:Start()
	
	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return ProgressionService
