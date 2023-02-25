import { createSlice } from "@reduxjs/toolkit";
import { getItemInLocalStorage } from "../utlis";

const initialState = {
  mode: "dark",
  userId: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state) => {
      state.userId === getItemInLocalStorage("USER_ID");
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
