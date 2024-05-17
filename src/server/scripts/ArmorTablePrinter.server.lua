type Outfit = {
	ShirtId: number;
	PantsId: number;
}

type Armor = {
	Category: string;

	Passives: {string};
	StatChanges: {number};
	Variations: {Outfit};

	TightHood: boolean;
	Heavy: boolean;
}

local function GetFullName(x)
	local t = {}
	while x ~= game do
		local name = x.Name:gsub('[\"]', '\\%0')
		table.insert(t, 1, name)
		x = x.Parent
	end
	return 'game["'..table.concat(t, '"]["')..'"]'
end

local function checkForFolder(folder: Folder, find: string)
	for _,folder in folder:GetDescendants() do
		if folder.Name == find then
			return true
		end
	end
	return false
end

local t = {}
for _,folder in game.ReplicatedFirst:GetChildren() do
	t[folder.Name] = {}
	local outfit = t[folder.Name]
	outfit.Category = ""
	outfit.Passives = {}
	outfit.StatChanges = {}
	outfit.Variations = {}
	outfit.TightHood = if checkForFolder(folder, "TightHood") then true else false
	outfit.Heavy = if checkForFolder(folder, "Plate") then true else false
	for _,subfolder in folder:GetChildren() do
		if subfolder.Name == "Male" or subfolder.Name == "Female" then
			outfit.Variations[subfolder.Name] = {}
			outfit.Variations[subfolder.Name].Shirt = GetFullName(subfolder.Shirt)
			outfit.Variations[subfolder.Name].Pants = GetFullName(subfolder.Pants)
		end
	end
end

print(t)