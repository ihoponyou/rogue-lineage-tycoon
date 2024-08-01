export const EFFECTS: { [name: string]: Callback } = {
	Hit: (character: Model, hitType: string) => {
		const torso = character.FindFirstChild("Torso");
		if (torso === undefined) return;
		const emitter = torso.FindFirstChild(`${hitType}HitParticle`);
		if (emitter === undefined || !emitter.IsA("ParticleEmitter")) return;
		emitter.Emit(5);
		const sound = torso.FindFirstChild(`${hitType}HitSound`);
		if (sound === undefined || !sound.IsA("Sound")) return;
		sound.Play();
	},
};
