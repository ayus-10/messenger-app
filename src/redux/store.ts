import { configureStore } from "@reduxjs/toolkit";
import authenticatedUserReducer from "./slices/authenticatedUserSlice";

export const store = configureStore({
  reducer: {
    authenticatedUser: authenticatedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
