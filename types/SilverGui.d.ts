type SilverGui = ScreenGui & {
	SilverLogo: ImageButton & {
		DropFrame: Frame & {
			DropButton: TextButton & {
				Border: ImageLabel;
			};
			Amount: TextBox & {
				Border: ImageLabel;
			};
		};
		Amount: TextLabel;
	};
}
