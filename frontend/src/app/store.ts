import { configureStore } from "@reduxjs/toolkit";
import storyReducer from "./storySlice";
import controlReducer from "./controlSlice";

const store = configureStore({
  reducer: {
    story: storyReducer,
    control: controlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
