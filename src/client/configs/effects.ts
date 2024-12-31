import { WeaponType } from "shared/configs/weapons";
import { SFX, VFX } from "shared/constants";

function getHitType(weaponType: WeaponType) {
	const hitType = weaponType === WeaponType.Fists ? "Blunt" : "Sharp";
	return hitType;
}

function playSound(character: Model, soundName: string): void {
	const torso = character.FindFirstChild("Torso");
	if (torso === undefined) return;
	let sound = torso.FindFirstChild(soundName) as Sound | undefined;
	if (sound === undefined) {
		sound = SFX.FindFirstChild(soundName) as Sound | undefined;
		if (sound === undefined) {
			error(`${soundName} does not exist`);
		}
	}
	const clone = sound.Clone();
	clone.PlayOnRemove = true;
	clone.Parent = torso;
	clone.Destroy();
}

function getParticleEmitter(
	character: Model,
	particleName: string,
): ParticleEmitter {
	const torso = character.FindFirstChild("Torso");
	if (torso === undefined) error(`${character.GetFullName()} has no torso`);
	let particle = torso.FindFirstChild(particleName) as
		| ParticleEmitter
		| undefined;
	if (particle === undefined) {
		const template = VFX.FindFirstChild(particleName) as
			| ParticleEmitter
			| undefined;
		if (template !== undefined) {
			particle = template.Clone();
			particle.Parent = torso;
		}
	}
	if (particle === undefined || !particle.IsA("ParticleEmitter")) {
		error(`${particleName} is not a particle emitter`);
	}
	return particle;
}

function emitParticle(
	character: Model,
	particleName: string,
	amount: number,
): void {
	const clone = getParticleEmitter(character, particleName);
	clone.Enabled = false;
	clone.Emit(amount);
}

function toggleParticle(
	character: Model,
	particleName: string,
	enabled: boolean,
): void {
	const particle = getParticleEmitter(character, particleName);
	particle.Enabled = enabled;
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
		let sound: Sound;
		switch (weaponType) {
			case WeaponType.Fists:
				sound = SFX[`FistsChargeFinish`];
				break;
			case WeaponType.Spear:
				sound = SFX[`HeavySpearSwing`];
				break;
			case WeaponType.Dagger:
				sound =
					SFX[math.random(2) === 1 ? `DaggerSwing` : `DaggerSwing2`];
				break;
			default:
				return;
		}
		const clone = sound.Clone();
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
		playSound(character, "BlockBreak");
	},
	StrikeCharge: (character: Model) => {
		playSound(character, "StrikeCharge");
	},
	SpearEmit: (character: Model) => {
		emitParticle(character, "SpearEmit", 8);
	},
	Poison: (character: Model) => {
		playSound(character, "Poisoned");
		toggleParticle(character, "Poison", true);
	},
	StopPoison: (character: Model) => {
		toggleParticle(character, "Poison", false);
	},
};
