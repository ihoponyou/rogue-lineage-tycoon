import { OnStart, Service } from "@flamework/core";
import { GetProfileStore } from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players, RunService } from "@rbxts/services";
import { OnPlayerAdded, OnPlayerRemoving } from "../../../../../types/lifecycles";
import { Sex } from "./identity-service";
import { Logger } from "@rbxts/log";
import { valueof } from "../../../../../types/valueof";
import Object from "@rbxts/object-utils";

interface Vector {
	X: number | 0;
	Y: number | 0;
	Z: number | 0;
}

interface Color {
	R: number;
	G: number;
	B: number;
}

interface Currency {
	Amount: number;
	Multiplier: number;
}

export const DEFAULT_CURRENCY: Currency = {
	Amount: 0,
	Multiplier: 1,
};

export type PlayerData = {
	Conditions: string[];
	Health: number;
	Stomach: number;
	Toxicity: number;
	Temperature: number;
	Position: Vector;
	Direction: Vector;

	ResGrip: boolean;
	HasMadeHouse: boolean;
	IsVampire: boolean;
	IsLord: boolean;

	FirstName: string;
	PhenotypeName: string;
	Sex: Sex | "";
	Personality: string;
	ArmorName: string;
	Artifact: string;
	EmulatedSkill: string;
	Dye: Color;
	Days: number;
	Seconds: number;
	Runes: number;
	Lives: number;

	Class: string;
	SubClass: string;
	BaseClass: string;
	SuperClass: string;
	HybridClass: string;
	UltraClass: string;
	LastSkill: string;
	Skills: string[];
	IsHybrid: boolean;
	CanHybrid: boolean;
	SigilObtained: boolean;
	Alignment: number;

	Spells: string[];
	Snaps: string[];
	ManaColor: Color;
	ManaObtained: boolean;
	SnapSlots: number;
	ManaProgression: number;

	HomeTown: string;
	IsBanned: boolean;
	PDDay: number;
	GachaDay: number;

	Silver: Currency;
	Valu: Currency;
	Insight: Currency;

	RaceName: string;
	Edict: string;
	HouseName: string;
	BankedArtifact: string;

	UnlockIds: string[];
	Rebirths: number;
};

export type PlayerProfile = Profile<PlayerData>;

export const PROFILE_TEMPLATE: PlayerData = {
	Conditions: [],
	Health: 100,
	Stomach: 100,
	Toxicity: 0,
	Temperature: 50,

	Position: { X: 0, Y: 0, Z: 0 },
	Direction: { X: 0, Y: 0, Z: 0 },
	ResGrip: false,

	FirstName: "",
	PhenotypeName: "",
	Sex: "",
	Personality: "",
	ArmorName: "",
	Artifact: "",
	EmulatedSkill: "",
	HasMadeHouse: false,
	Dye: { R: 0, G: 0, B: 0 },
	IsVampire: false,
	Days: 0,
	Seconds: 0,
	Runes: 0,
	Lives: 3,

	Class: "",
	SubClass: "",
	BaseClass: "",
	SuperClass: "",
	HybridClass: "",
	UltraClass: "",
	LastSkill: "",
	Skills: [],
	IsHybrid: false,
	CanHybrid: false,
	SigilObtained: false,
	Alignment: 0,

	Spells: [],
	Snaps: [],
	ManaColor: { R: 0, G: 0, B: 0 },
	ManaObtained: false,
	SnapSlots: 0,
	ManaProgression: 0,

	HomeTown: "",
	IsBanned: false,
	PDDay: 0,
	GachaDay: 0,

	Silver: DEFAULT_CURRENCY,
	Valu: DEFAULT_CURRENCY,
	Insight: DEFAULT_CURRENCY,

	RaceName: "",
	Edict: "",
	HouseName: "",
	BankedArtifact: "",
	IsLord: false,

	UnlockIds: [],
	Rebirths: 0,
};

const PROFILE_STORE_INDEX = RunService.IsStudio() ? "Production" : "Testing";

@Service()
export class DataService implements OnPlayerAdded, OnPlayerRemoving {
	private profiles = new Map<number, PlayerProfile>();
	private profileStore = GetProfileStore(PROFILE_STORE_INDEX, PROFILE_TEMPLATE);

	public constructor(private readonly logger: Logger) {}

	onPlayerAdded(player: Player): void {
		const key = `Player${player.UserId}`;

		this.profileStore.WipeProfileAsync(key);

		const profile = this.profileStore.LoadProfileAsync(key);
		if (!profile) {
			player.Kick("data loading issue");
			return;
		}

		profile.AddUserId(player.UserId);
		profile.Reconcile();
		profile.ListenToRelease(() => {
			this.profiles.delete(player.UserId);
			player.Kick("get released");
		});

		if (!player.IsDescendantOf(Players)) {
			profile.Release();
			return;
		}

		this.profiles.set(player.UserId, profile);

		this.giveLeaderStatsFolder(player);

		player.LoadCharacter();
	}

	onPlayerRemoving(player: Player): void {
		const profile = this.profiles.get(player.UserId);
		if (profile) profile.Release();
	}

	private giveLeaderStatsFolder(player: Player) {
		const profile = this.getProfile(player);

		const leaderStats = new Instance("Folder");
		leaderStats.Parent = player;
		leaderStats.Name = "leaderstats";

		const silver = new Instance("NumberValue");
		silver.Parent = leaderStats;
		silver.Name = "Silver";
		silver.Value = profile.Data.Silver.Amount;

		const valu = new Instance("NumberValue");
		valu.Parent = leaderStats;
		valu.Name = "Valu";
		valu.Value = profile.Data.Valu.Amount;

		const insight = new Instance("NumberValue");
		insight.Parent = leaderStats;
		insight.Name = "Insight";
		insight.Value = profile.Data.Insight.Amount;
	}

	getProfile(player: Player): PlayerProfile {
		const profile = this.profiles.get(player.UserId);
		if (!profile) error(`could not fetch profile for ${player.Name}`);
		return profile;
	}
}
