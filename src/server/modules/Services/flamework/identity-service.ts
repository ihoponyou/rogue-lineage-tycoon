import { Service, OnInit, OnStart, Modding } from "@flamework/core";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Logger } from "@rbxts/log";
import { OnPlayerAdded } from "./setup-service";
import { Phenotype, Race, RaceGlossary, RaceInfo } from "server/modules/race-info";

export type Personality = "";
export type Sex = "Male" | "Female";

@Service()
export class IdentityService implements OnInit, OnPlayerAdded {
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

	onPlayerAdded(player: Player) {
		this.playerDescriptions[player.UserId] = this.getPlayerAvatarDescription(player.UserId);
		this.cleanPlayerDescription(this.playerDescriptions[player.UserId]);
		player.CharacterAdded.Connect((character) => this.onCharacterAdded(character));
		player.LoadCharacter();
	}

	onCharacterAdded(character: Model) {
		// if PRINT_EVENTS then print("CharacterAdded fired", character.Name) end
		// local player: Player = Players:GetPlayerFromCharacter(character)
		// if PRINT_LOADS then print(loadedMessage("Character", player)) end
		// IdentityService.RefreshPlayerAppearance(player)
		// local humanoid: Humanoid = character.Humanoid
		// local raceName = DataService.GetData(player, "Race")
		// if isEmptyString(raceName) then
		// 	raceName = IdentityService.RollRace(player)
		// 	DataService.SetData(player, "Race", raceName)
		// end
		// player:SetAttribute("Race", raceName)
		// local race = RACE_INFO.Glossary[raceName]
		// IdentityService.CleanFace(player)
		// if not race.HasCustomHead then
		// 	local personality = DataService.GetData(player, "Personality")
		// 	if isEmptyString(personality) then
		// 		personality = IdentityService.RollPersonality(raceName)
		// 		DataService.SetData(player, "Personality", personality)
		// 	end
		// 	IdentityService.SetFace(player, personality)
		// end
		// local phenotypeName = DataService.GetData(player, "Phenotype")
		// if isEmptyString(phenotypeName) then
		// 	phenotypeName = RACE_INFO.GetRandomPhenotype(raceName)
		// 	DataService.SetData(player, "Phenotype", phenotypeName)
		// end
		// local phenotype = race.Phenotypes[phenotypeName]
		// IdentityService.SetPhenotype(player, raceName, phenotypeName)
		// local gender = DataService.GetData(player, "Gender")
		// if isEmptyString(gender) then
		// 	gender = IdentityService.RollGender()
		// 	DataService.SetData(player, "Gender", gender)
		// end
		// IdentityService.SetGender(player, gender)
		// local firstName = DataService.GetData(player, "FirstName")
		// if isEmptyString(firstName) then
		// 	firstName = IdentityService.RollName(raceName, gender)
		// end
		// IdentityService.SetFirstName(player, firstName)
		// local armorName = DataService.GetData(player, "Armor")
		// if isEmptyString(armorName) then
		// 	if raceName == "Gaian" then
		// 		armorName = "GaianDefault"
		// 	elseif raceName == "Scroom" or race == "Metascroom" then
		// 		armorName = "ScroomDefault"
		// 	else
		// 		armorName = ARMOR_INFO.GetRandomStarter()
		// 	end
		// 	DataService.SetData(player, "Armor", armorName)
		// end
		// IdentityService.SetArmor(player, armorName)
		// local manaColor = DataService.GetData(player, "ManaColor") -- saved color data is always a dictionary
		// local color
		// if manaColor.R == 0 and manaColor.G == 0 and manaColor.B == 0 then
		// 	color = IdentityService.RollManaColor()
		// else
		// 	color = Color3.fromRGB(manaColor.R*255, manaColor.G*255, manaColor.B*255)
		// end
		// IdentityService.SetManaColor(player, color)
		// while not character:IsDescendantOf(workspace) do character.AncestryChanged:Wait() end
		// humanoid:ApplyDescription(IdentityService.PlayerAppearances[player.UserId])
		// player:SetAttribute("IdentityLoaded", true)
		// IdentityService.Client.IdentityLoaded:Fire(player)
	}

	getPlayerAvatarDescription(playerId: number): HumanoidDescription {
		const [success, playerDescription] = pcall((userId: number) => {
			return Players.GetHumanoidDescriptionFromUserId(userId);
		}, playerId);

		return success ? playerDescription : this.defaultDescription;
	}

	getSavedPlayerDescription(player: Player): HumanoidDescription {
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

	setEyeColor(character: Model, color: Color3) {
		const head = this.getHead(character);
		const face = head?.FindFirstChild("face") as Decal;
		if (face) face.Color3 = color;
		this.logger.Info("Set {Attribute} of {Character} ([old] -> {new})", "Eye Color", character, color);
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

	addCustomHead(character: Model, raceName: keyof RaceGlossary, phenotypeName: string) {
		const head = this.getHead(character);
		if (head) head.Size = new Vector3(0.8, 1.4, 0.8);
		const mesh = head?.FindFirstChild("Mesh");
		if (mesh) mesh.Destroy();

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

	addCustomAccessory(character: Model, raceName: keyof RaceGlossary) {
		const customAccessory = ReplicatedStorage.Appearance.CustomAccessories.FindFirstChild(raceName);

		const humanoid = character.FindFirstChildWhichIsA("Humanoid");
		if (!humanoid) error(`Failed to find Humanoid in ${character}`);

		humanoid.AddAccessory(customAccessory?.Clone() as Accessory);
	}

	setPhenotype(character: Model, raceName: keyof RaceGlossary, phenotypeName: string) {
		const race = RaceInfo.GLOSSARY[raceName];
		const phenotype = race.Phenotypes[phenotypeName];

		this.setCharacterSkinColor(character, phenotype.SkinColor);

		if (race.IsBald) {
			this.removeHair(character);
		} else {
			this.setHairColor(character, phenotype.HairColor);
		}

		if (race.HasCustomHead) {
			this.addCustomHead(character, raceName, phenotypeName);
		} else {
			this.setEyeColor(character, phenotype.EyeColor);
		}

		if (race.HasCustomAccessory) this.addCustomAccessory(character, raceName);
	}

	getRandomSex(): Sex {
		return math.random() > 0.5 ? "Male" : "Female";
	}

	getRandomManaColor(): Color3 {
		return Color3.fromRGB(math.random(0, 255), math.random(0, 255), math.random(0, 255));
	}

	getRandomNewRace(oldRace: keyof RaceGlossary): keyof RaceGlossary {
		let newRace = "";
		do {
			newRace = RaceInfo.getRandomRollable() as string;
		} while (newRace === oldRace);
		return newRace;
	}

	getRandomPersonality(raceName: keyof RaceGlossary): string {
		if (raceName === "Fischeran") {
			raceName = "Rigan";
		} else if (!ReplicatedStorage.Appearance.Faces.FindFirstChild(raceName)) {
			raceName = "Other";
		}

		let personality = "Default";
		if (ReplicatedStorage.Appearance.Faces.FindFirstChild(raceName)?.FindFirstChild("Emotions")) {
			const emotions = ReplicatedStorage.Appearance.Faces?.FindFirstChild(raceName)
				?.FindFirstChild("Emotions")
				?.GetChildren();
			if (!emotions) return personality;
			personality = emotions[math.random(emotions.size())].Name;
		}

		return personality;
	}
}
