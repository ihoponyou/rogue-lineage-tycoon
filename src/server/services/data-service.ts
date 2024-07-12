import { Service } from "@flamework/core";
import { GetProfileStore } from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { RunService } from "@rbxts/services";
import { store } from "server/store";
import { onThisPlayerRemoving } from "shared/on-player-removing";
import { selectPlayerData } from "shared/store/slices/players/selectors";
import { selectCurrencies } from "shared/store/slices/players/slices/currencies/selectors";
import {
	DEFAULT_PLAYER_DATA,
	PlayerData,
} from "shared/store/slices/players/slices/player-data";
import { OnPlayerAdded, OnPlayerRemoving } from "../../../types/lifecycles";

const PROFILE_STORE_INDEX = RunService.IsStudio() ? "Production" : "Testing";
const PROFILE_KEY_TEMPLATE = "Player%d";

@Service()
export class DataService implements OnPlayerAdded, OnPlayerRemoving {
	private profiles = new Map<number, Profile<PlayerData>>();
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
		profile.Release();
	}

	public getProfile(player: Player): Profile<PlayerData> {
		const profile = this.profiles.get(player.UserId);
		if (!profile) error(`could not fetch profile for ${player.Name}`);
		return profile;
	}

	private setupProfile(player: Player): void {
		const key = PROFILE_KEY_TEMPLATE.format(player.UserId);

		this.profileStore.WipeProfileAsync(key);

		const profile = this.profileStore.LoadProfileAsync(key);
		if (!profile) {
			player.Kick("data loading issue");
			return;
		}

		profile.AddUserId(player.UserId);
		profile.Reconcile();

		const onRelease = profile.ListenToRelease(() => {
			this.profiles.delete(player.UserId);
			player.Kick("get released");
			onRelease.Disconnect();
		});

		this.profiles.set(player.UserId, profile);
		store.loadPlayerData(player.UserId, profile.Data);
		this.joinTicks.set(player, math.round(tick()));
		this.giveLeaderStatsFolder(player);

		onThisPlayerRemoving(
			player,
			store.subscribe(selectPlayerData(player.UserId), (data) => {
				if (data) profile.Data = data;
			}),
		);
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

		onThisPlayerRemoving(
			player,
			store.subscribe(selectCurrencies(player.UserId), (data) => {
				silver.Value = data?.Silver.amount ?? 0;
				valu.Value = data?.Valu.amount ?? 0;
				insight.Value = data?.Insight.amount ?? 0;
			}),
		);
	}
}
