import { Components } from "@flamework/components";
import { Service } from "@flamework/core";
import { GetProfileStore } from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { RunService } from "@rbxts/services";
import { PlayerServer } from "server/components/player-server";
import { store } from "server/store";
import { selectPlayer, selectPlayerCurrencies } from "server/store/selectors";
import { OnPlayerAdded, OnPlayerRemoving } from "shared/modules/lifecycles";
import { onThisPlayerRemoving } from "shared/modules/on-player-removing";
import {
	DEFAULT_PLAYER_PROFILE_DATA,
	PlayerProfileData,
} from "shared/modules/player-data";

const PROFILE_STORE_INDEX = RunService.IsStudio() ? "Testing" : "Production";
const PROFILE_KEY_TEMPLATE = "Player%d";
const WIPE_DATA_ON_JOIN = false;

type PlayerProfile = Profile<PlayerProfileData>;

@Service()
export class DataService implements OnPlayerAdded, OnPlayerRemoving {
	private profiles = new Map<number, PlayerProfile>();
	private profileStore = GetProfileStore(
		PROFILE_STORE_INDEX,
		DEFAULT_PLAYER_PROFILE_DATA,
	);
	private joinTicks = new Map<Player, number>();
	private preReleaseListeners = new Map<
		Player,
		Array<(profile: PlayerProfile) => void>
	>();

	constructor(private components: Components) {}

	public onPlayerAdded(player: Player): void {
		this.setupProfile(player);
		this.components
			.waitForComponent<PlayerServer>(player)
			.andThen((playerServer) => {
				playerServer.loadCharacter();
			});
	}

	public onPlayerRemoving(player: Player): void {
		const profile = this.profiles.get(player.UserId);
		if (!profile) return;
		const listeners = this.preReleaseListeners.get(player);
		listeners?.forEach((listener) => listener(profile));
		profile.Release();
	}

	/**
	 * @return A function that disconnects the given listener
	 */
	public connectToPreRelease(
		player: Player,
		listener: (profile: PlayerProfile) => void,
	): () => void {
		const listeners = this.preReleaseListeners.get(player);
		if (listeners === undefined)
			error(`no listener arr found for ${player}`);
		listeners.push(listener);
		return () =>
			listeners.remove(
				listeners.findIndex((value) => value === listener),
			);
	}

	public getProfile(player: Player): PlayerProfile {
		const profile = this.profiles.get(player.UserId);
		if (!profile) error(`could not fetch profile for ${player.Name}`);
		return profile;
	}

	private setupProfile(player: Player): void {
		const key = PROFILE_KEY_TEMPLATE.format(player.UserId);

		if (WIPE_DATA_ON_JOIN) this.profileStore.WipeProfileAsync(key);

		const profile = this.profileStore.LoadProfileAsync(key);
		if (!profile) {
			player.Kick("data loading issue");
			return;
		}

		profile.AddUserId(player.UserId);
		profile.Reconcile();

		const onRelease = profile.ListenToRelease(() => {
			this.profiles.delete(player.UserId);
			this.preReleaseListeners.delete(player);
			player.Kick("get released");
			onRelease.Disconnect();
		});

		store.loadPlayerData(player, profile.Data);
		this.profiles.set(player.UserId, profile);
		this.preReleaseListeners.set(player, []);

		player.AddTag("DataLoaded");

		this.giveLeaderStatsFolder(player);

		this.joinTicks.set(player, math.round(tick()));

		const unsubscribe = store.subscribe(selectPlayer(player), (state) => {
			if (state) profile.Data = state;
		});

		onThisPlayerRemoving(player, unsubscribe);
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
			store.subscribe(selectPlayerCurrencies(player), (data) => {
				silver.Value = data?.Silver.amount ?? 0;
				valu.Value = data?.Valu.amount ?? 0;
				insight.Value = data?.Insight.amount ?? 0;
			}),
		);
	}
}
