import { Service, OnInit, OnStart, Modding } from "@flamework/core";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Logger } from "@rbxts/log";
import { OnPlayerAdded } from "./setup-service";
import { RaceInfo } from "server/modules/race-info";

export type Personality = "";
export type Sex = "Male" | "Female";

@Service()
export class IdentityService implements OnInit, OnStart, OnPlayerAdded {
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
		this.logger.Info("hello");
	}

	onPlayerAdded(player: Player) {
		this.logger.Debug("{Player} was added", player);
		this.playerDescriptions[player.UserId] = this.getPlayerAvatarDescription(player.UserId);
		player.CharacterAdded.Connect((character) => this.onCharacterAdded(character));
		player.LoadCharacter();
	}

	onCharacterAdded(character: Model) {
		this.cleanCharacterFace(character);
	}

	getPlayerAvatarDescription(playerId: number): HumanoidDescription {
		const [success, playerDescription] = pcall((userId: number) => {
			return Players.GetHumanoidDescriptionFromUserId(userId);
		}, playerId);

		return success ? playerDescription : this.defaultDescription;
	}

	getPlayerDescription(player: Player): HumanoidDescription {
		return this.playerDescriptions[player.UserId];
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

	private getHead(character: Model): Part | undefined {
		return character.FindFirstChild("Head") as Part;
	}

	cleanCharacterFace(character: Model) {
		const head = this.getHead(character);
		if (!head) {
			return;
		}
		const face = head.FindFirstChild("face");
		if (face) {
			face.Destroy();
		}
		this.logger.Debug("Cleaned {@Character}'s face", character);
	}

	setCharacterSkinColor(character: Model, color: Color3) {
		for (const part of character.GetChildren()) {
			if (!part.IsA("BasePart")) continue;
			part.Color = color;
		}
	}

	setDescriptionSkinColor(description: HumanoidDescription, color: Color3) {
		description.HeadColor = color;
		description.LeftArmColor = color;
		description.LeftLegColor = color;
		description.RightArmColor = color;
		description.RightLegColor = color;
		description.TorsoColor = color;
	}

	removeHair(character: Model) {
		const humanoid = character.FindFirstChildWhichIsA("Humanoid");
		if (!humanoid) error(`Failed to find Humanoid in ${character}`);

		for (const accessory of humanoid.GetAccessories()) {
			if (accessory.AccessoryType !== Enum.AccessoryType.Hair) continue;
			accessory.Destroy();
		}
	}

	setHairColor(character: Model, color: Color3) {
		const humanoid = character.FindFirstAncestorWhichIsA("Humanoid");
		if (!humanoid) error(`Failed to find Humanoid in ${character}`);

		for (const accessory of humanoid.GetAccessories()) {
			if (accessory.AccessoryType !== Enum.AccessoryType.Hair) continue;

			const handle = accessory.FindFirstChild("Handle");
			if (!handle) continue;

			for (const child of handle.GetChildren()) {
				if (!child.IsA("SpecialMesh")) continue;
				child.TextureId = "rbxassetid://13655022252";
				child.VertexColor = new Vector3(color.R, color.G, color.B);
			}
		}
	}

	// TODO: uses dataservice race and personality and gets appropriate face
	setFace(player: Player, personality: Personality) {}

	addEyelashes(character: Model) {
		const head = character.FindFirstChild("Head") as BasePart;
		if (!head || head.Size !== new Vector3(2, 1, 1)) return;
		if (head.FindFirstChild("Lashes")) return;

		const lashes = ReplicatedStorage.Appearance.FacialExtras.Lashes.Clone();
		lashes.Parent = head;
	}

	// TODO: save sex using dataservice
	setSex(player: Player, sex: Sex) {
		if (sex === "Female" && player.Character) this.addEyelashes(player.Character);
		this.logger.Info("Set {Attribute} of {Player} ([old] -> {new}", "Sex", player, sex);
	}

	// TODO
	setArmor(player: Player, armorName: string) {
		// local character = player.Character
		// local gender = DataService.GetData(player, "Gender")
		// if not gender then error(string.format("Gender not set.")) end
		// local armor = ARMOR_INFO.Glossary[armorName]
		// if not armor then error(err404("Armor", armorName, player)) end
		// local variation = ARMOR_INFO.Glossary[armorName].Variations[gender]
		// if not variation then variation = armor.Variations.Male end
		// local oldArmorName = DataService.GetData(player, "Armor")
		// if not isEmptyString(oldArmorName) then
		// 	for _,child in character:GetChildren() do
		// 		if child:IsA("Clothing") then
		// 			child:Destroy()
		// 		end
		// 	end
		// 	for stat, value in ARMOR_INFO.Glossary[oldArmorName].StatChanges do
		// 		DataService.AddStatChange(player, stat, -value)
		// 	end
		// end
		// for stat, value in armor.StatChanges do
		// 	DataService.AddStatChange(player, stat, value)
		// end
		// variation.Shirt:Clone().Parent = character
		// variation.Pants:Clone().Parent = character
		// player:SetAttribute("Armor", armorName)
		// DataService.SetData(player, "Armor", armorName)
		// if PRINT_SETS then print(setMessage("Armor", armorName, player)) end
	}

	setManaColor(player: Player, color: Color3) {
		// DataService.SetData(player, "ManaColor", {R = color.R, G = color.G, B = color.B})
		// IdentityService.Client.ManaColorChanged:Fire(player, color)
	}

	setFirstName(player: Player, name: string) {
		if (player.Character) {
			const humanoid = player.Character.FindFirstChildWhichIsA("Humanoid");
			if (humanoid) humanoid.DisplayName = name;
		}
		// 	DataService.SetData(player, "FirstName", name)

		// IdentityService.Client.FirstNameChanged:Fire(player, name)
	}

	setCustomHead(character: Model, raceName: string, phenotypeName: string) {
		const head = this.getHead(character);
		const mesh = head?.FindFirstChild("Mesh");
		if (mesh) mesh.Destroy();

		if (head) head.Size = new Vector3(0.8, 1.4, 0.8);

		let customHead = ReplicatedStorage.Appearance.CustomHeads.FindFirstChild(raceName);
		if (!customHead) {
			this.logger.Error("Could not find custom head for {Race} {Phenotype}", raceName, phenotypeName);
			return;
		}

		if (raceName === "Scroom") {
			const hairColor = RaceInfo.GLOSSARY[raceName].Phenotypes[phenotypeName].HairColor;
			if (phenotypeName !== "Glowscroom") {
				for (const instance of customHead.GetDescendants()) {
					if (instance.IsA("BasePart") && instance.Name === "Mush") instance.Color = hairColor;
				}
			} else {
				customHead = ReplicatedStorage.Appearance.CustomHeads.FindFirstChild("Glowscroom");
			}
		}

		const humanoid = character.FindFirstChildWhichIsA("Humanoid");
		if (!humanoid) error(`Failed to find Humanoid in ${character}`);

		humanoid.AddAccessory(customHead?.Clone() as Accessory);
	}
}
