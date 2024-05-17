local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(Knit.Util.Trove)
local Component = require(Knit.Util.Component)
local Logger = require(script.Parent.Extensions.Logger)

local Lava = Component.new {
	Tag = "Lava";
	Extensions = {
		Logger,
	};
}

function Lava:Construct()
	self._trove = Trove.new()
end

function Lava:OnTouched(toucher: Part)
	local player = Players:GetPlayerFromCharacter(toucher.Parent)
	if player ~= nil then
		local character: Model = toucher.Parent
		--warn(character.Name, "touched lava; tagged")
		CollectionService:AddTag(character.Humanoid, "Burning")
	end
end

function Lava:Start()
	self._trove:Connect(self.Instance.Touched, function(...) self:OnTouched(...) end)
end

function Lava:Stop()
	self._trove:Destroy()
end

return Lava
