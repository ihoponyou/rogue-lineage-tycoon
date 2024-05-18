local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Component = require(ReplicatedStorage.Packages.Component)
local Trove = require(ReplicatedStorage.Packages.Trove)

local IdentityService = Knit.GetService("IdentityService")
local Logger = require(ReplicatedStorage.Source.Modules.Extensions.Logger)

local Race = Component.new {
	Tag = "Race";
	Extensions = {
		Logger,
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
