import { OnStart, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { promiseR6 } from "@rbxts/promise-character";
import { Players } from "@rbxts/services";
import { ARMORS, getRandomStarterArmor } from "server/configs/armors";
import { getRandomFirstName } from "server/configs/names";
import {
	RACES,
	RaceGlossary,
	getRandomPhenotype,
	getRandomRollable,
} from "server/configs/races";
import { store } from "server/store";
import { selectPlayerIdentity } from "server/store/selectors";
import { APPEARANCE } from "shared/constants";
import { OnCharacterAdded, OnPlayerAdded } from "shared/modules/lifecycles";
import { Sex } from "shared/store/slices/identity";

const ERROR_404_MESSAGE_TEMPLATE = "Could not find {Attribute} of/in {Object}";
const HAIR_TEXTURE = "rbxassetid://13655022252";

@Service()
export class IdentityService
	implements OnStart, OnPlayerAdded, OnCharacterAdded
{
	private playerDescriptions: { [playerId: number]: HumanoidDescription } =
		{};
	private defaultDescription = new Instance("HumanoidDescription");

	public constructor(private readonly logger: Logger) {}

	public onStart() {
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

	public onPlayerAdded(player: Player) {
		this.playerDescriptions[player.UserId] = this.cleanPlayerDescription(
			this.getPlayerAvatarDescription(player.UserId),
		);
	}

	public async onCharacterAdded(model: Model) {
		const character = await promiseR6(model);
		const player = Players.GetPlayerFromCharacter(character);
		if (!player) error(`Player not found for ${character.Name}`);

		const description = this.cleanPlayerDescription(
			this.getPlayerAvatarDescription(player.UserId),
		);
		this.playerDescriptions[player.UserId] = description;

		const data = store.getState(selectPlayerIdentity(player));
		if (!data) error("undefined identity data");

		let raceName = data.raceName;
		if (raceName === "") {
			raceName = getRandomRollable();
			store.setRace(player, raceName);
		}
		const race = RACES[raceName];

		if (!race.HasCustomHead) {
			let personality = data.personality;
			if (personality === "") {
				personality = this.getRandomPersonality(raceName);
				store.setPersonality(player, personality);
			}
			this.applyFace(character, raceName, personality);
		} else {
			this.cleanCharacterFace(character);
		}

		let phenotypeName = data.phenotypeName;
		if (phenotypeName === "") {
			phenotypeName = getRandomPhenotype(raceName);
			store.setPhenotype(player, phenotypeName);
		}
		this.applyPhenotype(character, raceName, phenotypeName);

		let sex = data.sex;
		if (sex === "") {
			sex = this.getRandomSex();
			store.setSex(player, sex);
		}
		this.applySex(character, sex);

		let firstName = data.firstName;
		if (firstName === "") {
			firstName = getRandomFirstName(raceName, sex);
			store.setFirstName(player, firstName);
		}
		this.applyFirstName(player, firstName);

		let armorName = data.armorName;
		if (armorName === "") {
			switch (raceName) {
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
			store.setArmor(player, armorName);
		}
		this.applyArmor(character, armorName);

		const serializedColor = data.manaColor;
		const isBlank =
			serializedColor.R === -1 &&
			serializedColor.G === -1 &&
			serializedColor.B === -1;
		if (isBlank) {
			store.setManaColor(player, this.getRandomManaColor());
		}

		character.Humanoid.ApplyDescription(description);
	}

	public getPlayerAvatarDescription(playerId: number): HumanoidDescription {
		const [success, playerDescription] = pcall((userId: number) => {
			return Players.GetHumanoidDescriptionFromUserId(userId);
		}, playerId);

		return success ? playerDescription : this.defaultDescription;
	}

	public getSavedPlayerDescription(player: Player): HumanoidDescription {
		return this.playerDescriptions[player.UserId];
	}

	public cleanPlayerDescription(
		description: HumanoidDescription,
	): HumanoidDescription {
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

		return description;
	}

	private async cleanCharacterFace(model: Model) {
		const character = await promiseR6(model);
		const face = character.Head.FindFirstChild("face");
		if (face) {
			face.Destroy();
		}
		// this.logger.Debug("Cleaned {@Character}'s face", character);
	}

	public setCharacterSkinColor(character: Model, color: Color3) {
		for (const part of character.GetChildren()) {
			if (!part.IsA("BasePart")) continue;
			part.Color = color;
		}
		character.SetAttribute("SkinColor", color);
	}

	public setDescriptionSkinColor(
		description: HumanoidDescription,
		color: Color3,
	) {
		description.HeadColor = color;
		description.LeftArmColor = color;
		description.LeftLegColor = color;
		description.RightArmColor = color;
		description.RightLegColor = color;
		description.TorsoColor = color;
	}

	private findHumanoidIn(model: Model): Humanoid {
		const humanoid = model.FindFirstChildOfClass("Humanoid");
		if (humanoid === undefined)
			error(`Failed to find Humanoid in ${model}`);
		return humanoid;
	}

	public removeHair(character: Model) {
		const humanoid = this.findHumanoidIn(character);
		humanoid.GetAccessories().forEach((accessory) => {
			if (accessory.AccessoryType !== Enum.AccessoryType.Hair) return;
			accessory.Destroy();
		});
	}

	public setHairColor(character: Model, color: Color3) {
		const humanoid = this.findHumanoidIn(character);
		humanoid.GetAccessories().forEach((accessory) => {
			if (accessory.AccessoryType !== Enum.AccessoryType.Hair) return;

			const handle = accessory.FindFirstChild("Handle");
			if (!handle) return;

			for (const child of handle.GetChildren()) {
				if (!child.IsA("SpecialMesh")) continue;
				child.TextureId = HAIR_TEXTURE;
				child.VertexColor = new Vector3(color.R, color.G, color.B);
			}
		});
	}

	public setEyeColor(model: Model, color: Color3) {
		const character = promiseR6(model).expect();
		const face = character.Head.FindFirstChild("face") as Decal;
		if (!face) error(`Face not find in character ${character}`);

		face.Color3 = color;
	}

	public applyFace(model: Model, raceName: string, personality: string) {
		const character = promiseR6(model).expect();
		this.cleanCharacterFace(model);

		const race = RACES[raceName];
		if (raceName === "Fischeran") {
			raceName = "Rigan";
		} else if (!race.HasCustomFace) {
			raceName = "Other";
		}

		const FACES = APPEARANCE.Faces;
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
		clone.Parent = character.Head;
		clone.Name = "face";
	}

	public addEyelashes(character: Model) {
		const head = character.FindFirstChild("Head") as BasePart;
		if (!head || head.Size !== new Vector3(2, 1, 1)) return;
		if (head.FindFirstChild("Lashes")) return;

		const lashes = APPEARANCE.FacialExtras.Lashes.Clone();
		lashes.Parent = head;
	}

	public applySex(character: Model, sex: Sex) {
		if (sex === "Female") {
			this.addEyelashes(character);
		} else {
			const head = character.FindFirstChild("Head") as BasePart;
			const lashes = head.FindFirstChild("Lashes");
			if (lashes) lashes.Destroy();
		}
	}

	public applyArmor(character: Model, armorName: string) {
		const player = Players.GetPlayerFromCharacter(character) as Player;
		const identity = store.getState(selectPlayerIdentity(player));
		if (identity === undefined) error("no data");

		const oldArmorName = identity.armorName;
		if (oldArmorName !== "") {
			for (const instance of character.GetChildren()) {
				if (instance.IsA("Clothing")) instance.Destroy();
			}
			// Object.entries(ARMORS[oldArmorName].StatChanges).forEach(
			// 	(entry) => {
			// 		// TODO: subtract old armor's stats
			// 	},
			// );
		}

		const armor = ARMORS[armorName];
		// Object.entries(armor.StatChanges).forEach((entry) => {
		// 	// TODO: add new armor's stats
		// });

		const variation =
			armor.Variations[identity.sex] ?? armor.Variations.Male;
		variation.Shirt.Clone().Parent = character;
		variation.Pants.Clone().Parent = character;
	}

	public applyFirstName(player: Player, name: string) {
		if (player.Character) {
			const humanoid =
				player.Character.FindFirstChildWhichIsA("Humanoid");
			if (humanoid) humanoid.DisplayName = name;
		}
	}

	public async addCustomHead(
		model: Model,
		raceName: keyof RaceGlossary,
		phenotypeName: string,
	) {
		const character = await promiseR6(model);
		character.Head.Size = new Vector3(0.8, 1.4, 0.8);
		const mesh = character.Head.FindFirstChild("Mesh");
		if (mesh) mesh.Destroy();

		let customHead = APPEARANCE.CustomHeads.FindFirstChild(raceName);
		if (!customHead) {
			this.logger.Error(
				ERROR_404_MESSAGE_TEMPLATE,
				"Custom Head",
				`${raceName} ${phenotypeName}`,
			);
			return;
		}

		if (raceName === "Scroom") {
			const hairColor =
				RACES[raceName].Phenotypes[phenotypeName].HairColor;
			if (phenotypeName !== "Glowscroom") {
				for (const instance of customHead.GetDescendants()) {
					if (instance.IsA("BasePart") && instance.Name === "Mush")
						instance.Color = hairColor;
				}
			} else {
				customHead =
					APPEARANCE.CustomHeads.FindFirstChild("Glowscroom");
			}
		}

		const humanoid = character.FindFirstChildWhichIsA("Humanoid");
		if (!humanoid) error(`Failed to find Humanoid in ${character}`);

		humanoid.AddAccessory(customHead?.Clone() as Accessory);
	}

	public addCustomAccessory(character: Model, raceName: keyof RaceGlossary) {
		const customAccessory =
			APPEARANCE.CustomAccessories.FindFirstChild(raceName);

		const humanoid = character.FindFirstChildWhichIsA("Humanoid");
		if (!humanoid) error(`Failed to find Humanoid in ${character}`);

		humanoid.AddAccessory(customAccessory?.Clone() as Accessory);
	}

	public applyPhenotype(
		character: Model,
		raceName: string,
		phenotypeName: string,
	) {
		const race = RACES[raceName];
		const phenotype = race.Phenotypes[phenotypeName];

		this.setCharacterSkinColor(character, phenotype.SkinColor);
		this.setDescriptionSkinColor(
			this.playerDescriptions[
				(Players.GetPlayerFromCharacter(character) as Player).UserId
			],
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

		if (race.HasCustomAccessory)
			this.addCustomAccessory(character, raceName);
	}

	public getRandomSex(): Sex {
		return math.random() > 0.5 ? "Male" : "Female";
	}

	public getRandomManaColor(): Color3 {
		return new Color3(math.random(), math.random(), math.random());
	}

	public getRandomNewRace(oldRace: keyof RaceGlossary): string {
		let newRace = "";
		do {
			newRace = getRandomRollable() as string;
		} while (newRace === oldRace);
		return newRace;
	}

	public getRandomPersonality(raceName: keyof RaceGlossary): string {
		if (raceName === "Fischeran") {
			raceName = "Rigan";
		} else if (!APPEARANCE.Faces.FindFirstChild(raceName)) {
			raceName = "Other";
		}

		let personality = "Default";
		if (
			APPEARANCE.Faces.FindFirstChild(raceName)?.FindFirstChild(
				"Emotions",
			)
		) {
			const emotions = APPEARANCE.Faces?.FindFirstChild(raceName)
				?.FindFirstChild("Emotions")
				?.GetChildren();
			if (!emotions) return personality;
			personality = emotions[math.random(0, emotions.size() - 1)].Name;
		}

		return personality;
	}
}
