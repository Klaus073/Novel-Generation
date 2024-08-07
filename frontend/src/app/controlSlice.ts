import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

interface ControlState {
  isChatActive: boolean;
  isSettingsActive: boolean;
  session: Session | null;
  isSessionLoading: boolean;
  requirementIndex: number;
  isGenreSectionCompleted: boolean;
  isStoryDetailsSectionCompleted: boolean;
}

const initialState: ControlState = {
  isChatActive: false,
  isSettingsActive: false,
  session: null,
  isSessionLoading: false,
  requirementIndex: 0,
  isGenreSectionCompleted: false,
  isStoryDetailsSectionCompleted: false,
};
const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    setIsSettingsActive: (state, action: PayloadAction<boolean>) => {
      state.isSettingsActive = action.payload;
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    setIsSessionLoading: (state, action: PayloadAction<boolean>) => {
      state.isSessionLoading = action.payload;
    },
    setIsChatActive: (state, action: PayloadAction<boolean>) => {
      state.isChatActive = action.payload;
    },

    setRequirementIndex: (state, action: PayloadAction<number>) => {
      state.requirementIndex = action.payload;
    },
    incrementRequirementIndex: (state, action: PayloadAction<number>) => {
      state.requirementIndex += action.payload;
    },

    setIsGenreSectionCompleted: (state, action: PayloadAction<boolean>) => {
      state.isGenreSectionCompleted = action.payload;
    },

    setIsStoryDetailsSectionCompleted: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isStoryDetailsSectionCompleted = action.payload;
    },
  },
});

export const {
  setIsSettingsActive,
  setSession,
  setIsSessionLoading,
  setIsChatActive,
  setRequirementIndex,
  incrementRequirementIndex,
  setIsGenreSectionCompleted,
  setIsStoryDetailsSectionCompleted,
} = controlSlice.actions;

export default controlSlice.reducer;
