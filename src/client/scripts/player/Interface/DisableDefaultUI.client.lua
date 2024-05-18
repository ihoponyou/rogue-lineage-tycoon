local ReplicatedStorage = game:GetService("ReplicatedStorage")
local StarterGui = game:GetService("StarterGui")

StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Health, false)
StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.EmotesMenu, false)
StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false)

local resetBindable = Instance.new("BindableEvent")
local resetRequest = ReplicatedStorage.ResetRequest
resetBindable.Event:Connect(function()
	resetRequest:FireServer()
end)

StarterGui:SetCore("ResetButtonCallback", resetBindable)