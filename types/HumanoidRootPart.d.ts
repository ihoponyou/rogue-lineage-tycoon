type HumanoidRootPart = Part & {
	CarryOrientation: AlignOrientation;
	CarryConstraint: RigidConstraint;
	CarryWeld: WeldConstraint;
	RootJoint: Motor6D;
	CarryAttachment: Attachment;
	CarryPosition: AlignPosition;
	RootAttachment: Attachment;
}
