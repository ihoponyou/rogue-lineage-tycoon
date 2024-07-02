import { Controller, Dependency, OnStart } from "@flamework/core";
import { Players, ReplicatedStorage, TweenService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { ManaController } from "./mana-controller";
import { OnLocalCharacterAdded } from "../../../types/lifecycles";
import { charAt } from "shared/charAt";
import { Events } from "client//networking";
import { Components } from "@flamework/components";
import { CharacterClient } from "../components/character-client";

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

const UI = ReplicatedStorage.Assets.UI;

interface Counter extends Frame {
	Digit: TextLabel;
}

@Controller()
export class HudController implements OnStart, OnLocalCharacterAdded {
	private playerGui = Players.LocalPlayer.WaitForChild(
		"PlayerGui",
	) as PlayerGui;
	private characterTrove = new Trove();

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

	onStart(): void {
		Events.character.firstNameChanged.connect((name) =>
			this.onFirstNameChanged(name),
		);
	}

	onLocalCharacterAdded(character: Model): void {
		this.characterTrove.attachToInstance(character);
		// this.manaTrove = this.characterTrove.extend();

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

		this.statGui.Enabled = true;

		const components = Dependency<Components>();
		components
			.waitForComponent<CharacterClient>(character)
			.andThen((value) => {
				this.characterTrove.add(
					value.onAttributeChanged("stomach", (newValue) =>
						this.updateStomach(newValue),
					),
				);
				this.characterTrove.add(
					value.onAttributeChanged("temperature", (newValue) =>
						this.updateTemperature(newValue),
					),
				);
				this.characterTrove.add(
					value.onAttributeChanged("toxicity", (newValue) =>
						this.updateToxicity(newValue),
					),
				);
			});
	}

	onFirstNameChanged(name: string): void {
		while (!this.nameLabel) task.wait();
		this.nameLabel.Text = name.upper(); // TODO: + house name
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
		this.temperatureSlider.TweenPosition(
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
