local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local ServerScriptService = game:GetService("ServerScriptService")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Trove = require(ReplicatedStorage.Packages.Trove)

local ResetService = Knit.CreateService {
	Name = "ResetService";

	SessionData = {};
	_playerTroves = {};

	Client = {};
}



function ResetService.OnRequest(player: Player)
	local character = player.Character
	if not character then return end
	
	character:PivotTo(character:GetPivot()*CFrame.new(0,150,0))
end



function ResetService:KnitInit()
	self._trove = Trove.new()
end

function ResetService:KnitStart()
	self._trove:Connect(ReplicatedStorage.ResetRequest.OnServerEvent, self.OnRequest)
	
	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return ResetService
