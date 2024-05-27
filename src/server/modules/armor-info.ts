import Object from "@rbxts/object-utils";
import { ReplicatedStorage } from "@rbxts/services";

export type Outfit = {
	ShirtId: number;
	PantsId: number;
};

export type Armor = {
	Category: string;
	Heavy: boolean;
	Passives: string[];
	StatChanges: { [key: string]: number };
	TightHood: boolean;
	Variations: {
		[key: string]: {
			Pants: Instance;
			Shirt: Instance;
		};
	};
};

export const OUTFITS = ReplicatedStorage.Appearance.Outfits;

export const ARMORS: { [key: string]: Armor } = {
	Abysswalker: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Abysswalker.Male.Pants,
				Shirt: OUTFITS.Abysswalker.Male.Shirt,
			},
		},
	},
	AdventurerBlue: {
		Category: "Starter",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.AdventurerBlue.Female.Pants,
				Shirt: OUTFITS.AdventurerBlue.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.AdventurerBlue.Male.Pants,
				Shirt: OUTFITS.AdventurerBlue.Male.Shirt,
			},
		},
	},
	AdventurerGreen: {
		Category: "Starter",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.AdventurerGreen.Female.Pants,
				Shirt: OUTFITS.AdventurerGreen.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.AdventurerGreen.Male.Pants,
				Shirt: OUTFITS.AdventurerGreen.Male.Shirt,
			},
		},
	},
	AdventurerRed: {
		Category: "Starter",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.AdventurerRed.Female.Pants,
				Shirt: OUTFITS.AdventurerRed.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.AdventurerRed.Male.Pants,
				Shirt: OUTFITS.AdventurerRed.Male.Shirt,
			},
		},
	},
	Assassin: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {
			SpeedBoost: 5,
		},
		TightHood: true,
		Variations: {
			Female: {
				Pants: OUTFITS.Assassin.Female.Pants,
				Shirt: OUTFITS.Assassin.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.Assassin.Male.Pants,
				Shirt: OUTFITS.Assassin.Male.Shirt,
			},
		},
	},
	Bard: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: true,
		Variations: {
			Male: {
				Pants: OUTFITS.Bard.Male.Pants,
				Shirt: OUTFITS.Bard.Male.Shirt,
			},
		},
	},
	Brawler: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Brawler.Male.Pants,
				Shirt: OUTFITS.Brawler.Male.Shirt,
			},
		},
	},
	ChurchKnight: {
		Category: "Class",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.ChurchKnight.Male.Pants,
				Shirt: OUTFITS.ChurchKnight.Male.Shirt,
			},
		},
	},
	Colubras: {
		Category: "NPC",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Colubras.Male.Pants,
				Shirt: OUTFITS.Colubras.Male.Shirt,
			},
		},
	},
	DeepKnight: {
		Category: "Class",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.DeepKnight.Male.Pants,
				Shirt: OUTFITS.DeepKnight.Male.Shirt,
			},
		},
	},
	Doctor: {
		Category: "NPC",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: true,
		Variations: {
			Male: {
				Pants: OUTFITS.Doctor.Male.Pants,
				Shirt: OUTFITS.Doctor.Male.Shirt,
			},
		},
	},
	Dorgon: {
		Category: "NPC",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.Dorgon.Female.Pants,
				Shirt: OUTFITS.Dorgon.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.Dorgon.Male.Pants,
				Shirt: OUTFITS.Dorgon.Male.Shirt,
			},
		},
	},
	DragonSlayer: {
		Category: "Class",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.DragonSlayer.Male.Pants,
				Shirt: OUTFITS.DragonSlayer.Male.Shirt,
			},
		},
	},
	SigilKnight: {
		Category: "Class",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Errant.Male.Pants,
				Shirt: OUTFITS.Errant.Male.Shirt,
			},
		},
	},
	Ethan: {
		Category: "NPC",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.Ethan.Female.Pants,
				Shirt: OUTFITS.Ethan.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.Ethan.Male.Pants,
				Shirt: OUTFITS.Ethan.Male.Shirt,
			},
		},
	},
	Druid: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Florist.Male.Pants,
				Shirt: OUTFITS.Florist.Male.Shirt,
			},
		},
	},
	GaianChaotic: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.GaianChaotic.Male.Pants,
				Shirt: OUTFITS.GaianChaotic.Male.Shirt,
			},
		},
	},
	GaianDefault: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.GaianDefault.Male.Pants,
				Shirt: OUTFITS.GaianDefault.Male.Shirt,
			},
		},
	},
	GaianOrderly: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.GaianOrderly.Male.Pants,
				Shirt: OUTFITS.GaianOrderly.Male.Shirt,
			},
		},
	},
	GrimKnight: {
		Category: "NonClass",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.GrimKnight.Male.Pants,
				Shirt: OUTFITS.GrimKnight.Male.Shirt,
			},
		},
	},
	GrimMage: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.GrimMage.Male.Pants,
				Shirt: OUTFITS.GrimMage.Male.Shirt,
			},
		},
	},
	GrimRogue: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: true,
		Variations: {
			Male: {
				Pants: OUTFITS.GrimRogue.Male.Pants,
				Shirt: OUTFITS.GrimRogue.Male.Shirt,
			},
		},
	},
	Illusionist: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Illusionist.Male.Pants,
				Shirt: OUTFITS.Illusionist.Male.Shirt,
			},
		},
	},
	Inventor: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Inventor.Male.Pants,
				Shirt: OUTFITS.Inventor.Male.Shirt,
			},
		},
	},
	KnightLord: {
		Category: "NonClass",
		Heavy: true,
		Passives: [],
		StatChanges: {
			HealthBoost: 0.55,
		},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.KnightLord.Male.Pants,
				Shirt: OUTFITS.KnightLord.Male.Shirt,
			},
		},
	},
	Lapidarist: {
		Category: "Class",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Lapidarist.Male.Pants,
				Shirt: OUTFITS.Lapidarist.Male.Shirt,
			},
		},
	},
	Lastiel: {
		Category: "NPC",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Lastiel.Male.Pants,
				Shirt: OUTFITS.Lastiel.Male.Shirt,
			},
		},
	},
	Lord: {
		Category: "NonClass",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Lord.Male.Pants,
				Shirt: OUTFITS.Lord.Male.Shirt,
			},
		},
	},
	Mage: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Mage.Male.Pants,
				Shirt: OUTFITS.Mage.Male.Shirt,
			},
		},
	},
	Maratiel: {
		Category: "NPC",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Maratiel.Male.Pants,
				Shirt: OUTFITS.Maratiel.Male.Shirt,
			},
		},
	},
	MasterIllusionist: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.MasterIllusionist.Male.Pants,
				Shirt: OUTFITS.MasterIllusionist.Male.Shirt,
			},
		},
	},
	Monk: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Monk.Male.Pants,
				Shirt: OUTFITS.Monk.Male.Shirt,
			},
		},
	},
	Moonlight: {
		Category: "Exclusive",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Moonlight.Male.Pants,
				Shirt: OUTFITS.Moonlight.Male.Shirt,
			},
		},
	},
	Necromancer: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Necromancer.Male.Pants,
				Shirt: OUTFITS.Necromancer.Male.Shirt,
			},
		},
	},
	Faceless: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: true,
		Variations: {
			Male: {
				Pants: OUTFITS.NightLord.Male.Pants,
				Shirt: OUTFITS.NightLord.Male.Shirt,
			},
		},
	},
	Nobleman: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Nobleman.Male.Pants,
				Shirt: OUTFITS.Nobleman.Male.Shirt,
			},
		},
	},
	Outrider: {
		Category: "NonClass",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Outrider.Male.Pants,
				Shirt: OUTFITS.Outrider.Male.Shirt,
			},
		},
	},
	PitFighter: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.PitFighter.Male.Pants,
				Shirt: OUTFITS.PitFighter.Male.Shirt,
			},
		},
	},
	Premedian: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Premedian.Male.Pants,
				Shirt: OUTFITS.Premedian.Male.Shirt,
			},
		},
	},
	Prince: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Prince.Male.Pants,
				Shirt: OUTFITS.Prince.Male.Shirt,
			},
		},
	},
	Rags: {
		Category: "Starter",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Rags.Male.Pants,
				Shirt: OUTFITS.Rags.Male.Shirt,
			},
		},
	},
	Ranger: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Ranger.Male.Pants,
				Shirt: OUTFITS.Ranger.Male.Shirt,
			},
		},
	},
	Ratriel: {
		Category: "NPC",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Ratriel.Male.Pants,
				Shirt: OUTFITS.Ratriel.Male.Shirt,
			},
		},
	},
	Rogue: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: true,
		Variations: {
			Male: {
				Pants: OUTFITS.Rogue.Male.Pants,
				Shirt: OUTFITS.Rogue.Male.Shirt,
			},
		},
	},
	Royalty: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Royalty.Male.Pants,
				Shirt: OUTFITS.Royalty.Male.Shirt,
			},
		},
	},
	DragonSage: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Sage.Male.Pants,
				Shirt: OUTFITS.Sage.Male.Shirt,
			},
		},
	},
	Samurai: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Samurai.Male.Pants,
				Shirt: OUTFITS.Samurai.Male.Shirt,
			},
		},
	},
	Scholar: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Scholar.Male.Pants,
				Shirt: OUTFITS.Scholar.Male.Shirt,
			},
		},
	},
	ScroomDefault: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.ScroomDefault.Male.Pants,
				Shirt: OUTFITS.ScroomDefault.Male.Shirt,
			},
		},
	},
	Shallow: {
		Category: "Exclusive",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Shallow.Male.Pants,
				Shirt: OUTFITS.Shallow.Male.Shirt,
			},
		},
	},
	Shinobi: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: true,
		Variations: {
			Male: {
				Pants: OUTFITS.Shinobi.Male.Pants,
				Shirt: OUTFITS.Shinobi.Male.Shirt,
			},
		},
	},
	SpiderCloak: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {
			ClimbBoost: 0.6,
			ColdResist: 0.5,
			FallResist: 0.4,
			HealthBoost: -0.1,
			HealthRegen: 0.2,
			SpeedBoost: 4,
		},
		TightHood: true,
		Variations: {
			Male: {
				Pants: OUTFITS.SpiderCloak.Male.Pants,
				Shirt: OUTFITS.SpiderCloak.Male.Shirt,
			},
		},
	},
	SpyMaster: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.SpyMaster.Male.Pants,
				Shirt: OUTFITS.SpyMaster.Male.Shirt,
			},
		},
	},
	Tal: {
		Category: "NPC",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Tal.Male.Pants,
				Shirt: OUTFITS.Tal.Male.Shirt,
			},
		},
	},
	Troller: {
		Category: "Exclusive",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Troller.Male.Pants,
				Shirt: OUTFITS.Troller.Male.Shirt,
			},
		},
	},
	TundraRanger: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {
			ClimbBoost: 1.25,
			ColdResist: 4,
		},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.TundraRanger.Male.Pants,
				Shirt: OUTFITS.TundraRanger.Male.Shirt,
			},
		},
	},
	TunicBlue: {
		Category: "Starter",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.TunicBlue.Female.Pants,
				Shirt: OUTFITS.TunicBlue.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.TunicBlue.Male.Pants,
				Shirt: OUTFITS.TunicBlue.Male.Shirt,
			},
		},
	},
	TunicGreen: {
		Category: "Starter",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.TunicGreen.Female.Pants,
				Shirt: OUTFITS.TunicGreen.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.TunicGreen.Male.Pants,
				Shirt: OUTFITS.TunicGreen.Male.Shirt,
			},
		},
	},
	TunicPurple: {
		Category: "Starter",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.TunicPurple.Female.Pants,
				Shirt: OUTFITS.TunicPurple.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.TunicPurple.Male.Pants,
				Shirt: OUTFITS.TunicPurple.Male.Shirt,
			},
		},
	},
	TunicRed: {
		Category: "Starter",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Female: {
				Pants: OUTFITS.TunicRed.Female.Pants,
				Shirt: OUTFITS.TunicRed.Female.Shirt,
			},
			Male: {
				Pants: OUTFITS.TunicRed.Male.Pants,
				Shirt: OUTFITS.TunicRed.Male.Shirt,
			},
		},
	},
	Warlord: {
		Category: "Class",
		Heavy: true,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Warlord.Male.Pants,
				Shirt: OUTFITS.Warlord.Male.Shirt,
			},
		},
	},
	Wizard: {
		Category: "NonClass",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.Wizard.Male.Pants,
				Shirt: OUTFITS.Wizard.Male.Shirt,
			},
		},
	},
	WraithKnight: {
		Category: "Class",
		Heavy: false,
		Passives: [],
		StatChanges: {},
		TightHood: false,
		Variations: {
			Male: {
				Pants: OUTFITS.WraithKnight.Male.Pants,
				Shirt: OUTFITS.WraithKnight.Male.Shirt,
			},
		},
	},
};

export const STARTER_ARMORS = Object.fromEntries(
	Object.entries(ARMORS).filter((entry) => entry[1].Category === "Starter"),
);

export function getRandomStarterArmor(): string {
	const armorNames = Object.keys(STARTER_ARMORS);
	return armorNames[math.random(0, armorNames.size()-1)] as string;
}
