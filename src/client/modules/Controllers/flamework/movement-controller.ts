import { Controller, Dependency, OnStart } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import { OnLocalCharacterAdded } from "../../../../../types/lifecycles";
import { Components } from "@flamework/components";

const BASE_CLIMB_SPEED = 10;
const BASE_WALK_SPEED = 20;
const DASH_DURATION = 0.4;
const TRAINED_CLIMB_BONUS_DURATION = 10;

const VFX = ReplicatedStorage.Effects.Visuals;
const SFX = ReplicatedStorage.Effects.Sounds;

@Controller()
export class MovementController implements OnStart, OnLocalCharacterAdded {
	private raycastParams = new RaycastParams();
	private character: Model | undefined;

	onStart(): void {
		this.raycastParams.CollisionGroup = "Characters";
		this.raycastParams.IgnoreWater = true;
	}

	onLocalCharacterAdded(character: Model): void {
		print(character, "belongs to me!");
	}

	private alignCharacter(deltaTime: number, ray: RaycastResult): void {
		
	}

	
}