interface ReplicatedStorage extends Instance {
	WorldModels: Folder & {
		["Bronze Sword"]: Model & {
			["Bronze Sword"]: MeshPart & {
				Trail: Trail;
				Attachment2: Attachment;
				PropWeld: Weld;
				Weld: Weld;
				Attachment1: Attachment;
			};
		};
		Goblet: Model & {
			Goblet: MeshPart & {
				Attachment: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
				Mesh: SpecialMesh;
				ParticleEmitter: ParticleEmitter;
			};
		};
		["Bronze Spear"]: Model & {
			["Bronze Spear"]: MeshPart & {
				Trail: Trail;
				Attachment2: Attachment;
				PropWeld: Weld;
				Weld: Weld;
				Attachment1: Attachment;
			};
		};
		ThrownDagger: MeshPart & {
			TestTrail: Trail;
			Attachment2: Attachment;
			Attachment1: Attachment;
		};
		["Bronze Dagger"]: Model & {
			["Bronze Dagger"]: MeshPart & {
				PropWeld: Weld;
				Trail: Trail;
				Attachment2: Attachment;
				Attachment1: Attachment;
			};
		};
	};
	Assets: Folder & {
		Models: Folder & {
			ParticleBack: Part & {
				TestTrail: Trail;
				Attachment2: Attachment;
				Attachment1: Attachment;
			};
			SagittaPart: Part & {
				IllusionArm: ParticleEmitter;
				PointLight: PointLight;
				Attachment: Attachment;
				IllusionSnap: ParticleEmitter;
				Snap: Sound;
				IllusionHead: ParticleEmitter;
			};
			Snowball: Part;
			HystericusPart: Part & {
				IllusionArm: ParticleEmitter;
				PointLight: PointLight;
				Hit: Sound & {
					DistortionSoundEffect: DistortionSoundEffect;
					PitchShiftSoundEffect: PitchShiftSoundEffect;
				};
				IllusionSnap: ParticleEmitter;
				Attachment: Attachment;
				IllusionHead: ParticleEmitter;
			};
			ContrariumPart: Part & {
				IllusionArm: ParticleEmitter;
				PointLight: PointLight;
				Hit: Sound;
				IllusionSnap: ParticleEmitter;
				Attachment: Attachment;
				IllusionHead: ParticleEmitter;
			};
			GlowingHollowCylinder: UnionOperation;
			FakeSkybox: Part & {
				Mesh: SpecialMesh;
				PointLight: PointLight;
			};
			MoriPart: Part & {
				IllusionArm: ParticleEmitter;
				PointLight: PointLight;
				Hit: Sound;
				IllusionSnap: ParticleEmitter;
				Attachment: Attachment;
				Snap: Sound;
				IllusionHead: ParticleEmitter;
			};
			Seraph: Part & {
				ParticleEmitter: ParticleEmitter;
			};
			DragonWings: Model & {
				BW: Part & {
					RWA: Motor6D;
					LWA: Motor6D;
					WeldConstraint: WeldConstraint;
				};
				AnimSaves: Model & {
					["Automatic Save"]: KeyframeSequence;
				};
				DragonWing: UnionOperation & {
					PointLight: PointLight;
				};
				Right: Model & {
					RWA: Part & {
						Union: Weld;
					};
					Union: UnionOperation;
				};
				Left: Model & {
					LWA: Part & {
						Union: Weld;
					};
					Union: UnionOperation;
				};
				FakeHumanoid: Humanoid & {
					Animator: Animator;
				};
			};
			HailPart: Part & {
				Splash: ParticleEmitter;
				Trail: Trail;
				Hit: Sound;
			};
			ElectricLine: Part & {
				Electric: ParticleEmitter;
			};
			SnowHitPart: Part & {
				Sound: Sound & {
					DistortionSoundEffect: DistortionSoundEffect;
					PitchShiftSoundEffect: PitchShiftSoundEffect;
				};
				Particle: ParticleEmitter;
			};
			TelorumArrow: MeshPart;
			GlobusPart: Part & {
				IllusionArm: ParticleEmitter;
				IllusionHead: ParticleEmitter;
				PointLight: PointLight;
				Attachment: Attachment;
				Snap: Sound;
				IllusionSnap: ParticleEmitter;
			};
			LightningPart: Part & {
				ParticleEmitter2: ParticleEmitter;
				Trail: Trail;
				Beam: Beam;
				ParticleEmitter: ParticleEmitter;
			};
			DustPart: Part & {
				DUST: ParticleEmitter;
			};
			MisogiParticle: Part & {
				Attachment: Attachment & {
					Particle: ParticleEmitter;
				};
			};
			Bullet: Part & {
				Trail: Trail;
				Whiz: Sound;
				Smoke: ParticleEmitter;
			};
			PocketSandPart: Part & {
				Sound: Sound;
				PocketSand: ParticleEmitter;
			};
			IntermissumPart: Part & {
				IllusionArm: ParticleEmitter;
				PointLight: PointLight;
				Hit: Sound;
				IllusionHead: ParticleEmitter;
				IllusionSnap: ParticleEmitter;
				Snap: Sound;
				Attachment: Attachment;
			};
			SlashRing: MeshPart;
			ItemTemplate: Part & {
				Mesh: SpecialMesh;
				BillboardGui: BillboardGui & {
					ToolName: TextLabel;
				};
			};
			NocerePart: Part & {
				PointLight: PointLight;
				Hit: Sound;
				Attachment: Attachment;
				OrbEmit: ParticleEmitter;
				OrbParticle: ParticleEmitter;
			};
			ManaTrailPart: Part & {
				Weld: Weld;
				Trail: Trail;
			};
			VeloBall: Part & {
				PointLight: PointLight;
				ParticleEmitter: ParticleEmitter;
				Attachment: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
				Sound: Sound;
				WeldConstraint: WeldConstraint;
			};
			Part: Part & {
				Corruption: Attachment & {
					BlightMotes: ParticleEmitter;
					LowBlight: ParticleEmitter;
					MidBlight: ParticleEmitter;
				};
				Mana2: Attachment;
				VeloAttach: Attachment & {
					VeloGlow: PointLight;
					Velo: ParticleEmitter;
				};
				SpearCrusher: Attachment & {
					DragonRoarPtcl: ParticleEmitter;
				};
				Mana1: Attachment;
				High: Attachment & {
					LowPurity: ParticleEmitter;
					MidPurity: ParticleEmitter;
					HighPurity: ParticleEmitter;
				};
				DragonRoar: Attachment & {
					DragonRoarPtcl: ParticleEmitter;
				};
				Blessing: Attachment;
			};
			Orb: Part & {
				Mesh: SpecialMesh;
				Attachment: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
			};
			TelorumBow: UnionOperation;
			LightningParts: Part & {
				Trail: Trail;
				Attachment2: Attachment;
				Attachment3: Attachment & {
					ParticleEmitter2: ParticleEmitter;
					ParticleEmitter: ParticleEmitter;
				};
				Beam: Beam;
				Attachment1: Attachment;
			};
			ReaperPortal: Part;
			LightningDrop: Part & {
				PointLight: PointLight;
				STRIKE: Sound;
			};
			GlowingRing: MeshPart;
			PumpkinExplosion: Model & {
				Main: Part & {
					Ring: Weld;
					Attachment: Attachment & {
						ParticleEmitter: ParticleEmitter;
					};
				};
				Ring: MeshPart;
			};
			test_tool: Model & {
				yar: Part;
			};
			ParticleArm: Part & {
				Attachment2: Attachment;
				TestTrail: Trail;
				Attachment1: Attachment;
			};
			NocereCollar: UnionOperation & {
				OrbParticle: ParticleEmitter;
			};
			HoppaTornado: MeshPart & {
				Sound: Sound;
			};
			Weapons: Folder & {
				["Bronze Spear"]: Model & {
					["Bronze Spear"]: MeshPart & {
						Trail: Trail;
						Attachment2: Attachment;
						PropWeld: Weld;
						Weld: Weld;
						Attachment1: Attachment;
					};
				};
				["Bronze Sword"]: Model & {
					["Bronze Sword"]: MeshPart & {
						Trail: Trail;
						Attachment2: Attachment;
						PropWeld: Weld;
						Weld: Weld;
						Attachment1: Attachment;
					};
				};
				["Bronze Dagger"]: Model & {
					["Bronze Dagger"]: MeshPart & {
						PropWeld: Weld;
						Trail: Trail;
						Attachment2: Attachment;
						Attachment1: Attachment;
					};
				};
			};
			MoriLaser: Part;
			FireBallExplosion: Part & {
				PointLight: PointLight;
				Script: Script;
				Attachment: Attachment & {
					Explosion: ParticleEmitter;
				};
			};
		};
		Appearance: Folder & {
			SpyMarks: Folder & {
				["The Wraith"]: Decal;
				["The Soul"]: Decal;
				["The Shadow"]: Decal;
			};
			FacialExtras: Folder & {
				Lashes: Decal;
				Scars: Folder & {
					BrowCrossScarRight: Decal;
					EyeScarLeft: Decal;
					CoolCheekScarLeft: Decal;
					BowScarLeft: Decal;
					CoolCheekScarRight: Decal;
					BrowCrossScarLeft: Decal;
					BurnScar: Decal;
					BowScarRight: Decal;
					ForeheadCrossScar: Decal;
					EyeScarRight: Decal;
					NoseCrossScar: Decal;
				};
				Sirian: Decal;
				DzinEyeOpened: Decal;
				Blademaster: Decal;
				DzinEyeClosed: Decal;
				Healer: Decal;
				Lastiel: Decal;
				Phoenix: Decal;
				Jester: Decal;
				Seer: Decal;
			};
			CustomAccessories: Folder & {
				Morvid: Accessory & {
					Beak: MeshPart;
					Handle: Part & {
						FaceFrontAttachment: Attachment;
						WeldConstraint: WeldConstraint;
					};
				};
				Azael: Accessory & {
					Handle: Part & {
						FaceFrontAttachment: Attachment;
					};
					AzaelHornR: MeshPart;
					AzaelHornL: MeshPart;
				};
				Kasparan: Accessory & {
					Handle: Part & {
						FaceCenterAttachment: Attachment;
					};
				};
			};
			Outfits: Folder & {
				Errant: Folder & {
					Stats: Folder & {
						ColdResist: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Plate: Folder;
				};
				Lapidarist: Folder & {
					Stats: Folder & {
						ColdResist: NumberValue;
						HealthRegen: NumberValue;
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Plate: Folder;
				};
				PitFighter: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Rogue: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						SpeedBoost: NumberValue;
						TightHood: Folder;
						HealthBoost: NumberValue;
					};
				};
				Shallow: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ColdResist: NumberValue;
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				AdventurerBlue: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Female: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
				};
				Scholar: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ScholarsBoon: NumberValue;
					};
				};
				AdventurerGreen: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Female: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
				};
				AdventurerRed: Folder & {
					Female: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
				};
				SpyMaster: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
						ColdResist: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Outrider: Folder & {
					Plate: Folder;
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						HealthBoost: NumberValue;
					};
				};
				SpiderCloak: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
						HealthRegen: NumberValue;
						ColdResist: NumberValue;
						FallResist: NumberValue;
						TightHood: Folder;
						HealthBoost: NumberValue;
					};
				};
				Ranger: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HealthBoost: NumberValue;
						SpeedBoost: IntValue;
					};
				};
				Assassin: Folder & {
					Female: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						TightHood: Folder;
						SpeedBoost: NumberValue;
					};
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
				};
				Bard: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HealthRegen: NumberValue;
						ColdResist: NumberValue;
						SpeedBoost: NumberValue;
						TightHood: Folder;
						HealthBoost: NumberValue;
					};
				};
				GrimMage: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ScholarsBoon: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				GaianChaotic: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ColdResist: NumberValue;
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				ChurchKnight: Folder & {
					Stats: Folder & {
						HealthRegen: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Plate: Folder;
				};
				Sage: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HealthBoost: NumberValue;
						ColdResist: NumberValue;
						HealthRegen: NumberValue;
					};
				};
				Nobleman: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ColdResist: NumberValue;
						HealthRegen: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				TunicBlue: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Female: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
				};
				WraithKnight: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						HealthBoost: NumberValue;
						HealthRegen: NumberValue;
					};
				};
				Inventor: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Troller: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ColdResist: NumberValue;
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Tal: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ColdResist: NumberValue;
						PuppiesLikeHim: Folder;
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
					};
				};
				NightLord: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
						ColdResist: NumberValue;
						FallResist: NumberValue;
						TightHood: Folder;
						HealthBoost: NumberValue;
					};
				};
				Doctor: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HealthRegen: NumberValue;
						SpeedBoost: NumberValue;
						ColdResist: NumberValue;
						FallResist: NumberValue;
						TightHood: Folder;
						HealthBoost: NumberValue;
					};
				};
				Colubras: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ColdResist: NumberValue;
						ClimbBoost: NumberValue;
						SpeedBoost: IntValue;
						HealthRegen: NumberValue;
					};
				};
				Lastiel: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ColdResist: NumberValue;
						HealthRegen: NumberValue;
						ScholarsBoon: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Wizard: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						ScholarsBoon: NumberValue;
					};
				};
				TunicPurple: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Female: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
				};
				DragonSlayer: Folder & {
					Stats: Folder & {
						HealthRegen: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Plate: Folder;
				};
				Ethan: Folder & {
					Female: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HyperBuff: Folder;
						FistDamageMP: NumberValue;
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
				};
				Florist: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HealthRegen: NumberValue;
						SpeedBoost: NumberValue;
						ScholarsBoon: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				GrimRogue: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
						TightHood: Folder;
						HealthBoost: NumberValue;
					};
				};
				Brawler: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						HealthBoost: NumberValue;
						SpeedBoost: NumberValue;
					};
				};
				GaianDefault: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						HealthBoost: NumberValue;
					};
				};
				GaianOrderly: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HealthBoost: NumberValue;
						ColdResist: NumberValue;
						SpeedBoost: NumberValue;
					};
				};
				GrimKnight: Folder & {
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Plate: Folder;
				};
				Royalty: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder;
				};
				Premedian: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ObserveBlock: NumberValue;
					};
				};
				DeepKnight: Folder & {
					Stats: Folder & {
						ColdResist: NumberValue;
						HealthRegen: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Plate: Folder;
				};
				Dorgon: Folder & {
					Female: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HyperBuff: Folder;
						FistDamageMP: NumberValue;
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
				};
				ScroomDefault: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
				};
				Samurai: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
						HealthRegen: NumberValue;
					};
				};
				Abysswalker: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						HealthRegen: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Mage: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						ScholarsBoon: NumberValue;
					};
				};
				Maratiel: Folder & {
					Stats: Folder & {
						ColdResist: NumberValue;
						HealthRegen: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Plate: Folder;
				};
				Ratriel: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						SpeedBoost: IntValue;
						HealthBoost: NumberValue;
						HealthRegen: NumberValue;
					};
				};
				MasterIllusionist: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						HealthRegen: NumberValue;
						ColdResist: NumberValue;
						ScholarsBoon: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Prince: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						PhysicalManaBlock: NumberValue;
					};
				};
				Monk: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						HealthRegen: NumberValue;
					};
				};
				Moonlight: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						CurseBlock: NumberValue;
					};
				};
				TunicRed: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Female: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
				};
				Necromancer: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						CurseEffectImmune: Folder;
						ColdResist: NumberValue;
						ClimbBoost: NumberValue;
						ScholarsBoon: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Shinobi: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						SpeedBoost: NumberValue;
						HealthRegen: NumberValue;
						TightHood: Folder;
						HealthBoost: NumberValue;
					};
				};
				KnightLord: Folder & {
					Plate: Folder;
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						HealthBoost: NumberValue;
					};
				};
				Lord: Folder & {
					Plate: Folder;
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Stats: Folder & {
						HealthBoost: NumberValue;
					};
				};
				Illusionist: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Stats: Folder & {
						ClimbBoost: NumberValue;
						ScholarsBoon: NumberValue;
						HealthBoost: NumberValue;
					};
				};
				Rags: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
				};
				TundraRanger: Folder & {
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
				};
				TunicGreen: Folder & {
					Male: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
					Female: Folder & {
						Pants: Pants;
						Shirt: Shirt;
					};
				};
				Warlord: Folder & {
					Stats: Folder & {
						SpeedBoost: NumberValue;
						HealthBoost: NumberValue;
					};
					Male: Folder & {
						Shirt: Shirt;
						Pants: Pants;
					};
					Plate: Folder;
				};
			};
			CustomHeads: Folder & {
				Glowscroom: Accessory & {
					Handle: Part & {
						HairAttachment: Attachment;
						TouchInterest: TouchTransmitter;
						WeldConstraint: WeldConstraint;
					};
					Glowcap: UnionOperation & {
						ParticleEmitter: ParticleEmitter;
						PointLight: PointLight;
					};
				};
				Scroom: Accessory & {
					Handle: Part & {
						HairAttachment: Attachment;
						TouchInterest: TouchTransmitter;
					};
				};
				Metascroom: Accessory & {
					Handle: Part & {
						HairAttachment: Attachment;
						TouchInterest: TouchTransmitter;
						WeldConstraint: WeldConstraint;
					};
					MetaCap: UnionOperation;
				};
			};
			Faces: Folder & {
				Other: Folder & {
					Emotions: Folder & {
						Hollow: Decal;
						Tired: Decal;
						Determined: Decal;
						Disgruntled: Decal;
						Neutral: Decal;
						Sad: Decal;
						Friendly: Decal;
						Angry: Decal;
					};
					Default: Decal;
					Sigil: Decal;
				};
				Rigan: Folder & {
					Default: Decal;
					Emotions: Folder & {
						Determined: Decal;
						Rigan: Decal;
						Sad: Decal;
						Friendly: Decal;
						Serious: Decal;
						Shocked: Decal;
						Tired: Decal;
						Disgruntled: Decal;
						Angry: Decal;
					};
				};
				Gaian: Folder & {
					Default: Decal;
					Sigil: Decal;
				};
				Morvid: Folder & {
					Supreme: Decal;
					Default: Decal;
				};
				Lich: Folder & {
					Default: Decal;
				};
				Haseldan: Folder & {
					Default: Decal;
				};
				Lastiel: Decal;
				Azael: Folder & {
					Default: Decal;
					Emotions: Folder & {
						Concerned: Decal;
						Determined: Decal;
						Fired: Decal;
					};
				};
				Dinakeri: Folder & {
					Default: Decal;
					Emotions: Folder & {
						Neutral: Decal;
						Confident: Decal;
					};
				};
				LesserNavaran: Folder & {
					Default: Decal;
				};
				Kasparan: Folder & {
					Emotions: Folder & {
						Frustrated: Decal;
						Smug: Decal;
						Anxious: Decal;
						Unimpressed: Decal;
					};
					Default: Decal;
					Sigil: Decal;
				};
			};
			ImpaleWound: Decal;
		};
		UI: Folder & {
			AreaGui: ScreenGui & {
				AreaFrame: Frame & {
					Title: TextLabel & {
						Shadow: TextLabel;
					};
					Description: TextLabel & {
						Shadow: TextLabel;
					};
				};
				Sound: Sound;
				AreaClient: LocalScript & {
					AreaInfo: ModuleScript;
					GetTemp: RemoteEvent & {
						Script: Script;
					};
				};
				AreaMusic: Sound;
			};
			Dialogue: Folder & {
				Dialogue: ScreenGui & {
					Handla: LocalScript & {
						Sound: Sound;
					};
					MainFrame: ImageLabel & {
						NameText: TextLabel & {
							Shadow: TextLabel;
						};
						DialogueText: TextLabel;
						Options: Frame & {
							UIGridLayout: UIGridLayout;
						};
						Container: Frame;
					};
				};
				OptionTemplate: ImageLabel & {
					OptionText: TextLabel;
					OptionButton: TextButton;
				};
			};
			LeaderboardGui: ScreenGui & {
				MainFrame: ImageLabel & {
					ScrollingFrame: ScrollingFrame;
				};
				LeaderboardClient: LocalScript & {
					PlayerLabel: TextLabel & {
						Prestige: TextLabel;
					};
				};
			};
			ManaGui: ScreenGui & {
				LeftContainer: Frame & {
					ManaBar: Frame & {
						ManaSlider: Frame & {
							Divider: Frame;
						};
						Overlay: ImageLabel;
					};
				};
			};
			PadLabels: Frame & {
				UIListLayout: UIListLayout;
				AssetLabel: TextLabel;
				CostLabel: TextLabel;
			};
			StatGui: ScreenGui & {
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
			};
			DebugInfo: ScreenGui & {
				HumanoidStateUpdate: LocalScript;
				TopLeftFrame: Frame & {
					DiagonalInBoolean: TextLabel;
					DiagonalInLabel: TextLabel;
					CenterForwardNormal: TextLabel;
					DiagonalInDistance: TextLabel;
					DiagonalOutLabel: TextLabel;
					DiagonalOutDistance: TextLabel;
					CenterForwardDistance: TextLabel;
					DiagonalOutBoolean: TextLabel;
					CenterForwardLabel: TextLabel;
					CenterForwardBoolean: TextLabel;
				};
				BottomLeftFrame: Frame & {
					HumanoidState: TextLabel;
					SeesTop: TextLabel;
					ForceLabel: TextLabel;
				};
			};
			Currency: Folder & {
				SilverGui: ScreenGui & {
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
				};
				InsightGui: ScreenGui & {
					InsightLogo: ImageButton & {
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
				};
			};
			BackpackGui: ScreenGui & {
				BackpackClient: LocalScript & {
					SlotMarker: ImageLabel;
					ToolFrame: TextButton & {
						Overlay: ImageLabel;
						Quantity: TextLabel & {
							ImageLabel: ImageLabel;
						};
						Slot: TextLabel & {
							ImageLabel: ImageLabel;
						};
					};
				};
				BackpackFrame: Frame & {
					Overlay: ImageLabel;
					ScrollingFrame: ScrollingFrame & {
						UIPadding: UIPadding;
						UIGridLayout: UIGridLayout;
					};
				};
				MainFrame: Frame;
			};
			InCombat: ScreenGui & {
				LocalScript: LocalScript;
				Frame: Frame;
			};
		};
		Tycoon: Folder & {
			Products: Folder & {
				["Idol of the Forgotten"]: Model & {
					Handle: UnionOperation;
				};
				shilling: Model & {
					Part: Part;
				};
				Amulet: Model & {
					Handle: MeshPart & {
						ParticleEmitter: ParticleEmitter;
						Attachment: Attachment & {
							ParticleEmitter: ParticleEmitter;
						};
					};
				};
				Sapphire: Model & {
					Handle: Part & {
						Mesh: SpecialMesh;
						ParticleEmitter: ParticleEmitter;
					};
				};
				["Old Ring"]: Model & {
					Handle: MeshPart & {
						ParticleEmitter: ParticleEmitter;
					};
				};
				Scroll: Model & {
					Handle: Part & {
						Paper: MeshPart & {
							Weld: ManualWeld;
						};
						String: MeshPart & {
							Weld: ManualWeld;
						};
						Metal: MeshPart & {
							Weld: ManualWeld;
						};
					};
				};
				["???"]: Model & {
					Handle: Part & {
						PointLight: PointLight;
						Mesh: SpecialMesh;
						OrbParticle: ParticleEmitter;
					};
				};
				Diamond: Model & {
					Handle: Part & {
						Mesh: SpecialMesh;
					};
				};
				Ruby: Model & {
					Handle: MeshPart & {
						ParticleEmitter: ParticleEmitter;
					};
				};
				Opal: Model & {
					Handle: Part & {
						Mesh: SpecialMesh;
						ParticleEmitter: ParticleEmitter;
					};
				};
				Goblet: Model & {
					Handle: MeshPart & {
						Attachment: Attachment & {
							ParticleEmitter: ParticleEmitter;
						};
						Mesh: SpecialMesh;
						ParticleEmitter: ParticleEmitter;
					};
				};
				["Old Amulet"]: Model & {
					Handle: MeshPart & {
						ParticleEmitter: ParticleEmitter;
						Attachment: Attachment & {
							ParticleEmitter: ParticleEmitter;
						};
					};
				};
				Emerald: Model & {
					Handle: Part & {
						Mesh: SpecialMesh;
						ParticleEmitter: ParticleEmitter;
					};
				};
				Ring: Model & {
					Handle: MeshPart;
				};
				Godscroll: Model & {
					Handle: Part & {
						Mesh: SpecialMesh;
					};
				};
			};
		};
		Animations: Folder & {
			Skills: Folder & {
				Pickpocket: Animation;
				PommelStrike: Animation;
				LockManipulation: Animation;
			};
			Combat: Folder & {
				Fists2: Animation;
				Fists5: Animation;
				Dagger5: Animation;
				DaggerHeavy: Animation;
				Spear4: Animation;
				Gripping: Animation;
				Sword4: Animation;
				Sword3: Animation;
				Spear3: Animation;
				Dagger4: Animation;
				Sword5: Animation;
				Carried: Animation;
				Stunned3: Animation;
				BlockHit1: Animation;
				Fists1: Animation;
				FistsHeavy: Animation;
				Spear1: Animation;
				Spear2: Animation;
				Sword2: Animation;
				SpearIdle: Animation;
				Carrying: Animation;
				Dagger2: Animation;
				BlockHit3: Animation;
				SpearBlock: Animation;
				TripleStrike: Animation;
				SpearStrike: Animation;
				Fists4: Animation;
				Stunned1: Animation;
				Stunned2: Animation;
				SpearHeavy: Animation;
				SwordHeavy: Animation;
				Dagger3: Animation;
				Sword1: Animation;
				DefaultBlock: Animation;
				Gripped: Animation;
				Fists3: Animation;
				Throw: Animation;
				Dagger1: Animation;
				SwordBlock: Animation;
				BlockHit2: Animation;
				PickUp: Animation;
			};
			Movement: Folder & {
				SpearDashRight: Animation;
				ClimbRight: Animation;
				ClimbIdle: Animation;
				SpearDashBackward: Animation;
				DashForward: Animation;
				DashBackward: Animation;
				ClimbDown: Animation;
				SpearDashLeft: Animation;
				ClimbUp: Animation;
				DashLeft: Animation;
				Run: Animation;
				DashRight: Animation;
				LedgeClimbUp: Animation;
				ManaRun: Animation;
				ClimbLeft: Animation;
			};
		};
		Effects: Folder & {
			Sounds: Folder & {
				DaggerHit2: Sound;
				FinishedCharging: Sound;
				CounterSpell: Sound;
				FreeFalling: Sound;
				SilverDischarge: Sound;
				FistsCharge: Sound;
				DaggerCharge: Sound;
				Poisoned: Sound;
				Blink: Sound;
				WingFlap: Sound;
				Injured: Sound;
				DaggerSwing: Sound;
				Stealth: Sound;
				Climbing: Sound;
				Erase: Sound;
				DaggerSwing2: Sound;
				Surge: Sound;
				FistsChargeFinish: Sound;
				Growth: Sound;
				Swimming: Sound;
				CounterSpellOff: Sound;
				Lockpicking: Sound;
				Landing: Sound;
				StrikeCharge: Sound;
				Snap: Sound;
				HeavySpearSwing: Sound;
				WoodDoorOpen: Sound;
				FistsHit: Sound;
				Greatspearhit: Sound;
				SoulRipped: Sound;
				Died: Sound;
				PerfectCast: Sound;
				Jumping: Sound;
				Shadowrush: Sound;
				Ordersound: Sound;
				WoodDoorClose: Sound;
				SwordSwing: Sound;
				ShadowrushCharge: Sound;
				BaneCharge: Sound;
				Diffusion: Sound;
				Lannis: Sound;
				SwordCharge: Sound;
				Charging: Sound;
				BlockBreak: Sound;
				Pondus: Sound & {
					FlangeSoundEffect: FlangeSoundEffect;
				};
				DaggerHit: Sound;
				ManaDash: Sound;
				EtherealStrike: Sound;
				EpicDemon: Sound;
				Running: Sound;
				Splash: Sound;
				BaneDischarge: Sound;
				DoorKnock: Sound;
				GrappleNoise: Sound;
				SpearHit: Sound;
				SwordHit: Sound;
				OwlSlash: Sound;
				Heavy: Sound;
				LightningHit: Sound;
				GettingUp: Sound;
				Roar: Sound;
				SpearSwing: Sound;
				Dash: Sound;
				FistsSwing: Sound;
				FlyingAssaulter: Sound;
				Extinguish: Sound;
			};
			Visuals: Folder & {
				ShriekerSmoke: ParticleEmitter;
				LordsbaneLightning: ParticleEmitter;
				SilverEmit: ParticleEmitter;
				Torso: Folder & {
					OrangeFire: ParticleEmitter;
					BlockParticle: ParticleEmitter;
					FistsHit: ParticleEmitter;
					Injure: ParticleEmitter;
					BloodHit: ParticleEmitter;
				};
				M2Trail: Trail;
				OrangeFire: ParticleEmitter;
				Steam: ParticleEmitter;
				SpecialBloodHit: ParticleEmitter;
				Sweat: ParticleEmitter;
				SworderEmit: ParticleEmitter;
				ShadowEmitter3: ParticleEmitter;
				ShadowEmitter2: ParticleEmitter;
				FlockIn: ParticleEmitter;
				FlockOut: ParticleEmitter;
				ShadowEmitter: ParticleEmitter;
				MagiCircle: ParticleEmitter;
				Fire: ParticleEmitter;
				PondusParticle: ParticleEmitter;
				ManaRunTrail: Trail;
				DarkMatter: ParticleEmitter;
				Smoke: ParticleEmitter;
				DBloodTrue: ParticleEmitter;
				MonasticFire: ParticleEmitter;
				Cameo: ParticleEmitter;
				LannisParticle: ParticleEmitter;
				ManaStopParticle: ParticleEmitter;
				LElectric: ParticleEmitter;
				Sparks: ParticleEmitter;
				CommandFX: ParticleEmitter;
				MonkParticle: ParticleEmitter;
				Feathers: ParticleEmitter;
				ColdBreath: ParticleEmitter;
				Electric: ParticleEmitter & {
					ElectricLight: PointLight;
				};
				ChargePart: ParticleEmitter;
				DBloodOff: ParticleEmitter;
				DBloodOn: ParticleEmitter;
				SpearEmit: ParticleEmitter;
				Broken: ParticleEmitter;
				Poison: ParticleEmitter;
				Injure: ParticleEmitter;
				ActionSurge: ParticleEmitter;
			};
		};
	};
	src: Folder & {
		shared: Folder & {
			toggleable: ModuleScript;
			commands: Folder & {
				types: ModuleScript & {
					currency: ModuleScript;
					["skill-id"]: ModuleScript;
					["item-id"]: ModuleScript;
				};
				guards: Folder & {
					["is-admin"]: ModuleScript;
				};
			};
			hideable: ModuleScript;
			configs: ModuleScript & {
				classes: ModuleScript;
				character: ModuleScript;
				weapons: ModuleScript;
				skills: ModuleScript;
				group: ModuleScript;
				conditions: ModuleScript;
				items: ModuleScript;
				constants: ModuleScript;
			};
			constants: ModuleScript;
			modules: Folder & {
				["animation-manager"]: ModuleScript;
				["serialized-color3"]: ModuleScript;
				["character-from-body-part"]: ModuleScript;
				lifecycles: ModuleScript;
				currency: ModuleScript;
				stat: ModuleScript;
				["player-data"]: ModuleScript;
				graph: ModuleScript & {
					node: ModuleScript;
				};
				equippable: ModuleScript;
				["abstract-activity"]: ModuleScript;
				["line-of-sight"]: ModuleScript;
				["get-digit"]: ModuleScript;
				raycasting: ModuleScript;
				["on-player-removing"]: ModuleScript;
				useable: ModuleScript;
				["uppercase-first-char"]: ModuleScript;
				hitbox: ModuleScript;
				["char-at"]: ModuleScript;
				["state-machine"]: ModuleScript & {
					state: ModuleScript;
				};
				["serialized-vector3"]: ModuleScript;
				["cframe-util"]: ModuleScript;
			};
			network: ModuleScript & {
				currency: ModuleScript;
				combat: ModuleScript;
				character: ModuleScript;
				dialogue: ModuleScript;
				mana: ModuleScript;
				item: ModuleScript;
				reflex: ModuleScript;
			};
			components: Folder & {
				toggleable: ModuleScript;
				["abstract-weapon"]: ModuleScript;
				["useful-model"]: ModuleScript;
				["abstract-skill"]: ModuleScript;
				["abstract-player"]: ModuleScript;
				["abstract-useable"]: ModuleScript;
				["abstract-equippable"]: ModuleScript;
				["abstract-item"]: ModuleScript;
				ragdoll: ModuleScript;
				["abstract-character"]: ModuleScript;
				["abstract-door"]: ModuleScript;
			};
			store: ModuleScript & {
				middleware: Folder & {
					logger: ModuleScript;
				};
				slices: ModuleScript & {
					inventory: ModuleScript & {
						selectors: ModuleScript;
					};
					stats: ModuleScript & {
						selectors: ModuleScript;
					};
					currencies: ModuleScript & {
						selectors: ModuleScript;
					};
					mana: ModuleScript & {
						selectors: ModuleScript;
					};
					identity: ModuleScript & {
						selectors: ModuleScript;
					};
					classes: ModuleScript & {
						selectors: ModuleScript;
					};
					transform: ModuleScript & {
						selectors: ModuleScript;
					};
					skills: ModuleScript & {
						selectors: ModuleScript;
					};
					conditions: ModuleScript & {
						selectors: ModuleScript;
					};
					resources: ModuleScript & {
						selectors: ModuleScript;
					};
					hotbar: ModuleScript & {
						selectors: ModuleScript;
					};
				};
			};
		};
		client: Folder & {
			network: ModuleScript;
			activities: Folder & {
				["block-activity"]: ModuleScript;
				["charge-mana-activity"]: ModuleScript;
				["character-activity"]: ModuleScript;
				["run-activity"]: ModuleScript;
				["dash-activity"]: ModuleScript;
				["climb-activity"]: ModuleScript;
			};
			components: Folder & {
				["skill-client"]: ModuleScript;
				["character-client"]: ModuleScript;
				["ragdoll-client"]: ModuleScript;
				["item-client"]: ModuleScript;
				["local-character"]: ModuleScript;
				["proximity-interactable"]: ModuleScript;
				["door-client"]: ModuleScript;
			};
			ui: Folder & {
				hooks: Folder & {
					["reflex-hooks"]: ModuleScript;
				};
				context: ModuleScript & {
					singletons: ModuleScript;
					["app-ref"]: ModuleScript;
				};
				components: Folder & {
					digit: ModuleScript;
					app: ModuleScript;
					stats: ModuleScript;
					["name-plate"]: ModuleScript;
					["silver-logo"]: ModuleScript;
					inventory: Folder & {
						["draggable-equippable-button"]: ModuleScript;
						["equippable-button"]: ModuleScript;
						["empty-slot"]: ModuleScript;
						hotbar: ModuleScript;
						backpack: ModuleScript;
					};
					["dialogue-box"]: ModuleScript & {
						["dialogue-option"]: ModuleScript;
						["char-label"]: ModuleScript;
					};
					["fill-bar"]: ModuleScript & {
						["mana-bar"]: ModuleScript;
						["temperature-bar"]: ModuleScript;
						["stomach-bar"]: ModuleScript;
					};
				};
			};
			configs: Folder & {
				effects: ModuleScript;
				constants: ModuleScript;
			};
			store: ModuleScript & {
				middleware: Folder & {
					receiver: ModuleScript;
				};
				slices: Folder & {
					dialogue: ModuleScript & {
						selectors: ModuleScript;
					};
					equippables: ModuleScript & {
						selectors: ModuleScript;
					};
					ui: ModuleScript & {
						selectors: ModuleScript;
					};
				};
			};
			controllers: Folder & {
				["lifecycle-controller"]: ModuleScript;
				["gui-controller"]: ModuleScript;
				["input-controller"]: ModuleScript;
				["keybind-controller"]: ModuleScript;
				["effect-controller"]: ModuleScript;
				["chat-controller"]: ModuleScript;
				["animation-controller"]: ModuleScript;
				["character-controller"]: ModuleScript;
			};
		};
	};
	rbxts_include: Folder & {
		node_modules: Folder & {
			["@rbxts"]: Folder & {
				["reflex-class"]: Folder & {
					out: ModuleScript & {
						source: Folder & {
							["class-producer"]: ModuleScript;
							decorators: ModuleScript & {
								action: ModuleScript;
								subscribe: ModuleScript;
							};
						};
					};
				};
				log: Folder & {
					out: ModuleScript & {
						Core: ModuleScript & {
							LogEventCallbackSink: ModuleScript;
							LogEventPropertyEnricher: ModuleScript;
							LogEventRobloxOutputSink: ModuleScript;
						};
						Configuration: ModuleScript;
						Logger: ModuleScript;
					};
				};
				charm: ModuleScript & {
					mapped: ModuleScript;
					atom: ModuleScript;
					effect: ModuleScript;
					observe: ModuleScript;
					utils: Folder & {
						collect: ModuleScript;
						count: ModuleScript;
						setInterval: ModuleScript;
					};
					modules: Folder & {
						React: ModuleScript;
						Promise: ModuleScript;
						ReactRoblox: ModuleScript;
					};
					types: ModuleScript;
					sync: ModuleScript & {
						validate: ModuleScript;
						client: ModuleScript;
						patch: ModuleScript;
						server: ModuleScript;
					};
					subscribe: ModuleScript;
					react: Folder & {
						useAtom: ModuleScript;
					};
					computed: ModuleScript;
					store: ModuleScript;
					__tests__: Folder & {
						react: Folder & {
							helpers: Folder & {
								renderHook: ModuleScript;
							};
						};
						benchmarks: Folder & {
							["atom.bench"]: ModuleScript;
						};
					};
				};
				["shared-components-flamework"]: Folder & {
					out: ModuleScript & {
						utilities: ModuleScript;
						remotes: ModuleScript;
						source: Folder & {
							["shared-component-handler"]: ModuleScript;
							decorators: Folder & {
								["only-server"]: ModuleScript;
								["only-client"]: ModuleScript;
							};
							pointer: ModuleScript;
							["shared-component"]: ModuleScript;
							network: ModuleScript & {
								action: ModuleScript;
								event: ModuleScript;
							};
						};
						types: ModuleScript;
					};
					LICENSE: StringValue;
				};
				["object-utils"]: ModuleScript;
				ripple: Folder & {
					src: ModuleScript & {
						config: ModuleScript;
						solvers: Folder & {
							tween: ModuleScript;
							spring: ModuleScript;
							linear: ModuleScript;
							immediate: ModuleScript;
						};
						utils: Folder & {
							assign: ModuleScript;
							spy: ModuleScript;
							snapshot: ModuleScript;
							intermediate: ModuleScript;
							merge: ModuleScript;
						};
						createMotion: ModuleScript;
						types: ModuleScript;
					};
				};
				["react-reflex"]: ModuleScript & {
					React: ModuleScript;
					hooks: Folder & {
						useSelector: ModuleScript;
						useSelectorCreator: ModuleScript;
						useProducer: ModuleScript;
					};
					components: Folder & {
						ReflexContext: ModuleScript;
						ReflexProvider: ModuleScript;
					};
					Reflex: ModuleScript;
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				["pretty-react-hooks"]: Folder & {
					out: ModuleScript & {
						["use-latest"]: ModuleScript & {
							["use-latest"]: ModuleScript;
						};
						utils: Folder & {
							binding: ModuleScript;
							hoarcekat: ModuleScript;
							["shallow-equal"]: ModuleScript;
							math: ModuleScript;
							testez: ModuleScript;
						};
						["use-binding-state"]: ModuleScript & {
							["use-binding-state"]: ModuleScript;
						};
						["use-unmount-effect"]: ModuleScript & {
							["use-unmount-effect"]: ModuleScript;
						};
						["use-update-effect"]: ModuleScript & {
							["use-update-effect"]: ModuleScript;
						};
						["use-previous"]: ModuleScript & {
							["use-previous"]: ModuleScript;
						};
						["use-interval"]: ModuleScript & {
							["use-interval"]: ModuleScript;
						};
						["use-debounce-callback"]: ModuleScript & {
							["use-debounce-callback"]: ModuleScript;
						};
						["use-spring"]: ModuleScript & {
							["use-spring"]: ModuleScript;
						};
						["use-motion"]: ModuleScript & {
							["use-motion"]: ModuleScript;
						};
						["use-defer-state"]: ModuleScript & {
							["use-defer-state"]: ModuleScript;
						};
						["use-tagged"]: ModuleScript & {
							["use-tagged"]: ModuleScript;
						};
						["use-key-press"]: ModuleScript & {
							["use-key-press"]: ModuleScript;
						};
						["use-timeout"]: ModuleScript & {
							["use-timeout"]: ModuleScript;
						};
						["use-composed-ref"]: ModuleScript & {
							["use-composed-ref"]: ModuleScript;
						};
						["use-async-callback"]: ModuleScript & {
							["use-async-callback"]: ModuleScript;
						};
						["use-throttle-state"]: ModuleScript & {
							["use-throttle-state"]: ModuleScript;
						};
						["use-defer-callback"]: ModuleScript & {
							["use-defer-callback"]: ModuleScript;
						};
						["use-latest-callback"]: ModuleScript & {
							["use-latest-callback"]: ModuleScript;
						};
						["use-event-listener"]: ModuleScript & {
							["use-event-listener"]: ModuleScript;
						};
						["use-throttle-callback"]: ModuleScript & {
							["use-throttle-callback"]: ModuleScript;
						};
						["use-update"]: ModuleScript & {
							["use-update"]: ModuleScript;
						};
						["use-async-effect"]: ModuleScript & {
							["use-async-effect"]: ModuleScript;
						};
						["use-binding-listener"]: ModuleScript & {
							["use-binding-listener"]: ModuleScript;
						};
						["use-async"]: ModuleScript & {
							["use-async"]: ModuleScript;
						};
						["use-viewport"]: ModuleScript & {
							["use-viewport"]: ModuleScript;
						};
						["use-debounce-effect"]: ModuleScript & {
							["use-debounce-effect"]: ModuleScript;
						};
						["use-throttle-effect"]: ModuleScript & {
							["use-throttle-effect"]: ModuleScript;
						};
						["use-defer-effect"]: ModuleScript & {
							["use-defer-effect"]: ModuleScript;
						};
						["use-debounce-state"]: ModuleScript & {
							["use-debounce-state"]: ModuleScript;
						};
						["use-timer"]: ModuleScript & {
							["use-timer"]: ModuleScript;
						};
						["use-lifetime"]: ModuleScript & {
							["use-lifetime"]: ModuleScript;
						};
						["use-camera"]: ModuleScript & {
							["use-camera"]: ModuleScript;
						};
						["use-mount-effect"]: ModuleScript & {
							["use-mount-effect"]: ModuleScript;
						};
						["use-mouse"]: ModuleScript & {
							["use-mouse"]: ModuleScript;
						};
					};
				};
				beacon: Folder & {
					out: ModuleScript;
				};
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				maid: Folder & {
					Maid: ModuleScript;
				};
				["promise-character"]: ModuleScript & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							["compiler-types"]: Folder & {
								types: Folder;
							};
						};
					};
				};
				react: ModuleScript & {
					tags: ModuleScript;
				};
				["signals-tooling"]: Folder & {
					out: ModuleScript & {
						Interfaces: Folder;
						Implementation: Folder & {
							ConnectionManager: ModuleScript;
							Signal: ModuleScript;
						};
						Functions: Folder & {
							ListenOnce: ModuleScript;
							WaitForFirstSignal: ModuleScript;
						};
					};
				};
				remo: Folder & {
					src: ModuleScript & {
						getSender: ModuleScript;
						Promise: ModuleScript;
						builder: ModuleScript;
						constants: ModuleScript;
						utils: Folder & {
							compose: ModuleScript;
							testRemote: ModuleScript;
							mockRemotes: ModuleScript;
							unwrap: ModuleScript;
							instances: ModuleScript;
						};
						types: ModuleScript;
						server: ModuleScript & {
							createRemote: ModuleScript;
							createAsyncRemote: ModuleScript;
						};
						container: Configuration;
						client: ModuleScript & {
							createRemote: ModuleScript;
							createAsyncRemote: ModuleScript;
						};
						middleware: Folder & {
							loggerMiddleware: ModuleScript;
							throttleMiddleware: ModuleScript;
						};
						createRemotes: ModuleScript;
					};
				};
				["react-roblox"]: ModuleScript;
				reflex: Folder & {
					src: ModuleScript & {
						createProducer: ModuleScript;
						broadcast: ModuleScript & {
							createBroadcastReceiver: ModuleScript;
							createBroadcaster: ModuleScript;
							hydrate: ModuleScript;
						};
						Promise: ModuleScript;
						createSelector: ModuleScript;
						utils: Folder & {
							shallowEqual: ModuleScript;
							testSelector: ModuleScript;
							createSelectArrayDiffs: ModuleScript;
							setInterval: ModuleScript;
						};
						combineProducers: ModuleScript;
						middleware: Folder & {
							loggerMiddleware: ModuleScript;
						};
						applyMiddleware: ModuleScript;
						types: ModuleScript;
					};
				};
				testez: Folder & {
					src: ModuleScript & {
						TestPlanner: ModuleScript;
						TestResults: ModuleScript;
						TestRunner: ModuleScript;
						TestBootstrap: ModuleScript;
						TestSession: ModuleScript;
						LifecycleHooks: ModuleScript;
						Reporters: Folder & {
							TextReporter: ModuleScript;
							TextReporterQuiet: ModuleScript;
							TeamCityReporter: ModuleScript;
						};
						TestPlan: ModuleScript;
						TestEnum: ModuleScript;
						ExpectationContext: ModuleScript;
						Context: ModuleScript;
						Expectation: ModuleScript;
					};
				};
				timer: Folder & {
					out: ModuleScript & {
						Interfaces: Folder;
						Implementation: Folder & {
							Timer: ModuleScript;
						};
						Data: Folder & {
							Enums: ModuleScript;
						};
					};
				};
				dumpster: Folder & {
					Dumpster: ModuleScript;
				};
				services: ModuleScript;
				vide: Folder & {
					src: ModuleScript & {
						defaults: ModuleScript;
						action: ModuleScript;
						mount: ModuleScript;
						changed: ModuleScript;
						bind: ModuleScript;
						jsx: ModuleScript;
						tags: ModuleScript;
						show: ModuleScript;
						apply: ModuleScript;
						untrack: ModuleScript;
						graph: ModuleScript;
						maps: ModuleScript;
						effect: ModuleScript;
						root: ModuleScript;
						["switch"]: ModuleScript;
						derive: ModuleScript;
						spring: ModuleScript;
						flags: ModuleScript;
						read: ModuleScript;
						source: ModuleScript;
						["throw"]: ModuleScript;
						cleanup: ModuleScript;
						create: ModuleScript;
						components: ModuleScript;
						batch: ModuleScript;
					};
				};
				centurion: Folder & {
					out: ModuleScript & {
						client: ModuleScript & {
							core: ModuleScript;
							registry: ModuleScript;
							dispatcher: ModuleScript;
							command: ModuleScript;
							util: ModuleScript;
							builtin: Folder & {
								commands: Folder & {
									centurion: ModuleScript;
									clear: ModuleScript;
								};
							};
							types: ModuleScript;
						};
						shared: ModuleScript & {
							core: ModuleScript & {
								type: ModuleScript;
								path: ModuleScript;
								dispatcher: ModuleScript;
								registry: ModuleScript;
								decorators: ModuleScript;
								command: ModuleScript;
								context: ModuleScript;
								metadata: ModuleScript;
							};
							config: ModuleScript;
							network: ModuleScript;
							util: ModuleScript & {
								string: ModuleScript;
								inspect: ModuleScript;
								data: ModuleScript;
								log: ModuleScript;
							};
							builtin: ModuleScript & {
								types: ModuleScript & {
									players: ModuleScript;
									color: ModuleScript;
									duration: ModuleScript;
									team: ModuleScript;
									primitives: ModuleScript;
								};
							};
							types: ModuleScript;
						};
						server: ModuleScript & {
							core: ModuleScript;
							registry: ModuleScript;
							dispatcher: ModuleScript;
							types: ModuleScript;
						};
					};
				};
				profileservice: Folder & {
					src: ModuleScript;
				};
				janitor: Folder & {
					src: ModuleScript;
				};
				["centurion-ui"]: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							charm: Folder & {
								src: ModuleScript & {
									mapped: ModuleScript;
									atom: ModuleScript;
									effect: ModuleScript;
									observe: ModuleScript;
									modules: Folder & {
										React: ModuleScript;
										Promise: ModuleScript;
										ReactRoblox: ModuleScript;
									};
									utils: Folder & {
										collect: ModuleScript;
										count: ModuleScript;
										setInterval: ModuleScript;
									};
									sync: ModuleScript & {
										validate: ModuleScript;
										client: ModuleScript;
										patch: ModuleScript;
										server: ModuleScript;
									};
									subscribe: ModuleScript;
									react: Folder & {
										useAtom: ModuleScript;
									};
									computed: ModuleScript;
									store: ModuleScript;
									types: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						hooks: Folder & {
							["use-event"]: ModuleScript;
							["use-client"]: ModuleScript;
							["use-px"]: ModuleScript;
							["use-text-bounds"]: ModuleScript;
							["use-atom"]: ModuleScript;
							["use-history"]: ModuleScript;
						};
						app: ModuleScript & {
							["centurion-app"]: ModuleScript;
						};
						utils: Folder & {
							string: ModuleScript;
						};
						types: ModuleScript;
						store: ModuleScript;
						palette: ModuleScript;
						components: ModuleScript & {
							ui: Folder & {
								outline: ModuleScript;
								text: ModuleScript;
								["text-field"]: ModuleScript;
								["scrolling-frame"]: ModuleScript;
								group: ModuleScript;
								layer: ModuleScript;
								padding: ModuleScript;
								frame: ModuleScript;
							};
							history: ModuleScript & {
								["history-line"]: ModuleScript;
								["history-list"]: ModuleScript;
							};
							terminal: ModuleScript & {
								command: ModuleScript;
								terminal: ModuleScript;
								suggestion: ModuleScript;
								["terminal-text-field"]: ModuleScript & {
									suggestion: ModuleScript;
									["terminal-text-field"]: ModuleScript;
								};
							};
							suggestions: ModuleScript & {
								badge: ModuleScript;
								["main-suggestion"]: ModuleScript;
								["suggestion-list"]: ModuleScript;
								suggestions: ModuleScript;
								util: ModuleScript;
								types: ModuleScript;
							};
						};
						constants: Folder & {
							text: ModuleScript;
							options: ModuleScript;
							util: ModuleScript;
						};
					};
				};
				sift: Folder & {
					out: ModuleScript & {
						Dictionary: ModuleScript & {
							includes: ModuleScript;
							flip: ModuleScript;
							every: ModuleScript;
							update: ModuleScript;
							equalsDeep: ModuleScript;
							flatten: ModuleScript;
							copy: ModuleScript;
							mergeDeep: ModuleScript;
							values: ModuleScript;
							keys: ModuleScript;
							copyDeep: ModuleScript;
							some: ModuleScript;
							freeze: ModuleScript;
							map: ModuleScript;
							removeValue: ModuleScript;
							fromEntries: ModuleScript;
							freezeDeep: ModuleScript;
							set: ModuleScript;
							removeValues: ModuleScript;
							fromArrays: ModuleScript;
							entries: ModuleScript;
							removeKeys: ModuleScript;
							removeKey: ModuleScript;
							count: ModuleScript;
							filter: ModuleScript;
							has: ModuleScript;
							withKeys: ModuleScript;
							equals: ModuleScript;
							merge: ModuleScript;
						};
						Set: ModuleScript & {
							map: ModuleScript;
							["delete"]: ModuleScript;
							differenceSymmetric: ModuleScript;
							intersection: ModuleScript;
							fromArray: ModuleScript;
							toArray: ModuleScript;
							isSuperset: ModuleScript;
							merge: ModuleScript;
							copy: ModuleScript;
							count: ModuleScript;
							filter: ModuleScript;
							has: ModuleScript;
							isSubset: ModuleScript;
							difference: ModuleScript;
							add: ModuleScript;
						};
						Types: ModuleScript;
						Array: ModuleScript & {
							last: ModuleScript;
							shuffle: ModuleScript;
							is: ModuleScript;
							concatDeep: ModuleScript;
							update: ModuleScript;
							copy: ModuleScript;
							reduceRight: ModuleScript;
							copyDeep: ModuleScript;
							map: ModuleScript;
							removeValue: ModuleScript;
							equals: ModuleScript;
							first: ModuleScript;
							find: ModuleScript;
							removeIndex: ModuleScript;
							count: ModuleScript;
							reverse: ModuleScript;
							zipAll: ModuleScript;
							includes: ModuleScript;
							removeValues: ModuleScript;
							zip: ModuleScript;
							unshift: ModuleScript;
							toSet: ModuleScript;
							equalsDeep: ModuleScript;
							flatten: ModuleScript;
							splice: ModuleScript;
							sort: ModuleScript;
							difference: ModuleScript;
							freezeDeep: ModuleScript;
							slice: ModuleScript;
							findLast: ModuleScript;
							freeze: ModuleScript;
							findWhere: ModuleScript;
							removeIndices: ModuleScript;
							findWhereLast: ModuleScript;
							shift: ModuleScript;
							pop: ModuleScript;
							set: ModuleScript;
							create: ModuleScript;
							every: ModuleScript;
							at: ModuleScript;
							push: ModuleScript;
							insert: ModuleScript;
							filter: ModuleScript;
							differenceSymmetric: ModuleScript;
							concat: ModuleScript;
							reduce: ModuleScript;
							some: ModuleScript;
						};
						Util: ModuleScript & {
							equalObjects: ModuleScript;
							isEmpty: ModuleScript;
							func: ModuleScript;
						};
						None: ModuleScript;
					};
				};
				["validate-tree"]: ModuleScript;
				["set-timeout"]: Folder & {
					out: ModuleScript & {
						["set-countdown"]: ModuleScript;
						["set-interval"]: ModuleScript;
						["debounce.spec"]: ModuleScript;
						["set-timeout"]: ModuleScript;
						throttle: ModuleScript;
						["set-timeout.spec"]: ModuleScript;
						["throttle.spec"]: ModuleScript;
						["set-interval.spec"]: ModuleScript;
						["set-countdown.spec"]: ModuleScript;
						debounce: ModuleScript;
					};
				};
				["message-templates"]: Folder & {
					out: ModuleScript & {
						MessageTemplateRenderer: ModuleScript;
						PlainTextMessageTemplateRenderer: ModuleScript;
						RbxSerializer: ModuleScript;
						MessageTemplate: ModuleScript;
						MessageTemplateToken: ModuleScript;
						MessageTemplateParser: ModuleScript;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				trove: Folder & {
					out: ModuleScript;
				};
				ReactLua: Folder & {
					node_modules: Folder & {
						["@jsdotlua"]: Folder & {
							number: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									MAX_SAFE_INTEGER: ModuleScript;
									isSafeInteger: ModuleScript;
									toExponential: ModuleScript;
									isNaN: ModuleScript;
									isInteger: ModuleScript;
									isFinite: ModuleScript;
									MIN_SAFE_INTEGER: ModuleScript;
								};
							};
							console: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									makeConsoleImpl: ModuleScript;
								};
							};
							["react-roblox"]: ModuleScript & {
								client: Folder & {
									roblox: Folder & {
										RobloxComponentProps: ModuleScript;
										SingleEventManager: ModuleScript;
										getDefaultInstanceProperty: ModuleScript;
									};
									ReactRobloxHostConfig: ModuleScript;
									ReactRobloxRoot: ModuleScript;
									ReactRoblox: ModuleScript;
									ReactRobloxComponentTree: ModuleScript;
									["ReactRobloxHostTypes.roblox"]: ModuleScript;
									ReactRobloxComponent: ModuleScript;
								};
								["ReactReconciler.roblox"]: ModuleScript;
							};
							["react-devtools-shared"]: ModuleScript & {
								hook: ModuleScript;
								bridge: ModuleScript;
								constants: ModuleScript;
								utils: ModuleScript;
								devtools: ModuleScript & {
									views: Folder & {
										Components: Folder & {
											types: ModuleScript;
										};
										Profiler: Folder & {
											InteractionsChartBuilder: ModuleScript;
											utils: ModuleScript;
											CommitTreeBuilder: ModuleScript;
											RankedChartBuilder: ModuleScript;
											FlamegraphChartBuilder: ModuleScript;
											types: ModuleScript;
										};
									};
									utils: ModuleScript;
									cache: ModuleScript;
									types: ModuleScript;
									ProfilingCache: ModuleScript;
									store: ModuleScript;
									ProfilerStore: ModuleScript;
								};
								events: ModuleScript;
								hydration: ModuleScript;
								["clipboardjs.mock"]: ModuleScript;
								storage: ModuleScript;
								backend: ModuleScript & {
									console: ModuleScript;
									utils: ModuleScript;
									ReactSymbols: ModuleScript;
									renderer: ModuleScript;
									agent: ModuleScript;
									NativeStyleEditor: Folder & {
										types: ModuleScript;
									};
									types: ModuleScript;
								};
								types: ModuleScript;
							};
							["instance-of"]: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									["instanceof"]: ModuleScript;
								};
							};
							["react-cache"]: ModuleScript & {
								ReactCacheOld: ModuleScript;
								LRU: ModuleScript;
							};
							["luau-polyfill"]: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									Promise: ModuleScript;
									["extends"]: ModuleScript;
									AssertionError: ModuleScript & {
										["AssertionError.global"]: ModuleScript;
									};
									Error: ModuleScript & {
										["Error.global"]: ModuleScript;
									};
									encodeURIComponent: ModuleScript;
								};
							};
							math: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									clz32: ModuleScript;
								};
							};
							timers: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									makeIntervalImpl: ModuleScript;
									makeTimerImpl: ModuleScript;
								};
							};
							["react-test-renderer"]: ModuleScript & {
								ReactTestRenderer: ModuleScript;
								roblox: Folder & {
									RobloxComponentProps: ModuleScript;
								};
								ReactTestHostConfig: ModuleScript;
							};
							promise: Folder & {
								lib: ModuleScript;
								["package"]: ModuleScript;
							};
							string: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									endsWith: ModuleScript;
									indexOf: ModuleScript;
									lastIndexOf: ModuleScript;
									trimStart: ModuleScript;
									trim: ModuleScript;
									findOr: ModuleScript;
									substr: ModuleScript;
									slice: ModuleScript;
									startsWith: ModuleScript;
									charCodeAt: ModuleScript;
									trimEnd: ModuleScript;
									includes: ModuleScript;
									split: ModuleScript;
								};
							};
							shared: ModuleScript & {
								["UninitializedState.roblox"]: ModuleScript;
								console: ModuleScript;
								ReactComponentStackFrame: ModuleScript;
								invariant: ModuleScript;
								ReactTypes: ModuleScript;
								objectIs: ModuleScript;
								ReactInstanceMap: ModuleScript;
								["Type.roblox"]: ModuleScript;
								["ConsolePatchingDev.roblox"]: ModuleScript;
								["ErrorHandling.roblox"]: ModuleScript;
								shallowEqual: ModuleScript;
								ReactElementType: ModuleScript;
								isValidElementType: ModuleScript;
								invokeGuardedCallbackImpl: ModuleScript;
								getComponentName: ModuleScript;
								formatProdErrorMessage: ModuleScript;
								ReactFeatureFlags: ModuleScript;
								PropMarkers: Folder & {
									Change: ModuleScript;
									Event: ModuleScript;
									Tag: ModuleScript;
								};
								consoleWithStackDev: ModuleScript;
								ReactErrorUtils: ModuleScript;
								["enqueueTask.roblox"]: ModuleScript;
								checkPropTypes: ModuleScript;
								ReactSharedInternals: ModuleScript & {
									ReactDebugCurrentFrame: ModuleScript;
									ReactCurrentOwner: ModuleScript;
									ReactCurrentDispatcher: ModuleScript;
									IsSomeRendererActing: ModuleScript;
									ReactCurrentBatchConfig: ModuleScript;
								};
								ReactVersion: ModuleScript;
								ReactSymbols: ModuleScript;
								["flowtypes.roblox"]: ModuleScript;
								["Symbol.roblox"]: ModuleScript;
								ExecutionEnvironment: ModuleScript;
								ReactFiberHostConfig: ModuleScript & {
									WithNoTestSelectors: ModuleScript;
									WithNoHydration: ModuleScript;
									WithNoPersistence: ModuleScript;
								};
							};
							scheduler: ModuleScript & {
								SchedulerPriorities: ModuleScript;
								TracingSubscriptions: ModuleScript;
								SchedulerMinHeap: ModuleScript;
								Scheduler: ModuleScript;
								Tracing: ModuleScript;
								forks: Folder & {
									["SchedulerHostConfig.mock"]: ModuleScript;
									["SchedulerHostConfig.default"]: ModuleScript;
								};
								unstable_mock: ModuleScript;
								SchedulerProfiling: ModuleScript;
								SchedulerHostConfig: ModuleScript;
								SchedulerFeatureFlags: ModuleScript;
							};
							["roact-compat"]: ModuleScript & {
								warnOnce: ModuleScript;
								Portal: ModuleScript;
								setGlobalConfig: ModuleScript;
								oneChild: ModuleScript;
								createFragment: ModuleScript;
								RoactTree: ModuleScript;
							};
							["react-shallow-renderer"]: ModuleScript;
							collections: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									Map: ModuleScript & {
										Map: ModuleScript;
										coerceToTable: ModuleScript;
										coerceToMap: ModuleScript;
									};
									Object: ModuleScript & {
										values: ModuleScript;
										assign: ModuleScript;
										is: ModuleScript;
										seal: ModuleScript;
										entries: ModuleScript;
										preventExtensions: ModuleScript;
										isFrozen: ModuleScript;
										keys: ModuleScript;
										freeze: ModuleScript;
										None: ModuleScript;
									};
									Set: ModuleScript;
									Array: ModuleScript & {
										flat: ModuleScript;
										indexOf: ModuleScript;
										every: ModuleScript;
										slice: ModuleScript;
										sort: ModuleScript;
										shift: ModuleScript;
										map: ModuleScript;
										isArray: ModuleScript;
										findIndex: ModuleScript;
										unshift: ModuleScript;
										splice: ModuleScript;
										filter: ModuleScript;
										find: ModuleScript;
										forEach: ModuleScript;
										reverse: ModuleScript;
										includes: ModuleScript;
										concat: ModuleScript;
										from: ModuleScript & {
											fromString: ModuleScript;
											fromArray: ModuleScript;
											fromSet: ModuleScript;
											fromMap: ModuleScript;
										};
										join: ModuleScript;
										flatMap: ModuleScript;
										reduce: ModuleScript;
										some: ModuleScript;
									};
									inspect: ModuleScript;
									WeakMap: ModuleScript;
								};
							};
							["react-devtools-extensions"]: ModuleScript & {
								backend: ModuleScript;
							};
							["react-reconciler"]: ModuleScript & {
								ReactRootTags: ModuleScript;
								["ReactFiberDevToolsHook.new"]: ModuleScript;
								["ReactFiberWorkLoop.new"]: ModuleScript;
								ReactTestSelectors: ModuleScript;
								["ReactFiberHotReloading.new"]: ModuleScript;
								ReactCapturedValue: ModuleScript;
								["ReactFiberUnwindWork.new"]: ModuleScript;
								["ReactFiberNewContext.new"]: ModuleScript;
								["ReactProfilerTimer.new"]: ModuleScript;
								ReactInternalTypes: ModuleScript;
								["ReactFiber.new"]: ModuleScript;
								["ReactFiberCommitWork.new"]: ModuleScript;
								ReactFiberTransition: ModuleScript;
								forks: Folder & {
									["ReactFiberHostConfig.test"]: ModuleScript;
								};
								["ReactStrictModeWarnings.new"]: ModuleScript;
								ReactPortal: ModuleScript;
								SchedulingProfiler: ModuleScript;
								["SchedulerWithReactIntegration.new"]: ModuleScript;
								ReactWorkTags: ModuleScript;
								ReactFiberHostConfig: ModuleScript;
								ReactTypeOfMode: ModuleScript;
								ReactFiberOffscreenComponent: ModuleScript;
								["ReactUpdateQueue.new"]: ModuleScript;
								ReactFiberLane: ModuleScript;
								["ReactFiberClassComponent.new"]: ModuleScript;
								ReactHookEffectTags: ModuleScript;
								ReactFiberWorkInProgress: ModuleScript;
								ReactFiberTreeReflection: ModuleScript;
								["ReactChildFiber.new"]: ModuleScript;
								MaxInts: ModuleScript;
								["ReactFiberLazyComponent.new"]: ModuleScript;
								ReactFiberErrorDialog: ModuleScript;
								["ReactFiberBeginWork.new"]: ModuleScript;
								ReactFiberFlags: ModuleScript;
								DebugTracing: ModuleScript;
								ReactFiberErrorLogger: ModuleScript;
								["ReactFiberHooks.new"]: ModuleScript;
								["ReactFiberSchedulerPriorities.roblox"]: ModuleScript;
								["ReactFiberHydrationContext.new"]: ModuleScript;
								ReactFiberReconciler: ModuleScript;
								["ReactFiberContext.new"]: ModuleScript;
								["ReactFiberSuspenseContext.new"]: ModuleScript;
								["ReactFiberStack.new"]: ModuleScript;
								["ReactFiberHostContext.new"]: ModuleScript;
								["ReactMutableSource.new"]: ModuleScript;
								ReactCurrentFiber: ModuleScript;
								ReactFiberComponentStack: ModuleScript;
								["ReactFiberSuspenseComponent.new"]: ModuleScript;
								["ReactFiberCompleteWork.new"]: ModuleScript;
								["ReactFiberReconciler.new"]: ModuleScript;
								["ReactFiberRoot.new"]: ModuleScript;
								["ReactFiberThrow.new"]: ModuleScript;
							};
							["react-is"]: ModuleScript;
							react: ModuleScript & {
								["None.roblox"]: ModuleScript;
								ReactLazy: ModuleScript;
								ReactElementValidator: ModuleScript;
								["createSignal.roblox"]: ModuleScript;
								ReactElement: ModuleScript;
								ReactMutableSource: ModuleScript;
								ReactContext: ModuleScript;
								ReactBaseClasses: ModuleScript;
								ReactNoopUpdateQueue: ModuleScript;
								ReactMemo: ModuleScript;
								ReactCreateRef: ModuleScript;
								ReactForwardRef: ModuleScript;
								React: ModuleScript;
								["ReactBinding.roblox"]: ModuleScript;
								ReactHooks: ModuleScript;
								ReactChildren: ModuleScript;
							};
							["es7-types"]: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript;
							};
							boolean: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									toJSBoolean: ModuleScript;
								};
							};
							ReactDebugTools: ModuleScript & {
								ReactDebugTools: ModuleScript;
								ReactDebugHooks: ModuleScript;
							};
						};
						commander: Folder & {
							["package-support"]: ModuleScript;
							["package"]: ModuleScript;
							lib: Folder;
							typings: Folder;
						};
						[".luau-aliases"]: Folder & {
							["@jsdotlua"]: Folder & {
								number: ModuleScript;
								console: ModuleScript;
								["react-roblox"]: ModuleScript;
								["react-is"]: ModuleScript;
								["instance-of"]: ModuleScript;
								["react-cache"]: ModuleScript;
								["es7-types"]: ModuleScript;
								math: ModuleScript;
								["react-debug-tools"]: ModuleScript;
								["react-test-renderer"]: ModuleScript;
								promise: ModuleScript;
								timers: ModuleScript;
								string: ModuleScript;
								shared: ModuleScript;
								scheduler: ModuleScript;
								["roact-compat"]: ModuleScript;
								["react-reconciler"]: ModuleScript;
								["react-devtools-extensions"]: ModuleScript;
								["react-shallow-renderer"]: ModuleScript;
								collections: ModuleScript;
								react: ModuleScript;
								["react-devtools-shared"]: ModuleScript;
								boolean: ModuleScript;
								["luau-polyfill"]: ModuleScript;
							};
							["symbol-luau"]: ModuleScript;
						};
						["symbol-luau"]: Folder & {
							["package"]: ModuleScript;
							src: ModuleScript & {
								["Registry.global"]: ModuleScript;
								Symbol: ModuleScript;
							};
							LICENSE: StringValue;
						};
						npmluau: Folder & {
							["package"]: ModuleScript;
							src: Folder;
							["luau-types-re-export"]: Folder & {
								pkg: Folder & {
									["package"]: ModuleScript;
								};
							};
							LICENSE: StringValue;
						};
						walkdir: Folder & {
							["package"]: ModuleScript;
							test: Folder & {
								dir: Folder & {
									["nested-symlink"]: Folder;
									symlinks: Folder & {
										dir1: Folder;
										dir2: Folder;
									};
									foo: Folder & {
										a: Folder & {
											b: Folder & {
												c: Folder;
											};
										};
									};
								};
								comparison: Folder & {
									["package"]: ModuleScript;
								};
							};
						};
						[".bin"]: Folder;
					};
					Shared: ModuleScript;
					ReactRoblox: ModuleScript;
					ReactDevtoolsShared: ModuleScript;
					ReactIs: ModuleScript;
					ReactDebugTools: ModuleScript;
					ReactReconciler: ModuleScript;
					ReactDevtoolsExtensions: ModuleScript;
					Scheduler: ModuleScript;
					ReactTestRenderer: ModuleScript;
					React: ModuleScript;
					ReactShallowRenderer: ModuleScript;
					RoactCompat: ModuleScript;
					ReactCache: ModuleScript;
				};
				immut: Folder & {
					src: ModuleScript & {
						["original.spec"]: ModuleScript;
						["finishDraft.spec"]: ModuleScript;
						produce: ModuleScript;
						["makeDraftSafe.spec"]: ModuleScript;
						constants: ModuleScript;
						getClone: ModuleScript;
						table: ModuleScript;
						["isDraftable.spec"]: ModuleScript;
						original: ModuleScript;
						["getClone.spec"]: ModuleScript;
						isDraft: ModuleScript;
						makeDraftSafeReadOnly: ModuleScript;
						Draft: ModuleScript;
						finishDraft: ModuleScript;
						isDraftable: ModuleScript;
						["makeDraftSafeReadOnly.spec"]: ModuleScript;
						["produce.spec"]: ModuleScript;
						makeDraftSafe: ModuleScript;
						["init.spec"]: ModuleScript;
						["Draft.spec"]: ModuleScript;
						["isDraft.spec"]: ModuleScript;
						None: ModuleScript;
					};
				};
				cmdr: Folder & {
					Cmdr: ModuleScript & {
						CreateGui: ModuleScript;
						Shared: Folder & {
							Registry: ModuleScript;
							Dispatcher: ModuleScript;
							Command: ModuleScript;
							Argument: ModuleScript;
							Util: ModuleScript;
						};
						BuiltInTypes: Folder & {
							PlayerId: ModuleScript;
							URL: ModuleScript;
							Duration: ModuleScript;
							StoredKey: ModuleScript;
							Primitives: ModuleScript;
							Vector: ModuleScript;
							Command: ModuleScript;
							ConditionFunction: ModuleScript;
							JSON: ModuleScript;
							Type: ModuleScript;
							UserInput: ModuleScript;
							Player: ModuleScript;
							Color3: ModuleScript;
							Team: ModuleScript;
							BindableResource: ModuleScript;
							MathOperator: ModuleScript;
							BrickColor: ModuleScript;
						};
						BuiltInCommands: Folder & {
							help: ModuleScript;
							Admin: Folder & {
								gotoPlaceServer: ModuleScript;
								kill: ModuleScript;
								teleport: ModuleScript;
								kickServer: ModuleScript;
								killServer: ModuleScript;
								respawn: ModuleScript;
								respawnServer: ModuleScript;
								gotoPlace: ModuleScript;
								kick: ModuleScript;
								teleportServer: ModuleScript;
								announce: ModuleScript;
								announceServer: ModuleScript;
							};
							Debug: Folder & {
								getPlayerPlaceInstance: ModuleScript;
								version: ModuleScript;
								thru: ModuleScript;
								blink: ModuleScript;
								uptime: ModuleScript;
								position: ModuleScript;
								fetchServer: ModuleScript;
								uptimeServer: ModuleScript;
								getPlayerPlaceInstanceServer: ModuleScript;
								fetch: ModuleScript;
							};
							Utility: Folder & {
								rand: ModuleScript;
								jsonArrayEncode: ModuleScript;
								pick: ModuleScript;
								echo: ModuleScript;
								bind: ModuleScript;
								["var"]: ModuleScript;
								math: ModuleScript;
								alias: ModuleScript;
								clear: ModuleScript;
								varSetServer: ModuleScript;
								varServer: ModuleScript;
								jsonArrayDecode: ModuleScript;
								varSet: ModuleScript;
								unbind: ModuleScript;
								run: ModuleScript;
								runLines: ModuleScript;
								runif: ModuleScript;
								history: ModuleScript;
								hover: ModuleScript;
								replace: ModuleScript;
								len: ModuleScript;
								resolve: ModuleScript;
								convertTimestamp: ModuleScript;
								edit: ModuleScript;
							};
						};
						CmdrClient: ModuleScript & {
							CmdrInterface: ModuleScript & {
								AutoComplete: ModuleScript;
								Window: ModuleScript;
							};
							DefaultEventHandlers: ModuleScript;
						};
						Initialize: ModuleScript;
					};
					TS: ModuleScript;
				};
				signal: ModuleScript;
			};
			["@flamework"]: Folder & {
				core: Folder & {
					out: ModuleScript & {
						flamework: ModuleScript;
						utility: ModuleScript;
						reflect: ModuleScript;
						modding: ModuleScript;
						metadata: ModuleScript;
					};
				};
				components: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						components: ModuleScript;
						baseComponent: ModuleScript;
						componentTracker: ModuleScript;
						utility: ModuleScript;
					};
				};
				networking: Folder & {
					out: ModuleScript & {
						["function"]: Folder & {
							createFunctionSender: ModuleScript;
							createFunctionReceiver: ModuleScript;
							errors: ModuleScript;
						};
						events: Folder & {
							createServerMethod: ModuleScript;
							createNetworkingEvent: ModuleScript;
							createGenericHandler: ModuleScript;
							createClientMethod: ModuleScript;
						};
						functions: Folder & {
							createServerMethod: ModuleScript;
							createNetworkingFunction: ModuleScript;
							createGenericHandler: ModuleScript;
							createClientMethod: ModuleScript;
						};
						util: Folder & {
							createSignalContainer: ModuleScript;
							getNamespaceConfig: ModuleScript;
							timeoutPromise: ModuleScript;
						};
						event: Folder & {
							createEvent: ModuleScript;
							createRemoteInstance: ModuleScript;
						};
						middleware: Folder & {
							createMiddlewareProcessor: ModuleScript;
							createGuardMiddleware: ModuleScript;
							skip: ModuleScript;
						};
					};
				};
			};
		};
		Promise: ModuleScript;
		RuntimeLib: ModuleScript;
	};
}
