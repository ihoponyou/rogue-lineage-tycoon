import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { Players } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import {
	MAXIMUM_TEMPERATURE,
	MINIMUM_TEMPERATURE,
} from "server/configs/constants";
import { Events } from "server/network";
import { DataService } from "server/services/data-service";
import { store } from "server/store";
import {
	selectPlayer,
	selectPlayerConditions,
	selectPlayerHealth,
	selectPlayerInventory,
	selectPlayerSkills,
	selectPlayerTransform,
} from "server/store/selectors";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/configs/skills";
import {
	deserializeVector3,
	serializeVector3,
} from "shared/modules/serialized-vector3";
import { CharacterServer } from "./character-server";
import { PlayerServer } from "./player-server";

@Component({
	tag: CharacterServer.TAG,
	predicate: (instance) => {
		return Players.GetPlayerFromCharacter(instance) !== undefined;
	},
})
export class PlayerCharacter
	extends BaseComponent<{}, Model>
	implements OnStart, OnTick
{
	private player!: PlayerServer;
	private unsubscribeFromInventory!: Callback;
	private unsubscribeFromSkills!: Callback;

	private trove = new Trove();

	constructor(
		private components: Components,
		private character: CharacterServer,
		private dataService: DataService,
	) {
		super();
	}

	onStart(): void {
		this.player = this.components
			.waitForComponent<PlayerServer>(
				Players.GetPlayerFromCharacter(this.instance)!,
			)
			.expect();

		this.trove.add(
			this.dataService.connectToPreRelease(
				this.player.instance,
				(profile) => {
					const pivot = this.instance.GetPivot();
					const yRotation = pivot.ToEulerAnglesXYZ()[1];
					profile.Data.transform.position = serializeVector3(
						pivot.Position,
					);
					profile.Data.transform.yRotation = yRotation;
				},
			),
		);

		const character = promiseR6(this.instance).expect();
		this.trove.connect(
			character.HumanoidRootPart.AncestryChanged,
			(_, parent) => {
				if (parent !== undefined) return;
				this.components
					.waitForComponent<PlayerServer>(this.player.instance)
					.expect()
					.loadCharacter();
			},
		);

		const currentInventory = store.getState(
			selectPlayerInventory(this.player.instance),
		);
		this.updateInventoryFromState(currentInventory, false);
		this.unsubscribeFromInventory = store.subscribe(
			selectPlayerInventory(this.player.instance),
			(state, _prevState) => {
				this.updateInventoryFromState(state);
			},
		);

		const currentSkills = store.getState(
			selectPlayerSkills(this.player.instance),
		);
		this.updateSkillsFromState(currentSkills, undefined, false);
		this.unsubscribeFromSkills = store.subscribe(
			selectPlayerSkills(this.player.instance),
			(state, prevState) => this.updateSkillsFromState(state, prevState),
		);

		// TODO: this fires twice?
		Events.item.addToHotbar.connect((player, id, slot) => {
			store.addToHotbar(player, id, slot);
		});
		Events.item.removeFromHotbar.connect((player, id) => {
			store.removeFromHotbar(player, id);
		});

		this.character.onKilled(() => this.onKilled());
		this.character.onHealthChanged((newHealth) =>
			this._onHealthChanged(newHealth),
		);
	}

	onTick(dt: number): void {
		store.decayStomach(this.player.instance, dt);
		store.decayToxicity(this.player.instance, dt);
	}

	override destroy(): void {
		this.unsubscribeFromInventory();
		this.unsubscribeFromSkills();

		super.destroy();
	}

	private onKilled(): void {
		store.subtractLife(this.player.instance);

		Events.character.killed.fire(this.player.instance);

		task.delay(Players.RespawnTime, () => {
			this.player.loadCharacter().catch(warn);
		});
	}

	getPlayer(): PlayerServer {
		return this.player;
	}

	getCharacter(): CharacterServer {
		return this.character;
	}

	loadHealth(): void {
		let savedHealth = store.getState(
			selectPlayerHealth(this.player.instance),
		);
		if (savedHealth === undefined) error("health not found");
		if (savedHealth < 1) savedHealth = 100;
		this.character.getHumanoid().Health = savedHealth;
	}

	loadConditions(): void {
		const conditions = store.getState(
			selectPlayerConditions(this.player.instance),
		);
		if (conditions === undefined) error("conditions not found");
		for (const condition of conditions) {
			this.instance.AddTag(condition);
		}
	}

	loadTransform(): void {
		const savedTransform = store.getState(
			selectPlayerTransform(this.player.instance),
		);
		if (savedTransform === undefined) error("transform not found");
		this.instance.PivotTo(
			new CFrame(deserializeVector3(savedTransform.position)).mul(
				CFrame.fromOrientation(0, savedTransform.yRotation, 0),
			),
		);
	}

	adjustTemperature(amount: number) {
		const player = this.getPlayer().instance;
		const temperature = store.getState(selectPlayer(player))?.resources
			.temperature;
		if (temperature === undefined) error("no data");

		const newTemperature = math.clamp(
			temperature + amount,
			MINIMUM_TEMPERATURE,
			MAXIMUM_TEMPERATURE,
		);
		store.setTemperature(player, newTemperature);

		if (newTemperature === MINIMUM_TEMPERATURE)
			this.instance.AddTag("Frostbite");
		else if (newTemperature === MAXIMUM_TEMPERATURE)
			this.instance.AddTag("BurnScar");
	}

	private _onHealthChanged(health: number): void {
		store.setHealth(this.getPlayer().instance, health);
	}

	private updateInventoryFromState(
		items?: ReadonlyMap<ItemId, number>,
		autoHotbar = true,
	) {
		if (items === undefined) return;
		for (const [itemId, quantity] of items) {
			const existingItem = this.character.getItem(itemId);
			if (existingItem) {
				if (existingItem.attributes.quantity !== quantity) {
					existingItem.attributes.quantity = quantity;
				}
				continue;
			}

			this.character.giveItem(itemId, quantity);
			if (autoHotbar) {
				store.addToHotbar(this.player.instance, itemId);
			}
		}
	}

	private updateSkillsFromState(
		skills?: ReadonlySet<SkillId>,
		prevSkills?: ReadonlySet<SkillId>,
		autoHotbar = true,
	) {
		if (skills === undefined) return;
		for (const skillId of skills) {
			if (prevSkills && prevSkills.has(skillId)) continue;
			this.character.learnSkill(skillId);
			if (autoHotbar) {
				store.addToHotbar(this.player.instance, skillId);
			}
		}
	}
}
