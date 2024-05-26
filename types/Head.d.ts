type Head = Part & {
	RagdollAttachment: Attachment;
	HatAttachment: Attachment;
	ParticleAttachment: Attachment & {
		Sniped: Sound;
		Crit: ParticleEmitter;
		Critted: Sound;
	};
	FaceFrontAttachment: Attachment;
	HairAttachment: Attachment;
	face: Decal;
	Mesh: SpecialMesh;
	FaceCenterAttachment: Attachment;
};
