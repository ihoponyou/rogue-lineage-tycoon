import { Service } from "@flamework/core";
import { GetProfileStore } from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players, RunService } from "@rbxts/services";
import {
	OnPlayerAdded,
	OnPlayerRemoving,
} from "../../../../../types/lifecycles";
import { Sex } from "./identity-service";
import { Logger } from "@rbxts/log";
import { SECONDS_PER_DAY } from "./daylight-service";

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
	Conditions: Array<string>;
	Health: number;
	Stomach: number;
	Toxicity: number;
	Temperature: number;
	Position: Vector;
	Direction: Vector;

	HasResGrip: boolean;
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
	Skills: Array<string>;
	IsHybrid: boolean;
	CanHybrid: boolean;
	SigilObtained: boolean;
	Alignment: number;

	Spells: Array<string>;
	Snaps: Array<string>;
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

	UnlockIds: Array<string>;
	Rebirths: number;
};

export type PlayerProfile = Profile<PlayerData>;

export const PROFILE_TEMPLATE: PlayerData = {
	// player
	IsBanned: false,
	Rebirths: 0,
	// lineage
	RaceName: "",
	Edict: "",
	HouseName: "",
	BankedArtifact: "",
	UnlockIds: [],
	// character
	Days: 0,
	Seconds: 0,
	Runes: 0,
	Lives: 3,
	Alignment: 0,
	SnapSlots: 0,
	ManaProgression: 0,
	PDDay: 0,
	GachaDay: 0,
	HasMadeHouse: false,
	IsVampire: false,
	IsHybrid: false,
	CanHybrid: false,
	SigilObtained: false,
	ManaObtained: false,
	IsLord: false,
	FirstName: "",
	PhenotypeName: "",
	Sex: "",
	Personality: "",
	ArmorName: "",
	Artifact: "",
	EmulatedSkill: "",
	Class: "",
	SubClass: "",
	BaseClass: "",
	SuperClass: "",
	HybridClass: "",
	UltraClass: "",
	LastSkill: "",
	HomeTown: "",
	Skills: [],
	Spells: [],
	Snaps: [],
	Dye: { R: 0, G: 0, B: 0 },
	ManaColor: { R: 0, G: 0, B: 0 },
	Silver: DEFAULT_CURRENCY,
	Valu: DEFAULT_CURRENCY,
	Insight: DEFAULT_CURRENCY,
	// life
	Health: 100,
	Stomach: 100,
	Toxicity: 0,
	Temperature: 50,
	HasResGrip: false,
	Conditions: [],
	Position: { X: 0, Y: 0, Z: 0 },
	Direction: { X: 0, Y: 0, Z: 0 },
};

const PROFILE_STORE_INDEX = RunService.IsStudio() ? "Production" : "Testing";

@Service()
export class DataService implements OnPlayerAdded, OnPlayerRemoving {
	private profiles = new Map<number, PlayerProfile>();
	private profileStore = GetProfileStore(
		PROFILE_STORE_INDEX,
		PROFILE_TEMPLATE,
	);
	private joinTicks = new Map<Player, number>();

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
		this.joinTicks.set(player, math.round(tick()));

		this.giveLeaderStatsFolder(player);

		player.LoadCharacter();
	}

	onPlayerRemoving(player: Player): void {
		const profile = this.profiles.get(player.UserId);
		if (!profile) return;

		this.updateLifeLength(player);

		profile.Release();
	}

	private updateLifeLength(player: Player): void {
		const joinTick = this.joinTicks.get(player);
		if (!joinTick) error("wtf 2");

		const profile = this.getProfile(player);
		profile.Data.Seconds += math.round(tick()) - joinTick;
		while (profile.Data.Seconds >= SECONDS_PER_DAY) {
			profile.Data.Days++;
			profile.Data.Seconds -= SECONDS_PER_DAY;
		}
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

	resetLifeValues(data: PlayerData) {
		data.Health = PROFILE_TEMPLATE.Health;
		data.Stomach = PROFILE_TEMPLATE.Stomach;
		data.Toxicity = PROFILE_TEMPLATE.Toxicity;
		data.Temperature = PROFILE_TEMPLATE.Temperature;
		data.HasResGrip = PROFILE_TEMPLATE.HasResGrip;
		data.Conditions.clear();
		data.Position = PROFILE_TEMPLATE.Position;
		data.Direction = PROFILE_TEMPLATE.Direction;
	}

	resetCharacterValues(data: PlayerData) {
		this.resetLifeValues(data);

		data.Days = PROFILE_TEMPLATE.Days;
		data.Seconds = PROFILE_TEMPLATE.Seconds;
		data.Runes = PROFILE_TEMPLATE.Runes;
		data.Lives = PROFILE_TEMPLATE.Lives;
		data.Alignment = PROFILE_TEMPLATE.Alignment;
		data.SnapSlots = PROFILE_TEMPLATE.SnapSlots;
		data.ManaProgression = PROFILE_TEMPLATE.ManaProgression;
		data.PDDay = PROFILE_TEMPLATE.PDDay;
		data.GachaDay = PROFILE_TEMPLATE.GachaDay;
		data.HasMadeHouse = PROFILE_TEMPLATE.HasMadeHouse;
		data.IsVampire = PROFILE_TEMPLATE.IsVampire;
		data.IsHybrid = PROFILE_TEMPLATE.IsHybrid;
		data.CanHybrid = PROFILE_TEMPLATE.CanHybrid;
		data.SigilObtained = PROFILE_TEMPLATE.SigilObtained;
		data.ManaObtained = PROFILE_TEMPLATE.ManaObtained;
		data.IsLord = PROFILE_TEMPLATE.IsLord;
		data.FirstName = PROFILE_TEMPLATE.FirstName;
		data.PhenotypeName = PROFILE_TEMPLATE.PhenotypeName;
		data.Sex = PROFILE_TEMPLATE.Sex;
		data.Personality = PROFILE_TEMPLATE.Personality;
		data.ArmorName = PROFILE_TEMPLATE.ArmorName;
		data.Artifact = PROFILE_TEMPLATE.Artifact;
		data.EmulatedSkill = PROFILE_TEMPLATE.EmulatedSkill;
		data.Class = PROFILE_TEMPLATE.Class;
		data.SubClass = PROFILE_TEMPLATE.SubClass;
		data.BaseClass = PROFILE_TEMPLATE.BaseClass;
		data.SuperClass = PROFILE_TEMPLATE.SuperClass;
		data.HybridClass = PROFILE_TEMPLATE.HybridClass;
		data.UltraClass = PROFILE_TEMPLATE.UltraClass;
		data.LastSkill = PROFILE_TEMPLATE.LastSkill;
		data.HomeTown = PROFILE_TEMPLATE.HomeTown;
		data.Skills.clear();
		data.Spells.clear();
		data.Snaps.clear();
		data.Dye = PROFILE_TEMPLATE.Dye;
		data.ManaColor = PROFILE_TEMPLATE.ManaColor;
		data.Silver = PROFILE_TEMPLATE.Silver;
		data.Valu = PROFILE_TEMPLATE.Valu;
		data.Insight = PROFILE_TEMPLATE.Insight;
	}

	resetLineageValues(data: PlayerData) {
		this.resetLifeValues(data);
		this.resetCharacterValues(data);

		data.RaceName = PROFILE_TEMPLATE.RaceName;
		data.Edict = PROFILE_TEMPLATE.Edict;
		data.HouseName = PROFILE_TEMPLATE.HouseName;
		data.BankedArtifact = PROFILE_TEMPLATE.BankedArtifact;
		data.UnlockIds.clear();
	}
}
