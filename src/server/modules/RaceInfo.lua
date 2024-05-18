local TableFunctions = require(game.ReplicatedStorage.Source.Modules.TableFunctions)

local RaceInfo = {}

type Phenotype = {
	EyeColor: Color3;
	HairColor: Color3;
	SkinColor: Color3;
}

type Race = {
	Category: string;

	Actives: {string};
	Passives: {string};
	StatChanges: {[string]: number};
	Phenotypes: {[string]: Phenotype};

	IsBald: boolean;
	HasCustomHead: boolean;
	HasCustomFace: boolean;
	HasCustomAccessory: boolean;

	Abundance: number;
}

local glossary: {[string]: Race} = {
	Ashiin = {
		Category = "Rollable";

		Actives = {"Shoulder Throw", "Agility"};
		Passives = {"Trained Combat", "Mercenary Carry"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(80, 188, 47),
				HairColor = Color3.fromRGB(148, 27, 27),
				SkinColor = Color3.fromRGB(180, 132, 65),
			},
			Olive = {
				EyeColor = Color3.fromRGB(181, 188, 44),
				HairColor = Color3.fromRGB(185, 70, 59),
				SkinColor = Color3.fromRGB(200, 159, 62)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 10;
	},
	Azael = {
		Category = "Obtainable";

		Actives = {};
		Passives = {"Gate Mastery", "Hell's Flame", "Par's Curse"};
		StatChanges = {
			ColdResist = -.25;
			ManaBoost = 1.5;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(220, 68, 91),
				HairColor = Color3.fromRGB(47, 23, 18),
				SkinColor = Color3.fromRGB(170, 29, 29)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = true;
		HasCustomAccessory = true;

		Abundance = 0;
	},
	Cameo = {
		Category = "Obtainable";

		Actives = {};
		Passives = {"Cat Lives", "Extinction", "Empty Husk", "Unnatural Blood"};
		StatChanges = {
			HungerRate = 0.0;
			HealthRegen = 1.0; -- whatever t2 gaian armor is
			ColdResist = 3.0;
			RagdollDuration = 0.25;
			KnockbackMultiplier = 1.3;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(111, 16, 158),
				HairColor = Color3.fromRGB(248, 248, 248),
				SkinColor = Color3.fromRGB(248, 227, 176)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 0;
	},
	Castellan = {
		Category = "Rollable";

		Actives = {};
		Passives = {"Snap Excellence"};
		StatChanges = {
			ManaBoost = 1.25;
			ScholarsBoon = 1.2;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(0, 234, 255),
				HairColor = Color3.fromRGB(248, 222, 119),
				SkinColor = Color3.fromRGB(248, 227, 176)
			},
			Ash =    {
				EyeColor = Color3.fromRGB(183, 238, 237),
				HairColor = Color3.fromRGB(209, 198, 171),
				SkinColor = Color3.fromRGB(248, 227, 176)
			},
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 10;
	},
	Construct = {
		Category = "Obtainable";

		Actives = {"Galvanize"};
		Passives = {"Unnatural Blood", "Mercenary Drink"};
		StatChanges = {
			ColdResist = 3.75;
			ToxicResist = 7.0;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(0, 255, 0),
				HairColor = Color3.fromRGB(43, 43, 67),
				SkinColor = Color3.fromRGB(248, 232, 200)
			},
			Tal = {
				EyeColor = Color3.fromRGB(96, 132, 76),
				HairColor = Color3.fromRGB(0, 0, 0),
				SkinColor = Color3.fromRGB(249, 248, 235)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 0;
	},
	Dinakeri = {
		Category = "Rollable";

		Actives = {"Soul Rip"};
		Passives = {"Runecasting", "Iron Sight", "Strong Mind"}; -- strong mind = 2 combat logs for insanity erm what the deuce ?????
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(46, 255, 63),
				HairColor = Color3.fromRGB(255, 255, 255),
				SkinColor = Color3.fromRGB(54, 73, 86)
			},
			Deep =    {
				EyeColor = Color3.fromRGB(0, 255, 234),
				HairColor = Color3.fromRGB(224, 239, 241),
				SkinColor = Color3.fromRGB(75, 104, 106)
			},
			Untainted =    {
				EyeColor = Color3.fromRGB(255, 255, 255),
				HairColor = Color3.fromRGB(255, 255, 255),
				SkinColor = Color3.fromRGB(58, 70, 86)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = true;
		HasCustomAccessory = false;

		Abundance = 6;
	},
	Dullahan = {
		Category = "Obtainable";

		Actives = {"Pumpkin Grenade"};
		Passives = {"Unnatural Blood", "Jack O' Lantern", "Biting Grenade"};
		StatChanges = {
			HealthRegen = 1.25; -- only at night
			SpeedBoost = 2;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(255, 176, 0),
				HairColor = Color3.fromRGB(0, 0, 0),
				SkinColor = Color3.fromRGB(170, 197, 154)
			},
			Diseased =    {
				EyeColor = Color3.fromRGB(0, 255, 0),
				HairColor = Color3.fromRGB(0, 0, 0),
				SkinColor = Color3.fromRGB(170, 197, 154)
			},
			Ethereal =    {
				EyeColor = Color3.fromRGB(0, 255, 204),
				HairColor = Color3.fromRGB(0, 0, 0),
				SkinColor = Color3.fromRGB(170, 197, 154)
			}
		};

		IsBald = true;
		HasCustomHead = true;
		HasCustomFace = false;
		HasCustomAccessory = false;
	},
	Dzin = {
		Category = "Rollable";

		Actives = {"World's Pulse", "Awakening"};
		Passives = {"Unbreakable Mind"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(220, 175, 135),
				HairColor = Color3.fromRGB(58, 29, 23),
				SkinColor = Color3.fromRGB(136, 62, 62)
			},
			Blue = {
				EyeColor = Color3.fromRGB(202, 135, 220),
				HairColor = Color3.fromRGB(22, 24, 58),
				SkinColor = Color3.fromRGB(64, 69, 136)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 2;
	},
	Fischeran = {
		Category = "Obtainable";

		Actives = {"Dissolve"};
		Passives = {"Wind Shield", "Wind Affinity", "Skybound", "Mana Lineage", "Unnatural Blood"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(76, 255, 255),
				HairColor = Color3.fromRGB(180, 254, 255),
				SkinColor = Color3.fromRGB(147, 232, 255)
			},
			Seagreen =    {
				EyeColor = Color3.fromRGB(75, 255, 111),
				HairColor = Color3.fromRGB(180, 255, 199),
				SkinColor = Color3.fromRGB(147, 255, 181)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = true; -- rigan face
		HasCustomAccessory = false;

		Abundance = 2;
	},
	Florian = {
		Category = "Exclusive";

		Actives = {};
		Passives = {"Decompose"};
		StatChanges = {
			HealthRegen = 3.0;
			SpeedBoost = 2;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(0, 75, 255),
				SkinColor = Color3.fromRGB(0, 150, 75)
			};
		};

		IsBald = true;
		HasCustomHead = true;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 0;
	};
	Gaian = {
		Category = "Rollable";

		Actives = {"Repair"};
		Passives = {"Overheating", "Unnatural Blood", "Robotic Anatomy", "Iron Body", "Robot Mind"};
		StatChanges = {
			StomachDecay = 0;
			SlashResist = 0.25;
			HealthBoost = 15;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(255, 250, 240),
				HairColor = Color3.fromRGB(0, 0, 0),
				SkinColor = Color3.fromRGB(156, 139, 133)
			},
			Bluesteel =    {
				EyeColor = Color3.fromRGB(255, 246, 222),
				HairColor = Color3.fromRGB(0, 0, 0),
				SkinColor = Color3.fromRGB(132, 133, 156)
			},
		};

		IsBald = true;
		HasCustomHead = false;
		HasCustomFace = true;
		HasCustomAccessory = false;

		Abundance = 10;
	},
	GreaterNavaran = {
		Category = "Exclusive";

		Actives = {"Emulate", "Jack"};
		Passives = {"Devour"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(76, 255, 255),
				HairColor = Color3.fromRGB(180, 254, 255),
				SkinColor = Color3.fromRGB(147, 232, 255)
			};
		};

		IsBald = true;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = true;

		Abundance = 0;
	};
	Haseldan = {
		Category = "Rollable";

		Actives = {"Bloodline"};
		Passives = {"Last Stand"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(243, 151, 98),
				HairColor = Color3.fromRGB(56, 45, 31),
				SkinColor = Color3.fromRGB(248, 224, 124)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = true;
		HasCustomAccessory = false;

		Abundance = 10;
	},
	Kasparan = {
		Category = "Rollable";

		Actives = {"Respirare"};
		Passives = {"Dragon Age", "Fire Affinity", "Dragonborn", "Dragon Scales"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(240, 192, 0),
				HairColor = Color3.fromRGB(165, 139, 121),
				SkinColor = Color3.fromRGB(113, 145, 79)
			},
			Black =    {
				EyeColor = Color3.fromRGB(95, 238, 155),
				HairColor = Color3.fromRGB(221, 210, 193),
				SkinColor = Color3.fromRGB(114, 88, 127)
			},
			Red =    {
				EyeColor = Color3.fromRGB(155, 218, 84),
				HairColor = Color3.fromRGB(165, 139, 121),
				SkinColor = Color3.fromRGB(163, 75, 75)
			},
			White =    {
				EyeColor = Color3.fromRGB(248, 121, 155),
				HairColor = Color3.fromRGB(165, 139, 156),
				SkinColor = Color3.fromRGB(255, 243, 250)
			}
		};

		IsBald = true;
		HasCustomHead = false;
		HasCustomFace = true;
		HasCustomAccessory = true;

		Abundance = 10;
	},
	LesserNavaran = {
		Category = "Rollable";

		Actives = {"Emulate"};
		Passives = {"Devour"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(221, 221, 221),
				SkinColor = Color3.fromRGB(221, 221, 221),
			},
			Cold =    {
				EyeColor = Color3.fromRGB(25, 27, 30),
				HairColor = Color3.fromRGB(70, 61, 53),
				SkinColor = Color3.fromRGB(138, 168, 171)
			},
			Sickly =    {
				EyeColor = Color3.fromRGB(25, 31, 24),
				HairColor = Color3.fromRGB(70, 61, 53),
				SkinColor = Color3.fromRGB(163, 171, 153)
			},
			Viral =    {
				EyeColor = Color3.fromRGB(36, 31, 31),
				HairColor = Color3.fromRGB(70, 61, 53),
				SkinColor = Color3.fromRGB(171, 150, 148)
			}
		};

		IsBald = true;
		HasCustomHead = false;
		HasCustomFace = true;
		HasCustomAccessory = false;

		Abundance = 6;
	},
	Lich = {
		Category = "Exclusive";

		Actives = {"Vagrant Soul"};
		Passives = {"Tomeless", "Iron Mind", "Iron Body", "Poison Immunity", "Temperature Immunity", "Skeletal"};
		StatChanges = {
			HungerRate = 0.0;
			ToxicResist = 7.0;
			SlashResist = 0.30;
			HealthBoost = 30;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(0, 255, 119),
				HairColor = Color3.fromRGB(57, 68, 66),
				SkinColor = Color3.fromRGB(0, 0, 0)
			}
		};

		IsBald = false;
		HasCustomHead = true;
		HasCustomFace = false;
		HasCustomAccessory = false;
	},
	Madrasian = {
		Category = "Rollable";

		Actives = {"Shift", "Trinket Shift"};
		Passives = {};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(200, 255, 0),
				HairColor = Color3.fromRGB(102, 97, 95),
				SkinColor = Color3.fromRGB(248, 235, 211)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 8;
	},
	Metascroom = {
		Category = "Obtainable";

		Actives = {"Repair", "Decompose", "Exhaust"};
		Passives = {"Hardened", "Homeland", "Unnatural Blood", "Scroom Speech", "Mouthless", "Iron Body", "Robotic Anatomy", "Robot Mind"};
		StatChanges = {
			SlashResist = 0.25;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(255, 0, 0),
				SkinColor = Color3.fromRGB(255, 255, 255)
			}
		};

		IsBald = true;
		HasCustomHead = true;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 0;
	},
	Morvid = {
		Category = "Rollable";

		Actives = {"Flock"};
		Passives = {"Mana Lineage", "Feather Falling", "Cannibalistic"};
		StatChanges = {
			ManaBoost = 1.1;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(255, 0, 0),
				HairColor = Color3.fromRGB(30, 30, 48),
				SkinColor = Color3.fromRGB(68, 68, 107)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = true;
		HasCustomAccessory = true; -- until final form

		Abundance = 4;
	},
	Rigan = {
		Category = "Rollable";

		Actives = {"Flood"};
		Passives = {"Ice Affinity"};
		StatChanges = {
			ManaBoost = 2.0;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(255, 217, 0),
				HairColor = Color3.fromRGB(54, 47, 41),
				SkinColor = Color3.fromRGB(101, 101, 115)
			},
			Darkly =    {
				EyeColor = Color3.fromRGB(255, 255, 0),
				HairColor = Color3.fromRGB(70, 61, 53),
				SkinColor = Color3.fromRGB(101, 119, 115)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = true;
		HasCustomAccessory = false;

		Abundance = 10;
	},
	Scroom = {
		Category = "Rollable";

		Actives = {"Decompose", "Detoxify"};
		Passives = {"Scroom Speech", "Earth Affinity", "Poison Affinity", "Unnatural Blood", "Boneless", "Homeland", "Mouthless"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(196, 40, 28),
				SkinColor = Color3.fromRGB(255, 255, 255)
			},
			Blue = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(9, 137, 207),
				SkinColor = Color3.fromRGB(255, 255, 255)
			},
			Green = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(91, 154, 76),
				SkinColor = Color3.fromRGB(255, 255, 255)
			},
			Purple = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(98, 37, 209),
				SkinColor = Color3.fromRGB(255, 255, 255)
			},
			Buttermilk = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(254, 243, 187),
				SkinColor = Color3.fromRGB(255, 255, 255)
			},
			Orange = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(255, 176, 0),
				SkinColor = Color3.fromRGB(255, 255, 255)
			},
			Bronze = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(126, 104, 63),
				SkinColor = Color3.fromRGB(255, 255, 255)
			},
			Glowscroom = {
				EyeColor = Color3.fromRGB(0, 0, 0),
				HairColor = Color3.fromRGB(111, 243, 255),
				SkinColor = Color3.fromRGB(211, 190, 150)
			},
		};

		IsBald = true;
		HasCustomHead = true;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 10;
	},
	Seraph = {
		Category = "Exclusive";

		Actives = {"Angel's Fall"};
		Passives = {"Tomeless", "Gate Novice", "Immortality"};
		StatChanges = {};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(255, 255, 0),
				HairColor = Color3.fromRGB(218, 218, 218),
				SkinColor = Color3.fromRGB(247, 244, 237)
			},
			Ardor =    {
				EyeColor = Color3.fromRGB(85, 0, 127),
				HairColor = Color3.fromRGB(204, 198, 191),
				SkinColor = Color3.fromRGB(247, 243, 231)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = 123; -- maybe use "Phoenix" facial marking
	},
	Vind = {
		Category = "Rollable";

		Actives = {"Tempest Soul"};
		Passives = {"Skybound", "Calm Mind", "Perfect Face", "Unnatural Blood", "Mana Lineage", "Wind Affinity"};
		StatChanges = {
			HealthRegen = 1.1;
		};
		Phenotypes = {
			Default = {
				EyeColor = Color3.fromRGB(255, 69, 224),
				HairColor = Color3.fromRGB(91, 93, 105),
				SkinColor = Color3.fromRGB(177, 167, 255)
			}
		};

		IsBald = false;
		HasCustomHead = false;
		HasCustomFace = false;
		HasCustomAccessory = false;

		Abundance = 2;
	}
}
RaceInfo.Glossary = glossary

RaceInfo.Rollables = TableFunctions.Filter(RaceInfo.Glossary, function(race: Race)
	return race.Category == "Rollable"
end)

local function getTotalAbundance(t: {[string]: Race})
	local total = 0
	for _, data in t do
		total += data.Abundance
	end
	return total
end
RaceInfo._totalAbundance = getTotalAbundance(RaceInfo.Rollables)

function RaceInfo.GetRandomPhenotype(raceName: string): string
	local race = RaceInfo.Glossary[raceName]
	local phenotypes = TableFunctions.GetKeys(race.Phenotypes)
	if #phenotypes < 2 then return "Default" end

	return phenotypes[math.random(1, #phenotypes)]
end

function RaceInfo.GetRandomRollable(): string
	local calculatedWeights = TableFunctions.Map(RaceInfo.Rollables, function(race: Race)
		return race.Abundance / RaceInfo._totalAbundance
	end)

	local rand = Random.new()
	local roll = rand:NextNumber()
	for race, weight in calculatedWeights do
		if roll < weight then
			return race
		end
		roll -= weight
	end
end

local function rollTest(n: number)
	local commons, uncommons, rares, epics = 0,0,0,0
	for _ = 1, n do
		local race = RaceInfo.GetRandomRollable()
		local isCommon = (race == "Castellan" or race == "Ashiin" or race == "Rigan" or race == "Haseldan")
		local isUncommon = (race == "Kasparan" or race == "Gaian" or race == "Scroom")
		local isRare = (race == "LesserNavaran" or race == "Madrasian" or race == "Dinakeri" or race == "Morvid")
		local isEpic = (race == "Dzin" or race == "Vind" or race == "Fischeran")
		if isCommon then
			commons += 1
		elseif isUncommon then
			uncommons += 1
		elseif isRare then
			rares += 1
		elseif isEpic then
			epics += 1
		end
	end
	print(string.format("%5d %5d %5d %5d", commons, uncommons, rares, epics))
	print(string.format("%d%% %d%% %d%% %d%%", commons/n*100, uncommons/n*100, rares/n*100, epics/n*100))
end

return RaceInfo
