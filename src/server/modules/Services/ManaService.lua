local PRINT_STARTS = false
local PRINT_STOPS = false
local PRINT_EVENTS = false

local BASE_CHARGE_RATE = 100/3.5
local BASE_DECAY_RATE =  100/2.5
local TEMPLATE = {
	ChargingMana = false;
	Mana = 0;
	ManaBoost = 0;
}

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Timer = require(ReplicatedStorage.Packages.Timer)
local Trove = require(ReplicatedStorage.Packages.Trove)

local ActionService, DataService



local ManaService = Knit.CreateService {
	Name = "ManaService";
	SessionData = {};

	ManaObtained = Signal.new();
	ChargingMana = Signal.new();
	DisableMana = Signal.new();

	Client = {
		ManaObtained = Knit.CreateSignal();
		ManaEmptied = Knit.CreateSignal();
		ManaFilled = Knit.CreateSignal();
		ChargingMana = Knit.CreateSignal();
		DisableMana = Knit.CreateSignal();
	};
}



local function error404(player: Player): string
	return string.format("Profile not found for \"%s\"", player.Name)
end

function ManaService.OnManaObtained(player: Player)
	if PRINT_EVENTS then print("Mana obtained for:\t\t"..player.Name) end
	local data = table.clone(TEMPLATE)

	local race = DataService.GetData(player, "Race")
	if race == "Azael" then
		data.ManaBoost = 10;
	elseif race == "Rigan" then
		data.ManaBoost = 15;
	end

	ManaService.SessionData[player.UserId] = data
end

function ManaService.OnDisableMana(player)
	--ManaService.Client.ManaEmptied:Fire(player)
	ManaService.SessionData[player.UserId] = nil
	if PRINT_EVENTS then print("Disabled mana for:\t\t"..player.Name) end
end

function ManaService.ToggleManaObtainment(player: Player, bool: boolean)
	local manaObtained = DataService.GetData(player, "ManaObtained")

	manaObtained = if bool == nil then not manaObtained else bool
	DataService.SetData(player, "ManaObtained", manaObtained)
	--print("toggled mana obtainment for", player.Name)
	if manaObtained then
		ManaService.ManaObtained:Fire(player)
		ManaService.Client.ManaObtained:Fire(player)
	else
		ManaService.DisableMana:Fire(player)
		ManaService.Client.DisableMana:Fire(player)
	end
end


function ManaService.HasMana(player: Player): boolean
	local data = ManaService.SessionData[player.UserId]
	if not data then return false end

	return data.Mana > 0
end

function ManaService.DecayMana(player, deltaTime)
	if not ManaService.HasMana(player) then return end

	local decayRate = BASE_DECAY_RATE * if ActionService:IsCurrently(player, "climb") then (1/2) else 1
	local oldMana = ManaService.SessionData[player.UserId].Mana
	local newMana = math.clamp(oldMana - decayRate * deltaTime, 0, 100)


	ManaService.SessionData[player.UserId].Mana = newMana
	player.Data.ManaAmount.Value = math.round(newMana)
	if newMana == 0 then
		ManaService.Client.ManaEmptied:Fire(player)
	end
end

function ManaService.IncreaseMana(player, deltaTime)
	local chargeRate = BASE_CHARGE_RATE * math.max(player.Data.StatChanges.ManaBoost.Value, 1)
	local oldMana = ManaService.SessionData[player.UserId].Mana
	local newMana = math.clamp(oldMana + chargeRate * deltaTime, 0, 100)

	if newMana > 99 then
		ManaService.SessionData[player.UserId].ChargingMana = false
		ManaService.Client.ManaFilled:Fire(player)
	end

	ManaService.SessionData[player.UserId].Mana = newMana
	player.Data.ManaAmount.Value = math.round(newMana)
end

function ManaService.Update(deltaTime)
	for userId, data in (ManaService.SessionData) do
		task.spawn(function()
			if not ManaService.SessionData[userId] then return end
			local isCharging = ManaService.SessionData[userId].ChargingMana

			local player = Players:GetPlayerByUserId(userId)
			if isCharging then
				ManaService.IncreaseMana(player, deltaTime)
			else
				ManaService.DecayMana(player, deltaTime)
			end
		end)
	end
end



function ManaService.OnProfileLoaded(player)
	if PRINT_EVENTS then print('Profile loaded for:\t\t'..player.Name) end

	ManaService.ToggleManaObtainment(player, true)
	--if DataService.GetData(player, "ManaObtained") then
	--	ManaService.ManaObtained:Fire(player)
	--	ManaService.Client.ManaObtained:Fire(player)
	--end
end

function ManaService.OnPlayerRemoving(player: Player)
	if PRINT_EVENTS then print("Player removing:\t\t"..player.Name) end

	if ManaService.SessionData[player.UserId] then
		ManaService.SessionData[player.UserId] = nil
	end
end

function ManaService.OnChargingMana(player: Player, bool: boolean)
	if PRINT_EVENTS or PRINT_STARTS and bool or PRINT_STOPS and not bool then print("Charging mana:\t\t"..player.Name.." ("..tostring(bool)..")") end
	if type(bool) ~= "boolean" then error("\""..tostring(bool).."\" is not a boolean") return end

	local data = ManaService.SessionData[player.UserId]
	if not data then return end

	if bool and ActionService:Can(player, "chargeMana") then
		data.ChargingMana = true
		ActionService.ActionStarted:Fire("chargeMana")
	else
		data.ChargingMana = false
		ActionService.ActionStopped:Fire("chargeMana")
	end
end

function ManaService:KnitInit()
	self._trove = Trove.new()
	self._trove:AttachToInstance(workspace)

	self._timer = Timer.new(6)
	self._tickTock = true
end

function ManaService:KnitStart()
	ActionService = Knit.GetService("ActionService")
	DataService = Knit.GetService("DataService")

	self._trove:Connect(DataService.ProfileLoaded, self.OnProfileLoaded)

	self._trove:Connect(self.ManaObtained, self.OnManaObtained)
	self._trove:Connect(self.DisableMana, self.OnDisableMana)
	self._trove:Connect(self.Client.ChargingMana, self.OnChargingMana)

	self._trove:Connect(RunService.Heartbeat, self.Update)
end

return ManaService
