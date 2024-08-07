import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArrayObject {
  id: number;
  [key: string]: string | number | boolean;
}
interface NormalObject {
  [key: string]: string;
}
export interface StoryState {
  [key: string]: NormalObject | ArrayObject[] | string;
}

const initialState: StoryState = {};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    updateStoryField: (
      state,
      action: PayloadAction<{
        field: string;
        values: NormalObject | ArrayObject[] | string; // Add string type here
      }>
    ) => {
      const { field, values } = action.payload;

      if (typeof values === "string") {
        // Check if valuesstate[field]: WritableDraft<NormalObject> | WritableDraft<ArrayObject>[] | string; is a string
        state[field] = values; // Assign the string directly to the field
      } else if (Array.isArray(values)) {
        if (!state[field]) {
          state[field] = [];
        }

        values.forEach((newValue: ArrayObject) => {
          const index = (state[field] as ArrayObject[])?.findIndex(
            (existingValue: ArrayObject) => existingValue.id === newValue.id
          );

          if (index !== -1) {
            (state[field] as ArrayObject[])[index] = {
              ...(state[field] as ArrayObject[])[index],
              ...newValue,
            };
          } else {
            (state[field] as ArrayObject[]).push(newValue);
          }
        });
      } else {
        if (!state[field]) {
          state[field] = {};
        }
        state[field] = { ...(state[field] as NormalObject), ...values };
      }
    },
    deleteFromArray: (
      state,
      action: PayloadAction<{ field: string; id: number }>
    ) => {
      const { field, id } = action.payload;
      console.log(field, id, "delete from array");
      if (state[field] && Array.isArray(state[field])) {
        const index = (state[field] as ArrayObject[]).findIndex(
          (item: ArrayObject) => item.id === id
        );

        if (index !== -1) {
          (state[field] as ArrayObject[]).splice(index, 1);
        }
      }
    },
  },
});

export const { updateStoryField, deleteFromArray } = storySlice.actions;

export default storySlice.reducer;
