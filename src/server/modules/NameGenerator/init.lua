local NameGenerator = {}

NameGenerator.Names = {
	Masculine = require(script.Masculine), 
	Feminine = require(script.Feminine), 
	Kasparan = require(script.Kasparan), 
	Scroom = require(script.Scroom), 
	Cameo = require(script.Cameo), 
	Vind = require(script.Vind), 
	Azael = require(script.Azael), 
	GreaterNavaran = require(script.GreaterNavaran), 
	LesserNavaran = require(script.LesserNavaran), 
	Lich = require(script.Lich)
};

function NameGenerator.GetRandomFirstName(raceName: string, gender: string): string
	local rand = Random.new();
	
	local nameArr
	if raceName == "Kasparan" then
		nameArr = NameGenerator.Names.Kasparan
	elseif raceName == "Scroom" or raceName == "Metascroom" then
		nameArr = NameGenerator.Names.Scroom
	elseif raceName == "Cameo" then
		nameArr = NameGenerator.Names.Cameo
	elseif raceName == "GreaterNavaran" then
		nameArr = NameGenerator.Names.GreaterNavaran
	elseif raceName == "LesserNavaran" then
		nameArr = NameGenerator.Names.LesserNavaran
	elseif raceName == "Vind" or raceName == "Fischeran" then
		nameArr = NameGenerator.Names.Vind
	elseif raceName == "Azael" or raceName == "Dinakeri" then
		nameArr = NameGenerator.Names.Azael
	elseif raceName == "Lich" then
		nameArr = NameGenerator.Names.Lich
	elseif gender == "Female" then
		nameArr = NameGenerator.Names.Feminine
	else
		nameArr = NameGenerator.Names.Masculine
	end
	
	return nameArr[rand:NextInteger(1, #nameArr)]
end;

return NameGenerator;
