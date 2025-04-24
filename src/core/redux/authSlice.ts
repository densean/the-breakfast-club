import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../auth.model";

const storedUser = sessionStorage.getItem("authToken");

let initialUser: User = { id: "", username: "", role: "", token: "" };

if (storedUser) {
  try {
    const parsed = JSON.parse(storedUser);
    initialUser = {
      id: parsed.id,
      username: parsed.username,
      role: parsed.role,
      token: parsed.token,
    };
  } catch {
    sessionStorage.removeItem("authToken");
  }
}

interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: initialUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      sessionStorage.removeItem("authToken");
      state.user = { id: "", username: "", role: "", token: "" };
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
