import { WeaponType } from "shared/configs/weapons";
import { SFX } from "shared/constants";
import { HitType } from "shared/enums";

export const EFFECTS: { [name: string]: Callback } = {
	Hit: (character: Model, hitType: HitType) => {
		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		const emitter = torso.FindFirstChild(`${hitType}HitParticle`);
		if (emitter === undefined || !emitter.IsA("ParticleEmitter")) {
			warn(`${hitType}HitParticle not found`);
			return;
		}
		emitter.Emit(5);
		const sound = torso.FindFirstChild(`${hitType}HitSound`);
		if (sound === undefined || !sound.IsA("Sound")) {
			warn(`${hitType}HitSound`);
			return;
		}
		sound.Play();
	},
	BlockHit: (character: Model, hitType: HitType) => {
		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		const emitter = torso.FindFirstChild(`BlockParticle`);
		if (emitter === undefined || !emitter.IsA("ParticleEmitter")) {
			warn(`BlockParticle not found`);
			return;
		}
		emitter.Emit(5);
		const sound = torso.FindFirstChild(`${hitType}BlockHitSound`);
		if (sound === undefined || !sound.IsA("Sound")) {
			warn(`${hitType}BlockHitSound not found`);
			return;
		}
		sound.Play();
	},
	Swing: (character: Model, weaponType: WeaponType) => {
		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		const clone = SFX[`${weaponType}Swing`].Clone();
		clone.PlayOnRemove = true;
		clone.Parent = torso;
		clone.Destroy();
	},
};
