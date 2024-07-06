import { Service } from "@flamework/core";
import { GetProfileStore } from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players, RunService } from "@rbxts/services";
import { store } from "server/store";
import { onThisPlayerRemoving } from "shared/on-player-removing";
import { selectAllPlayerCurrencies, selectPlayerData } from "shared/store";
import {
	DEFAULT_PLAYER_DATA,
	PlayerData,
} from "shared/store/slices/players/types";
import { OnPlayerAdded, OnPlayerRemoving } from "../../../types/lifecycles";
import { SECONDS_PER_DAY } from "./daylight-service";

export type PlayerProfile = Profile<PlayerData>;

const PROFILE_STORE_INDEX = RunService.IsStudio() ? "Production" : "Testing";
const PROFILE_KEY_TEMPLATE = "Player%d";

@Service()
export class DataService implements OnPlayerAdded, OnPlayerRemoving {
	private profiles = new Map<number, PlayerProfile>();
	private profileStore = GetProfileStore(
		PROFILE_STORE_INDEX,
		DEFAULT_PLAYER_DATA,
	);
	private joinTicks = new Map<Player, number>();

	public onPlayerAdded(player: Player): void {
		this.setupProfile(player);
		player.LoadCharacter();
	}

	public onPlayerRemoving(player: Player): void {
		const profile = this.profiles.get(player.UserId);
		if (!profile) return;

		this.updateLifeLength(player);

		profile.Release();
	}

	public getProfile(player: Player): PlayerProfile {
		const profile = this.profiles.get(player.UserId);
		if (!profile) error(`could not fetch profile for ${player.Name}`);
		return profile;
	}

	public resetLifeValues(data: PlayerData) {
		data.Health = DEFAULT_PLAYER_DATA.Health;
		data.Stomach = DEFAULT_PLAYER_DATA.Stomach;
		data.Toxicity = DEFAULT_PLAYER_DATA.Toxicity;
		data.Temperature = DEFAULT_PLAYER_DATA.Temperature;
		data.HasResGrip = DEFAULT_PLAYER_DATA.HasResGrip;
		data.Conditions.clear();
		data.Position = DEFAULT_PLAYER_DATA.Position;
		data.Direction = DEFAULT_PLAYER_DATA.Direction;
	}

	public resetCharacterValues(data: PlayerData) {
		this.resetLifeValues(data);

		data.currency = DEFAULT_PLAYER_DATA.currency;

		data.Days = DEFAULT_PLAYER_DATA.Days;
		data.Seconds = DEFAULT_PLAYER_DATA.Seconds;
		data.Runes = DEFAULT_PLAYER_DATA.Runes;
		data.Lives = DEFAULT_PLAYER_DATA.Lives;
		data.SnapSlots = DEFAULT_PLAYER_DATA.SnapSlots;
		data.ManaProgression = DEFAULT_PLAYER_DATA.ManaProgression;
		data.PDDay = DEFAULT_PLAYER_DATA.PDDay;
		data.GachaDay = DEFAULT_PLAYER_DATA.GachaDay;
		data.HasMadeHouse = DEFAULT_PLAYER_DATA.HasMadeHouse;
		data.IsVampire = DEFAULT_PLAYER_DATA.IsVampire;
		data.IsHybrid = DEFAULT_PLAYER_DATA.IsHybrid;
		data.CanHybrid = DEFAULT_PLAYER_DATA.CanHybrid;
		data.SigilObtained = DEFAULT_PLAYER_DATA.SigilObtained;
		data.ManaObtained = DEFAULT_PLAYER_DATA.ManaObtained;
		data.IsLord = DEFAULT_PLAYER_DATA.IsLord;
		data.FirstName = DEFAULT_PLAYER_DATA.FirstName;
		data.PhenotypeName = DEFAULT_PLAYER_DATA.PhenotypeName;
		data.Sex = DEFAULT_PLAYER_DATA.Sex;
		data.Personality = DEFAULT_PLAYER_DATA.Personality;
		data.ArmorName = DEFAULT_PLAYER_DATA.ArmorName;
		data.Artifact = DEFAULT_PLAYER_DATA.Artifact;
		data.EmulatedSkill = DEFAULT_PLAYER_DATA.EmulatedSkill;
		data.Class = DEFAULT_PLAYER_DATA.Class;
		data.SubClass = DEFAULT_PLAYER_DATA.SubClass;
		data.BaseClass = DEFAULT_PLAYER_DATA.BaseClass;
		data.SuperClass = DEFAULT_PLAYER_DATA.SuperClass;
		data.HybridClass = DEFAULT_PLAYER_DATA.HybridClass;
		data.UltraClass = DEFAULT_PLAYER_DATA.UltraClass;
		data.LastSkill = DEFAULT_PLAYER_DATA.LastSkill;
		data.HomeTown = DEFAULT_PLAYER_DATA.HomeTown;
		data.Skills.clear();
		data.Spells.clear();
		data.Snaps.clear();
		data.Dye = DEFAULT_PLAYER_DATA.Dye;
		data.ManaColor = DEFAULT_PLAYER_DATA.ManaColor;
	}

	public resetLineageValues(data: PlayerData) {
		this.resetLifeValues(data);
		this.resetCharacterValues(data);

		data.stats = DEFAULT_PLAYER_DATA.stats;

		data.RaceName = DEFAULT_PLAYER_DATA.RaceName;
		data.Edict = DEFAULT_PLAYER_DATA.Edict;
		data.HouseName = DEFAULT_PLAYER_DATA.HouseName;
		data.BankedArtifact = DEFAULT_PLAYER_DATA.BankedArtifact;
		data.UnlockIds.clear();
	}

	private setupProfile(player: Player) {
		const key = PROFILE_KEY_TEMPLATE.format(player.UserId);

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
			store.releasePlayerData(player.UserId);
			player.Kick("get released bud");
		});

		this.profiles.set(player.UserId, profile);
		store.loadPlayerData(player.UserId, profile.Data);

		this.giveLeaderStatsFolder(player);
		this.joinTicks.set(player, math.round(tick()));

		const unsubscribe = store.subscribe(
			selectPlayerData(player.UserId),
			(data) => {
				if (data) profile.Data = data;
			},
		);
		const onPlayerRemoving = Players.PlayerRemoving.Connect(
			(leavingPlayer) => {
				if (player === leavingPlayer) unsubscribe();
				onPlayerRemoving.Disconnect();
			},
		);
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
		const leaderStats = new Instance("Folder");
		leaderStats.Parent = player;
		leaderStats.Name = "leaderstats";

		const silver = new Instance("NumberValue");
		silver.Parent = leaderStats;
		silver.Name = "Silver";

		const valu = new Instance("NumberValue");
		valu.Parent = leaderStats;
		valu.Name = "Valu";

		const insight = new Instance("NumberValue");
		insight.Parent = leaderStats;
		insight.Name = "Insight";

		const unsubscribe = store.subscribe(
			selectAllPlayerCurrencies(player.UserId),
			(data) => {
				silver.Value = data?.Silver.amount ?? 0;
				valu.Value = data?.Valu.amount ?? 0;
				insight.Value = data?.Insight.amount ?? 0;
			},
		);
		onThisPlayerRemoving(player, () => unsubscribe());
	}
}
