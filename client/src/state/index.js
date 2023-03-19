import { createSlice } from "@reduxjs/toolkit";
import { getItemInLocalStorage, setItemInLocalStorage } from "../utlis";

const initialState = {
  mode: getItemInLocalStorage("MODE") || "dark",
  userId: "",
  profile: {},
  isAdmin: false,
  role: "user",
  isLoading: true,
  levels: {
    zero: [],
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
  },
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
    setLevels: (state, levels) => {
      state.levels = levels.payload;
    },
    setLoading: (state, boolean) => {
      state.isLoading = boolean.payload;
    },
    setLogout: (state) => {
      state.userId = "";
      state.isAdmin = false;
      state.profile = {};
      state.role = "user";
      state.levels = {
        zero: [],
        one: [],
        two: [],
        three: [],
        four: [],
        five: [],
      };
      state.isLoading = true;
    },
  },
});

export const {
  setMode,
  setUser,
  setProfile,
  setUserRole,
  setAdmin,
  setLevels,
  setLoading,
  setLogout,
} = globalSlice.actions;

export default globalSlice.reducer;
