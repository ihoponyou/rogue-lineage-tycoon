interface ServerStorage extends Instance {
	TagList: Folder & {
		Lava: Configuration;
		ArmorPortal: Configuration;
		Plot: Configuration;
		Model: Configuration;
	};
	Source: Folder & {
		services: Folder & {
			["daylight-service"]: ModuleScript;
			["data-service"]: ModuleScript;
			["reset-service"]: ModuleScript;
			["currency-service"]: ModuleScript;
			["group-service"]: ModuleScript;
			["lifecycle-service"]: ModuleScript;
			["player-service"]: ModuleScript;
			["mana-service"]: ModuleScript;
			["identity-service"]: ModuleScript;
		};
		cmdr: Folder & {
			types: Folder & {
				currency: ModuleScript;
			};
			commands: Folder & {
				giveMoneyServer: ModuleScript;
				giveMoney: ModuleScript;
			};
		};
		configs: Folder & {
			armors: ModuleScript;
			races: ModuleScript;
			group: ModuleScript;
			tycoon: ModuleScript;
			names: ModuleScript;
		};
		components: Folder & {
			carriable: ModuleScript;
			interactable: ModuleScript & {
				["click-interactable"]: ModuleScript;
				["input-based-interactable"]: ModuleScript;
				["key-interactable"]: ModuleScript;
				touchable: ModuleScript & {
					["touchable-part"]: ModuleScript;
					["touchable-model"]: ModuleScript;
				};
			};
			injury: ModuleScript & {
				frostbite: ModuleScript;
				burning: ModuleScript;
				["burn-scar"]: ModuleScript;
			};
			["player-server"]: ModuleScript;
			["fall-damage"]: ModuleScript;
			grippable: ModuleScript;
			world: Folder & {
				["armor-portal"]: ModuleScript;
				climate: ModuleScript;
				lava: ModuleScript;
			};
			["character-server"]: ModuleScript;
			tycoon: Folder & {
				pad: ModuleScript;
				furniture: ModuleScript;
				["asset-unlock"]: ModuleScript & {
					["furniture-unlock"]: ModuleScript;
					["ability-unlock"]: ModuleScript;
				};
				product: ModuleScript;
				plot: ModuleScript;
				asset: Folder;
				collector: ModuleScript;
				dropper: ModuleScript;
			};
			["ragdoll-server"]: ModuleScript;
		};
		networking: ModuleScript;
	};
	__Rojo_SessionLock: ObjectValue;
	["ROGUE ASSETS"]: Folder & {
		Helmets: Folder & {
			Pumpkin_Helmet: Hat & {
				Handle: MeshPart & {
					Stem: MeshPart & {
						Weld: Weld;
					};
					PumpkinHelment: MeshPart;
					TouchInterest: TouchTransmitter;
				};
			};
			Deepknight_Helmet: Accessory & {
				Handle: MeshPart & {
					OriginalSize: Vector3Value;
					TouchInterest: TouchTransmitter;
				};
			};
			White_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			Tan_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			Church_Helmet: Accessory & {
				Handle: MeshPart & {
					OriginalSize: Vector3Value;
					TouchInterest: TouchTransmitter;
				};
			};
			Darksigil_Helmet: Accessory & {
				Handle: MeshPart & {
					OriginalSize: Vector3Value;
					TouchInterest: TouchTransmitter;
				};
			};
			Bucket_Helmet: Accessory & {
				Handle: MeshPart & {
					OriginalSize: Vector3Value;
					TouchInterest: TouchTransmitter;
				};
			};
			Dark_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			Purple_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			Sigil_Helmet: Accessory & {
				Handle: MeshPart & {
					OriginalSize: Vector3Value;
					TouchInterest: TouchTransmitter;
				};
			};
			Orange_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
		};
		CharacterParticles: Folder & {
			Injure: ParticleEmitter;
			RubyEnchantEffect: ParticleEmitter;
			DarkMatter: ParticleEmitter;
			SeraphBloodHit: ParticleEmitter;
			YellowLightning1: ParticleEmitter;
			GaianBloodHit: ParticleEmitter;
			NightstoneEnchantEffect: ParticleEmitter;
			Ignis: ParticleEmitter;
			DragonCrusher: ParticleEmitter;
			FischeranBloodHit: ParticleEmitter;
			HolyEmit: ParticleEmitter;
			PoisonParticle: ParticleEmitter;
			BlockHit: ParticleEmitter;
			BloodHit: ParticleEmitter;
			GreenCharge: ParticleEmitter;
			DarkBurning: ParticleEmitter;
			EmeraldEnchantEffect: ParticleEmitter;
			ConstructBloodHit: ParticleEmitter;
			FireFist: ParticleEmitter;
			OpalEnchantEffect: ParticleEmitter;
			Lethality: ParticleEmitter;
			YellowLightning2: ParticleEmitter;
			Gelidus: ParticleEmitter;
			ChargePart: ParticleEmitter;
			ManaStopParticle: ParticleEmitter;
			SwordM2: ParticleEmitter;
			Hit: ParticleEmitter;
			DragonRoar: ParticleEmitter;
			Sparks: ParticleEmitter;
			Feathers: ParticleEmitter;
			Burning: ParticleEmitter;
		};
		Cowls: Folder & {
			Tan_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			Dark_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			Light_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			Orange_Cowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
		};
		AnimFolder: Folder & {
			PunchGrip: Animation;
			DJump: Animation;
			Spear: Folder & {
				Spear1: Animation;
				Spear2: Animation;
				Heavy: Animation;
				Spear3: Animation;
				Spear4: Animation;
			};
			BrokenLeg: Animation;
			Stun: Folder & {
				H2: Animation;
				H3: Animation;
				H1: Animation;
			};
			["M1(Old)"]: Folder & {
				P5: Animation;
				P4: Animation;
				P2: Animation;
				P3: Animation;
				Kick: Animation;
				P1: Animation;
			};
			AbyssDancer: Folder & {
				Heavy: Animation;
				Att2: Animation;
				Att1: Animation;
				Att3: Animation;
			};
			Dodge1: Animation;
			Run: Animation;
			Swim: Animation;
			HitAnims: Folder & {
				H2: Animation;
				H3: Animation;
				H4: Animation;
				H1: Animation;
			};
			Greatsword: Folder & {
				GreatswordHeavy: Animation;
				Greatsword2: Animation;
				Greatsword1: Animation;
				Greatsword3: Animation;
			};
			LordStance: Folder & {
				Att4: Animation;
				Att2: Animation;
				Att1: Animation;
				Att3: Animation;
			};
			Carrying: Animation;
			WraithSword: Folder & {
				Att4: Animation;
				Att3: Animation;
				Wraith2: Animation;
				Att1: Animation;
				Wraith3: Animation;
				Att2: Animation;
				WraithHeavy: Animation;
				Wraith1: Animation;
				Wraith4: Animation;
				WraithIdle: Animation;
			};
			Sword: Folder & {
				Att4: Animation;
				Att2: Animation;
				Att3: Animation;
				Att5: Animation;
				Att1: Animation;
			};
			Grip: Animation;
			Dodge2: Animation;
			Rapier: Folder & {
				Att4: Animation;
				Att2: Animation;
				Att3: Animation;
				Block: Animation;
				Att5: Animation;
				Att1: Animation;
				Heavy: Animation;
			};
			Dagger: Folder & {
				Dagger1: Animation;
				Dagger4: Animation;
				Block: Animation;
				DaggerHeavyAnim1: Animation;
				Dagger5: Animation;
				Dagger3: Animation;
				Dagger2: Animation;
			};
			Block: Folder & {
				BlockSanctumSpear: Animation;
				BlockRapier: Animation;
				BlockSword: Animation;
				BlockNormal: Animation;
			};
			ManaRun: Animation;
			["M1 (OLD22E23E)"]: Folder & {
				AirM2: Animation;
				AirM1: Animation;
				P5: Animation;
				P4: Animation;
				P2: Animation;
				P3: Animation;
				Kick: Animation;
				P1: Animation;
			};
			SanctumSpear: Folder & {
				Land: Animation;
				Spear1: Animation;
				Spear2: Animation;
				LoopAir: Animation;
				Spear3: Animation;
				Spear4: Animation;
			};
			GettingGripped: Animation;
			Pickup: Animation;
			Swimming: Animation;
			Reaper: Folder & {
				M2: Animation;
				Att2: Animation;
				Att1: Animation;
				Att3: Animation;
			};
			Carry: Animation;
			M1: Folder & {
				AirM2: Animation;
				AirM1: Animation;
				P5: Animation;
				P4: Animation;
				P2: Animation;
				P3: Animation;
				Kick: Animation;
				P1: Animation;
			};
			Throw: Animation;
			Abyss: Folder & {
				Heavy: Animation;
				Att1: Animation;
				Att3: Animation;
			};
			AdvancedFist: Folder & {
				AirM2: Animation;
				AirM1: Animation;
				P5: Animation;
				P4: Animation;
				P2: Animation;
				P3: Animation;
				Kick: Animation;
				P1: Animation;
			};
			BlockHitAnims: Folder & {
				H2: Animation;
				H3: Animation;
				H1: Animation;
			};
			Ledge: Animation;
		};
		CharacterSounds: Folder & {
			LightPiercer: Sound & {
				PitchShiftSoundEffect: PitchShiftSoundEffect;
				FlangeSoundEffect: FlangeSoundEffect;
			};
			SubzeroWind: Sound;
			DaggerSlash: Sound;
			SpearSlash: Sound;
			Mederi: Sound;
			SpearCharge: Sound;
			Shadowrush: Sound;
			SLAMJAM: Sound;
			breaker: Sound;
			SpearSpin: Sound;
			MetalClash: Sound;
			ShadowrushCharge: Sound;
			Swish: Sound;
			DaggerCharge: Sound;
			Lethality: Sound;
			Lannis: Sound;
			Break: Sound;
			ShieldUp: Sound;
			SwordCharge: Sound;
			Diffusion: Sound;
			Hoppa: Sound;
			FistCharge: Sound;
			FistChargeFinish: Sound;
			ShineStab: Sound;
			EnergyDash: Sound;
			DeadCast: Sound;
			DaggerHit: Sound;
			Injure: Sound;
			SwordSlash: Sound;
			BlockSound: Sound;
			FlyingAssaulter: Sound;
			SpellBlock: Sound;
			GlassBreak: Sound;
			FleshBlock: Sound;
			ShieldDown: Sound;
			Roll: Sound;
			LethalityHit: Sound;
			HolyClash: Sound;
			PerfectCast: Sound;
			Bell: Sound;
			Counter: Sound;
			Air: Sound;
			BigLoopCold: Sound & {
				DistortionSoundEffect: DistortionSoundEffect;
				ChorusSoundEffect: ChorusSoundEffect;
			};
			SwordHit: Sound;
			SpearLand: Sound;
			Extinguish: Sound;
			SpearHit: Sound;
			DragonRoar: Sound & {
				PitchShiftSoundEffect: PitchShiftSoundEffect;
			};
			FallDamage: Sound;
			Swing: Sound;
			WeaponCharge: Sound;
			IceHit: Sound;
			Hit: Sound;
			CameoGetUp: Sound;
			Torture: Sound;
			Snap: Sound;
			SwingCharge: Sound;
		};
		Artifacts: Folder & {
			Nightstone: Part & {
				Nightstone: UnionOperation & {
					PointLight: PointLight;
					Script: Script;
					ClickDetector: ClickDetector;
				};
				Script: Script;
				ClickDetector: ClickDetector;
				["Philosopher's Stone"]: Weld;
			};
			["Lannis's Amulet"]: Part & {
				["Philosopher's Stone"]: Weld;
				ClickDetector: ClickDetector;
				Script: Script;
				["Lannis's Amulet"]: UnionOperation;
			};
			["Rift Gem"]: Part & {
				Script: Script;
				ClickDetector: ClickDetector;
				Mesh: SpecialMesh;
				ParticleEmitter: ParticleEmitter;
			};
			["Scroom Key"]: Part & {
				Script: Script;
				["Scroom Keys"]: Weld;
				["Scroom Key"]: UnionOperation & {
					PointLight: PointLight;
					ClickDetector: ClickDetector;
					Script: Script;
				};
				ClickDetector: ClickDetector;
			};
			["Amulet of the White King"]: Part & {
				Script: Script;
				["Amulet of the White King"]: UnionOperation;
				ClickDetector: ClickDetector;
				["Amulet of the White Kings"]: Weld;
			};
			["Phoenix Down"]: Part & {
				Attachment: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
				ClickDetector: ClickDetector;
				Script: Script;
			};
			Fairfrozen: Part & {
				PointLight: PointLight;
				ClickDetector: ClickDetector;
				OrbParticle: ParticleEmitter;
				coldpart: ParticleEmitter;
				Mesh: SpecialMesh;
				Script: Script;
			};
			["Spider Cloak"]: Part & {
				Spawned: BoolValue;
				ClickDetector: ClickDetector;
				OrbParticle: ParticleEmitter;
				Script: Script;
				Mesh: SpecialMesh;
				PointLight: PointLight;
			};
			["Philosopher's Stone"]: Part & {
				Script: Script;
				["Philosopher's Stones"]: Weld;
				ClickDetector: ClickDetector;
				["Philosopher's Stone"]: UnionOperation & {
					PointLight: PointLight;
					Script: Script;
					ClickDetector: ClickDetector;
				};
			};
		};
		CharacterMisc: Folder & {
			Arm: MeshPart;
			learn: Part & {
				learn: Attachment & {
					W: ParticleEmitter;
				};
			};
			LightPiercer: Part & {
				Trail: Trail;
				AttachmentU: Attachment;
				AttachmentB: Attachment;
				Script: Script;
				PointLight: PointLight;
			};
			SnarvBurstRadial: Part & {
				SnarvBurst: ParticleEmitter;
			};
			ArmPlate: MeshPart;
			DaggerThrow: MeshPart & {
				Attachment2: Attachment;
				Script: Script;
				TestTrail: Trail;
				Attachment1: Attachment;
			};
			HitRing: MeshPart & {
				SlashRing: MeshPart & {
					Weld: Weld;
				};
				Attachment: Attachment & {
					ParticleEmitter2: ParticleEmitter;
					ParticleEmitter4: ParticleEmitter;
					ParticleEmitter3: ParticleEmitter;
					ParticleEmitter1: ParticleEmitter;
				};
				Hit: Sound;
			};
			M2Trail: Trail;
			GelidusSpot: SpotLight;
			SnarvCrash: Part & {
				Decal: Decal;
				Impact: Sound;
			};
			LichSkull: MeshPart & {
				Attachment2: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
				Attachment1: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
			};
			DragonWing: UnionOperation & {
				PointLight: PointLight;
			};
			MetaScroomHead: UnionOperation;
			Beak: MeshPart;
			Subzero: Part & {
				Subzero1: Attachment & {
					Subzero: ParticleEmitter;
				};
				Subzero2: Attachment & {
					Subzero: ParticleEmitter;
				};
			};
			Fireball: Part & {
				PointLight: PointLight;
				Firesound: Sound;
				Attachment: Attachment & {
					Fireball: ParticleEmitter;
					FireballTrail: ParticleEmitter;
				};
				Explosion: ParticleEmitter;
				Firesound2: Sound;
			};
			ShadowThrow: MeshPart & {
				Attachment2: Attachment;
				ShadowEmitter: ParticleEmitter;
				Script: Script;
				TestTrail: Trail;
				Attachment1: Attachment;
			};
			BurnScar: Decal;
			SlashInjury: Decal;
			SnarvBurst: Part & {
				SnarvBurst: Attachment & {
					SnarvBurstEmitter: ParticleEmitter;
				};
			};
			DragonHorn: MeshPart;
			Backfirebrick: MeshPart & {
				Hit: Sound;
				ParticleEmitter: ParticleEmitter;
			};
			AzaelHorn: MeshPart;
			Dust: Part & {
				Attachment: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
			};
			ScroomHead: UnionOperation;
			IceCage: UnionOperation;
			IgnisSpot: SpotLight;
			GelidusLight: PointLight;
			WingAnim: Animation;
			IgnisLight: PointLight;
			ManaTrail: Trail;
		};
		Halloween: Folder & {
			["Jr. Wraith"]: Model & {
				Union: UnionOperation;
			};
			["Workspace - halloween event"]: Folder & {
				q: Part;
				["jr wraith"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["ghosts ARREA"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				Wheelbarrow: Model;
				Broom: Model;
				ghosts: Part & {
					ParticleEmitter: ParticleEmitter;
				};
			};
		};
		Enchants: Folder & {
			EmeraldEnchant: ParticleEmitter;
			RubyEnchant: ParticleEmitter;
			["Night StoneEnchant"]: ParticleEmitter;
			OpalEnchant: ParticleEmitter;
		};
		Effects: Folder & {
			Sounds: Folder & {
				Greatspearhit: Sound;
				SoulRipped: Sound;
				Died: Sound;
				PerfectCast: Sound;
				Jumping: Sound;
				CounterSpell: Sound;
				FreeFalling: Sound;
				SilverDischarge: Sound;
				SwordHit: Sound;
				DaggerSlash2: Sound;
				BaneCharge: Sound;
				Diffusion: Sound;
				Lannis: Sound;
				Blink: Sound;
				WingFlap: Sound;
				Stealth: Sound;
				Charging: Sound;
				Pondus: Sound & {
					FlangeSoundEffect: FlangeSoundEffect;
				};
				Erase: Sound;
				ManaDash: Sound;
				DaggerSlash1: Sound;
				FlyingAssaulter: Sound;
				ShadowrushCharge: Sound;
				SpearSpin: Sound;
				EpicDemon: Sound;
				Running: Sound;
				EtherealStrike: Sound;
				Splash: Sound;
				BaneDischarge: Sound;
				DaggerHit3: Sound;
				Shadowrush: Sound;
				Roar: Sound;
				OwlSlash: Sound;
				Ordersound: Sound;
				Injure: Sound;
				Climbing: Sound;
				DaggerHit: Sound;
				Landing: Sound;
				Growth: Sound;
				Swimming: Sound;
				LightningHit: Sound;
				GettingUp: Sound;
				CounterSpellOff: Sound;
				GrappleNoise: Sound;
				Dash: Sound;
				DaggerCharge: Sound;
				Snap: Sound;
				SwordCharge: Sound;
			};
			Visuals: Folder & {
				ShriekerSmoke: ParticleEmitter;
				LordsbaneLightning: ParticleEmitter;
				SilverEmit: ParticleEmitter;
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
				Poison: ParticleEmitter;
				M2Trail: Trail;
				Hit1: ParticleEmitter;
				BloodHit: ParticleEmitter;
				Steam: ParticleEmitter;
				SpecialBloodHit: ParticleEmitter;
				Sweat: ParticleEmitter;
				SworderEmit: ParticleEmitter;
				ShadowEmitter3: ParticleEmitter;
				Seraph: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				ShadowEmitter2: ParticleEmitter;
				FlockIn: ParticleEmitter;
				FlockOut: ParticleEmitter;
				ShadowEmitter: ParticleEmitter;
				MagiCircle: ParticleEmitter;
				Fire: ParticleEmitter;
				VeloBall: Part & {
					PointLight: PointLight;
					ParticleEmitter: ParticleEmitter;
					Attachment: Attachment & {
						ParticleEmitter: ParticleEmitter;
					};
					Sound: Sound;
					WeldConstraint: WeldConstraint;
				};
				PondusParticle: ParticleEmitter;
				ManaRunTrail: Trail;
				DarkMatter: ParticleEmitter;
				Smoke: ParticleEmitter;
				DBloodTrue: ParticleEmitter;
				MonasticFire: ParticleEmitter;
				BlockParticle: ParticleEmitter;
				Orb: Part & {
					Mesh: SpecialMesh;
					Attachment: Attachment & {
						ParticleEmitter: ParticleEmitter;
					};
				};
				Injure: ParticleEmitter;
				MonkParticle: ParticleEmitter;
				Sparks: ParticleEmitter;
				CommandFX: ParticleEmitter;
				ManaStopParticle: ParticleEmitter;
				Feathers: ParticleEmitter;
				ColdBreath: ParticleEmitter;
				LElectric: ParticleEmitter;
				ChargePart: ParticleEmitter;
				Electric: ParticleEmitter & {
					ElectricLight: PointLight;
				};
				DBloodOn: ParticleEmitter;
				SpearEmit: ParticleEmitter;
				Broken: ParticleEmitter;
				DBloodOff: ParticleEmitter;
				Cameo: ParticleEmitter;
				LannisParticle: ParticleEmitter;
			};
		};
		Races: Folder & {
			Rigan: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
				Variants: Folder & {
					Darkly: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
				};
			};
			Fischeran: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
				Variants: Folder & {
					Seagreen: Folder & {
						EyeColor: Color3Value;
						SkinColor: Color3Value;
						HairColor: Color3Value;
					};
				};
			};
			Vind: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Dullahan: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
				Variants: Folder & {
					Diseased: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
					Ethereal: Folder & {
						EyeColor: Color3Value;
						SkinColor: Color3Value;
						HairColor: Color3Value;
					};
				};
			};
			Florian: Folder & {
				Stats: Folder & {
					ClimbBoost: NumberValue;
					HealthRegen: NumberValue;
					ColdResist: NumberValue;
					FallResist: NumberValue;
					TightHood: Folder;
					SpeedBoost: NumberValue;
				};
			};
			Scroom: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
				Bald: BoolValue;
			};
			Cameo: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Dinakeri: Folder & {
				Variants: Folder & {
					Deep: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
					Untainted: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
				};
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			GreaterNavaran: Folder;
			Metascroom: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Dzin: Folder & {
				Variants: Folder & {
					Blue: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
				};
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Madrasian: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Seraph: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
				Variants: Folder & {
					Ardor: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
				};
			};
			Gaian: Folder & {
				Bald: BoolValue;
				Variants: Folder & {
					Bluesteel: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
				};
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Morvid: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Kasparan: Folder & {
				Bald: BoolValue;
				Variants: Folder & {
					White: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
					Black: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
					Red: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
				};
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Lich: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			LesserNavaran: Folder & {
				Bald: BoolValue;
				Variants: Folder & {
					Viral: Folder & {
						EyeColor: Color3Value;
						SkinColor: Color3Value;
						HairColor: Color3Value;
					};
					Cold: Folder & {
						EyeColor: Color3Value;
						SkinColor: Color3Value;
						HairColor: Color3Value;
					};
					Sickly: Folder & {
						EyeColor: Color3Value;
						SkinColor: Color3Value;
						HairColor: Color3Value;
					};
				};
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Haseldan: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Azael: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Castellan: Folder & {
				Variants: Folder & {
					Ash: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
					Lannis: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
				};
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
			Construct: Folder & {
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
				Variants: Folder & {
					Tal: Folder & {
						EyeColor: Color3Value;
						HairColor: Color3Value;
						SkinColor: Color3Value;
					};
				};
			};
			Ashiin: Folder & {
				Variants: Folder & {
					Olive: Folder & {
						EyeColor: Color3Value;
						SkinColor: Color3Value;
						HairColor: Color3Value;
					};
				};
				Default: Folder & {
					EyeColor: Color3Value;
					SkinColor: Color3Value;
					HairColor: Color3Value;
				};
			};
		};
		FX: Folder & {
			Electric: ParticleEmitter;
			SanctumBox: Part & {
				First: Animation;
				Script: Script;
				Third: Animation;
				Fourth: Animation;
				Plr: StringValue;
				Script2: Script;
				Second: Animation;
			};
			HolyBow: UnionOperation;
			AkumaEmit: ParticleEmitter;
			MoriExplosion: Model & {
				Ring: MeshPart;
			};
			SnarvHit: MeshPart & {
				WindBlow: Sound;
				WindClap: ParticleEmitter;
				Smashing: Sound;
			};
			EarthPillar: Model & {
				Earth: Part & {
					Earth: Folder;
					MonkParticle: ParticleEmitter;
					Soundaa: Sound;
					Attachment: Attachment & {
						ParticleEmitter: ParticleEmitter;
					};
					Sound: Sound;
					Sound2: Sound;
				};
				Crater: UnionOperation & {
					ParticleEmitter: ParticleEmitter;
				};
			};
			SanctumBox3: Part & {
				First: Animation;
				Script: Script;
				Third: Animation;
				Fourth: Animation;
				Plr: StringValue;
				Script2: Script;
				Second: Animation;
			};
			Chains: Part & {
				Beam: Beam;
				Attachment: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
			};
			PondusSlow: ParticleEmitter;
			DisarmSpellOLD: Part & {
				TestTrail: Trail;
				ParticleEmitter: ParticleEmitter;
				WallHit: Sound;
				PointLight: PointLight;
				Hit: Sound;
				BodyVelocity: BodyVelocity;
				Attachment2: Attachment;
				Attachment1: Attachment;
			};
			BottomPart: Part;
			FireBall: Part;
			ManaShield: Part & {
				Weld: Weld;
				up: Sound;
				Attachment: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
				Mesh: SpecialMesh;
				down: Sound;
			};
			IceCage: UnionOperation & {
				WeldConstraint: WeldConstraint;
			};
			SanctumBox2: Part & {
				First: Animation;
				Script: Script;
				Third: Animation;
				Fourth: Animation;
				Plr: StringValue;
				Script2: Script;
				Second: Animation;
			};
			Explosion: Part & {
				Part2: Script;
				Weld: Weld;
				Sound: Sound;
				ExplosionPart2: Part & {
					ManualWeld: ManualWeld;
					Part1: Script;
					Part2: Script;
				};
				Mesh: SpecialMesh;
				Part1: Script;
			};
			IgnisP: Part & {
				Weld: Weld;
				ParticleEmitter: ParticleEmitter;
			};
			RedCharge: ParticleEmitter;
			LargeEarthPillar: Model & {
				Earth: Part & {
					Earth: Folder;
					MonkParticle: ParticleEmitter;
					Soundaa: Sound;
					Attachment: Attachment & {
						ParticleEmitter: ParticleEmitter;
					};
					Sound: Sound;
					Sound2: Sound;
				};
				Crater: UnionOperation & {
					ParticleEmitter: ParticleEmitter;
				};
			};
			DaggerBox2: Part & {
				Script2: Script;
				Script: Script;
				Plr: StringValue;
			};
			PondusSpell: Part & {
				SpellHold: ParticleEmitter;
				PointLight: PointLight;
				Hold: Sound & {
					FlangeSoundEffect: FlangeSoundEffect;
				};
				Weld: Weld;
			};
			ConsumingFlames: ParticleEmitter;
			Velo: Part & {
				Attachment: Attachment & {
					sparkle: ParticleEmitter;
					ParticleEmitter: ParticleEmitter;
				};
				PointLight: PointLight;
				WeldConstraint: WeldConstraint;
			};
			PondusSound: Sound & {
				FlangeSoundEffect: FlangeSoundEffect;
			};
			DaggerBox: Part & {
				Script2: Script;
				Script: Script;
				Plr: StringValue;
			};
			OrangeCowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			SubzeroParticle: Part & {
				a1: Attachment & {
					Subzero: ParticleEmitter;
				};
				a2: Attachment & {
					Subzero: ParticleEmitter;
				};
			};
			IgnisHitbox: Part & {
				Script: Script;
				plr: StringValue;
			};
			WindBurstRadial: Part & {
				DUST: ParticleEmitter;
			};
			LightningPart: Part & {
				ParticleEmitter2: ParticleEmitter;
				Trail: Trail;
				Beam: Beam;
				ParticleEmitter: ParticleEmitter;
			};
			Barrier: Folder & {
				OrderBubble: Part;
			};
			VBurning: ParticleEmitter & {
				FireSparkles: ParticleEmitter;
			};
			IceArrow: Part;
			SnarvCrash: Part & {
				Decal: Decal;
			};
			Dagger: MeshPart & {
				DaggerHit: Sound;
				DaggerSlash2: Sound;
				Slash: Sound;
				RedTrail: Trail;
				WeldConstraint: WeldConstraint;
				Trail: Trail;
				Charge: Sound;
				Emerald: ParticleEmitter;
				DaggerHit3: Sound;
				Ruby: ParticleEmitter;
			};
			Undead: Folder & {
				DisarmSpell: Part & {
					Motor6D: Motor6D;
					TestTrail: Trail;
					WallHit: Sound;
					PointLight: PointLight;
					Mesh: SpecialMesh;
					Hit: Sound;
					Attachment2: Attachment;
					BodyVelocity: BodyVelocity;
					TrailP: Part & {
						Attachment: Attachment;
						Attachment2: Attachment;
						Trail: Trail;
					};
					Attachment1: Attachment;
				};
				BackfireBrick: MeshPart;
				DisarmSpellOLD: Part & {
					BodyVelocity: BodyVelocity;
					PointLight: PointLight;
					Attachment2: Attachment;
					Hit: Sound;
					TestTrail: Trail;
					WallHit: Sound;
					Attachment1: Attachment;
				};
			};
			DisarmSpell: Part & {
				Motor6D: Motor6D;
				TestTrail: Trail;
				ParticleEmitter: ParticleEmitter;
				WallHit: Sound;
				BodyVelocity: BodyVelocity;
				PointLight: PointLight;
				Hit: Sound;
				Mesh: SpecialMesh;
				Attachment2: Attachment;
				TrailP: Part & {
					Trail: Trail;
					Attachment2: Attachment;
					Attachment: Attachment;
				};
				Attachment1: Attachment;
			};
			Ring: MeshPart;
			LightCowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			HolyArrow: MeshPart;
			Tenebris: Folder & {
				DarkBall: Part & {
					TestTrail: Trail;
					Explosion: ParticleEmitter;
					Firesound2: Sound;
					IllusionArm: ParticleEmitter;
					PointLight: PointLight;
					Firesound: Sound;
					Hit: Sound;
					Firesound5: Sound;
					Attachment: Attachment & {
						IllusionArm: ParticleEmitter;
					};
					Snap: Sound;
					BerserkEmit: ParticleEmitter;
				};
				HandHoldDark: Part & {
					OrbEmit2: ParticleEmitter;
					Attachment: Attachment;
					OrbEmit: ParticleEmitter;
					OrbParticle: ParticleEmitter;
				};
			};
			MythrilSpearBack: Accessory & {
				Handle: MeshPart & {
					Ruby: ParticleEmitter;
					OriginalSize: Vector3Value;
					Emerald: ParticleEmitter;
					TouchInterest: TouchTransmitter;
					BodyBackAttachment: Attachment;
				};
			};
			DarkBallOld: Part & {
				TestTrail: Trail;
				BodyVelocity: BodyVelocity;
				Weld: Weld;
				Explosion: ParticleEmitter;
				Firesound2: Sound;
				IllusionArm: ParticleEmitter;
				PointLight: PointLight;
				Firesound: Sound;
				Hit: Sound;
				Firesound5: Sound;
				Attachment: Attachment & {
					IllusionArm: ParticleEmitter;
				};
				Snap: Sound;
				BerserkEmit: ParticleEmitter;
			};
			DarkCowl: Hat & {
				Handle: Part & {
					Mesh: SpecialMesh;
					TouchInterest: TouchTransmitter;
				};
				Mesh: SpecialMesh;
			};
			LightThrow: Part & {
				DaggerHit: Sound;
				Script: Script;
				Animation: Animation;
				plr: StringValue;
				Attachment2: Attachment;
				PointLight: PointLight;
				backfireignis: Sound & {
					PitchShiftSoundEffect: PitchShiftSoundEffect;
					FlangeSoundEffect: FlangeSoundEffect;
				};
				lightarrowhit: ParticleEmitter;
				Trail: Trail;
				Attachment: Attachment;
				Mesh: SpecialMesh;
				Script2: Script;
			};
			BackfireBrick: MeshPart;
			Blood: ParticleEmitter;
			ImpaleBox: Part & {
				First: Animation;
				Script: Script;
				Third: Animation;
				Fourth: Animation;
				Plr: StringValue;
				Script2: Script;
				Second: Animation;
			};
			FairFrozenBack: Accessory & {
				Handle: MeshPart & {
					Ruby: ParticleEmitter;
					OriginalSize: Vector3Value;
					Emerald: ParticleEmitter;
					TouchInterest: TouchTransmitter;
					BodyBackAttachment: Attachment;
				};
			};
			LightningPart2: Part;
			GelidusP: Part & {
				Fire: ParticleEmitter;
				Weld: Weld;
				ParticleEmitter: ParticleEmitter;
			};
			GelidusHitbox: Part & {
				plr: StringValue;
				Script: Script;
				WeldConstraint: WeldConstraint;
			};
			Lannis: ParticleEmitter;
			SigilHelm: Accessory & {
				Handle: MeshPart & {
					TouchInterest: TouchTransmitter;
				};
			};
			DaggerBox3: Part & {
				Script2: Script;
				Script: Script;
				Plr: StringValue;
			};
		};
		CharacterAnimations: Folder & {
			AdvancedPunch5: Animation;
			WandlessAnim1: Animation;
			Church1: Animation;
			Dagger5: Animation;
			DaggerHeavy: Animation;
			ChurchSpearIdle: Animation;
			Trickstus: Animation;
			FistHeavyAnim3: Animation;
			Sword4: Animation;
			Hit1: Animation;
			FistHeavyAnim1: Animation;
			Sword3: Animation;
			Spear3: Animation;
			NormalBlock: Animation;
			AdvancedPunch1: Animation;
			WandlessAnim2: Animation;
			Dagger4: Animation;
			AdvancedPunch2: Animation;
			Sword5: Animation;
			Wraith2: Animation;
			NormalPunch5: Animation;
			Wraith3: Animation;
			NormalPunch4: Animation;
			NormalPunch3: Animation;
			Hit3: Animation;
			Spear1: Animation;
			Spear2: Animation;
			Church2: Animation;
			WandlessAnim5: Animation;
			WandlessAnim3: Animation;
			Church3: Animation;
			Sword2: Animation;
			SpearIdle: Animation;
			NormalPunch1: Animation;
			BowDown: Animation;
			AdvancedPunch4: Animation;
			Dagger2: Animation;
			AdvancedPunch3: Animation;
			Snap2: Animation;
			WraithIdle: Animation;
			RightPoint: Animation;
			WandlessAnim6: Animation;
			WraithHeavy: Animation;
			DaggerIdle: Animation;
			Wraith4: Animation;
			WandlessAnim4: Animation;
			ChurchHeavy: Animation;
			Dagger1: Animation;
			FistHeavyAnim2: Animation;
			SpearHeavy: Animation;
			Church4: Animation;
			SwordHeavy: Animation;
			Dagger3: Animation;
			Wraith1: Animation;
			Hit2: Animation;
			Clap1: Animation;
			WingAnim: Animation;
			Sword1: Animation;
			Spear4: Animation;
			NormalPunch2: Animation;
			SpearBlock: Animation;
			Snap1: Animation;
		};
		ClassSkills: Folder & {
			["Tempest Soul"]: Tool & {
				Activator: ModuleScript & {
					Animation: Animation;
				};
				Spell: Folder;
				Edict: Folder;
			};
			["Church Knight Helmet"]: Tool & {
				Animation2: Animation;
				Misc: Folder;
				Scriptss: Script;
				Emulatable: Folder;
				Animation: Animation;
			};
			["Tan Cowl"]: Tool & {
				Animation2: Animation;
				Script: Script;
				Animation: Animation;
			};
			["Jester's Dance"]: Tool & {
				StartAnim: Animation;
				Jester: ParticleEmitter;
				StartDodge: Sound;
				Activator: ModuleScript;
				Skill: Folder;
			};
			["Thunder Charge"]: Tool & {
				Activator: ModuleScript;
				Weapon: Folder;
				SukLoop: Sound;
				Use: Animation;
			};
			["Dragon Blood"]: Tool & {
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				anim2: Animation;
				Use: Animation;
			};
			Spear: Tool & {
				Activator: ModuleScript & {
					DustPart: Part & {
						DUST: ParticleEmitter;
					};
				};
				M2: Folder;
				MainWeapon: Folder;
				Weapon: Folder;
			};
			Ignis: Tool & {
				M2: Folder;
				Activator: ModuleScript & {
					Hit: Sound;
				};
				Anim2: Animation;
				Snap: Sound;
				Spell: Folder;
			};
			Verto: Tool & {
				M2: Folder;
				Animation: Animation;
				Activator: ModuleScript;
				Assets: Folder & {
					ParticleEmitter4: ParticleEmitter;
					Heal: Sound;
					CastLight: PointLight;
					Use: Sound & {
						EchoSoundEffect: EchoSoundEffect;
					};
				};
				Weapon: Folder;
			};
			["Final Blow"]: Folder;
			["Thundering Le4p"]: Tool & {
				ThunderingLeap: Sound;
				UltraSkill: Folder;
				Activator: ModuleScript;
				Leap: Animation;
				LightningHit: Sound;
				FistSwitch: Folder;
				RedCharge: ParticleEmitter;
				RequiresWeapon: StringValue;
			};
			["Serpent Strike"]: Tool & {
				Emulatable: Folder;
				Weapon: Folder;
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				Skill: Folder;
				Use: Animation;
			};
			["Orange Cowl"]: Tool & {
				Animation2: Animation;
				Script: Script;
				Animation: Animation;
			};
			["Lord's Stance"]: Folder;
			Augimas: Tool & {
				UltraSkill: Folder;
				FistSkill: Folder;
				Activator: ModuleScript & {
					Anim: Animation;
					Anim2: Animation;
				};
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					p0vd: Folder;
					bacon_tier: Folder;
					JeffTheTerminated: Folder;
				};
				Skill: Folder;
				Spell: Folder;
				M2: Folder;
				TatsuAnim: Animation;
				FistSwitch: Folder;
				Particle: ParticleEmitter;
				UberParticle: ParticleEmitter;
				Anim: Animation;
				RequiresWeapon: StringValue;
			};
			["Rune Mastery"]: Folder;
			Stealth: Tool & {
				Activator: ModuleScript;
			};
			["Falling Darkness"]: Tool & {
				Activator: ModuleScript;
				IgnoreEquipWarmup: Folder;
				EtherealAnim: Animation;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
				};
			};
			["Lightning Drop"]: Tool & {
				UltraSkill: Folder;
				Drop: Animation;
				Activator: ModuleScript;
				Skill: Folder;
				Emulatable: Folder;
			};
			["POWA OF THE WILDANES"]: Tool & {
				Activator: ModuleScript;
				Song: Folder;
				Anim: Animation;
				LethalTrail: Trail;
			};
			["Wallet Swipe"]: Tool & {
				Script: Script;
				Animation: Animation;
			};
			Dominus: Tool & {
				M2: Folder;
				Activator: ModuleScript;
				Anim2: Animation;
				Snap: Sound;
				Spell: Folder;
			};
			["Iron Mind"]: Folder;
			["Life Sense"]: Tool & {
				Skill: Folder;
				Script: Script;
			};
			["Mori."]: Tool & {
				Script: Script;
				getMouse: RemoteFunction;
				LocalScript: LocalScript;
				Activator1: ModuleScript & {
					DisarmSpell: Part & {
						Motor6D: Motor6D;
						Attachment2: Attachment;
						ParticleEmitter: ParticleEmitter;
						WallHit: Sound;
						PointLight: PointLight;
						BodyVelocity: BodyVelocity;
						Hit: Sound;
						TestTrail: Trail;
						Mesh: SpecialMesh;
						TrailP: Part & {
							Attachment: Attachment;
							Attachment2: Attachment;
							Trail: Trail;
						};
						Attachment1: Attachment;
					};
				};
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
					EpicGameFarrter2015: Folder;
				};
			};
			["Flame Charge"]: Tool & {
				Activator: ModuleScript;
				PointLight: PointLight;
				Weapon: Folder;
				Use: Animation;
			};
			["Flash Of Darkness"]: Tool & {
				Activator: ModuleScript;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					p0vd: Folder;
					bacon_tier: Folder;
				};
			};
			Goshoryu: Tool & {
				MisogiStart: Animation;
				FistSkill: Folder;
				Misogi: Sound & {
					TremoloSoundEffect: TremoloSoundEffect;
					PitchShiftSoundEffect: PitchShiftSoundEffect;
					DistortionSoundEffect: DistortionSoundEffect;
				};
				Activator: ModuleScript;
				Skill: Folder;
				RequiresWeapon: StringValue;
				MisogiDown: Animation;
				M2: Folder;
				Emulatable: Folder;
				FistSwitch: Folder;
				UberOniParticle: Folder & {
					Particle: ParticleEmitter;
				};
				Particle: ParticleEmitter;
				Sound: Sound & {
					EchoSoundEffect: EchoSoundEffect;
				};
				Attack: Animation;
			};
			Galvanize: Tool & {
				Activator: ModuleScript;
				WokenUp: Sound;
				Galvanize: ParticleEmitter;
				WakingUp: Sound;
			};
			["Consuming Flames"]: Tool & {
				UltraSkill: Folder;
				FistSkill: Folder;
				UberParticle: ParticleEmitter;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					p0vd: Folder;
					bacon_tier: Folder;
					JeffTheTerminated: Folder;
				};
				Skill: Folder;
				M2: Folder;
				TatsuAnim: Animation;
				FistSwitch: Folder;
				Particle: ParticleEmitter;
				Activator: ModuleScript;
				Anim: Animation;
				RequiresWeapon: StringValue;
			};
			Herbivore: Folder;
			["Vinifera's Song"]: Tool & {
				Activator: ModuleScript;
				Song: Folder;
				Anim: Animation;
				LethalTrail: Trail;
			};
			Globus: Tool & {
				Activator: ModuleScript;
				Spell: Folder;
				Snap: Sound;
				Anim2: Animation;
			};
			Fimbulvetr: Tool & {
				Spell: Folder;
				Activator: ModuleScript & {
					DisarmSpell: Part & {
						Motor6D: Motor6D;
						Attachment2: Attachment;
						ParticleEmitter: ParticleEmitter;
						WallHit: Sound;
						PointLight: PointLight;
						BodyVelocity: BodyVelocity;
						Hit: Sound;
						TestTrail: Trail;
						Mesh: SpecialMesh;
						TrailP: Part & {
							Attachment: Attachment;
							Attachment2: Attachment;
							Trail: Trail;
						};
						Attachment1: Attachment;
					};
				};
				M2: Folder;
				Snap: Sound;
				Anim2: Animation;
			};
			Claritum: Tool & {
				Activator: ModuleScript;
				Spell: Folder;
				Snap: Sound;
				Anim2: Animation;
			};
			["Leviathan Plunge"]: Tool & {
				Emulatable: Folder;
				UltraSkill: Folder;
				Weapon: Folder;
				Activator: ModuleScript;
				PlungeParticle: ParticleEmitter;
				Skill: Folder;
				Use: Animation;
			};
			Sanitas: Tool & {
				Spell: Folder;
				Activator: ModuleScript;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
					hugothelongest: Folder;
				};
				Anim2: Animation;
				Snap: Sound;
			};
			["Dragon Roar"]: Tool & {
				Activator: ModuleScript;
				Emulatable: Folder;
				Use: Animation;
				GreenCharge: ParticleEmitter;
			};
			Mirror: Tool & {
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
				};
				Activator: ModuleScript;
				ShadowDamage: Sound;
				SilverCharge: Sound;
				Weapon: Folder;
				Use: Animation;
			};
			["Electric Smite"]: Tool & {
				UltraSkill: Folder;
				Activator: ModuleScript;
				ElectricSmite: Animation;
				Skill: Folder;
				LightningHit: Sound;
				FistSwitch: Folder;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					p0vd: Folder;
					bacon_tier: Folder;
				};
				RedCharge: ParticleEmitter;
				LittleShock: Sound;
				RequiresWeapon: StringValue;
			};
			["Abyssal Scream"]: Tool & {
				Emulatable: Folder;
				Activator: ModuleScript;
				Spell: Folder;
				Use: Animation;
				GreenCharge: ParticleEmitter;
			};
			Agility: Tool & {
				Emulatable: Folder;
				Activator: ModuleScript;
				Weapon: Folder;
				Skill: Folder;
				RequiresWeapon: StringValue;
			};
			["Lightning Elbow"]: Tool & {
				Emulatable: Folder;
				Activator: ModuleScript;
				UltraSkill: Folder;
				Skill: Folder;
				Elboww: Animation;
			};
			Shadowrush: Tool & {
				AnimationL: Animation;
				UltraSkill: Folder;
				Script: Script & {
					Animation2: Animation;
					Animation3: Animation;
					Animation: Animation;
					effect: Part & {
						Mesh: BlockMesh;
						DaggerHit: Sound;
					};
					Feathers: ParticleEmitter;
					Ring: MeshPart;
					GreatSlash: Part & {
						Mesh: BlockMesh;
						DaggerHit: Sound;
					};
				};
				Weapon: Folder;
				LethalTrail: Trail;
				RequiresWeapon: StringValue;
			};
			Heartbreak: Tool & {
				Spell: Folder;
				GodSpell: Folder;
				Activator: ModuleScript;
				HasPotential: Folder;
				Snap2: Animation;
				M2: Folder;
				Heart: Sound;
				Spec: Folder & {
					bacon_tier: Folder;
					asdfsadfmovie: Folder;
					Player2: Folder;
					xdasfras: Folder;
				};
				Anim2: Animation;
				Snap: Sound;
			};
			["Needle's Eye"]: Tool & {
				Animation: Animation;
				Activator: ModuleScript & {
					SlashLine: Part & {
						Mesh: BlockMesh;
					};
				};
				Weapon: Folder;
				RequiresWeapon: StringValue;
			};
			ToxicImmunity: Folder;
			Observe: Tool & {
				Activator: ModuleScript;
				Meditate: Animation;
				Skill: Folder;
			};
			Custos: Tool & {
				Spell: Folder;
				Animation: Animation;
				Activator: ModuleScript;
				Anim2: Animation;
				Snap: Sound;
			};
			DeepKnightHelmet: Folder;
			["Symphony of Horses"]: Tool & {
				Activator: ModuleScript;
				Song: Folder;
				Anim: Animation;
				LethalTrail: Trail;
			};
			Velo: Tool & {
				Activator: ModuleScript;
				Spell: Folder;
			};
			Repair: Tool & {
				M2: Folder;
				Activator: ModuleScript;
				IdleDinakeri: Animation;
				Skill: Folder;
				Use: Animation;
			};
			["Sub-Zero Strike"]: Tool & {
				Weapon: Folder;
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				Skill: Folder;
				Use: Animation;
			};
			Mori: Tool & {
				LocalScript: LocalScript;
				Activator1: ModuleScript & {
					DisarmSpell: Part & {
						Motor6D: Motor6D;
						Attachment2: Attachment;
						ParticleEmitter: ParticleEmitter;
						WallHit: Sound;
						PointLight: PointLight;
						BodyVelocity: BodyVelocity;
						Hit: Sound;
						TestTrail: Trail;
						Mesh: SpecialMesh;
						TrailP: Part & {
							Attachment: Attachment;
							Attachment2: Attachment;
							Trail: Trail;
						};
						Attachment1: Attachment;
					};
				};
				Script: Script;
				getMouse: RemoteFunction;
			};
			FeatherFall: Folder;
			["Sigil Helmet"]: Tool & {
				Animation2: Animation;
				Misc: Folder;
				Animation: Animation;
				Emulatable: Folder;
				Event: RemoteEvent;
				Scriptss: Script;
			};
			Rapier: Tool & {
				Activator: ModuleScript;
				M2: Folder;
				PrimaryWeapon: Folder;
				Weapon: Folder;
			};
			["Eyes of Elemira"]: Folder;
			Percutiens: Tool & {
				Activator: ModuleScript & {
					CHARGE: Sound & {
						DistortionSoundEffect: DistortionSoundEffect;
					};
					Spell: Sound;
					Animation: Animation;
					Smoke: ParticleEmitter;
					Snap2: Animation;
					BLAST: Sound & {
						DistortionSoundEffect: DistortionSoundEffect;
					};
					Clap: Animation;
					Snap: Sound;
					Sound: Sound;
					Light: PointLight;
				};
				Spell: IntValue;
				GodSpell: Folder;
				M2: Folder;
			};
			["Dark Cowl"]: Tool & {
				Animation2: Animation;
				Script: Script;
				Animation: Animation;
			};
			["Disarming Strike"]: Tool & {
				Weapon: Folder;
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				Skill: Folder;
				Use: Animation;
			};
			["Thunder Spear Crash"]: Tool & {
				preparejump: Animation;
				finishjump: Animation;
				Activator: ModuleScript;
				LightningP: ParticleEmitter;
				LightningS: Sound;
				Emulatable: Folder;
				UltraSkill: Folder;
				midjump: Animation;
				Weapon: Folder;
			};
			["Dark Sigil Helmet"]: Tool & {
				Animation2: Animation;
				Misc: Folder;
				Scriptss: Script;
				Emulatable: Folder;
				Animation: Animation;
			};
			["Better Armis"]: Tool & {
				M2: Folder;
				GodSpell: Folder;
				Activator: ModuleScript & {
					Snap: Animation;
				};
				HasPotential: Folder;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
					hatebored: Folder;
					lucman27: Folder;
					hugothelongest: Folder;
				};
				Spell: Folder;
			};
			Pebble: Tool & {
				Script: Script;
				getMouse: RemoteFunction;
				LocalScript: LocalScript;
				Activator1: ModuleScript;
				Skill: Folder;
				Animation: Animation;
			};
			["Light Piercer"]: Tool & {
				Strike: Animation;
				Emulatable: Folder;
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				Skill: Folder;
				Weapon: Folder;
			};
			ShadowStep: Folder;
			Deepknight_Helmet: Accessory & {
				Handle: MeshPart & {
					OriginalSize: Vector3Value;
					TouchInterest: TouchTransmitter;
				};
			};
			["Purple Cowl"]: Tool & {
				Animation2: Animation;
				Script: Script;
				Animation: Animation;
			};
			["Dark Eruption"]: Tool & {
				Activator: ModuleScript;
				Use: Animation;
				Weapon: Folder;
			};
			["Hyper Body"]: Tool & {
				Activator: ModuleScript;
				Weapon: Folder;
				Use: Animation;
			};
			["Wing Soar"]: Tool & {
				Emulatable: Folder;
				UltraSkill: Folder;
				Activator: ModuleScript;
				Use: Animation;
				Skill: Folder;
				GreenCharge: ParticleEmitter;
			};
			["Demon Flip"]: Tool & {
				UltraSkill: Folder;
				FistSkill: Folder;
				Activator: ModuleScript;
				Slide: Animation;
				Particle: ParticleEmitter;
				Emulatable: Folder;
				M2: Folder;
				UberOniParticle: Folder & {
					Particle: ParticleEmitter;
				};
				FistSwitch: Folder;
				Chop: Animation;
				UberParticle: ParticleEmitter;
				Sound: Sound;
				RequiresWeapon: StringValue;
			};
			Decompose: Tool & {
				Activator: ModuleScript;
				GetOut: Animation;
				Skill: Folder;
				Decomposing: Animation;
			};
			["World's Pulse"]: Tool & {
				Script: Script;
				Skill: Folder;
			};
			["Shadow Fan"]: Tool & {
				LethalTrail: Trail;
				Emulatable: Folder;
				UltraSkill: Folder;
				ShadowEmitter: ParticleEmitter;
				Activator: ModuleScript & {
					ShadowBoof: Folder;
				};
				Weapon: Folder;
				Anim: Animation;
				RequiresWeapon: StringValue;
			};
			["Elegant Slash"]: Tool & {
				LethalTrail: Trail;
				effect: Part & {
					Mesh: BlockMesh;
					DaggerHit: Sound;
				};
				Animation: Animation;
				Activator: ModuleScript;
				Weapon: Folder;
				Skill: Folder;
				RequiresWeapon: StringValue;
			};
			Scythe: Tool & {
				M2: Folder;
				MainWeapon: Folder;
				Activator: ModuleScript;
				SilverCharge: Sound;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
				};
				Weapon: Folder;
			};
			Gelidus: Tool & {
				Activator: ModuleScript & {
					Frozone: Animation;
					RightPoint: Animation;
					BigLoopFire: Sound & {
						DistortionSoundEffect: DistortionSoundEffect;
						ChorusSoundEffect: ChorusSoundEffect;
					};
					Hit: Sound;
					WindLoop: Sound;
					Snap: Animation;
					BookPoint: Animation;
					SkateLoop: Sound;
				};
				M2: Folder;
				Snap: Sound;
				Spell: Folder;
			};
			["Trinket Shift"]: Tool & {
				Activator: ModuleScript;
				Skill: Folder;
			};
			Hoppa: Tool & {
				Spell: Folder;
				GodSpell: Folder;
				Activator: ModuleScript & {
					Snap: Sound;
					Snap2: Animation;
					Animation: Animation;
				};
				HasPotential: Folder;
				M2: Folder;
			};
			Resurrection: Tool & {
				Activator: ModuleScript;
			};
			["Runic Stability"]: Folder;
			Sword: Tool & {
				Activator: ModuleScript;
				M2: Folder;
				Weapon: Folder;
				MainWeapon: Folder;
			};
			["Auto Misogi"]: Folder;
			["Hunter's Focus"]: Tool & {
				Activator: ModuleScript;
				Weapon: Folder;
				Skill: Folder;
				RequiresWeapon: StringValue;
			};
			Impale: Tool & {
				Emulatable: Folder;
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				Weapon: Folder;
				Use: Animation;
			};
			["Demon's Bet"]: Tool & {
				Activator: ModuleScript;
				Song: Folder;
				Anim: Animation;
				LethalTrail: Trail;
			};
			["Action Surge"]: Tool & {
				Surge: Sound;
				Activator: ModuleScript;
				Emulatable: Folder;
				ActionSurge: ParticleEmitter;
				Weapon: Folder;
			};
			["Wrathful Leap"]: Tool & {
				Idle: Animation;
				Debounce: BoolValue;
				Activator: ModuleScript;
				Weapon: Folder;
				Skill: Folder;
				Use: Animation;
			};
			["Rune Casting"]: Folder;
			["Great Cyclone"]: Tool & {
				Activator: ModuleScript & {
					ChargeAnim: Animation;
					ReleaseSound: Sound & {
						PitchShiftSoundEffect: PitchShiftSoundEffect;
					};
					Reiatsu: ParticleEmitter;
					ReleaseAnim: Animation;
				};
				Skill: Folder;
				Weapon: Folder;
			};
			["Soul Rip"]: Tool & {
				Eat: Animation;
				M2: Folder;
				SoulRip: Sound;
				Rune: Sound & {
					DistortionSoundEffect: DistortionSoundEffect;
					EchoSoundEffect: EchoSoundEffect;
					PitchShiftSoundEffect: PitchShiftSoundEffect;
				};
				Activator: ModuleScript;
				IdleDinakeri: Animation;
				Skill: Folder;
				Use: Animation;
			};
			Trident: Tool & {
				Activator: ModuleScript;
				MainWeapon: Folder;
				Idle: Animation;
				Weapon: Folder;
			};
			Austrum: Tool & {
				Spell: Folder;
				Activator: ModuleScript;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
					hugothelongest: Folder;
				};
				Anim2: Animation;
				Snap: Sound;
			};
			["Spear Crusher"]: Tool & {
				Emulatable: Folder;
				Skill: Folder;
				GreenCharge: ParticleEmitter;
				Activator: ModuleScript;
				Use: Animation;
				anim2: Animation;
				Weapon: Folder;
			};
			["Jester's Scheme"]: Tool & {
				Script: Script;
			};
			["Jester's Ruse"]: Tool & {
				Script: Script & {
					ERASURE: LocalScript;
				};
				Edict: Folder;
				NoCopy: Folder;
				Windup: Sound;
				Skill: Folder;
				FistSkill: Folder;
			};
			["White Fire Charge"]: Tool & {
				Activator: ModuleScript;
				PointLight: PointLight;
				Weapon: Folder;
				Use: Animation;
			};
			Vulnere: Tool & {
				Spell: Folder;
				Script: Script;
				getMouse: RemoteFunction;
				LocalScript: LocalScript;
				Activator1: ModuleScript & {
					DisarmSpell: Part & {
						Motor6D: Motor6D;
						Attachment2: Attachment;
						ParticleEmitter: ParticleEmitter;
						WallHit: Sound;
						PointLight: PointLight;
						BodyVelocity: BodyVelocity;
						Hit: Sound;
						TestTrail: Trail;
						Mesh: SpecialMesh;
						TrailP: Part & {
							Attachment: Attachment;
							Attachment2: Attachment;
							Trail: Trail;
						};
						Attachment1: Attachment;
					};
				};
			};
			GreenThumb: Folder;
			PotionEfficiency: Folder;
			Ragdoll: Tool & {
				Script: Script;
			};
			["Owl Slash"]: Tool & {
				LethalTrail: Trail;
				UltraSkill: Folder;
				Activator: ModuleScript & {
					Animation: Animation;
					effect: Part & {
						Mesh: BlockMesh;
						DaggerHit: Sound;
					};
					Feathers: ParticleEmitter;
					GreatSlash: Part & {
						Mesh: BlockMesh;
						DaggerHit: Sound;
					};
					Animation1: Animation;
				};
				AnimationL: Animation;
				Skill: Folder;
				RequiresWeapon: StringValue;
			};
			["Pumpkin Helmet"]: Tool & {
				Animation2: Animation;
				Misc: Folder;
				Script: Script;
				Animation: Animation;
				Event: RemoteEvent;
			};
			["Time Halt"]: Tool & {
				LocalScript: LocalScript;
				RemoteEvent: RemoteEvent;
				Script: Script;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
					HateBored: Folder;
					hatebored: Folder;
					ViolentSan: Folder;
					EpicGameFarrter2015: Folder;
				};
			};
			["Triple Dagger Throw"]: Tool & {
				LethalTrail: Trail;
				Emulatable: Folder;
				Weapon: Folder;
				ShadowEmitter: ParticleEmitter;
				Activator: ModuleScript & {
					ShadowBoof: Folder;
				};
				Anim: Animation;
				RequiresWeapon: StringValue;
			};
			Perflora: Tool & {
				Activator: ModuleScript & {
					Sound: Sound;
				};
				M2: Folder;
				Spell: Folder;
				SkillSpell: Folder;
			};
			["Fons Vitae"]: Tool & {
				SkillSpell: Folder;
				Charm: Folder;
				Activator: ModuleScript & {
					Sound: Sound;
				};
				M2: Folder;
				Spell: Folder;
			};
			Nocere: Tool & {
				M2: Folder;
				SnapNocere1: Animation;
				SnapNocere2: Animation;
				Activator: ModuleScript;
				Anim2: Animation;
				Snap: Sound;
				Spell: Folder;
			};
			Verdien: Tool & {
				Activator: ModuleScript & {
					Sound: Sound;
				};
				M2: Folder;
				Spell: Folder;
				SkillSpell: Folder;
			};
			Spellblade: Tool & {
				Activator: ModuleScript & {
					Frozone: Animation;
					RightPoint: Animation;
					BigLoopFire: Sound & {
						DistortionSoundEffect: DistortionSoundEffect;
						ChorusSoundEffect: ChorusSoundEffect;
					};
					Hit: Sound;
					WindLoop: Sound;
					Snap: Animation;
					BookPoint: Animation;
					SkateLoop: Sound;
				};
				Weapon: Folder;
			};
			Greatsword: Tool & {
				M2: Folder;
				Idle: Animation;
				MainWeapon: Folder;
				Activator: ModuleScript;
				Weapon: Folder;
			};
			["Seismic T0$s"]: Tool & {
				Swing: Sound;
				UberParticle: ParticleEmitter;
				GrabLand: Animation;
				ElectricShock: Sound;
				UltraSkill: Folder;
				FistSkill: Folder;
				Activator: ModuleScript;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					p0vd: Folder;
					bacon_tier: Folder;
				};
				Particle: ParticleEmitter;
				LightningHit: Sound;
				kkick: Animation;
				Reaction: Animation;
				FistSwitch: Folder;
				GrabAttempt: Animation;
				Skill: Folder;
				GrabVictim: Animation;
				RequiresWeapon: StringValue;
			};
			Silverguard: Tool & {
				Emulatable: Folder;
				UltraSkill: Folder;
				Activator: ModuleScript;
				Weapon: Folder;
				Skill: Folder;
				RequiresWeapon: StringValue;
			};
			["Axe Kick"]: Tool & {
				Emulatable: Folder;
				FistSkill: Folder;
				Activator: ModuleScript;
				Particle: ParticleEmitter;
				UltraSkill: Folder;
				M2: Folder;
				UberOniParticle: Folder & {
					Particle: ParticleEmitter;
				};
				FistSwitch: Folder;
				TatsuAnim: Animation;
				UberParticle: ParticleEmitter;
				Anim: Animation;
				RequiresWeapon: StringValue;
			};
			Intermissum: Tool & {
				Activator: ModuleScript;
				Spell: Folder;
				Snap: Sound;
				Anim2: Animation;
			};
			Rampage: Tool & {
				StartupAnim: Animation;
				Skill: Folder;
				MonkPunch1: Animation;
				FinishSound: Sound;
				Sound: Sound;
				StartSound: Sound;
				MonkPunch2: Animation;
				Script: Script;
				Step: Animation;
				FinishAnim: Animation;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
				};
				Particle: ParticleEmitter;
				MonkPunch3: Animation;
				HitSound1: Sound;
				HitFX: Sound;
				HitSound3: Sound;
				FistSwitch: Folder;
				MonkPunch4: Animation;
				DemonHit: ParticleEmitter;
				HitSound2: Sound;
				RequiresWeapon: StringValue;
			};
			["Shadow Tendrils"]: Tool & {
				Activator: ModuleScript;
			};
			Tenebris: Tool & {
				Charge: Sound;
				Spell: IntValue;
				Activator: ModuleScript & {
					MagicSlam: Animation;
					Animation: Animation;
				};
				Fire: Sound;
				Fire2: Sound;
				M2: Folder;
			};
			["Major Mederi"]: Tool & {
				Activator: ModuleScript & {
					RightPoint: Animation;
					LeftPoint: Animation;
				};
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
				};
				Skill: Folder;
				M2: Folder;
				SoulRip: Sound;
				Rune: Sound & {
					DistortionSoundEffect: DistortionSoundEffect;
					EchoSoundEffect: EchoSoundEffect;
					PitchShiftSoundEffect: PitchShiftSoundEffect;
				};
				Eat: Animation;
				IdleDinakeri: Animation;
				Use: Animation;
			};
			AdvancedFist: Folder;
			Lethality: Tool & {
				AnimationL: Animation;
				Weapon: Folder;
				effect: Part & {
					Mesh: BlockMesh;
					DaggerHit: Sound;
				};
				Activator: ModuleScript;
				LethalTrail: Trail;
				Skill: Folder & {
					Skill: Folder;
				};
				RequiresWeapon: StringValue;
			};
			["Monastic Stance"]: Tool & {
				IdleMonk: Animation;
				Activator: ModuleScript;
				Emulatable: Folder;
				Skill: Folder;
				Stomp: Animation;
			};
			["Terra Serpent"]: Tool & {
				SkillSpell: Folder;
				Activator: ModuleScript;
				Spec: Folder & {
					lucman27: Folder;
					hatebored: Folder;
					bacon_tier: Folder;
					BananaWaffleCakes: Folder;
				};
				Spell: Folder;
				UltraSkill: Folder;
			};
			["Triple Strike"]: Tool & {
				Strike: Animation;
				Emulatable: Folder;
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				Skill: Folder;
				Weapon: Folder;
			};
			Telorum: Tool & {
				Activator: ModuleScript & {
					Spell: Sound;
					Third: Animation;
					Pull: Animation;
					First: Animation;
					Fourth: Animation;
					Second: Animation;
				};
			};
			["Command Monsters"]: Tool & {
				M2: Folder;
				FistSkill: Folder;
				Shriek: Sound;
				Activator: ModuleScript;
				UltraSkill: Folder;
				Skill: Folder;
				Animation: Animation;
			};
			["Chain Pull"]: Tool & {
				GreenCharge: ParticleEmitter;
				Activator: ModuleScript;
				Pull: Animation;
				Sword: Folder;
				Skill: Folder;
				Weapon: Folder;
			};
			["Subzero Strike"]: Tool & {
				Weapon: Folder;
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				Skill: Folder;
				Use: Animation;
			};
			["Ice Charge"]: Tool & {
				Activator: ModuleScript;
				PointLight: PointLight;
				Weapon: Folder;
				Use: Animation;
			};
			Gourdus: Tool & {
				Activator: ModuleScript & {
					Spell: Sound;
					Third: Animation;
					Pull: Animation;
					First: Animation;
					Fourth: Animation;
					Second: Animation;
				};
			};
			["Charged Blow"]: Tool & {
				Ice: Animation;
				Flame: Animation;
				Thunder: Animation;
				GreenCharge: ParticleEmitter;
				Activator: ModuleScript;
				SwordCharge2: Sound;
				Thunderbolt: Sound;
				Weapon: Folder;
			};
			["Dark Flame Burst"]: Tool & {
				Activator: ModuleScript;
				Weapon: Folder;
				Use: Animation;
			};
			ChainLethality: Folder;
			Respirare: Tool & {
				Activator: ModuleScript;
				Skill: Folder;
			};
			["Dragon Awakening"]: Tool & {
				Activator: ModuleScript;
				Use: Animation;
				GreenCharge: ParticleEmitter;
			};
			Grapple: Tool & {
				Script: Script;
				Animation: Animation;
			};
			["Spin Kick"]: Tool & {
				Spin: Animation;
				RedCharge: ParticleEmitter;
				FistSwitch: Folder;
				Activator: ModuleScript;
				Emulatable: Folder;
				RequiresWeapon: StringValue;
			};
			Pondus: Tool & {
				M2: Folder;
				kneel: Animation;
				Activator: ModuleScript;
				snap2: Animation;
				Spell: Folder;
			};
			["Shoulder Bash"]: Tool & {
				Spin: Animation;
				Idle: Animation;
				RedCharge: ParticleEmitter;
				Activator: ModuleScript;
				Emulatable: Folder;
				Weapon: Folder;
			};
			Snarvindur: Tool & {
				Activator: ModuleScript & {
					Spell: Sound;
					Animation: Animation;
					SnapAnim1: Animation;
					Clap: Animation;
					Snap: Sound;
				};
				Spell: IntValue;
				M2: Folder;
			};
			["Better Mori"]: Tool & {
				M2: Folder;
				GodSpell: Folder;
				Activator: ModuleScript & {
					Snap: Animation;
				};
				HasPotential: Folder;
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					xdasfras: Folder;
					HateBored: Folder;
					hatebored: Folder;
					bacon_tier: Folder;
					EpicGameFarrter2015: Folder;
					lucman27: Folder;
					HugoTheLongest: Folder;
					hugothelongest: Folder;
				};
				Spell: Folder;
			};
			Bane: Tool & {
				Emulatable: Folder;
				Script: Script;
				Weapon: Folder;
				Skill: Folder;
				RequiresWeapon: StringValue;
			};
			Dagger: Tool & {
				M2: Folder;
				Dagger: Folder;
				Activator: ModuleScript;
				MainWeapon: Folder;
				Weapon: Folder;
				PrimaryWeapon: Folder;
			};
			ThunderStep: Folder;
			["White Cowl"]: Tool & {
				Animation2: Animation;
				Script: Script;
				Animation: Animation;
			};
			["Ethereal Strike"]: Tool & {
				UltraSkill: Folder;
				Emulatable: Folder;
				EtherealAnim: Animation;
				Weapon: Folder;
				Activator: ModuleScript;
				IgnoreEquipWarmup: Folder;
				Skill: Folder;
				RequiresWeapon: StringValue;
			};
			Harpoon: Tool & {
				Weapon: Folder;
				Activator: ModuleScript & {
					ShadowBoof: Folder;
				};
				Anim: Animation;
				Skill: Folder;
				RequiresWeapon: StringValue;
			};
			["Vagrant Soul"]: Tool & {
				Skill: Folder;
				Activator: ModuleScript;
			};
			Chase: Tool & {
				Spec: Folder & {
					BananaWaffleCakes: Folder;
					bacon_tier: Folder;
				};
				Activator: ModuleScript;
				ShadowDamage: Sound;
				SilverCharge: Sound;
				Weapon: Folder;
				Use: Animation;
			};
			AdvancedAgility: Folder;
			Misogi: Folder;
			["Leg Breaker"]: Tool & {
				Spin: Animation;
				RedCharge: ParticleEmitter;
				FistSwitch: Folder;
				Activator: ModuleScript;
				Emulatable: Folder;
				RequiresWeapon: StringValue;
			};
			Floresco: Tool & {
				Activator: ModuleScript & {
					Sound: Sound;
				};
				SkillSpell: Folder;
				M2: Folder;
				Spell: Folder;
			};
			["Pommel Strike"]: Tool & {
				Emulatable: Folder;
				Weapon: Folder;
				Activator: ModuleScript;
				GreenCharge: ParticleEmitter;
				Skill: Folder;
				Use: Animation;
			};
			Exhaust: Tool & {
				Activator: ModuleScript;
				GetOut: Animation;
				Skill: Folder;
				Decomposing: Animation;
			};
			["Deep Sacrifice"]: Tool & {
				DeepSacrifice: ParticleEmitter;
				Debounce: BoolValue;
				Activator: ModuleScript;
				Emulatable: Folder;
				Weapon: Folder;
				Use: Animation;
			};
			["Quick Stop"]: Tool & {
				M2: Folder;
				FistSkill: Folder;
				NoCopy: Folder;
				Activator: ModuleScript;
				Skill: Folder;
				Sound: Sound & {
					DistortionSoundEffect: DistortionSoundEffect;
					TremoloSoundEffect: TremoloSoundEffect;
					ChorusSoundEffect: ChorusSoundEffect;
				};
			};
			["Demon Step"]: Tool & {
				UltraSkill: Folder;
				FistSkill: Folder;
				UberParticle: ParticleEmitter;
				Particle: ParticleEmitter;
				Emulatable: Folder;
				UberOniParticle: Folder & {
					Particle: ParticleEmitter;
				};
				FistSwitch: Folder;
				Script: Script;
				Step: Animation;
				Sound: Sound;
				RequiresWeapon: StringValue;
			};
			Gate: Tool & {
				Spell: Folder;
				Activator: ModuleScript;
				M2: Folder;
				Anim2: Animation;
				Snap: Sound;
			};
			["Mythic Stability"]: Folder;
			["Shoulder Throw"]: Tool & {
				UltraSkill: Folder;
				FistSkill: Folder;
				UberParticle: ParticleEmitter;
				Particle: ParticleEmitter;
				Skill: Folder;
				GrabVictim: Animation;
				FistSwitch: Folder;
				GrabAttempt: Animation;
				GrabLand: Animation;
				Activator: ModuleScript;
				RequiresWeapon: StringValue;
			};
			DoubleJump: Folder;
			Shift: Tool & {
				Script: Script;
				Skill: Folder;
			};
		};
	};
	RBX_ANIMSAVES: Model & {
		R6: ObjectValue & {
			Untitled: KeyframeSequence & {
				Keyframe: Keyframe & {
					HumanoidRootPart: Pose & {
						Null: IntValue;
						Torso: Pose & {
							["Left Leg"]: Pose;
							["Right Leg"]: Pose;
							["Left Arm"]: Pose;
						};
					};
				};
			};
		};
	};
}
