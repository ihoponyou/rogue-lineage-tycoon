interface ReplicatedStorage extends Instance {
	Kicked: RemoteEvent;
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
	Animations: Folder & {
		Movement: Folder & {
			ClimbRight: Animation;
			ClimbIdle: Animation;
			DashForward: Animation;
			DashBackward: Animation;
			ClimbDown: Animation;
			ClimbUp: Animation;
			DashLeft: Animation;
			Run: Animation;
			DashRight: Animation;
			LedgeClimbUp: Animation;
			ManaRun: Animation;
			ClimbLeft: Animation;
		};
		Combat: Folder & {
			PickUp: Animation;
			Gripping: Animation;
			Throw: Animation;
			Carried: Animation;
			Gripped: Animation;
			Carrying: Animation;
		};
	};
	Packages: Folder & {
		_Index: Folder & {
			["jsdotlua_boolean@1.2.6"]: Folder & {
				boolean: ModuleScript & {
					toJSBoolean: ModuleScript;
				};
				number: ModuleScript;
			};
			["sleitnick_component@2.4.8"]: Folder & {
				component: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
				Promise: ModuleScript;
				Symbol: ModuleScript;
				Trove: ModuleScript;
				Signal: ModuleScript;
			};
			["sleitnick_timer@1.1.2"]: Folder & {
				timer: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
				Signal: ModuleScript;
			};
			["jsdotlua_number@1.2.6"]: Folder & {
				number: ModuleScript & {
					MAX_SAFE_INTEGER: ModuleScript;
					isSafeInteger: ModuleScript;
					toExponential: ModuleScript;
					isNaN: ModuleScript;
					isInteger: ModuleScript;
					isFinite: ModuleScript;
					MIN_SAFE_INTEGER: ModuleScript;
				};
			};
			["jsdotlua_es7-types@1.2.6"]: Folder & {
				["es7-types"]: ModuleScript;
			};
			["jsdotlua_luau-polyfill@1.2.6"]: Folder & {
				number: ModuleScript;
				collections: ModuleScript;
				timers: ModuleScript;
				["instance-of"]: ModuleScript;
				["symbol-luau"]: ModuleScript;
				["luau-polyfill"]: ModuleScript & {
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
				string: ModuleScript;
				math: ModuleScript;
				console: ModuleScript;
				boolean: ModuleScript;
				["es7-types"]: ModuleScript;
			};
			["sleitnick_loader@2.0.0"]: Folder & {
				loader: ModuleScript;
			};
			["jsdotlua_promise@3.5.2"]: Folder & {
				promise: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
			};
			["jsdotlua_console@1.2.6"]: Folder & {
				console: ModuleScript & {
					makeConsoleImpl: ModuleScript;
				};
				collections: ModuleScript;
			};
			["roblox_testez@0.4.1"]: Folder & {
				testez: ModuleScript & {
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
			["jsdotlua_shared@17.1.0"]: Folder & {
				["luau-polyfill"]: ModuleScript;
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
			};
			["evaera_promise@4.0.0"]: Folder & {
				promise: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
			};
			["jsdotlua_react@17.1.0"]: Folder & {
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
				["luau-polyfill"]: ModuleScript;
				shared: ModuleScript;
			};
			["sleitnick_signal@2.0.1"]: Folder & {
				signal: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
			};
			["sleitnick_symbol@2.0.1"]: Folder & {
				symbol: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
			};
			["sleitnick_signal@1.5.0"]: Folder & {
				signal: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
			};
			["sleitnick_option@1.0.5"]: Folder & {
				option: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
			};
			["sleitnick_comm@1.0.1"]: Folder & {
				Option: ModuleScript;
				comm: ModuleScript & {
					Types: ModuleScript;
					Client: ModuleScript & {
						ClientComm: ModuleScript;
						ClientRemoteProperty: ModuleScript;
						ClientRemoteSignal: ModuleScript;
					};
					Util: ModuleScript;
					Server: ModuleScript & {
						RemoteSignal: ModuleScript;
						RemoteProperty: ModuleScript;
						ServerComm: ModuleScript;
					};
				};
				Promise: ModuleScript;
				Signal: ModuleScript;
			};
			["sleitnick_trove@1.3.0"]: Folder & {
				trove: ModuleScript & {
					["init.spec"]: ModuleScript;
				};
			};
			["jsdotlua_react-reconciler@17.1.0"]: Folder & {
				["luau-polyfill"]: ModuleScript;
				shared: ModuleScript;
				react: ModuleScript;
				scheduler: ModuleScript;
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
				promise: ModuleScript;
			};
			["brittonfischer_spring@0.1.0"]: Folder & {
				spring: ModuleScript;
			};
			["jsdotlua_timers@1.2.6"]: Folder & {
				timers: ModuleScript & {
					makeIntervalImpl: ModuleScript;
					makeTimerImpl: ModuleScript;
				};
				collections: ModuleScript;
			};
			["jsdotlua_symbol-luau@1.0.1"]: Folder & {
				["symbol-luau"]: ModuleScript & {
					["Registry.global"]: ModuleScript;
					Symbol: ModuleScript;
				};
			};
			["chriscerie_react-spring@2.0.0"]: Folder & {
				["react-spring"]: ModuleScript & {
					util: ModuleScript & {
						map: ModuleScript;
						merge: ModuleScript;
					};
					Promise: ModuleScript;
					Animation: ModuleScript;
					Controller: ModuleScript;
					SpringValue: ModuleScript;
					helpers: ModuleScript;
					constants: ModuleScript;
					AnimationConfig: ModuleScript;
					["AnimationConfig.spec"]: ModuleScript;
					types: Folder & {
						common: ModuleScript;
					};
					isRoact17: ModuleScript;
					React: ModuleScript;
					hooks: Folder & {
						useTrail: ModuleScript;
						["useSpring.spec"]: ModuleScript;
						useSprings: ModuleScript;
						useSpring: ModuleScript;
						["useSprings.spec"]: ModuleScript;
					};
					["Controller.spec"]: ModuleScript;
					Signal: ModuleScript;
				};
				Promise: ModuleScript;
				ReactRoblox: ModuleScript;
				React: ModuleScript;
				TestEZ: ModuleScript;
			};
			["jsdotlua_collections@1.2.6"]: Folder & {
				["instance-of"]: ModuleScript;
				collections: ModuleScript & {
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
				["es7-types"]: ModuleScript;
			};
			["jsdotlua_instance-of@1.2.6"]: Folder & {
				["instance-of"]: ModuleScript & {
					["instanceof"]: ModuleScript;
				};
			};
			["jsdotlua_scheduler@17.1.0"]: Folder & {
				shared: ModuleScript;
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
				["luau-polyfill"]: ModuleScript;
			};
			["jsdotlua_react-roblox@17.1.0"]: Folder & {
				["react-reconciler"]: ModuleScript;
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
				react: ModuleScript;
				shared: ModuleScript;
				scheduler: ModuleScript;
				["luau-polyfill"]: ModuleScript;
			};
			["jsdotlua_string@1.2.6"]: Folder & {
				number: ModuleScript;
				string: ModuleScript & {
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
				["es7-types"]: ModuleScript;
			};
			["sleitnick_knit@1.7.0"]: Folder & {
				Comm: ModuleScript;
				Promise: ModuleScript;
				knit: ModuleScript & {
					KnitClient: ModuleScript;
					KnitServer: ModuleScript;
				};
			};
			["jsdotlua_math@1.2.6"]: Folder & {
				math: ModuleScript & {
					clz32: ModuleScript;
				};
			};
		};
		Knit: ModuleScript;
		Spring: ModuleScript;
		ReactRoblox: ModuleScript;
		ReactSpring: ModuleScript;
		Component: ModuleScript;
		Loader: ModuleScript;
		React: ModuleScript;
		Trove: ModuleScript;
		Timer: ModuleScript;
		Signal: ModuleScript;
	};
	Effects: Folder & {
		Visuals: Folder & {
			ShriekerSmoke: ParticleEmitter;
			LordsbaneLightning: ParticleEmitter;
			SilverEmit: ParticleEmitter;
			Poison: ParticleEmitter;
			M2Trail: Trail;
			OrangeFire: ParticleEmitter;
			BloodHit: ParticleEmitter;
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
			PunchEmit: ParticleEmitter;
			DarkMatter: ParticleEmitter;
			Smoke: ParticleEmitter;
			DBloodTrue: ParticleEmitter;
			MonasticFire: ParticleEmitter;
			BlockParticle: ParticleEmitter;
			Cameo: ParticleEmitter;
			Torso: Folder & {
				Injure: ParticleEmitter;
				OrangeFire: ParticleEmitter;
			};
			MonkParticle: ParticleEmitter;
			ManaStopParticle: ParticleEmitter;
			Sparks: ParticleEmitter;
			CommandFX: ParticleEmitter;
			ManaRunTrail: Trail;
			Feathers: ParticleEmitter;
			ColdBreath: ParticleEmitter;
			LElectric: ParticleEmitter;
			ChargePart: ParticleEmitter;
			Electric: ParticleEmitter & {
				ElectricLight: PointLight;
			};
			DBloodOff: ParticleEmitter;
			SpearEmit: ParticleEmitter;
			Broken: ParticleEmitter;
			DBloodOn: ParticleEmitter;
			Injure: ParticleEmitter;
			LannisParticle: ParticleEmitter;
		};
		Models: Folder & {
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
			Seraph: Part & {
				ParticleEmitter: ParticleEmitter;
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
			Orb: Part & {
				Mesh: SpecialMesh;
				Attachment: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
			};
		};
		Sounds: Folder & {
			Greatspearhit: Sound;
			SoulRipped: Sound;
			PunchHit: Sound;
			Died: Sound;
			PerfectCast: Sound;
			FinishedCharging: Sound;
			CounterSpell: Sound;
			FreeFalling: Sound;
			SilverDischarge: Sound;
			SwordHit: Sound;
			DaggerSlash2: Sound;
			DaggerCharge: Sound;
			Diffusion: Sound;
			Lannis: Sound;
			Blink: Sound;
			WingFlap: Sound;
			Injured: Sound;
			Stealth: Sound;
			Charging: Sound;
			Pondus: Sound & {
				FlangeSoundEffect: FlangeSoundEffect;
			};
			Erase: Sound;
			Extinguish: Sound;
			ManaDash: Sound;
			DaggerHit: Sound;
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
			BaneCharge: Sound;
			Landing: Sound;
			Jumping: Sound;
			Climbing: Sound;
			Growth: Sound;
			Swimming: Sound;
			LightningHit: Sound;
			GettingUp: Sound;
			CounterSpellOff: Sound;
			DaggerSlash1: Sound;
			Dash: Sound;
			GrappleNoise: Sound;
			Snap: Sound;
			SwordCharge: Sound;
		};
	};
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
		Bullet: Part & {
			Trail: Trail;
			Whiz: Sound;
			Smoke: ParticleEmitter;
		};
		PocketSandPart: Part & {
			Sound: Sound;
			PocketSand: ParticleEmitter;
		};
		SlashRing: MeshPart;
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
		MisogiParticle: Part & {
			Attachment: Attachment & {
				Particle: ParticleEmitter;
			};
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
		IntermissumPart: Part & {
			IllusionArm: ParticleEmitter;
			PointLight: PointLight;
			Hit: Sound;
			IllusionHead: ParticleEmitter;
			IllusionSnap: ParticleEmitter;
			Snap: Sound;
			Attachment: Attachment;
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
	libs: Folder & {
		ProfileService: ModuleScript;
	};
	Source: Folder & {
		Modules: Folder & {
			RaycastUtil: ModuleScript;
			HitboxManager: ModuleScript;
			["cast-visualizer"]: ModuleScript;
			AnimationManager: ModuleScript;
			NumberLerp: ModuleScript;
			MathFunctions: ModuleScript;
			useEventConnection: ModuleScript;
			ModelUtil: ModuleScript;
			Find: ModuleScript;
			VectorMath: ModuleScript;
			OffsetManager: ModuleScript;
			["core-call"]: ModuleScript;
			Extensions: Folder & {
				LocalPlayerExclusive: ModuleScript;
				Logger: ModuleScript;
			};
			TableFunctions: ModuleScript;
			CastVisualizer: ModuleScript;
		};
		ClientModules: Folder & {
			ClientComponents: Folder & {
				Race: ModuleScript;
			};
			Controllers: Folder & {
				AnimationController: ModuleScript;
				MovementController: ModuleScript;
				RagdollController: ModuleScript;
				InputController: ModuleScript & {
					DefaultKeybinds: ModuleScript;
				};
				InteractionController: ModuleScript;
				EffectController: ModuleScript;
				GuiController: ModuleScript;
				CameraController: ModuleScript;
				MagicController: ModuleScript;
			};
		};
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
		ManaGui: ScreenGui & {
			LeftContainer: Frame & {
				ManaBar: Frame & {
					Overlay: ImageLabel;
					Slider: Frame & {
						Divider: Frame;
					};
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
		StatGui: ScreenGui & {
			Health: LocalScript;
			Container: Frame & {
				Health: Frame & {
					Overlay: ImageLabel;
					Temperature: ImageLabel & {
						Gradient: ImageLabel & {
							Pointer: Frame;
						};
					};
					Survival: ImageLabel & {
						Back: Frame & {
							Stomach: Frame & {
								Divider: Frame;
							};
							Toxicity: Frame & {
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
					Slider: Frame & {
						Divider: Frame;
					};
				};
				CharacterName: TextLabel & {
					LocalScript: LocalScript;
					Shadow: TextLabel;
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
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@rbxts"]: Folder & {
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
				services: ModuleScript;
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				["object-utils"]: ModuleScript;
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
				maid: Folder & {
					Maid: ModuleScript;
				};
				signal: ModuleScript;
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
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
	};
	ResetRequest: RemoteEvent;
	Reset: RemoteFunction;
}
