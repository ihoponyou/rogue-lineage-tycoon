type ManaGui = ScreenGui & {
	LeftContainer: Frame & {
		ManaBar: Frame & {
			ManaSlider: Frame & {
				Divider: Frame;
			};
			Overlay: ImageLabel;
		};
	};
}
