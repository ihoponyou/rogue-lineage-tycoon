import { Controller } from "@flamework/core";
import { TweenService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { ManaController } from "./mana-controller";
import { OnLocalCharacterAdded } from "../../../../../types/lifecycles";

const WHITE_STOMACH_RACES = [
    "Gaian",
    "Cameo",
    "Dullahan",
    "Metascroom",
    "Lich",
    "Seraph",
    "Florian",
]

const MANA_TWEEN_INFO = new TweenInfo(0.1, Enum.EasingStyle.Sine, Enum.EasingDirection.Out);
const ROLLER_TWEEN_INFO = new TweenInfo(0.15);

const MAX_STOMACH = 100;
const MAX_TOXICITY = 100;
const MAX_TEMPERATURE = 100;

@Controller()
export class HudController implements OnLocalCharacterAdded {
    private characterTrove = new Trove();

    private manaGui?: ScreenGui;
    private manaSlider?: Frame;
    private manaTrove = this.characterTrove.extend();
    private manaTweenTimeStep = 0;

    private healthSlider?: Frame;
    private stomachSlider?: Frame;
    private toxicitySlider?: Frame;
    private temperatureSlider?: Frame;

    constructor(private manaController: ManaController) {}

    onLocalCharacterAdded(character: Model): void {
        
    }

    onManaColorChanged(color: Color3): void {
        if (this.manaSlider) this.manaSlider.BackgroundColor3 = color;
    }

    toggleManaBar(bool: boolean): void {
        if (!this.manaGui) error("missing mana gui");

        this.manaGui.Enabled = bool;
        if (bool) {
            this.manaTrove = this.characterTrove.extend();
            this.manaTrove.bindToRenderStep(
                "update_mana",
                Enum.RenderPriority.Last.Value,
                (deltaTime) => this.updateMana(deltaTime)
            )
        } else {
            this.manaTrove.clean();
        }
    }

    updateMana(deltaTime: number): void {
        if (!this.manaSlider) return;

        this.manaTweenTimeStep += deltaTime;
        if (this.manaTweenTimeStep <= 0.1) return;
        
        TweenService.Create(
            this.manaSlider,
            MANA_TWEEN_INFO,
            {
                Size: UDim2.fromScale(1, this.manaController.mana),
            }
        ).Play();

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
            true
        )
    }

    updateStomach(stomach: number): void {
        if (!this.stomachSlider) return;

        const percentStomach = math.clamp(stomach / MAX_STOMACH, 0, 1);
        this.stomachSlider.TweenSize(
            new UDim2(percentStomach, 0, 0, 6),
            Enum.EasingDirection.Out,
            Enum.EasingStyle.Quad,
            0.25,
            true
        )
    }

    updateToxicity(toxicity: number): void {
        if (!this.toxicitySlider) return;

        const percentToxicity = math.clamp(toxicity / MAX_TOXICITY, 0, 1);
        this.toxicitySlider.TweenSize(
            new UDim2(percentToxicity, 0, 0, 6),
            Enum.EasingDirection.Out,
            Enum.EasingStyle.Quad,
            0.25,
            true
        )
    }

    updateTemperature(temperature: number): void {
        if (!this.temperatureSlider) return;

        const percentTemperature = math.clamp(temperature / MAX_TEMPERATURE, 0, 1);
        this.temperatureSlider.TweenSize(
            UDim2.fromScale(percentTemperature, 0),
            Enum.EasingDirection.Out,
            Enum.EasingStyle.Quad,
            0.2,
            true
        )
    }

    private doRollerEffect(label: TextLabel, text: string) {
        const tween = TweenService.Create(
            label,
            ROLLER_TWEEN_INFO,
            {
                LineHeight: 3,
            }
        )
        tween.Completed.Once(() => {
            task.wait(0.1);
            label.Text = text;
            label.LineHeight = 0;
            TweenService.Create(
                label,
                ROLLER_TWEEN_INFO,
                {
                    LineHeight: 1
                }
            ).Play();
        })
        tween.Play();
    }

    updateDays(days: number) {
        // const
    }
}