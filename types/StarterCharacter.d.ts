type StarterCharacter = Model & {
	["Left Leg"]: Part & {
		RagdollAttachment: Attachment;
		LeftFootAttachment: Attachment;
	};
	["Right Arm"]: Part & {
		RagdollAttachment: Attachment;
		RightGripAttachment: Attachment;
		RightShoulderAttachment: Attachment;
	};
	Head: Part & {
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
	["Right Leg"]: Part & {
		RagdollAttachment: Attachment;
		RightFootAttachment: Attachment;
	};
	Torso: Part & {
		RightCollarAttachment: Attachment;
		WaistCenterAttachment: Attachment;
		PunchHit: Sound;
		M2Trail: Trail;
		OrangeFire: ParticleEmitter;
		WaistBackAttachment: Attachment;
		BloodHit: ParticleEmitter;
		roblox: Decal;
		Injured: Sound;
		BodyFrontAttachment: Attachment;
		RightPelvis: Attachment;
		Charging: Sound;
		Burning: Sound;
		ManaRunTrail: Trail;
		BodyBackAttachment: Attachment;
		ManaDash: Sound;
		RightArmSocket: BallSocketConstraint;
		RightLegSocket: BallSocketConstraint;
		LeftLegSocket: BallSocketConstraint;
		BlockParticle: ParticleEmitter;
		["Left Shoulder"]: Motor6D;
		LeftArmSocket: BallSocketConstraint;
		Fire: ParticleEmitter;
		NeckSocket: BallSocketConstraint;
		LeftPelvis: Attachment;
		LeftCollarAttachment: Attachment;
		Injure: ParticleEmitter;
		Neck: Motor6D;
		Dash: Sound;
		WaistFrontAttachment: Attachment;
		["Right Shoulder"]: Motor6D;
		["Right Hip"]: Motor6D;
		Extinguish: Sound;
		["Left Hip"]: Motor6D;
		Snap: Sound;
		NeckAttachment: Attachment;
	};
	HumanoidRootPart: Part & {
		CarryOrientation: AlignOrientation;
		CarryConstraint: RigidConstraint;
		CarryWeld: WeldConstraint;
		RootJoint: Motor6D;
		CarryAttachment: Attachment;
		CarryPosition: AlignPosition;
		RootAttachment: Attachment;
	};
	["Left Arm"]: Part & {
		LeftGripAttachment: Attachment;
		RagdollAttachment: Attachment;
		LeftShoulderAttachment: Attachment;
	};
};
