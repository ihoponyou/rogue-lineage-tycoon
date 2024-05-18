local PRINT_CLEANS = false
local PRINT_EVENTS = false
local PRINT_LOADS = false
local PRINT_SETS = false

local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local ServerScriptService = game:GetService("ServerScriptService")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(game:GetService("ReplicatedStorage").Packages.Knit)
local Signal = require(ReplicatedStorage.Packages.Signal)
local Trove = require(ReplicatedStorage.Packages.Trove)

local DataService, ManaService

local TableFunctions = require(ReplicatedStorage.Source.Modules.TableFunctions)

local IdentityService = Knit.CreateService {
	Name = "IdentityService";

	PlayerAppearances = {};

	GenderChanged = Signal.new();
	IdentityLoaded = Signal.new();
	RaceAppearanceLoaded = Signal.new();

	Client = {
		IdentityLoaded = Knit.CreateSignal();
		ManaColorChanged = Knit.CreateSignal();
		FirstNameChanged = Knit.CreateSignal();
		RaceAppearanceLoaded = Knit.CreateSignal();
	};
}

local ARMOR_INFO = require(ServerStorage.Source.ArmorInfo)
local CUSTOM_HEADS = ReplicatedStorage.Appearance.CustomHeads
local CUSTOM_ACCESSORIES = ReplicatedStorage.Appearance.CustomAccessories
local FACES = ReplicatedStorage.Appearance.Faces
local NAME_GEN = require(ServerStorage.Source.NameGenerator)
local RACE_INFO = require(ServerStorage.Source.RaceInfo)

local function loadedMessage(thingLoaded, player: Player): string
	local message = string.format("%s: %s loaded", player.Name, tostring(thingLoaded))
	return message
end

local function setMessage(thingSet, value, player: Player): string
	local message = string.format("%s: %s -> %s", player.Name, tostring(thingSet), tostring(value))
	return message
end

local function err404(thingNotFound, query, player: Player): string
	local message = string.format("%s: \"%s\" not found with query \"%s\"", player.Name, tostring(thingNotFound), tostring(query))
	return message
end

local function isEmptyString(str: string): boolean
	return str:gsub("%s+", "") == ""
end

local function applyToPlayer(player: Player, hdesc: HumanoidDescription)
	local character = player.Character
	if not character then return end
	local humanoid = character.Humanoid
	if not humanoid then return end
	
	--while character.Parent ~= workspace.Alive do character.AncestryChanged:Wait() end
	humanoid:ApplyDescription(hdesc)
end



function IdentityService.RemoveHair(player: Player)
	local character = player.Character
	if not character then error("Character not loaded") end
	local humanoid: Humanoid = character.Humanoid
	if not humanoid then error("Humanoid not loaded") end
	
	for _,accessory: Accessory in humanoid:GetAccessories() do
		if accessory.AccessoryType == Enum.AccessoryType.Hair then
			accessory:Destroy()
		end
	end
	
	if PRINT_SETS then print(setMessage("Hair", "None", player)) end
end

function IdentityService.CleanAppearance(player: Player): HumanoidDescription
	local appearance = IdentityService.PlayerAppearances[player.UserId]

	appearance.Shirt = 0
	appearance.Pants = 0
	appearance.GraphicTShirt = 0
	appearance.Face = 0
	appearance.Head = 0
	appearance.LeftArm = 0
	appearance.LeftLeg = 0
	appearance.RightArm = 0
	appearance.RightLeg = 0
	appearance.Torso = 0

	appearance.BackAccessory = 0
	appearance.FrontAccessory = 0
	appearance.HatAccessory = 0
	appearance.NeckAccessory = 0
	appearance.ShouldersAccessory = 0
	appearance.WaistAccessory = 0
	appearance.FaceAccessory = 0

	if PRINT_CLEANS then print("Cleaned saved appearance for", player.Name) end
	return appearance
end

function IdentityService.CleanFace(player: Player)
	local head = player.Character:WaitForChild("Head")
	local oldFace = head:FindFirstChild("face")

	if oldFace then
		oldFace:Destroy()
	end

	if PRINT_CLEANS then print("Cleaned face for ", player.Name) end
end

local function setSkinPartColor(player: Player, color: Color3)
	local character = player.Character
	if not character then error("char not found") end
	for _,child in character:GetChildren() do
		if child:IsA("BasePart") then
			child.Color = color
		end
	end
end

function IdentityService.SetSkinColor(player: Player, color: Color3, temporary: boolean)
	if temporary then setSkinPartColor(player, color) return end
	local appearance = IdentityService.PlayerAppearances[player.UserId]
	
	appearance.HeadColor = color
	appearance.LeftArmColor = color
	appearance.LeftLegColor = color
	appearance.RightArmColor = color
	appearance.RightLegColor = color
	appearance.TorsoColor = color

	player:SetAttribute("SkinColor", color)
	
	if PRINT_SETS then print(setMessage("Skin color", color, player)) end
	applyToPlayer(player, appearance)
end

function IdentityService.SetEyeColor(player: Player, color: Color3)
	local character = player.Character
	if player:GetAttribute("HasCustomHead") then return end
	local face = character.Head:WaitForChild("face")

	if face then
		face.Color3 = color
	end

	player:SetAttribute("EyeColor", color)

	if PRINT_SETS then print(setMessage("Eye color", color, player)) end
end

function IdentityService.SetHairColor(player: Player, color: Color3)
	local character = player.Character
	local humanoid = character.Humanoid
	
	for _, accessory: Accessory in pairs(humanoid:GetAccessories()) do
		if accessory.AccessoryType == Enum.AccessoryType.Hair then
			--print(accessory.Name)
			for _, child in pairs(accessory.Handle:GetChildren()) do
				--print(child.ClassName)
				if child:IsA("SpecialMesh") then
					child.TextureId = "rbxassetid://13655022252"
					child.VertexColor = Vector3.new(color.R, color.G, color.B)
				end
			end
		end
	end

	player:SetAttribute("HairColor", color)

	if PRINT_SETS then print(setMessage("Hair color", color, player)) end
end

function IdentityService.SetFace(player: Player, personality: string)
	local raceName = DataService.GetData(player, "Race")
	local race = RACE_INFO.Glossary[raceName]

	IdentityService.CleanFace(player)

	if raceName == "Fischeran" then
		raceName = "Rigan"
	elseif not race.HasCustomFace then
		raceName = "Other"
	end

	local face = FACES[raceName].Default
	if FACES[raceName]:FindFirstChild("Emotions") then
		face = FACES[raceName].Emotions[personality]
	end

	local clone = face:Clone()
	clone.Parent = player.Character.Head
	clone.Name = "face"

	player:SetAttribute("Personality", face.Name)
	DataService.SetData(player, "Personality", face.Name)

	if PRINT_SETS then print(setMessage("Personality", face.Name, player)) end
end

local function addLashes(player: Player)
	local character = player.Character
	if not character then return end
	local head = character:WaitForChild("Head", 5)
	if not (head and head.Size == Vector3.new(2,1,1)) then return end
	if head:FindFirstChild("Lashes") then return end

	
	local lashes = ReplicatedStorage.Appearance.FacialExtras.Lashes:Clone()
	lashes.Parent = head
end

function IdentityService.SetGender(player: Player, gender: string)
	if gender == "Female" then
		addLashes(player)
	end
	
	player:SetAttribute("Gender", gender)
	DataService.SetData(player, "Gender", gender)

	if PRINT_SETS then print(setMessage("Gender", gender, player)) end
end

function IdentityService.SetArmor(player: Player, armorName: string)
	local character = player.Character
	local gender = DataService.GetData(player, "Gender")
	if not gender then error(string.format("Gender not set.")) end
	
	local armor = ARMOR_INFO.Glossary[armorName]
	if not armor then error(err404("Armor", armorName, player)) end
	local variation = ARMOR_INFO.Glossary[armorName].Variations[gender]
	if not variation then variation = armor.Variations.Male end
	
	local oldArmorName = DataService.GetData(player, "Armor")
	if not isEmptyString(oldArmorName) then
		for _,child in character:GetChildren() do
			if child:IsA("Clothing") then
				child:Destroy()
			end
		end
		for stat, value in ARMOR_INFO.Glossary[oldArmorName].StatChanges do
			DataService.AddStatChange(player, stat, -value)
		end
	end
	
	for stat, value in armor.StatChanges do
		DataService.AddStatChange(player, stat, value)
	end
	
	variation.Shirt:Clone().Parent = character
	variation.Pants:Clone().Parent = character

	player:SetAttribute("Armor", armorName)
	DataService.SetData(player, "Armor", armorName)
	if PRINT_SETS then print(setMessage("Armor", armorName, player)) end
end

function IdentityService.SetManaColor(player: Player, color: Color3)
	player:SetAttribute("ManaColor", color)
	DataService.SetData(player, "ManaColor", {R = color.R, G = color.G, B = color.B})
	
	IdentityService.Client.ManaColorChanged:Fire(player, color)
end

function IdentityService.SetFirstName(player: Player, name: string)
	local character = player.Character
	if character then
		local humanoid = character:FindFirstChild("Humanoid")
		if humanoid then
			humanoid.DisplayName = name
		end
	end
	
	player:SetAttribute("FirstName", name)
	DataService.SetData(player, "FirstName", name)
	
	IdentityService.Client.FirstNameChanged:Fire(player, name)
end

local function setCustomHead(player: Player, raceName: string, phenotypeName: string)
	local mesh = player.Character.Head:FindFirstChild("Mesh")
	if mesh then mesh:Destroy() end

	player.Character.Head.Size = Vector3.new(0.8, 1.4, 0.8)		

	local customHead = CUSTOM_HEADS[raceName]
	local hairColor = RACE_INFO.Glossary[raceName].Phenotypes[phenotypeName].HairColor

	if raceName == "Scroom" then
		if phenotypeName ~= "Glowscroom" then
			for _,v in customHead:GetDescendants() do
				if v:IsA("BasePart") and v.Name == "Mush" then
					v.Color = hairColor
				end
			end
		else
			customHead = CUSTOM_HEADS.Glowscroom:Clone()
		end
	end

	player.Character.Humanoid:AddAccessory(customHead:Clone())
end

local function setCustomAccessory(player: Player, raceName: string, phenotypeName: string)
	local customAccessory = CUSTOM_ACCESSORIES[raceName]
	
	player.Character.Humanoid:AddAccessory(customAccessory:Clone())
end

function IdentityService.SetPhenotype(player: Player, raceName: string, phenotypeName: string)
	local race = RACE_INFO.Glossary[raceName]
	local phenotype = race.Phenotypes[phenotypeName]

	IdentityService.SetSkinColor(player, phenotype.SkinColor)

	if race.IsBald then
		IdentityService.RemoveHair(player)
	else
		IdentityService.SetHairColor(player, phenotype.HairColor)
	end

	if race.HasCustomHead then
		setCustomHead(player, raceName, phenotypeName)
	else
		IdentityService.SetEyeColor(player, phenotype.EyeColor)
	end

	if race.HasCustomAccessory then
		setCustomAccessory(player, raceName, phenotypeName)
	end
end



function IdentityService.RollGender(): string	
	local gender = if math.random(0,1) == 1 then "Male" else "Female"

	return gender
end

function IdentityService.RollManaColor(): Color3
	local rand = Random.new()
	local color = Color3.fromRGB(rand:NextInteger(0,255), rand:NextInteger(0,255), rand:NextInteger(0,255))
	return color
end

function IdentityService.RollRace(player: Player): string
	local oldRace = DataService.GetData(player, "Race")
	local newRace = oldRace
	repeat
		newRace = RACE_INFO.GetRandomRollable()
	until newRace ~= oldRace
	newRace= "Scroom"
	return newRace
end

function IdentityService.RollPersonality(raceName: string): string
	if raceName == "Fischeran" then
		raceName = "Rigan"
	elseif not FACES:FindFirstChild(raceName) then
		raceName = "Other"
	end

	local personality = "Default"
	if FACES[raceName]:FindFirstChild("Emotions") then
		local emotions = FACES[raceName].Emotions:GetChildren()
		personality = emotions[math.random(1, #emotions)].Name
	end

	return personality
end

function IdentityService.RollName(raceName: string, gender: string): string
	return NAME_GEN.GetRandomFirstName(raceName, gender)
end



function IdentityService.RefreshPlayerAppearance(player: Player)
	local success, playerDesc = pcall(function(...)  return Players:GetHumanoidDescriptionFromUserId(...) end, player.UserId)
	
	IdentityService.PlayerAppearances[player.UserId] = if success then playerDesc else script.Default:Clone()
	IdentityService.CleanAppearance(player)
end

function IdentityService.OnPlayerAdded(player: Player)
	if PRINT_EVENTS then print("PlayerAdded fired", player.Name) end
	if PRINT_LOADS then print(loadedMessage("Player", player)) end
	
	IdentityService.RefreshPlayerAppearance(player)
end

function IdentityService.OnCharacterAdded(character: Model)
	if PRINT_EVENTS then print("CharacterAdded fired", character.Name) end
	local player: Player = Players:GetPlayerFromCharacter(character)
	if PRINT_LOADS then print(loadedMessage("Character", player)) end

	IdentityService.RefreshPlayerAppearance(player)
		
	local humanoid: Humanoid = character.Humanoid

	local raceName = DataService.GetData(player, "Race")
	if isEmptyString(raceName) then
		raceName = IdentityService.RollRace(player)
		DataService.SetData(player, "Race", raceName)	
	end
	player:SetAttribute("Race", raceName)
	local race = RACE_INFO.Glossary[raceName]

	IdentityService.CleanFace(player)
	if not race.HasCustomHead then
		local personality = DataService.GetData(player, "Personality")
		if isEmptyString(personality) then
			personality = IdentityService.RollPersonality(raceName)
			DataService.SetData(player, "Personality", personality)	
		end
		IdentityService.SetFace(player, personality)
	end

	local phenotypeName = DataService.GetData(player, "Phenotype")
	if isEmptyString(phenotypeName) then
		phenotypeName = RACE_INFO.GetRandomPhenotype(raceName)
		DataService.SetData(player, "Phenotype", phenotypeName)	
	end
	local phenotype = race.Phenotypes[phenotypeName]
	IdentityService.SetPhenotype(player, raceName, phenotypeName)
	
	local gender = DataService.GetData(player, "Gender")
	if isEmptyString(gender) then
		gender = IdentityService.RollGender()
		DataService.SetData(player, "Gender", gender)
	end
	IdentityService.SetGender(player, gender)
	
	local firstName = DataService.GetData(player, "FirstName")
	if isEmptyString(firstName) then
		firstName = IdentityService.RollName(raceName, gender)
	end
	IdentityService.SetFirstName(player, firstName)
	
	local armorName = DataService.GetData(player, "Armor")
	if isEmptyString(armorName) then
		if raceName == "Gaian" then
			armorName = "GaianDefault"
		elseif raceName == "Scroom" or race == "Metascroom" then
			armorName = "ScroomDefault"
		else
			armorName = ARMOR_INFO.GetRandomStarter()
		end
		DataService.SetData(player, "Armor", armorName)
	end
	IdentityService.SetArmor(player, armorName)
	
	local manaColor = DataService.GetData(player, "ManaColor") -- saved color data is always a dictionary
	local color
	if manaColor.R == 0 and manaColor.G == 0 and manaColor.B == 0 then
		color = IdentityService.RollManaColor()
	else
		color = Color3.fromRGB(manaColor.R*255, manaColor.G*255, manaColor.B*255)
	end
	IdentityService.SetManaColor(player, color)
	
	while not character:IsDescendantOf(workspace) do character.AncestryChanged:Wait() end
	humanoid:ApplyDescription(IdentityService.PlayerAppearances[player.UserId])
	
	player:SetAttribute("IdentityLoaded", true)
	IdentityService.Client.IdentityLoaded:Fire(player)
end

function IdentityService.OnCharacterRemoving(character: Model)
	local player = Players:GetPlayerFromCharacter(character)
	if not player then return end
	
	player:SetAttribute("IdentityLoaded", false)
end	

function IdentityService:KnitInit()
	self._trove = Trove.new()
end

function IdentityService:KnitStart()
	DataService = Knit.GetService("DataService")
	ManaService = Knit.GetService("ManaService")

	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return IdentityService
