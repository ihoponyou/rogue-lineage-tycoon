local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)

Knit.AddServices(ServerStorage.Services)

Knit.Start():andThen(function()
	for _,component in ipairs(ServerStorage.ServercComponents:GetDescendants()) do
		if component:IsA("ModuleScript") then
			require(component)
		end
	end
end):catch(warn)