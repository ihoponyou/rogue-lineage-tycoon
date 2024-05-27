import { OnStart, OnTick, Service } from "@flamework/core";
import {
	OnCharacterAdded,
	OnPlayerRemoving,
} from "../../../../../types/lifecycles";
import { DataService } from "./data-service";
import { Events } from "server/modules/networking";
import { Players } from "@rbxts/services";

const BASE_MANA_CHARGE_RATE = 100 / 3.5;
const BASE_MANA_DECAY_RATE = 100 / 2.5;

interface PlayerData {
	ChargingMana: boolean;
	Mana: number;
	ChargeRate: number;
	DecayRate: number;
}

@Service()
export class ManaService
	implements OnStart, OnTick, OnPlayerRemoving, OnCharacterAdded
{
	private events = Events.manaEvents;
	private sessionData = new Map<Player, PlayerData>();

	constructor(private dataService: DataService) {}

	onStart(): void {
		this.events.charge.connect((player: Player, bool: boolean) => {
			const data = this.sessionData.get(player);
			if (!data) return;
			data.ChargingMana = bool;
		});
	}

	onTick(dt: number): void {
		this.sessionData.forEach((value, key) => {
			print(value, key);
			value.ChargingMana
				? this.chargeMana(key, dt)
				: this.decayMana(key, dt);
		});
	}

	onCharacterAdded(character: StarterCharacter): void {
		const player = Players.GetPlayerFromCharacter(character) as Player;
		const data = this.dataService.getProfile(player).Data;
		data.ManaObtained = true;
		if (data.ManaObtained) this.onManaObtained(player);
	}

	onPlayerRemoving(player: Player): void {
		const data = this.sessionData.get(player);
		if (!data) return;
		this.sessionData.delete(player);
	}

	onManaObtained(player: Player): void {
		const race = this.dataService.getProfile(player).Data.RaceName;

		let boost = 0;
		if (race === "Azael") boost = 10;
		else if (race === "Rigan") boost = 15;

		this.sessionData.set(player, {
			ChargingMana: false,
			Mana: 0,
			ChargeRate: BASE_MANA_CHARGE_RATE + boost,
			DecayRate: BASE_MANA_DECAY_RATE,
		});

		this.events.manaObtained(player);
	}

	onManaDisabled(player: Player): void {
		this.sessionData.delete(player);

		this.events.manaDisabled(player);
	}

	toggleManaObtained(player: Player, bool: boolean): void {
		this.dataService.getProfile(player).Data.ManaObtained = bool;
		bool ? this.onManaObtained(player) : this.onManaDisabled(player);
	}

	hasObtainedMana(player: Player): boolean {
		return this.sessionData.has(player);
	}

	decayMana(player: Player, deltaTime: number): void {
		const data = this.sessionData.get(player);
		if (!data) return;

		const decayRate = data.DecayRate; // if climbing then half

		data.Mana -= math.min(data.Mana, decayRate * deltaTime);
		if (data.Mana === 0) {
			this.events.manaEmptied(player);
		}
	}

	chargeMana(player: Player, deltaTime: number): void {
		const data = this.sessionData.get(player);
		if (!data) return;

		data.Mana = math.clamp(data.Mana + data.ChargeRate * deltaTime, 0, 100);

		if (data.Mana === 100) {
			data.ChargingMana = false;
			this.events.manaFilled(player);
		}
	}
}
