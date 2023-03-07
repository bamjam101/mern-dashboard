import { createSlice } from "@reduxjs/toolkit";
import { getItemInLocalStorage, setItemInLocalStorage } from "../utlis";

const initialState = {
  mode: getItemInLocalStorage("MODE") || "dark",
  userId: "",
  profile: {},
  isAdmin: false,
  role: "user",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      setItemInLocalStorage("MODE", state.mode);
    },
    setUser: (state, id) => {
      state.userId = id.payload;
    },
    setAdmin: (state, isAdmin) => {
      state.isAdmin = isAdmin.payload;
    },
    setProfile: (state, profile) => {
      state.profile = profile.payload;
    },
    setUserRole: (state, role) => {
      state.role = role.payload;
    },
    setLogout: (state) => {
      state = initialState;
    },
  },
});

export const {
  setMode,
  setUser,
  setProfile,
  setUserRole,
  setAdmin,
  setLogout,
} = globalSlice.actions;

export default globalSlice.reducer;
