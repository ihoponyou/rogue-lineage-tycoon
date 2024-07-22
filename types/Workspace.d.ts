interface Workspace extends Model {
	Crypt: Model & {
		TheRestofCrypt: Model & {
			gravestone2: Model;
			gravestone4: Model;
			tombstone3: Model;
			gravestone1: Model;
		};
		CryptCave: Model & {
			GrassPatch: Part;
			["ducky statue"]: Model & {
				ducky: Model & {
					duckyleg1: Model;
					duckyleg2: Model;
					dukybody: Model & {
						duckybody: Model;
					};
					duckyhead: Model;
				};
			};
		};
	};
	TubeHerosTDMCompanion: Model & {
		["Left Leg"]: Part & {
			Mesh: SpecialMesh;
		};
		Humanoid: Humanoid;
		["Right Leg"]: Part & {
			Mesh: SpecialMesh;
		};
		Head: Part;
		Torso: Part & {
			["Left Shoulder"]: Motor6D;
			["Right Shoulder"]: Motor6D;
			Neck: Motor6D;
			["Left Hip"]: Motor6D;
			Mesh: SpecialMesh;
			["Right Hip"]: Motor6D;
		};
		Hammer: Part & {
			Mesh: SpecialMesh;
			Weld: Weld;
		};
		["Right Arm"]: Part;
		["Left Arm"]: Part & {
			Mesh: SpecialMesh;
		};
		Animate: Script;
		RegenerateHealth: Script;
		InteractiveScript: Script;
		NoHat: Hat;
	};
	DesertStatue: Model & {
		["Left Leg"]: Part;
		Union: UnionOperation;
		["Right Leg"]: Part;
		["Left Arm"]: Part;
		Torso: Part;
		Sword: MeshPart;
		["Right Arm"]: Part;
	};
	SentinelColumn: Model;
	["Forest Gate"]: Model & {
		tree_bent: Model & {
			["1"]: Part;
			trunk: Part;
			b1: Part;
			b2: Part;
			["1.1"]: Part;
		};
		tree_normal: Model;
		["Wow! This gate is so cool!"]: Model & {
			["Left Leg"]: Part & {
				LeftFootAttachment: Attachment;
			};
			Humanoid: Humanoid & {
				Animator: Animator;
				HumanoidDescription: HumanoidDescription;
			};
			["Right Leg"]: Part & {
				RightFootAttachment: Attachment;
			};
			Head: Part & {
				HatAttachment: Attachment;
				["killer fish"]: Decal;
				FaceFrontAttachment: Attachment;
				HairAttachment: Attachment;
				Mesh: SpecialMesh;
				FaceCenterAttachment: Attachment;
			};
			Torso: Part & {
				RightCollarAttachment: Attachment;
				WaistCenterAttachment: Attachment;
				BodyBackAttachment: Attachment;
				Neck: Motor6D;
				LeftCollarAttachment: Attachment;
				["Left Hip"]: Motor6D;
				roblox: Decal;
				["Right Hip"]: Motor6D;
				["Left Shoulder"]: Motor6D;
				["Right Shoulder"]: Motor6D;
				BodyFrontAttachment: Attachment;
				WaistBackAttachment: Attachment;
				WaistFrontAttachment: Attachment;
				NeckAttachment: Attachment;
			};
			HumanoidRootPart: Part & {
				RootJoint: Motor6D;
				RootAttachment: Attachment;
			};
			["Meshes/hypnoticglassesAccessory"]: Accessory & {
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
				Handle3: Part & {
					FaceFrontAttachment: Attachment;
					AccessoryWeld: Weld;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
			};
			["Body Colors"]: BodyColors;
			Animate: LocalScript & {
				idle: StringValue & {
					Animation2: Animation & {
						Weight: NumberValue;
					};
					Animation1: Animation & {
						Weight: NumberValue;
					};
				};
				jump: StringValue & {
					JumpAnim: Animation;
				};
				sit: StringValue & {
					SitAnim: Animation;
				};
				run: StringValue & {
					RunAnim: Animation;
				};
				toolnone: StringValue & {
					ToolNoneAnim: Animation;
				};
				ScaleDampeningPercent: NumberValue;
				PlayEmote: BindableFunction;
				fall: StringValue & {
					FallAnim: Animation;
				};
				climb: StringValue & {
					ClimbAnim: Animation;
				};
				walk: StringValue & {
					WalkAnim: Animation;
				};
			};
			["Right Arm"]: Part & {
				RightShoulderAttachment: Attachment;
				RightGripAttachment: Attachment;
			};
			["Left Arm"]: Part & {
				LeftGripAttachment: Attachment;
				LeftShoulderAttachment: Attachment;
			};
			Pants: Pants;
			["Yellow Team Hat"]: Accessory & {
				Handle1: Part & {
					AccessoryWeld: Weld;
					HatAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
			Shirt: Shirt;
			["Blonde Messy Curly Middle Part"]: Accessory & {
				Handle2: Part & {
					HairAttachment: Attachment;
					AccessoryWeld: Weld;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
		};
	};
	Folder: Folder & {
		floor: Model & {
			floor: Part;
		};
	};
	ToolboxTemporaryInsertModel: Model;
	["the map i guess lol"]: Folder & {
		Crypt: Model & {
			TheRestofCrypt: Model & {
				gravestone2: Model;
				gravestone4: Model;
				tombstone3: Model;
				gravestone1: Model;
			};
			CryptCave: Model & {
				["ducky statue"]: Model & {
					ducky: Model & {
						duckyleg1: Model;
						duckyleg2: Model;
						dukybody: Model & {
							duckybody: Model;
						};
						duckyhead: Model;
					};
				};
			};
		};
		tree_normal: Model;
		tree_bent: Model & {
			["1"]: Part;
			trunk: Part;
			b1: Part;
			b2: Part;
			["1.1"]: Part;
		};
		["cool guy"]: Model & {
			["Left Leg"]: Part & {
				LeftFootAttachment: Attachment;
			};
			Humanoid: Humanoid & {
				Animator: Animator;
				HumanoidDescription: HumanoidDescription;
			};
			["Right Leg"]: Part & {
				RightFootAttachment: Attachment;
			};
			Head: Part & {
				HatAttachment: Attachment;
				HairAttachment: Attachment;
				FaceFrontAttachment: Attachment;
				face: Decal;
				Mesh: SpecialMesh;
				FaceCenterAttachment: Attachment;
			};
			MessyHairBlue: Accessory & {
				Handle2: Part & {
					HairAttachment: Attachment;
					Mesh: SpecialMesh;
					AccessoryWeld: Weld;
				};
			};
			Torso: Part & {
				RightCollarAttachment: Attachment;
				WaistCenterAttachment: Attachment;
				BodyBackAttachment: Attachment;
				Neck: Motor6D;
				LeftCollarAttachment: Attachment;
				["Left Hip"]: Motor6D;
				roblox: Decal;
				["Right Hip"]: Motor6D;
				["Left Shoulder"]: Motor6D;
				["Right Shoulder"]: Motor6D;
				BodyFrontAttachment: Attachment;
				WaistBackAttachment: Attachment;
				WaistFrontAttachment: Attachment;
				NeckAttachment: Attachment;
			};
			HumanoidRootPart: Part & {
				RootJoint: Motor6D;
				RootAttachment: Attachment;
			};
			["Body Colors"]: BodyColors;
			Hair2: Accessory & {
				Handle1: Part & {
					HairAttachment: Attachment;
					AccessoryWeld: Weld;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
			BoyAnimeHair_Blue: Accessory & {
				Handle3: Part & {
					HairAttachment: Attachment;
					Mesh: SpecialMesh;
					AccessoryWeld: Weld;
				};
			};
			["Right Arm"]: Part & {
				RightShoulderAttachment: Attachment;
				RightGripAttachment: Attachment;
			};
			["Left Arm"]: Part & {
				LeftGripAttachment: Attachment;
				LeftShoulderAttachment: Attachment;
			};
			Pants: Pants;
			MeshPartAccessory: Accessory & {
				Handle4: Part & {
					AccessoryWeld: Weld;
					FaceCenterAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
			Shirt: Shirt;
			Animate: LocalScript & {
				idle: StringValue & {
					Animation2: Animation & {
						Weight: NumberValue;
					};
					Animation1: Animation & {
						Weight: NumberValue;
					};
				};
				jump: StringValue & {
					JumpAnim: Animation;
				};
				sit: StringValue & {
					SitAnim: Animation;
				};
				run: StringValue & {
					RunAnim: Animation;
				};
				toolnone: StringValue & {
					ToolNoneAnim: Animation;
				};
				ScaleDampeningPercent: NumberValue;
				PlayEmote: BindableFunction;
				fall: StringValue & {
					FallAnim: Animation;
				};
				climb: StringValue & {
					ClimbAnim: Animation;
				};
				walk: StringValue & {
					WalkAnim: Animation;
				};
			};
		};
		["Wow! This gate is so cool!"]: Model & {
			["Left Leg"]: Part & {
				LeftFootAttachment: Attachment;
			};
			Humanoid: Humanoid & {
				Animator: Animator;
				HumanoidDescription: HumanoidDescription;
			};
			["Right Leg"]: Part & {
				RightFootAttachment: Attachment;
			};
			Head: Part & {
				HatAttachment: Attachment;
				HairAttachment: Attachment;
				FaceFrontAttachment: Attachment;
				face: Decal;
				Mesh: SpecialMesh;
				FaceCenterAttachment: Attachment;
			};
			Torso: Part & {
				RightCollarAttachment: Attachment;
				WaistCenterAttachment: Attachment;
				BodyBackAttachment: Attachment;
				Neck: Motor6D;
				LeftCollarAttachment: Attachment;
				["Left Hip"]: Motor6D;
				roblox: Decal;
				["Right Hip"]: Motor6D;
				["Left Shoulder"]: Motor6D;
				["Right Shoulder"]: Motor6D;
				BodyFrontAttachment: Attachment;
				WaistBackAttachment: Attachment;
				WaistFrontAttachment: Attachment;
				NeckAttachment: Attachment;
			};
			HumanoidRootPart: Part & {
				RootJoint: Motor6D;
				RootAttachment: Attachment;
			};
			["Meshes/hypnoticglassesAccessory"]: Accessory & {
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
				Handle3: Part & {
					FaceFrontAttachment: Attachment;
					AccessoryWeld: Weld;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
			};
			["Body Colors"]: BodyColors;
			Animate: LocalScript & {
				idle: StringValue & {
					Animation2: Animation & {
						Weight: NumberValue;
					};
					Animation1: Animation & {
						Weight: NumberValue;
					};
				};
				jump: StringValue & {
					JumpAnim: Animation;
				};
				sit: StringValue & {
					SitAnim: Animation;
				};
				run: StringValue & {
					RunAnim: Animation;
				};
				toolnone: StringValue & {
					ToolNoneAnim: Animation;
				};
				ScaleDampeningPercent: NumberValue;
				PlayEmote: BindableFunction;
				fall: StringValue & {
					FallAnim: Animation;
				};
				climb: StringValue & {
					ClimbAnim: Animation;
				};
				walk: StringValue & {
					WalkAnim: Animation;
				};
			};
			["Right Arm"]: Part & {
				RightShoulderAttachment: Attachment;
				RightGripAttachment: Attachment;
			};
			["Left Arm"]: Part & {
				LeftGripAttachment: Attachment;
				LeftShoulderAttachment: Attachment;
			};
			Pants: Pants;
			["Yellow Team Hat"]: Accessory & {
				Handle1: Part & {
					AccessoryWeld: Weld;
					HatAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
			Shirt: Shirt;
			["Blonde Messy Curly Middle Part"]: Accessory & {
				Handle2: Part & {
					HairAttachment: Attachment;
					AccessoryWeld: Weld;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
		};
	};
	LabSigma: Model & {
		tesla3: Model;
		tesla2: Model & {
			light: Part;
		};
		tesla4: Model & {
			light: Part;
		};
		righttesla: Model;
		tesla: Model & {
			light: Part;
		};
		["Lab Assistant"]: Model & {
			["Left Leg"]: Part;
			Humanoid: Humanoid & {
				Animator: Animator;
			};
			["Right Leg"]: Part;
			Head: Part & {
				HeadWeld: Weld;
				Friendly: Decal & {
					Default: Folder;
				};
				Weld: Weld;
				Mesh: SpecialMesh;
			};
			BlondeFauxhawk: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
				};
			};
			Torso: Part & {
				["Left Shoulder"]: Motor6D;
				["Right Shoulder"]: Motor6D;
				Neck: Motor6D;
				["Right Hip"]: Motor6D;
				["Left Hip"]: Motor6D;
			};
			HumanoidRootPart: Part & {
				["Root Hip"]: Motor6D;
				Approach: Sound;
			};
			["Right Arm"]: Part;
			["Left Arm"]: Part;
			ClickDetector: ClickDetector;
		};
		MetalArm: Model & {
			TorsoMetal: MeshPart;
			MetalArm: MeshPart;
		};
		Tubes: Model & {
			tube1: Model & {
				slop: Part & {
					slop2: Part & {
						ParticleEmitter: ParticleEmitter;
					};
				};
				Partc: Part;
			};
			tube2: Model & {
				slop: Part & {
					slop2: Part & {
						ParticleEmitter: ParticleEmitter;
					};
				};
				Partc: Part;
			};
			scroom: Model & {
				["Left Leg"]: Part;
				Humanoid: Humanoid;
				["Right Arm"]: Part;
				Head: Part & {
					Model: Model & {
						dot: Part;
					};
				};
				dot: Part;
				Torso: Part;
				["Right Leg"]: Part;
				["Left Arm"]: Part;
			};
			["deep knight"]: Model & {
				["Left Leg"]: Part & {
					Snap: Snap;
					LeftFootAttachment: Attachment;
				};
				Humanoid: Humanoid & {
					HumanoidDescription: HumanoidDescription;
				};
				["Right Leg"]: Part & {
					Snap: Snap;
					RightFootAttachment: Attachment;
				};
				Head: Part & {
					HatAttachment: Attachment;
					HairAttachment: Attachment;
					FaceFrontAttachment: Attachment;
					face: Decal;
					Mesh: SpecialMesh;
					FaceCenterAttachment: Attachment;
				};
				SanctumSpear: MeshPart & {
					Weld: Weld;
					Attachment2: Attachment;
					PropWeld: Weld;
					TestTrail: Trail;
					ChurchBeam: Beam;
					Attachmentz: Attachment;
					Attachment1: Attachment;
				};
				Torso: Part & {
					RightCollarAttachment: Attachment;
					WaistCenterAttachment: Attachment;
					BodyBackAttachment: Attachment;
					Neck: Motor6D;
					LeftCollarAttachment: Attachment;
					["Left Shoulder"]: Motor6D;
					["Left Hip"]: Motor6D;
					["Right Hip"]: Motor6D;
					["Right Shoulder"]: Motor6D;
					BodyFrontAttachment: Attachment;
					WaistBackAttachment: Attachment;
					WaistFrontAttachment: Attachment;
					NeckAttachment: Attachment;
				};
				HumanoidRootPart: Part & {
					RootJoint: Motor6D;
					RootAttachment: Attachment;
				};
				["Right Arm"]: Part & {
					RightShoulderAttachment: Attachment;
					RightGripAttachment: Attachment;
				};
				["Left Arm"]: Part & {
					LeftGripAttachment: Attachment;
					LeftShoulderAttachment: Attachment;
				};
				["Body Colors"]: BodyColors;
				Deepknight_Helmet: Accessory & {
					Handle: Part & {
						AccessoryWeld: Weld;
						HatAttachment: Attachment;
						OriginalSize: Vector3Value;
						Mesh: SpecialMesh;
					};
				};
			};
			tube3: Model & {
				slop: Part & {
					slop2: Part & {
						ParticleEmitter: ParticleEmitter;
					};
				};
				Partc: Part;
			};
			druid: Model & {
				["Left Leg"]: Part & {
					Snap: Snap;
					LeftFootAttachment: Attachment;
				};
				Humanoid: Humanoid & {
					HumanoidDescription: HumanoidDescription;
				};
				["Right Leg"]: Part & {
					Snap: Snap;
					RightFootAttachment: Attachment;
				};
				Head: Part & {
					HatAttachment: Attachment;
					HeadWeld: Weld;
					HairAttachment: Attachment;
					FaceFrontAttachment: Attachment;
					face: Decal;
					Mesh: SpecialMesh;
					FaceCenterAttachment: Attachment;
				};
				Torso: Part & {
					RightCollarAttachment: Attachment;
					WaistCenterAttachment: Attachment;
					BodyBackAttachment: Attachment;
					Neck: Motor6D;
					LeftCollarAttachment: Attachment;
					["Left Shoulder"]: Motor6D;
					["Left Hip"]: Motor6D;
					["Right Hip"]: Motor6D;
					["Right Shoulder"]: Motor6D;
					BodyFrontAttachment: Attachment;
					WaistBackAttachment: Attachment;
					WaistFrontAttachment: Attachment;
					NeckAttachment: Attachment;
				};
				HumanoidRootPart: Part & {
					RootJoint: Motor6D;
					RootAttachment: Attachment;
				};
				Sigil_Helmet: Accessory & {
					Handle: MeshPart & {
						OriginalSize: Vector3Value;
					};
				};
				["Right Arm"]: Part & {
					RightShoulderAttachment: Attachment;
					RightGripAttachment: Attachment;
				};
				["Left Arm"]: Part & {
					LeftGripAttachment: Attachment;
					LeftShoulderAttachment: Attachment;
				};
				["Body Colors"]: BodyColors;
			};
			shinobi: Model & {
				["Left Leg"]: Part & {
					Snap: Snap;
					LeftFootAttachment: Attachment;
				};
				Humanoid: Humanoid & {
					HumanoidDescription: HumanoidDescription;
				};
				["Right Leg"]: Part & {
					Snap: Snap;
					RightFootAttachment: Attachment;
				};
				Head: Part & {
					HatAttachment: Attachment;
					HairAttachment: Attachment;
					FaceFrontAttachment: Attachment;
					face: Decal;
					Mesh: SpecialMesh;
					FaceCenterAttachment: Attachment;
				};
				Torso: Part & {
					RightCollarAttachment: Attachment;
					WaistCenterAttachment: Attachment;
					BodyBackAttachment: Attachment;
					LeftCollarAttachment: Attachment;
					BodyFrontAttachment: Attachment;
					WaistBackAttachment: Attachment;
					WaistFrontAttachment: Attachment;
					NeckAttachment: Attachment;
				};
				HumanoidRootPart: Part & {
					RootAttachment: Attachment;
				};
				Orange_Cowl: Hat & {
					Handle: Part & {
						Mesh: SpecialMesh;
					};
					Mesh: SpecialMesh;
				};
				Sigil_Helmet: Accessory & {
					Handle: MeshPart & {
						OriginalSize: Vector3Value;
					};
				};
				["Right Arm"]: Part & {
					RightShoulderAttachment: Attachment;
					RightGripAttachment: Attachment;
				};
				["Left Arm"]: Part & {
					LeftGripAttachment: Attachment;
					LeftShoulderAttachment: Attachment;
				};
				pants: Pants;
				["Body Colors"]: BodyColors;
				shirt: Shirt;
			};
			tube4: Model & {
				slop: Part & {
					slop2: Part & {
						ParticleEmitter: ParticleEmitter;
					};
				};
				Partc: Part;
			};
		};
		lefttesla: Model;
	};
	eagle: Folder & {
		["ducky statue"]: Model & {
			pedastal: Model;
			ducky: Model & {
				duckyleg1: Model;
				duckyleg2: Model;
				dukybody: Model & {
					duckybody: Model;
				};
				duckyhead: Model;
			};
		};
	};
	Camera: Camera;
	Baseplate: Part & {
		OriginalSize: Vector3Value;
	};
	Helmets: Folder & {
		Deepknight_Helmet: Accessory;
		White_Cowl: Hat & {
			Mesh: SpecialMesh;
		};
		Tan_Cowl: Hat & {
			Mesh: SpecialMesh;
		};
		Church_Helmet: Accessory;
		Darksigil_Helmet: Accessory;
		Bucket_Helmet: Accessory;
		Dark_Cowl: Hat & {
			Mesh: SpecialMesh;
		};
		Sigil_Helmet: Accessory;
		Orange_Cowl: Hat & {
			Mesh: SpecialMesh;
		};
	};
	HouseOfPurgatory: Model & {
		ScroomHeadGreen: UnionOperation & {
			Weld: ManualWeld;
		};
		Ferryman: Model & {
			["Left Leg"]: Part;
			Humanoid: Humanoid & {
				Animator: Animator;
			};
			Script: Script & {
				Responses: ModuleScript;
			};
			Head: Part & {
				Mesh: SpecialMesh;
				HeadWeld: Weld;
				Unimpressed: Decal & {
					Default: Folder;
				};
			};
			Torso: Part & {
				["Left Shoulder"]: Motor6D;
				["Right Shoulder"]: Motor6D;
				Neck: Motor6D;
				["Left Hip"]: Motor6D;
				["Right Hip"]: Motor6D;
			};
			HumanoidRootPart: Part & {
				["Root Hip"]: Motor6D;
				Approach: Sound;
			};
			["Right Arm"]: Part;
			["Left Arm"]: Part;
			["Right Leg"]: Part;
			Hat1: Accessory & {
				Handle: Part & {
					HairAttachment: Attachment;
					Mesh: SpecialMesh;
					OriginalSize: Vector3Value;
				};
			};
		};
		Spawn: Part;
	};
	tree_big: Model & {
		b1: Part;
		b2: Part;
	};
	["Mega Velo"]: Part & {
		PointLight: PointLight;
	};
	WaterfallTest: Model & {
		Beam: Beam;
	};
	CryptTeleport: Part;
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	FallDamage: LocalScript & {
		RemoteEvent: RemoteEvent & {
			Script: Script;
		};
	};
	minicrypt: Model & {
		Union: UnionOperation;
		CryptKiller: Part;
		CrownFlower7: UnionOperation & {
			Ready: BoolValue;
		};
		CrownFlower6: UnionOperation & {
			Ready: BoolValue;
		};
		Base: Part;
		CrownFlower9: UnionOperation & {
			Ready: BoolValue;
		};
	};
	SentinelArch: Model;
	HangingBrazier: Model & {
		Brazier: Model & {
			Fire: Part & {
				PointLight: PointLight;
			};
		};
	};
	BeamTest: Model & {
		Beam: Beam;
	};
	Tycoons: Folder & {
		palettes: Folder & {
			desert: Folder;
		};
		DesertTycoon: Model & {
			Dorgen: Model & {
				["Left Leg"]: Part;
				Humanoid: Humanoid & {
					Animator: Animator;
				};
				["Right Leg"]: Part;
				Head: Part & {
					HeadWeld: Weld;
					Mesh: SpecialMesh;
					Weld: Weld;
					DragonSmug: Decal & {
						Kasparan: Folder;
					};
				};
				Stand: Model & {
					Wedge: WedgePart;
					Pickaxe: MeshPart;
				};
				Torso: Part & {
					Neck: Motor6D;
					["Left Hip"]: Motor6D;
					["Left Shoulder"]: Motor6D;
					["Right Hip"]: Motor6D;
				};
				HumanoidRootPart: Part & {
					["Root Hip"]: Motor6D;
					Approach: Sound;
				};
				["Right Arm"]: Part;
				["Left Arm"]: Part;
				MeshPartAccessory: Accessory & {
					Handle: Part & {
						OriginalSize: Vector3Value;
						HatAttachment: Attachment;
						SpecialMesh: SpecialMesh;
						AvatarPartScaleType: StringValue;
					};
				};
			};
			Terrain: Model;
			Pads: Folder & {
				SilverDropperPad: Model & {
					Collider: Part & {
						BillboardGui: BillboardGui & {
							TextLabel: TextLabel;
						};
					};
				};
				BreakRocksPad: Model & {
					Collider: Part & {
						BillboardGui: BillboardGui & {
							TextLabel: TextLabel;
						};
					};
				};
				ManaClimbPad: Model & {
					Collider: Part & {
						BillboardGui: BillboardGui & {
							TextLabel: TextLabel;
						};
					};
				};
				ManaDashPad: Model & {
					Collider: Part & {
						BillboardGui: BillboardGui & {
							TextLabel: TextLabel;
						};
					};
				};
				ManaPad: Model & {
					Collider: Part & {
						BillboardGui: BillboardGui & {
							TextLabel: TextLabel;
						};
					};
				};
				ManaRunPad: Model & {
					Collider: Part & {
						BillboardGui: BillboardGui & {
							TextLabel: TextLabel;
						};
					};
				};
				BagPad: Model & {
					Collider: Part & {
						BillboardGui: BillboardGui & {
							TextLabel: TextLabel;
						};
					};
				};
			};
			Assets: Folder & {
				DoorRocks: Model & {
					Pad: ObjectValue;
				};
				Merchant: Model & {
					["Left Leg"]: Part;
					Hat: Hat & {
						Handle: Part & {
							Mesh: SpecialMesh;
							TouchInterest: TouchTransmitter;
						};
					};
					["Right Leg"]: Part;
					Head: Part & {
						Mesh: SpecialMesh;
						Friendly: Decal;
						WeldConstraint: WeldConstraint;
					};
					Torso: Part & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						["Left Hip"]: Motor6D;
					};
					HumanoidRootPart: Part & {
						["Root Hip"]: Motor6D;
						Approach: Sound;
					};
					["Right Arm"]: Part;
					["Left Arm"]: Part;
					Pants: Pants;
					Shirt: Shirt;
				};
				ClimbBook: Model;
				Alchemist: Model & {
					Part: Part;
					Cauldron: Model & {
						Water: Part & {
							Mix: Sound;
							Bubbles: ParticleEmitter;
							Smoke: ParticleEmitter;
							Fail: ParticleEmitter;
							Drain: Sound;
							Boiling: Sound;
							Splash: Sound;
							Level: BlockMesh;
							FailSound: Sound;
						};
						Ladle: Part & {
							ClickDetector: ClickDetector;
						};
						Crucible: Model;
					};
				};
				Bag: Model & {
					ArdorianKillbrick: Part & {
						BLACK: ParticleEmitter;
					};
					Collider: Part & {
						Mesh: SpecialMesh;
					};
				};
				Walls: Model;
				DashBook: Model;
				Blacksmith: Model & {
					AnvilCraft: Model & {
						Hammer: UnionOperation & {
							Sound2: Sound;
							Tin: IntValue;
							Script: Script;
							Iron: IntValue;
							ClickDetector: ClickDetector;
							Copper: IntValue;
							Sound: Sound;
							Mythril: IntValue;
						};
						Anvil: UnionOperation;
					};
					["Blacksmith Station"]: Model & {
						Union: UnionOperation;
						Material: UnionOperation & {
							ContentsChange: Sound;
							Success: Sound;
							Failure: Sound;
						};
						Trash: UnionOperation;
					};
					blacksmith: Part;
				};
				TrinketDropper: Model & {
					Part: Part;
				};
				Chair: Model;
				ScrollDropper: Model & {
					Part: Part;
				};
				Polisher: Model;
				Conveyor: Model & {
					Pad: ObjectValue;
					Base: Part;
					Belt: Part;
				};
				HangingBrazier: Model & {
					Model: Model & {
						Fire: Part & {
							PointLight: PointLight;
						};
					};
				};
				Floor: Model & {
					Part: Part;
					Pad: ObjectValue;
				};
				WeaponRack: Model & {
					["Mythril Dagger"]: MeshPart;
					["Mythril Sword"]: MeshPart;
					["Steel Sword"]: MeshPart;
					["Bronze Sword"]: MeshPart;
					["Bronze Dagger"]: MeshPart;
					["Steel Dagger"]: MeshPart;
					["Mythril Spear"]: MeshPart;
					["Steel Spear"]: MeshPart;
					["Bronze Spear"]: MeshPart;
				};
				ManaBook: Model;
				DoorStand: Model & {
					Wedge: WedgePart;
					Pad: ObjectValue;
				};
				Book: Model;
				Appraiser: Model & {
					["Left Leg"]: Part;
					Hat: Hat & {
						Handle: Part & {
							Mesh: SpecialMesh;
							TouchInterest: TouchTransmitter;
						};
					};
					["Right Leg"]: Part;
					Head: Part & {
						Mesh: SpecialMesh;
						Friendly: Decal;
						WeldConstraint: WeldConstraint;
					};
					Torso: Part & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						["Left Hip"]: Motor6D;
					};
					HumanoidRootPart: Part & {
						["Root Hip"]: Motor6D;
						Approach: Sound;
					};
					["Right Arm"]: Part;
					["Left Arm"]: Part;
					Pants: Pants;
					Shirt: Shirt;
				};
				DoorCrates: Model & {
					Pad: ObjectValue;
				};
				Torch: Model & {
					Model: Model & {
						Fire: Part & {
							PointLight: PointLight;
						};
					};
				};
				Desk: Model & {
					MageCandle: Model;
				};
				Sign: Model;
				TrainingGrounds: Model & {
					Part: Part;
					StrawDummy: Model & {
						["Left Leg"]: Part;
						["Right Leg"]: Part;
						["Left Arm"]: Part;
						Torso: Part;
						Union: UnionOperation;
						["Right Arm"]: Part;
					};
				};
				SilverDropper: Model & {
					Pad: ObjectValue;
					Faucet: UnionOperation & {
						Spout: Attachment;
						PointLight: PointLight;
					};
				};
				InteriorCrates: Model;
			};
			Teller: Part & {
				SurfaceGui: SurfaceGui & {
					TextLabel: TextLabel;
					ImageLabel: ImageLabel;
				};
			};
		};
	};
	Diorama: Folder & {
		["Crypt of Kings"]: Part;
		["Slumbering Slug"]: Part & {
			SurfaceGui: SurfaceGui & {
				TextLabel: TextLabel;
			};
		};
		MonkTower: Model & {
			LavaFlower5: UnionOperation & {
				Ready: BoolValue;
			};
			LavaFlower19: UnionOperation & {
				Ready: BoolValue;
			};
			LavaFlower18: UnionOperation & {
				Ready: BoolValue;
				Blacklist: Folder;
			};
			MonkOutfit: Model & {
				Humanoid: Humanoid & {
					Animator: Animator;
				};
				ClickDetector: ClickDetector;
				ShopDisplay: Folder & {
					Price: IntValue;
					Type: StringValue;
					Shopkeeper: StringValue;
					Item: StringValue;
				};
				Torso: Part & {
					["Left Shoulder"]: Motor6D;
					["Right Shoulder"]: Motor6D;
					Neck: Motor6D;
					["Right Hip"]: Motor6D;
					["Left Hip"]: Motor6D;
				};
				HumanoidRootPart: Part & {
					["Root Hip"]: Motor6D;
					Approach: Sound;
				};
				["Right Arm"]: Part;
				["Left Arm"]: Part;
				Head: Part;
				Shirt: Shirt;
			};
			LavaFlower20: UnionOperation & {
				Ready: BoolValue;
			};
			LavaFlower4: UnionOperation & {
				Ready: BoolValue;
				Blacklist: Folder;
			};
			LavaFlower3: UnionOperation & {
				Ready: BoolValue;
			};
			here: Model;
			Isaac: Model & {
				["Left Leg"]: Part;
				Humanoid: Humanoid & {
					Animator: Animator;
				};
				["Right Leg"]: Part;
				Head: Part & {
					Mesh: SpecialMesh;
					Serious: Decal & {
						Default: Folder;
					};
				};
				Torso: Part & {
					["Left Shoulder"]: Motor6D;
					["Right Shoulder"]: Motor6D;
					Neck: Motor6D;
					["Right Hip"]: Motor6D;
					["Left Hip"]: Motor6D;
				};
				HumanoidRootPart: Part & {
					["Root Hip"]: Motor6D;
					Approach: Sound;
				};
				["Right Arm"]: Part;
				["Left Arm"]: Part;
				ClickDetector: ClickDetector;
			};
		};
		SpyTower: Model & {
			Drake: Model & {
				["Left Leg"]: Part;
				Humanoid: Humanoid & {
					Animator: Animator;
				};
				ClickDetector: ClickDetector;
				Head: Part & {
					HeadWeld: Weld;
					Serious: Decal;
					Mesh: SpecialMesh;
				};
				Torso: Part & {
					["Left Shoulder"]: Motor6D;
					["Right Shoulder"]: Motor6D;
					Neck: Motor6D;
					["Right Hip"]: Motor6D;
					["Left Hip"]: Motor6D;
				};
				HumanoidRootPart: Part & {
					["Root Hip"]: Motor6D;
					Approach: Sound;
				};
				["Right Arm"]: Part;
				["Left Arm"]: Part;
				Kent: Accessory & {
					Handle: Part & {
						HairAttachment: Attachment;
						OriginalSize: Vector3Value;
						Mesh: SpecialMesh;
					};
				};
				["Right Leg"]: Part;
				Dialog: ScreenGui & {
					Dialog2: Frame & {
						CancelButton: ImageButton & {
							DestroyScript: Script;
							TextLabel: TextLabel;
						};
					};
					NPCName: Frame & {
						TextLabel: TextLabel;
					};
					Dialog1: Frame & {
						TeachButton: ImageButton & {
							TextLabel: TextLabel;
							AnswerScript: LocalScript;
						};
						CancelButton: ImageButton & {
							DestroyScript: Script;
							TextLabel: TextLabel;
						};
					};
					DialogBackground: ImageLabel;
					DialogText: Frame & {
						TextLabel: TextLabel;
					};
					Main: LocalScript & {
						OldWalkSpeed: NumberValue;
					};
					Dialog3: Frame & {
						CancelButton: ImageButton & {
							DestroyScript: Script;
							TextLabel: TextLabel;
						};
						SkillButton: ImageButton & {
							BuyScript: Script;
							TextLabel: TextLabel;
						};
					};
				};
			};
		};
		fartbutt: Model & {
			["Left Leg"]: Part & {
				LeftFootAttachment: Attachment;
			};
			Humanoid: Humanoid & {
				Animator: Animator;
				HumanoidDescription: HumanoidDescription;
			};
			["Right Leg"]: Part & {
				RightFootAttachment: Attachment;
			};
			Head: Part & {
				HatAttachment: Attachment;
				HairAttachment: Attachment;
				FaceFrontAttachment: Attachment;
				face: Decal;
				Mesh: SpecialMesh;
				FaceCenterAttachment: Attachment;
			};
			MessyHairBlue: Accessory & {
				Handle2: Part & {
					HairAttachment: Attachment;
					Mesh: SpecialMesh;
					AccessoryWeld: Weld;
				};
			};
			Torso: Part & {
				RightCollarAttachment: Attachment;
				WaistCenterAttachment: Attachment;
				BodyBackAttachment: Attachment;
				Neck: Motor6D;
				LeftCollarAttachment: Attachment;
				["Left Hip"]: Motor6D;
				roblox: Decal;
				["Right Hip"]: Motor6D;
				["Left Shoulder"]: Motor6D;
				["Right Shoulder"]: Motor6D;
				BodyFrontAttachment: Attachment;
				WaistBackAttachment: Attachment;
				WaistFrontAttachment: Attachment;
				NeckAttachment: Attachment;
			};
			HumanoidRootPart: Part & {
				RootJoint: Motor6D;
				RootAttachment: Attachment;
			};
			["Body Colors"]: BodyColors;
			Hair2: Accessory & {
				Handle1: Part & {
					HairAttachment: Attachment;
					AccessoryWeld: Weld;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
			BoyAnimeHair_Blue: Accessory & {
				Handle3: Part & {
					HairAttachment: Attachment;
					Mesh: SpecialMesh;
					AccessoryWeld: Weld;
				};
			};
			["Right Arm"]: Part & {
				RightShoulderAttachment: Attachment;
				RightGripAttachment: Attachment;
			};
			["Left Arm"]: Part & {
				LeftGripAttachment: Attachment;
				LeftShoulderAttachment: Attachment;
			};
			Pants: Pants;
			MeshPartAccessory: Accessory & {
				Handle4: Part & {
					AccessoryWeld: Weld;
					FaceCenterAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
			Shirt: Shirt;
			Animate: LocalScript & {
				idle: StringValue & {
					Animation2: Animation & {
						Weight: NumberValue;
					};
					Animation1: Animation & {
						Weight: NumberValue;
					};
				};
				jump: StringValue & {
					JumpAnim: Animation;
				};
				sit: StringValue & {
					SitAnim: Animation;
				};
				run: StringValue & {
					RunAnim: Animation;
				};
				toolnone: StringValue & {
					ToolNoneAnim: Animation;
				};
				ScaleDampeningPercent: NumberValue;
				PlayEmote: BindableFunction;
				fall: StringValue & {
					FallAnim: Animation;
				};
				climb: StringValue & {
					ClimbAnim: Animation;
				};
				walk: StringValue & {
					WalkAnim: Animation;
				};
			};
		};
		Flowerlight: Part & {
			SurfaceGui: SurfaceGui & {
				TextLabel: TextLabel;
			};
		};
		["Classic House"]: Model & {
			House: Model & {
				FirstFloor: Model;
				Roof: Model & {
					Chimney: Model;
				};
				["Smooth Block Model"]: Part & {
					Snap: Snap;
				};
			};
		};
		Oresfall: Part;
		Scroomville: Part & {
			SurfaceGui: SurfaceGui & {
				TextLabel: TextLabel;
			};
		};
		["Dwain the bathtub im dwoning!"]: Model & {
			["Left Leg"]: Part & {
				LeftFootAttachment: Attachment;
			};
			Humanoid: Humanoid & {
				Animator: Animator;
				HumanoidDescription: HumanoidDescription;
			};
			["Right Leg"]: Part & {
				RightFootAttachment: Attachment;
			};
			Head: Part & {
				HatAttachment: Attachment;
				HairAttachment: Attachment;
				FaceFrontAttachment: Attachment;
				face: Decal;
				Mesh: SpecialMesh;
				FaceCenterAttachment: Attachment;
			};
			Torso: Part & {
				RightCollarAttachment: Attachment;
				WaistCenterAttachment: Attachment;
				BodyBackAttachment: Attachment;
				Neck: Motor6D;
				LeftCollarAttachment: Attachment;
				["Left Hip"]: Motor6D;
				roblox: Decal;
				["Right Hip"]: Motor6D;
				["Left Shoulder"]: Motor6D;
				["Right Shoulder"]: Motor6D;
				BodyFrontAttachment: Attachment;
				WaistBackAttachment: Attachment;
				WaistFrontAttachment: Attachment;
				NeckAttachment: Attachment;
			};
			HumanoidRootPart: Part & {
				RootJoint: Motor6D;
				RootAttachment: Attachment;
			};
			["Meshes/hypnoticglassesAccessory"]: Accessory & {
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
				Handle3: Part & {
					FaceFrontAttachment: Attachment;
					AccessoryWeld: Weld;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
			};
			["Body Colors"]: BodyColors;
			Animate: LocalScript & {
				idle: StringValue & {
					Animation2: Animation & {
						Weight: NumberValue;
					};
					Animation1: Animation & {
						Weight: NumberValue;
					};
				};
				jump: StringValue & {
					JumpAnim: Animation;
				};
				sit: StringValue & {
					SitAnim: Animation;
				};
				run: StringValue & {
					RunAnim: Animation;
				};
				toolnone: StringValue & {
					ToolNoneAnim: Animation;
				};
				ScaleDampeningPercent: NumberValue;
				PlayEmote: BindableFunction;
				fall: StringValue & {
					FallAnim: Animation;
				};
				climb: StringValue & {
					ClimbAnim: Animation;
				};
				walk: StringValue & {
					WalkAnim: Animation;
				};
			};
			["Right Arm"]: Part & {
				RightShoulderAttachment: Attachment;
				RightGripAttachment: Attachment;
			};
			["Left Arm"]: Part & {
				LeftGripAttachment: Attachment;
				LeftShoulderAttachment: Attachment;
			};
			Pants: Pants;
			["Yellow Team Hat"]: Accessory & {
				Handle1: Part & {
					AccessoryWeld: Weld;
					HatAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
			Shirt: Shirt;
			["Blonde Messy Curly Middle Part"]: Accessory & {
				Handle2: Part & {
					HairAttachment: Attachment;
					AccessoryWeld: Weld;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				ThumbnailConfiguration: Configuration & {
					ThumbnailCameraValue: CFrameValue;
					ThumbnailCameraTarget: ObjectValue;
				};
			};
		};
		Bush: Part;
		OresfallGate: Model;
		["Completed Areas"]: UnionOperation;
		TundraGate: Model & {
			Part: Part;
			ORESFALLGATE: Part & {
				Open: Sound;
				GateModule: ModuleScript;
				Close: Sound;
			};
		};
	};
	ButtonPedestal: Model & {
		sniper: MeshPart & {
			ClickDetector: ClickDetector;
		};
		RedButton: Part & {
			ClickDetector: ClickDetector;
		};
	};
}
