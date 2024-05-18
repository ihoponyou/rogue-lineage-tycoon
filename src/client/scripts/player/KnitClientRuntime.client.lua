local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)

local ClientModules = ReplicatedStorage.Source.ClientModules

Knit.AddControllers(ClientModules.Controllers)

Knit.Start():andThen(function()
	for _,component in ipairs(ClientModules.ClientComponents:GetChildren()) do
		if component:IsA("ModuleScript") then
			require(component)
		end
	end
end):catch(warn)
