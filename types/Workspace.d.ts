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
	HouseOfPurgatory: Model & {
		ScroomHeadGreen: UnionOperation & {
			Weld: ManualWeld;
		};
		Spawn: Part;
	};
	SentinelColumn: Model;
	scroom: Model & {
		["Left Leg"]: Part & {
			RagdollAttachment: Attachment;
			LeftFootAttachment: Attachment;
		};
		Humanoid: Humanoid & {
			Animator: Animator;
			HumanoidDescription: HumanoidDescription;
		};
		["Right Leg"]: Part & {
			RagdollAttachment: Attachment;
			RightFootAttachment: Attachment;
		};
		Head: Part & {
			HatAttachment: Attachment;
			ParticleAttachment: Attachment & {
				Sniped: Sound;
				Crit: ParticleEmitter;
				Critted: Sound;
			};
			FaceFrontAttachment: Attachment;
			RagdollAttachment: Attachment;
			HairAttachment: Attachment;
			FaceCenterAttachment: Attachment;
		};
		Torso: Part & {
			RightCollarAttachment: Attachment;
			WaistCenterAttachment: Attachment;
			M2Trail: Trail;
			OrangeFire: ParticleEmitter;
			WaistBackAttachment: Attachment;
			BloodHit: ParticleEmitter;
			ManaStopParticle: ParticleEmitter;
			Injured: Sound;
			BodyFrontAttachment: Attachment;
			RightPelvis: Attachment;
			Charging: Sound;
			Burning: Sound;
			BodyBackAttachment: Attachment;
			ManaDash: Sound;
			RightArmSocket: BallSocketConstraint;
			RightLegSocket: BallSocketConstraint;
			LeftLegSocket: BallSocketConstraint;
			BlockParticle: ParticleEmitter;
			CarryPrompt: ProximityPrompt;
			LeftPelvis: Attachment;
			Fire: ParticleEmitter;
			["Left Shoulder"]: Motor6D;
			LeftArmSocket: BallSocketConstraint;
			GripPrompt: ProximityPrompt;
			NeckSocket: BallSocketConstraint;
			InjurePrompt: ProximityPrompt;
			LeftCollarAttachment: Attachment;
			Injure: ParticleEmitter;
			Neck: Motor6D;
			Dash: Sound;
			WaistFrontAttachment: Attachment;
			["Right Shoulder"]: Motor6D;
			["Right Hip"]: Motor6D;
			Extinguish: Sound;
			["Left Hip"]: Motor6D;
			Snap: Sound;
			NeckAttachment: Attachment;
		};
		HumanoidRootPart: Part & {
			Climbing: Sound;
			ManaDash: Sound;
			RootAttachment: Attachment;
			Running: Sound;
			Jumping: Sound;
			CarryPosition: AlignPosition;
			RootJoint: Motor6D;
			FinishedCharging: Sound;
			Swimming: Sound;
			CarryOrientation: AlignOrientation;
			GettingUp: Sound;
			Died: Sound;
			FreeFalling: Sound;
			Landing: Sound;
			Splash: Sound;
			Charging: Sound;
			CarryAttachment: Attachment;
		};
		FairFrozenBack: Accessory & {
			Handle: MeshPart & {
				Ruby: ParticleEmitter;
				OriginalSize: Vector3Value;
				Emerald: ParticleEmitter;
				AccessoryWeld: Weld;
				BodyBackAttachment: Attachment;
			};
		};
		["Right Arm"]: Part & {
			RagdollAttachment: Attachment;
			RightGripAttachment: Attachment;
			RightShoulderAttachment: Attachment;
		};
		["Left Arm"]: Part & {
			LeftGripAttachment: Attachment;
			RagdollAttachment: Attachment;
			LeftShoulderAttachment: Attachment;
		};
		Scroom: Accessory & {
			Handle: Part & {
				HairAttachment: Attachment;
				OriginalSize: Vector3Value;
				AccessoryWeld: Weld;
			};
		};
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
		Health: Script;
		DisableHumanoidStates: LocalScript;
	};
	GiveMoney: Part & {
		ClickDetector: ClickDetector;
		OriginalSize: Vector3Value;
	};
	Dead: Folder;
	HangingBrazier: Model & {
		Brazier: Model & {
			Fire: Part & {
				PointLight: PointLight;
			};
		};
	};
	WaterfallTest: Model & {
		Beam: Beam;
	};
	CryptTeleport: Part;
	Camera: Camera;
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
	RemoveMoney: Part & {
		ClickDetector: ClickDetector;
		OriginalSize: Vector3Value;
	};
	hornguy: Model & {
		["Left Leg"]: Part & {
			Snap: Snap;
			LeftFootAttachment: Attachment;
		};
		Humanoid: Humanoid & {
			HumanoidDescription: HumanoidDescription;
			Animator: Animator;
		};
		["Right Leg"]: Part & {
			Snap: Snap;
			RightFootAttachment: Attachment;
		};
		Head: Part & {
			HatAttachment: Attachment;
			Morvid: Decal;
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
		AnimSaves: Model & {
			["Automatic Save"]: KeyframeSequence & {
				Keyframekkkknnjn: Keyframe & {
					HumanoidRootPart: Pose & {
						Torso: Pose & {
							["Left Leg"]: Pose;
							["Right Leg"]: Pose;
							["Left Arm"]: Pose;
							["Right Arm"]: Pose;
							Head: Pose;
						};
					};
				};
				["KF0.75"]: Keyframe & {
					HumanoidRootPart: Pose & {
						Torso: Pose & {
							["Left Leg"]: Pose;
							["Right Leg"]: Pose;
							["Left Arm"]: Pose;
							["Right Arm"]: Pose;
							Head: Pose;
						};
					};
				};
			};
		};
		["Body Colors"]: BodyColors;
	};
	climbobby: Folder & {
		scale: Model & {
			["Left Leg"]: Part & {
				Texture: Texture;
				Snap: Snap;
				LeftFootAttachment: Attachment;
			};
			["Right Arm"]: Part & {
				RightShoulderAttachment: Attachment;
				RightGripAttachment: Attachment;
				Texture: Texture;
			};
			Head: Part & {
				HatAttachment: Attachment;
				Texture: Texture;
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
				["Left Hip"]: Motor6D;
				Neck: Motor6D;
				LeftCollarAttachment: Attachment;
				["Right Hip"]: Motor6D;
				["Left Shoulder"]: Motor6D;
				["Right Shoulder"]: Motor6D;
				WaistFrontAttachment: Attachment;
				Texture: Texture;
				BodyFrontAttachment: Attachment;
				WaistBackAttachment: Attachment;
				NeckAttachment: Attachment;
			};
			["Right Leg"]: Part & {
				RightFootAttachment: Attachment;
				Snap: Snap;
				Texture: Texture;
			};
			["Left Arm"]: Part & {
				LeftGripAttachment: Attachment;
				Texture: Texture;
				LeftShoulderAttachment: Attachment;
			};
		};
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
	Tycoon: Model & {
		Bag: Model & {
			Collider: Part & {
				Mesh: SpecialMesh;
			};
		};
		floor: Part;
		ClaimDoor: Part;
		DoorPad: Model & {
			Furniture: ObjectValue;
			Collider: Part & {
				BillboardGui: BillboardGui & {
					Frame: Frame & {
						TextLabel: TextLabel;
					};
				};
			};
		};
		ManaPad: Model & {
			Collider: Part & {
				BillboardGui: BillboardGui & {
					Frame: Frame & {
						TextLabel: TextLabel;
					};
				};
			};
		};
		Walls: Model;
		SilverDropper: Model & {
			Faucet: UnionOperation & {
				Spout: Attachment;
				PointLight: PointLight;
			};
		};
		SilverDropperPad: Model & {
			Furniture: ObjectValue;
			Collider: Part & {
				BillboardGui: BillboardGui & {
					Frame: Frame & {
						TextLabel: TextLabel;
					};
				};
			};
		};
		Teller: Part & {
			SurfaceGui: SurfaceGui & {
				TextLabel: TextLabel;
				ImageLabel: ImageLabel;
			};
		};
		WallPad: Model & {
			Furniture: ObjectValue;
			Collider: Part & {
				BillboardGui: BillboardGui & {
					Frame: Frame & {
						TextLabel: TextLabel;
					};
				};
			};
		};
		BagPad: Model & {
			Furniture: ObjectValue;
			Collider: Part & {
				BillboardGui: BillboardGui & {
					Frame: Frame & {
						TextLabel: TextLabel;
					};
				};
			};
		};
		Door: Model & {
			Part: Part;
		};
	};
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
	Alive: Folder;
	["the doohickey"]: Model & {
		["Right Arm"]: Part & {
			RagdollAttachment: Attachment;
			Attachment: Attachment;
			VectorForce: VectorForce;
		};
		Torso: Part & {
			RightCollarAttachment: Attachment;
			["Right Shoulder"]: Motor6D;
			BallSocketConstraint: BallSocketConstraint;
		};
	};
	ButtonPedestal: Model & {
		Part: Part;
		RagdollScript: Script;
		RedButton: Part & {
			ClickDetector: ClickDetector;
		};
	};
	tree_big: Model & {
		b1: Part;
		b2: Part;
	};
	ToolboxTemporaryInsertModel: Model;
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
	heightdummies: Model;
	rocks: Folder;
	PIC_HELMET: Model & {
		Handle: MeshPart & {
			OriginalSize: Vector3Value;
		};
		Head: Part & {
			HatAttachment: Attachment;
			HairAttachment: Attachment;
			FaceFrontAttachment: Attachment;
			face: Decal;
			Mesh: SpecialMesh;
			FaceCenterAttachment: Attachment;
		};
	};
	sniper: MeshPart & {
		ClickDetector: ClickDetector;
	};
	BeamTest: Model & {
		Beam: Beam;
	};
	["Mega Velo"]: Part & {
		PointLight: PointLight;
	};
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
	LavaPit: Part & {
		Fireball: ParticleEmitter;
		OrangeFire: ParticleEmitter;
		FireSparkles: ParticleEmitter;
		VBurning: ParticleEmitter;
		MonasticFire: ParticleEmitter;
		Burning: ParticleEmitter;
	};
	TycoonSpawns: Folder & {
		SpawnC: Part;
		SpawnA: Part;
		SpawnB: Part;
	};
	FallDamage: LocalScript & {
		RemoteEvent: RemoteEvent & {
			Script: Script;
		};
	};
	SentinelArch: Model;
	killbrick: Part & {
		Script: Script;
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
	wallfragment: Model & {
		Part: Part;
	};
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	Baseplate: Part & {
		OriginalSize: Vector3Value;
		Texture: Texture;
	};
}
