import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthenticatedUser {
  email: string | null;
  fullName: string | null;
}

const initialState: AuthenticatedUser = {
  email: null,
  fullName: null,
};

const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action: PayloadAction<AuthenticatedUser>) => {
      return action.payload;
    },
    unsetAuthenticatedUser: () => {
      return initialState;
    },
  },
});

export const { setAuthenticatedUser, unsetAuthenticatedUser } =
  authenticatedUserSlice.actions;

export default authenticatedUserSlice.reducer;
