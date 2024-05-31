type StatGui = ScreenGui & {
	Health: LocalScript;
	Container: Frame & {
		Health: Frame & {
			Overlay: ImageLabel;
			Temperature: ImageLabel & {
				Gradient: ImageLabel & {
					TemperatureSlider: Frame;
				};
			};
			Survival: ImageLabel & {
				Back: Frame & {
					StomachSlider: Frame & {
						Divider: Frame;
					};
					ToxicitySlider: Frame & {
						Divider: Frame;
					};
				};
			};
			Counters: ImageLabel & {
				LifeDayControl: LocalScript;
				DayTens: Frame & {
					Digit: TextLabel;
				};
				DayHundreds: Frame & {
					Digit: TextLabel;
				};
				DayOnes: Frame & {
					Digit: TextLabel;
				};
				Lives: Frame & {
					Digit: TextLabel;
				};
				Back: Frame;
			};
			HealthSlider: Frame & {
				Divider: Frame;
			};
		};
		CharacterName: TextLabel & {
			LocalScript: LocalScript;
			Shadow: TextLabel;
		};
	};
}
