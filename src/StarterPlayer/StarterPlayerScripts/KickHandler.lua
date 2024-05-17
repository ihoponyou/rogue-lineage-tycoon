local Lighting = game:GetService("Lighting")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

ReplicatedStorage.Kicked.OnClientEvent:Connect(function()
	local blur = Instance.new("BlurEffect")
	blur.Size = 50
	blur.Parent = Lighting
end)
