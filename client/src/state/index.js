import { createSlice } from "@reduxjs/toolkit";
import { getItemInLocalStorage, setItemInLocalStorage } from "../utlis";

const initialState = {
  mode: getItemInLocalStorage("MODE") || "dark",
  userId: getItemInLocalStorage("USER_ID") || "",
  profile: getItemInLocalStorage("PROFILE") || {},
  isAdmin: getItemInLocalStorage("IS_ADMIN") || false,
  role: getItemInLocalStorage("ROLE") || "regular",
  // token: getItemInLocalStorage("TOKEN") || "",
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
      setItemInLocalStorage("USER_ID", state.userId);
    },
    setAdmin: (state, isAdmin) => {
      state.isAdmin = isAdmin.payload;
      setItemInLocalStorage("IS_ADMIN", state.isAdmin);
    },
    setProfile: (state, profile) => {
      state.profile = profile.payload;
      setItemInLocalStorage("PROFILE", profile.payload);
    },
    setUserRole: (state, role) => {
      state.role = role.payload;
      setItemInLocalStorage("ROLE", state.role);
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
  // setToken,
} = globalSlice.actions;

export default globalSlice.reducer;
