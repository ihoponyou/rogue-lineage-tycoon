local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(Knit.Util.Signal)
local Trove = require(Knit.Util.Trove)
local Component = require(Knit.Util.Component)
local Logger = require(script.Parent.Extensions.Logger)

local IdentityService

local ArmorPortal = Component.new {
	Tag = "ArmorPortal";
	Extensions = {
		Logger,
	};
}

local ARMOR_INFO = require(ServerStorage.ArmorInfo)

function ArmorPortal:Construct()
	self._trove = Trove.new()
	self._debounce = {}

	self.ArmorToSet = self.Instance:GetAttribute("ArmorName")
end

function ArmorPortal:OnTouched(toucher: Part)
	local player = Players:GetPlayerFromCharacter(toucher.Parent)
	if player ~= nil then
		if self._debounce[player.UserId] then return end
		self._debounce[player.UserId] = true

		if player:GetAttribute("Armor") == self.ArmorToSet then
			IdentityService.SetArmor(player, ARMOR_INFO.GetRandomStarter())
		else
			IdentityService.SetArmor(player, self.ArmorToSet)
		end

		task.wait(2)
		self._debounce[player.UserId] = nil
	end
end

function ArmorPortal:Start()
	IdentityService = Knit.GetService("IdentityService")

	self._trove:Connect(self.Instance.Touched, function(...) self:OnTouched(...) end)
end

function ArmorPortal:Stop()
	self._trove:Destroy()
end

return ArmorPortal
