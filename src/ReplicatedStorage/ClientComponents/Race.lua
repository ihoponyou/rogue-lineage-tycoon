local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Component = require(Knit.Util.Component)
local Signal = require(Knit.Util.Signal)
local Trove = require(Knit.Util.Trove)

local IdentityService = Knit.GetService("IdentityService")
local ManaService = Knit.GetService("ManaService")
local Logger = require(Knit.Player.PlayerScripts.Knit.Components.Extensions.Logger)
local RacialProgression = require(script.RacialProgression)

local Race = Component.new {
	Tag = "Race";
	Extensions = {
		Logger,
		RacialProgression,
	};
}

local RACE_INFO = {}

function Race:Construct()
	self._trove = Trove.new()

	self.RaceName = self.Instance:GetAttribute("Race")
	local info = RACE_INFO[self.RaceName]

	self.RaceData = table.clone(info)
end

function Race:GetData()
	return self.RaceData
end

function Race.OnStarted()
	IdentityService.RaceLoaded:Fire()
end

function Race:Start()
	self._trove:Connect(self.Started, self.OnStarted)
end

function Race:Stop()
	self._trove:Destroy()
end

return Race
