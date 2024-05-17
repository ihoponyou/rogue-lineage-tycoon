-- objects (strings > tables > instances)
-- booleans
-- numbers

local DEFAULT_CURRENCY = {
	Amount = 0,
	Multiplier = 1.0
}

local ProfileTemplate = {
	-- life
	Weapon			= "",
	Enchant			= "",

	Conditions		= {},
	Health			= 100,
	Stomach			= 100,
	Toxicity		= 0,
	Temperature		= 50,
	
	Position		= {X = 0, Y = 0, Z = 0},
	Direction		= {X = 0, Z = 0},
	ResGrip			= false,
	
	-- character
	FirstName		= "",
	Phenotype		= "",
	Gender 			= "",
	Personality 	= "",
	Armor 			= "",
	Artifact 		= "",
	EmulateSkill	= "",
	HasMadeHouse	= "",
	Dye				= {R = 0, G = 0, B = 0},
	IsVamp 			= false,
	Days 			= 0,
	Seconds			= 0,
	Runes 			= 0,
	Lives			= 3,
	
	Class 			= "",
	SubClass		= "",
	BaseClass		= "",
	SuperClass		= "",
	HybridClass		= "",
	UltraClass		= "",
	LastSkill		= "",
	Skills			= {},
	IsHybrid		= false,
	CanHybrid		= false,
	SigilObtained	= false,
	Alignment 		= 0,

	Spells			= {},
	Snaps			= {},
	SnapData		= {},
	ManaColor		= {R = 0, G = 0, B = 0},
	ManaObtained	= false,
	SnapSlots		= 0,
	ManaProgression	= 0,
	
	HomeTown		= "",
	IsBanned		= false,
	PDDay			= 0,
	GachaDay		= 0,
	
	Silver 			= table.clone(DEFAULT_CURRENCY),
	Valu 			= table.clone(DEFAULT_CURRENCY),
	Insight			= table.clone(DEFAULT_CURRENCY),

	-- lineage
	Race 			= "",
	Edict 			= "",
	HouseName 		= "",
	BankedArtifact	= "",
	IsLord 			= false,
	
	-- player
	UnlockIds		= {},
	Rebirths		= 0,
}

return ProfileTemplate
