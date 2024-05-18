local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)

Knit.AddServices(ServerStorage.Source.Services)

Knit.Start():andThen(function()
	for _,component in ipairs(ServerStorage.Source.ServerComponents:GetDescendants()) do
		if component:IsA("ModuleScript") then
			require(component)
		end
	end
end):catch(warn)