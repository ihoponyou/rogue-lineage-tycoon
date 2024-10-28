import { RootClientState } from "client/store";

export const selectDialogueText = (state: RootClientState) =>
	state.dialogue.text;
export const selectDialogueOptions = (state: RootClientState) =>
	state.dialogue.options;
export const selectSpeakerName = (state: RootClientState) =>
	state.dialogue.speakerName;
