import { Service, OnInit } from "@flamework/core";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Logger } from "@rbxts/log";
import { RACES, RaceGlossary, getRandomPhenotype, getRandomRollable } from "server/modules/race-info";
import { OnPlayerAdded } from "../../../../../types/lifecycles";
import { DataService } from "./data-service";
import { getRandomFirstName } from "server/modules/name-generator";
import { ARMORS, getRandomStarterArmor } from "server/modules/armor-info";
import Object from "@rbxts/object-utils";

export type Sex = "Male" | "Female";

@Service()
export class IdentityService implements OnInit, OnPlayerAdded {
	private playerDescriptions: { [playerId: number]: HumanoidDescription } = {};
	private defaultDescription = new Instance("HumanoidDescription");

	public constructor(
		private readonly logger: Logger,
		private dataService: DataService,
	) {}

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
	}

	onCharacterAdded(character: Model) {
		const player = Players.GetPlayerFromCharacter(character);
		if (!player) error(`Player not found for ${character.Name}`);

		this.playerDescriptions[player.UserId] = this.getPlayerAvatarDescription(player.UserId);
		this.cleanPlayerDescription(this.playerDescriptions[player.UserId]);

		const humanoid = character.FindFirstChildWhichIsA("Humanoid");
		if (!humanoid) error(`Humanoid not found in ${character.Name}`);

		const profile = this.dataService.getProfile(player);

		let raceName = profile.Data.RaceName;
		if (raceName === "") {
			raceName = getRandomRollable();
			profile.Data.RaceName = raceName;
		}
		const race = RACES[raceName];

		this.cleanCharacterFace(character);
		if (!race.HasCustomHead) {
			let personality = profile.Data.Personality;
			if (personality === "") {
				personality = this.getRandomPersonality(raceName);
				profile.Data.Personality = personality;
			}
			this.setFace(character, raceName, personality);
		}

		let phenotypeName = profile.Data.PhenotypeName;
		if (phenotypeName === "") {
			phenotypeName = getRandomPhenotype(raceName);
			profile.Data.PhenotypeName = phenotypeName;
		}
		this.setPhenotype(character, raceName, phenotypeName);

		let sex = profile.Data.Sex;
		if (sex === "") {
			sex = this.getRandomSex();
			profile.Data.Sex = sex;
		}
		this.setSex(player, sex);

		let firstName = profile.Data.FirstName;
		if (firstName === "") {
			firstName = getRandomFirstName(raceName, sex);
		}
		this.setFirstName(player, firstName);

		let armorName = profile.Data.ArmorName;
		if (armorName === "") {
			// not sure why this needs a type cast
			switch (armorName as string) {
				case "Gaian":
					armorName = "GaianDefault";
					break;
				case "Scroom":
				case "Metascroom":
					armorName = "ScroomDefault";
					break;
				default:
					armorName = getRandomStarterArmor();
			}
			profile.Data.ArmorName = armorName;
		}
		this.setArmor(character, armorName);

		let manaColor = profile.Data.ManaColor;
		if (manaColor.R === 0 && manaColor.G === 0 && manaColor.B === 0) manaColor = this.getRandomManaColor();
		else manaColor = { R: math.random(0, 255), G: math.random(0, 255), B: math.random(0, 255) };
		this.setManaColor(player, Color3.fromRGB(manaColor.R, manaColor.G, manaColor.B));

		while (!character.IsDescendantOf(Workspace)) character.AncestryChanged.Wait();
		humanoid.ApplyDescription(this.playerDescriptions[player.UserId]);
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
		const humanoid = character.FindFirstChildWhichIsA("Humanoid");
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

	setFace(character: Model, raceName: string, personality: string) {
		this.cleanCharacterFace(character);

		const race = RACES[raceName];
		if (raceName === "Fischeran") {
			raceName = "Rigan";
		} else if (!race.HasCustomFace) {
			raceName = "Other";
		}

		const FACES = ReplicatedStorage.Appearance.Faces;
		const faceFolder = FACES.FindFirstChild(raceName);
		if (!faceFolder) error(`Faces not found for ${raceName}`);

		let face = faceFolder.FindFirstChild("Default");
		if (!face) error(`Default face not found for ${raceName}`);
		const emotions = faceFolder.FindFirstChild("Emotions");
		if (emotions) {
			face = emotions.FindFirstChild(personality);
			if (!face) error(`${personality} face not found for ${raceName}`);
		}

		const clone = face.Clone();
		clone.Parent = this.getHead(character);
		clone.Name = "face";
	}

	addEyelashes(character: Model) {
		const head = character.FindFirstChild("Head") as BasePart;
		if (!head || head.Size !== new Vector3(2, 1, 1)) return;
		if (head.FindFirstChild("Lashes")) return;

		const lashes = ReplicatedStorage.Appearance.FacialExtras.Lashes.Clone();
		lashes.Parent = head;
	}

	setSex(player: Player, sex: Sex) {
		if (sex === "Female" && player.Character) this.addEyelashes(player.Character);
		this.logger.Info("Set {Attribute} of {Player} ([old] -> {new}", "Sex", player, sex);
	}

	setArmor(character: Model, armorName: string) {
		const profile = this.dataService.getProfile(Players.GetPlayerFromCharacter(character) as Player);
		const armor = ARMORS[armorName];
		let variation = armor.Variations[profile.Data.Sex];
		if (!variation) variation = armor.Variations.Male;

		const oldArmorName = profile.Data.ArmorName;
		if (oldArmorName !== "") {
			for (const instance of character.GetChildren()) {
				if (instance.IsA("Clothing")) instance.Destroy();
			}
			Object.entries(ARMORS[oldArmorName].StatChanges).forEach((entry) => {
				// TODO: subtract old armor's stats
			});
		}
		Object.entries(ARMORS[oldArmorName].StatChanges).forEach((entry) => {
			// TODO: add new armor's stats
		});

		variation.Shirt.Clone().Parent = character;
		variation.Pants.Clone().Parent = character;

		profile.Data.ArmorName = armorName;
	}

	setManaColor(player: Player, color: Color3) {
		// IdentityService.Client.ManaColorChanged:Fire(player, color)
	}

	setFirstName(player: Player, name: string) {
		if (player.Character) {
			const humanoid = player.Character.FindFirstChildWhichIsA("Humanoid");
			if (humanoid) humanoid.DisplayName = name;
		}

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
			const hairColor = RACES[raceName].Phenotypes[phenotypeName].HairColor;
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

	setPhenotype(character: Model, raceName: string, phenotypeName: string) {
		const race = RACES[raceName];
		const phenotype = race.Phenotypes[phenotypeName];

		this.setCharacterSkinColor(character, phenotype.SkinColor);
		this.setDescriptionSkinColor(
			this.playerDescriptions[(Players.GetPlayerFromCharacter(character) as Player).UserId],
			phenotype.SkinColor,
		);

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

	getRandomNewRace(oldRace: keyof RaceGlossary): string {
		let newRace = "";
		do {
			newRace = getRandomRollable() as string;
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
