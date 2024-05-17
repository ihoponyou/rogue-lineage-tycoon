local PRINT_EVENTS = false
local PRINT_STARTS = false

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(ReplicatedStorage.Packages.Trove)
local DataService, IdentityService
local MagicController

local GuiController = Knit.CreateController {
	Name = "GuiController";
}

local UI = ReplicatedStorage.UI
local WHITE_STOMACH = {
	"Gaian",
	"Cameo",
	"Dullahan",
	"Metascroom",
	"Lich",
	"Seraph",
	"Florian"
}

function GuiController:ToggleManaBar(bool: boolean)
	if not self.ManaGui then error(Knit.Player.Name.." does not have a mana GUI.") end

	local enabled = if bool == nil then not self.ManaGui.Enabled else bool
	self.ManaGui.Enabled = enabled
	if enabled then
		self._manaTrove = self._charTrove:Extend()
		self._manaTrove:Connect(RunService.Stepped, function(dt) self:_updateMana(dt) end)
	else
		 if self._manaTrove then self._manaTrove:Destroy() end
	end
end


local timeStep = 0
function GuiController:_updateMana(deltaTime)
	timeStep += deltaTime
	if timeStep > 0.1 then
		TweenService:Create(
			self.Slider,
			TweenInfo.new(0.1, Enum.EasingStyle.Sine, Enum.EasingDirection.Out),
			{Size = UDim2.new(1, 0,  Knit.Player.Data.ManaAmount.Value / 100, 0)}
		):Play()
		timeStep = 0
	end
end

function GuiController:OnHealthChanged(newHealth: number)
	--print("health changed")
	local percentHP = self.Character.Humanoid.Health/self.Character.Humanoid.MaxHealth
	if percentHP > 1 then
		percentHP = 1
	end
	self.HealthSlider:TweenSize(UDim2.new(percentHP,0,1,0),"Out","Quad",0.25,true,nil)
end

function GuiController:OnStomachChanged(newStomach: number)
	--print("s changed")
	local percentStomach = newStomach/100
	self.StomachSlider:TweenSize(UDim2.new(percentStomach,0,0,6),"Out","Quad",0.25,true,nil)
end

function GuiController:OnToxicityChanged(newToxicity: number)
	--print("tox changed")
	local percentToxicity = newToxicity/100
	self.ToxicitySlider:TweenSize(UDim2.new(percentToxicity,0,0,6),"Out","Quad",0.25,true,nil)
end

function GuiController:OnTemperatureChanged(newTemperature: number)
	local percentTemperature = newTemperature/100
	self.TemperatureSlider:TweenPosition(UDim2.new(percentTemperature,0,0,0),"Out","Quad",0.2,true,nil)
end

function GuiController:OnManaColorChanged(color: Color3)
	if PRINT_EVENTS then print("mana color changed to", math.round(color.R*255), math.round(color.G*255), math.round(color.B*255)) end
	self.Slider.BackgroundColor3 = color
end

local function getDigit(num, digit)
	local n = 10 ^ digit
	local n1 = 10 ^ (digit - 1)
	return math.floor((num % n) / n1)
end

local function doRollerEffect(label: TextLabel, text)
	local tween = TweenService:Create(label, TweenInfo.new(0.15), {LineHeight = 3})
	tween:Play()
	tween.Completed:Connect(function()
		task.wait(0.1)
		label.Text = text
		label.LineHeight = 0
		TweenService:Create(label, TweenInfo.new(0.15), {LineHeight = 1}):Play()
	end)
end

function GuiController:OnDaysChanged(dayCount: number)
	--print("days:",dayCount)
	local oldOnes = self.DayOnes.Digit.Text
	local oldTens = self.DayTens.Digit.Text
	local oldHundreds = self.DayHundreds.Digit.Text
	local newOnes = tostring(getDigit(dayCount, 1))
	local newTens = tostring(getDigit(dayCount, 2))
	local newHundreds = tostring(getDigit(dayCount, 3))
	--print(oldHundreds ~= newHundreds, oldTens ~= newTens, oldOnes ~= newOnes)
	if oldOnes ~= newOnes then
		doRollerEffect(self.DayOnes.Digit, newOnes)
	end
	if oldTens ~= newTens then
		doRollerEffect(self.DayTens.Digit, newTens)
	end
	if oldHundreds ~= newHundreds then
		doRollerEffect(self.DayHundreds.Digit, newHundreds)
	end
end

function GuiController:OnLivesChanged(lifeCount: number)
	doRollerEffect(self.Lives.Digit, lifeCount)
end

function GuiController:OnFirstNameChanged(name: string)
	self.CharacterName.Text = string.upper(name)
end

function GuiController:OnCharacterAdded(character: Model)
	local player = Players:GetPlayerFromCharacter(character)

	self._charTrove = self._trove:Extend()

	self.Character = character

	self.ManaGui = self._charTrove:Clone(UI.ManaGui)
	self.ManaGui.Parent = self.Gui
	self.Slider = self.ManaGui.LeftContainer.ManaBar.Slider

	self.SilverGui = self._charTrove:Clone(UI.Currency.SilverGui)
	self.SilverGui.Parent = self.Gui

	self.StatGui = self._charTrove:Clone(UI.StatGui)
	self.StatGui.Parent = self.Gui
	local healthFrame = self.StatGui.Container.Health
	self.HealthSlider = healthFrame.Slider
	self.StomachSlider = healthFrame.Survival.Back.Stomach
	self.ToxicitySlider = healthFrame.Survival.Back.Toxicity
	self.TemperatureSlider = healthFrame.Temperature.Gradient.Pointer
	self.DayOnes = healthFrame.Counters.DayOnes
	self.DayTens = healthFrame.Counters.DayTens
	self.DayHundreds = healthFrame.Counters.DayHundreds
	self.Lives = healthFrame.Counters.Lives
	self.CharacterName = self.StatGui.Container.CharacterName

	local humanoid = self.Character:WaitForChild("Humanoid")

	local playerData = player.Data

	self._charTrove:Connect(humanoid.HealthChanged, function(...) self:OnHealthChanged(...) end)

	self._charTrove:Connect(playerData.Stomach.Changed, function(...) self:OnStomachChanged(...) end)
	self._charTrove:Connect(playerData.Toxicity.Changed, function(...) self:OnToxicityChanged(...) end)
	self._charTrove:Connect(playerData.Temperature.Changed, function(...) self:OnTemperatureChanged(...) end)
	self:OnTemperatureChanged(Knit.Player.Data.Temperature.Value)

	self._charTrove:Connect(playerData.Days.Changed, function(...) self:OnDaysChanged(...) end)
	self._charTrove:Connect(playerData.Lives.Changed, function(...) self:OnLivesChanged(...) end)
	self:OnDaysChanged(Knit.Player.Data.Days.Value)
	self:OnLivesChanged(Knit.Player.Data.Lives.Value)

	self._charTrove:Connect(IdentityService.ManaColorChanged, function(color) self:OnManaColorChanged(color) end)
	self._charTrove:Connect(IdentityService.FirstNameChanged, function(name) self:OnFirstNameChanged(name) end)

	while not MagicController.Loaded do RunService.Heartbeat:Wait() end
	self:ToggleManaBar(MagicController.ManaObtained)

	while not Knit.Player:GetAttribute("IdentityLoaded") do Knit.Player.AttributeChanged:Wait() end
	DataService.GetData(Knit.Player, "Race"):andThen(function(raceName)
		if table.find(WHITE_STOMACH, raceName) then
			self.StomachSlider.BackgroundColor3 = Color3.new(229, 229, 204)
		end
	end)

	while not (self.StatGui or self.ManaGui or self.SilverGui) do RunService.Heartbeat:Wait() end
	self.StatGui.Enabled = true
	self.ManaGui.Enabled = true
	self.SilverGui.Enabled = true
end

function GuiController:OnCharacterRemoving(character: Model)
	--print("removing character")
	self._charTrove:Destroy()
end

function GuiController:KnitInit()
	self._trove = Trove.new()
	self.Gui = Knit.Player.PlayerGui
end

function GuiController:KnitStart()
	DataService = Knit.GetService("DataService")
	IdentityService = Knit.GetService("IdentityService")

	MagicController = Knit.GetController("MagicController")

	self._trove:Connect(Players.PlayerRemoving, function(...) self:OnPlayerRemoving(...) end)
	self._trove:Connect(Knit.Player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)
	self._trove:Connect(Knit.Player.CharacterRemoving, function(...) self:OnCharacterRemoving(...) end)

	if PRINT_STARTS then print("GuiController started") end
end

function GuiController:Destroy()
	self._trove:Destroy()
end

return GuiController
