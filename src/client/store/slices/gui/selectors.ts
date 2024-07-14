import { RootState } from "client/store";

export const selectDialogue = (state: RootState) => state.gui.dialogue;
