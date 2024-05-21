import { Service, OnInit, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import Log, { Logger } from "@rbxts/log";

@Service()
export class IdentityService implements OnInit, OnStart {
	private playerDescriptions: { [playerId: number]: HumanoidDescription } = {};
	private defaultDescription = new Instance("HumanoidDescription");

	public constructor(private readonly logger: Logger) {}

	onInit() {
		this.defaultDescription.HatAccessory = "48474313";

		const BLACK = Color3.fromRGB(17, 17, 17);
		this.defaultDescription.HeadColor = Color3.fromRGB(205, 205, 205);
		this.defaultDescription.LeftArmColor = BLACK;
		this.defaultDescription.LeftLegColor = BLACK;
		this.defaultDescription.RightArmColor = BLACK;
		this.defaultDescription.RightLegColor = BLACK;
		this.defaultDescription.TorsoColor = BLACK;

		this.defaultDescription.Shirt = 6168685211;
	}

	onStart() {
		for (const player of Players.GetPlayers()) {
			this.onPlayerAdded(player);
		}
		Players.PlayerAdded.Connect((player) => this.onPlayerAdded(player));
		print("hello");
		this.logger.Info("hello");
	}

	getPlayerDescription(playerId: number): HumanoidDescription {
		const [success, playerDescription] = pcall((userId: number) => {
			return Players.GetHumanoidDescriptionFromUserId(userId);
		}, playerId);

		return success ? playerDescription : this.defaultDescription;
	}

	cleanPlayerDescription(description: HumanoidDescription) {
		description.Shirt = 0;
		description.Pants = 0;
		description.GraphicTShirt = 0;
		description.Face = 0;
		description.Head = 0;
		description.LeftArm = 0;
		description.LeftLeg = 0;
		description.RightArm = 0;
		description.RightLeg = 0;
		description.Torso = 0;

		description.BackAccessory = "";
		description.FrontAccessory = "";
		description.HatAccessory = "";
		description.NeckAccessory = "";
		description.ShouldersAccessory = "";
		description.WaistAccessory = "";
		description.FaceAccessory = "";
	}

	cleanCharacterFace(character: Model) {
		const head = character.FindFirstChild("Head");
		if (!head) {
			return;
		}
		const face = head.FindFirstChild("face");
		if (face) {
			face.Destroy();
		}
		Log.Debug("cleaned {@Character}", character);
		this.logger.Debug("Cleaned {@Character}'s face", character);
	}

	onPlayerAdded(player: Player) {
		this.playerDescriptions[player.UserId] = this.getPlayerDescription(player.UserId);
		player.LoadCharacter();
		player.CharacterAppearanceLoaded.Wait();
		const character = player.Character;
		if (character) this.cleanCharacterFace(character);
	}
}
