import { WeaponType } from "shared/configs/weapons";
import { SFX } from "shared/constants";

function getHitType(weaponType: WeaponType) {
	const hitType = weaponType === WeaponType.Fists ? "Blunt" : "Sharp";
	return hitType;
}

export const EFFECTS: { [name: string]: Callback } = {
	Hit: (character: Model, weaponType: WeaponType) => {
		const hitType = getHitType(weaponType);
		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		const emitter = torso.FindFirstChild(`${hitType}HitParticle`);
		if (emitter === undefined || !emitter.IsA("ParticleEmitter")) {
			warn(`${hitType}HitParticle not found`);
			return;
		}
		emitter.Emit(5);
		const sound = torso.FindFirstChild(`${weaponType}Hit`);
		if (sound === undefined || !sound.IsA("Sound")) {
			warn(`${weaponType}Hit`);
			return;
		}
		sound.Play();
	},
	BlockHit: (character: Model, weaponType: WeaponType) => {
		const hitType = getHitType(weaponType);
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
	Swing: (character: Model, weaponType: WeaponType = WeaponType.Fists) => {
		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		const clone = SFX[`${weaponType}Swing`].Clone();
		clone.PlayOnRemove = true;
		clone.Parent = torso;
		clone.Destroy();
	},
	HeavySwing: (character: Model, weaponType: WeaponType) => {
		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		let clone: Sound;
		switch (weaponType) {
			case WeaponType.Fists:
				clone = SFX[`FistsChargeFinish`].Clone();
				break;
			case WeaponType.Spear:
				clone = SFX[`HeavySpearSwing`].Clone();
				break;
			case WeaponType.Dagger:
				clone =
					SFX[
						math.random(2) === 1 ? `DaggerSwing` : `DaggerSwing2`
					].Clone();
				break;
			default:
				return;
		}
		clone.PlayOnRemove = true;
		clone.Parent = torso;
		clone.Destroy();
	},
	HeavyCharge: (character: Model, weaponType: WeaponType) => {
		const rightArm = character.FindFirstChild("Right Arm");
		if (rightArm === undefined) return;
		const emitter = rightArm.FindFirstChild(`HeavyCharge`);
		if (emitter?.IsA("ParticleEmitter")) emitter.Enabled = true;

		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		if (weaponType === WeaponType.Spear) {
			weaponType = WeaponType.Sword;
		}
		const clone = SFX[`${weaponType}Charge`].Clone();
		clone.PlayOnRemove = true;
		clone.Parent = torso;
		clone.Destroy();
	},
	StopHeavyCharge: (character: Model) => {
		const rightArm = character.FindFirstChild("Right Arm");
		if (rightArm === undefined) return;
		const emitter = rightArm.FindFirstChild(`HeavyCharge`);
		if (emitter?.IsA("ParticleEmitter")) emitter.Enabled = false;
	},
	BlockBreak: (character: Model) => {
		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		const clone = SFX.BlockBreak.Clone();
		clone.PlayOnRemove = true;
		clone.Parent = torso;
		clone.Destroy();
	},
};
