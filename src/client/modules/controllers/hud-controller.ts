import { Controller, OnStart } from "@flamework/core";
import { Players, ReplicatedStorage, TweenService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { ManaController } from "./mana-controller";
import {
	OnLocalCharacterAdded,
	OnLocalCharacterRemoving,
} from "../../../../types/lifecycles";
import { charAt } from "shared/modules/charAt";
import { Events } from "client/modules/networking";

const WHITE_STOMACH_RACES = [
	"Gaian",
	"Cameo",
	"Dullahan",
	"Metascroom",
	"Lich",
	"Seraph",
	"Florian",
];

const MANA_TWEEN_INFO = new TweenInfo(
	0.1,
	Enum.EasingStyle.Sine,
	Enum.EasingDirection.Out,
);
const ROLLER_TWEEN_INFO = new TweenInfo(0.15);

const MAX_STOMACH = 100;
const MAX_TOXICITY = 100;
const MAX_TEMPERATURE = 100;

const UI = ReplicatedStorage.UI;

interface Counter extends Frame {
	Digit: TextLabel;
}

@Controller()
export class HudController
	implements OnStart, OnLocalCharacterAdded, OnLocalCharacterRemoving
{
	private playerGui = Players.LocalPlayer.WaitForChild(
		"PlayerGui",
	) as PlayerGui;
	private characterTrove = new Trove();
	private manaTrove = this.characterTrove.extend();

	private manaGui?: ManaGui;
	private manaSlider?: ManaSlider;
	private manaTweenTimeStep = 0;

	private statGui?: StatGui;
	private healthSlider?: HealthSlider;
	private stomachSlider?: StomachSlider;
	private toxicitySlider?: ToxicitySlider;
	private temperatureSlider?: TemperatureSlider;

	private dayOnes?: Counter;
	private dayTens?: Counter;
	private dayHundreds?: Counter;
	private lives?: Counter;

	private nameLabel?: TextLabel;

	private silverGui?: SilverGui;

	constructor(private manaController: ManaController) {}

	onStart(): void {
		Events.manaEvents.manaObtained.connect(() => this.toggleManaBar(true));
		Events.manaEvents.manaDisabled.connect(() => this.toggleManaBar(false));
		Events.manaEvents.manaColorChanged.connect((color) =>
			this.onManaColorChanged(color),
		);
		Events.characterEvents.firstNameChanged.connect((name) =>
			this.onFirstNameChanged(name),
		);
	}

	onLocalCharacterAdded(character: Model): void {
		this.characterTrove.clean();
		this.manaTrove = this.characterTrove.extend();

		this.manaGui = this.characterTrove.clone(
			UI.ManaGui,
		) as unknown as ManaGui;
		this.manaGui.Parent = this.playerGui;
		this.manaSlider = this.manaGui.LeftContainer.ManaBar.ManaSlider;

		this.statGui = this.characterTrove.clone(
			UI.StatGui,
		) as unknown as StatGui;
		this.statGui.Parent = this.playerGui;

		const healthFrame = this.statGui.Container.Health;
		this.healthSlider = healthFrame.HealthSlider;
		this.stomachSlider = healthFrame.Survival.Back.StomachSlider;
		this.toxicitySlider = healthFrame.Survival.Back.ToxicitySlider;
		this.temperatureSlider =
			healthFrame.Temperature.Gradient.TemperatureSlider;

		const counters = healthFrame.Counters;
		this.dayOnes = counters.DayOnes;
		this.dayTens = counters.DayTens;
		this.dayHundreds = counters.DayHundreds;
		this.lives = counters.Lives;

		this.nameLabel = this.statGui.Container.CharacterName;

		this.silverGui = this.characterTrove.clone(UI.Currency.SilverGui);
		this.silverGui.Parent = this.playerGui;

		this.manaGui.Enabled = true;
		this.silverGui.Enabled = true;
		this.statGui.Enabled = true;
	}

	onLocalCharacterRemoving(character: Model): void {
		this.characterTrove.clean();
	}

	onManaColorChanged(color: Color3): void {
		while (!this.manaSlider) task.wait();
		this.manaSlider.BackgroundColor3 = color;
	}

	onFirstNameChanged(name: string): void {
		while (!this.nameLabel) task.wait();
		this.nameLabel.Text = name.upper(); // TODO: + house name
	}

	toggleManaBar(bool: boolean): void {
		while (!this.manaGui) task.wait();

		this.manaGui.Enabled = bool;
		if (bool) {
			this.manaTrove = this.characterTrove.extend();
			this.manaTrove.bindToRenderStep(
				"update_mana",
				Enum.RenderPriority.Last.Value,
				(deltaTime) => this.updateMana(deltaTime),
			);
		} else {
			this.manaTrove.clean();
		}
	}

	updateMana(deltaTime: number): void {
		if (!this.manaSlider) return;

		this.manaTweenTimeStep += deltaTime;
		if (this.manaTweenTimeStep <= 0.1) return;

		TweenService.Create(this.manaSlider, MANA_TWEEN_INFO, {
			Size: UDim2.fromScale(1, this.manaController.mana / 100),
		}).Play();

		this.manaTweenTimeStep = 0;
	}

	updateHealth(health: number, maxHealth: number): void {
		if (!this.healthSlider) return;

		const percentHealth = math.clamp(health / maxHealth, 0, 1);
		this.healthSlider.TweenSize(
			UDim2.fromScale(percentHealth, 1),
			Enum.EasingDirection.Out,
			Enum.EasingStyle.Quad,
			0.25,
			true,
		);
	}

	updateStomach(stomach: number): void {
		if (!this.stomachSlider) return;

		const percentStomach = math.clamp(stomach / MAX_STOMACH, 0, 1);
		this.stomachSlider.TweenSize(
			new UDim2(percentStomach, 0, 0, 6),
			Enum.EasingDirection.Out,
			Enum.EasingStyle.Quad,
			0.25,
			true,
		);
	}

	updateToxicity(toxicity: number): void {
		if (!this.toxicitySlider) return;

		const percentToxicity = math.clamp(toxicity / MAX_TOXICITY, 0, 1);
		this.toxicitySlider.TweenSize(
			new UDim2(percentToxicity, 0, 0, 6),
			Enum.EasingDirection.Out,
			Enum.EasingStyle.Quad,
			0.25,
			true,
		);
	}

	updateTemperature(temperature: number): void {
		if (!this.temperatureSlider) return;

		const percentTemperature = math.clamp(
			temperature / MAX_TEMPERATURE,
			0,
			1,
		);
		this.temperatureSlider.TweenSize(
			UDim2.fromScale(percentTemperature, 0),
			Enum.EasingDirection.Out,
			Enum.EasingStyle.Quad,
			0.2,
			true,
		);
	}

	private doRollerEffect(label: TextLabel, text: string) {
		const tween = TweenService.Create(label, ROLLER_TWEEN_INFO, {
			LineHeight: 3,
		});
		tween.Completed.Once(() => {
			task.wait(0.1);
			label.Text = text;
			label.LineHeight = 0;
			TweenService.Create(label, ROLLER_TWEEN_INFO, {
				LineHeight: 1,
			}).Play();
		});
		tween.Play();
	}

	updateCounter(counter: Counter, text: string | number): void {
		if (counter.Digit.Text === text) return;

		this.doRollerEffect(counter.Digit, tostring(text));
	}

	updateDays(days: number) {
		if (this.dayOnes) this.updateCounter(this.dayOnes, charAt(days, 1));
		if (this.dayTens) this.updateCounter(this.dayTens, charAt(days, 2));
		if (this.dayHundreds)
			this.updateCounter(this.dayHundreds, charAt(days, 3));
	}

	updateLives(lives: number) {
		if (this.lives) this.updateCounter(this.lives, lives);
	}
}
