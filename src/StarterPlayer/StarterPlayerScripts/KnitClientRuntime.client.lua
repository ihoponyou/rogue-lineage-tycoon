local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)

Knit.AddControllers(ReplicatedStorage.Controllers)

Knit.Start():andThen(function()
	for _,component in ipairs(ReplicatedStorage.ClientComponents:GetChildren()) do
		if component:IsA("ModuleScript") then
			require(component)
		end
	end
end):catch(warn)
