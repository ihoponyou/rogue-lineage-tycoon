type Head = Part & {
	HatAttachment: Attachment;
	FaceFrontAttachment: Attachment;
	face: Decal;
	ParticleAttachment: Attachment & {
		Sniped: Sound;
		Crit: ParticleEmitter;
		Critted: Sound;
	};
	CarryCollision: NoCollisionConstraint;
	HairAttachment: Attachment;
	RagdollAttachment: Attachment;
	Mesh: SpecialMesh;
	FaceCenterAttachment: Attachment;
}
