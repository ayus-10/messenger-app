import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthenticatedUser {
  email: string | null;
}

const initialState: AuthenticatedUser = {
  email: null,
};

const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    unsetAuthenticatedUser: (state) => {
      state.email = null;
    },
  },
});

export const { setAuthenticatedUser, unsetAuthenticatedUser } =
  authenticatedUserSlice.actions;

export default authenticatedUserSlice.reducer;
