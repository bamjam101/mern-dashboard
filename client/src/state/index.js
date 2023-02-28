import { createSlice } from "@reduxjs/toolkit";
import { getItemInLocalStorage, setItemInLocalStorage } from "../utlis";

const initialState = {
  mode: getItemInLocalStorage("MODE") || "dark",
  userId: getItemInLocalStorage("USER_ID") || "",
  username: getItemInLocalStorage("NAME") || "STRANGER",
  isAdmin: getItemInLocalStorage("IS_ADMIN") || false,
  role: getItemInLocalStorage("ROLE") || "regular",
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
    setAdmin: (state) => {
      state.isAdmin = state.isAdmin ? false : true;
      setItemInLocalStorage("IS_ADMIN", state.isAdmin);
    },
    setUsername: (state, username) => {
      state.username = username.payload;
      setItemInLocalStorage("NAME", username.payload);
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
  setUsername,
  setUserRole,
  setAdmin,
  setLogout,
} = globalSlice.actions;

export default globalSlice.reducer;
