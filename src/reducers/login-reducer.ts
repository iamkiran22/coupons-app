import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import LoginAPI from "../api/LoginAPI";
import Axios from "../utils/Axios";
import { message } from "antd";

export interface LoginState {
  session_id: string;
  loggedIn: boolean;
  loading: boolean;
  user_name: string;
  role: string;
}

const initialState: LoginState = {
  session_id: "",
  loggedIn: false,
  loading: false,
  user_name: "",
  role: "",
};

export const makeLogin = createAsyncThunk(
  "login/user",
  async (userObj: any, thunkAPI) => {
    try {
      const response = await LoginAPI.loginUser(userObj);
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.error);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkUserLogin(state) {
      const session_id = <string>localStorage.getItem("session_id");
      const role = <string>localStorage.getItem("role");
      const user_name = <string>localStorage.getItem("user_name");
      if (session_id) {
        state.session_id = session_id;
        state.loggedIn = true;
        state.role = role;
        state.user_name = user_name;
        //UPDATE SESSION ID
        Axios.updateHeadersWithSession(session_id);
      }
    },
    logout(state) {
      Axios.updateHeadersWithSession("");
      localStorage.clear();
      state.role = "";
      state.user_name = "";
      state.session_id = "";
      state.loading = false;
      state.loggedIn = false;
      message.info("You have logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeLogin.fulfilled, (state, action: any) => {
      state.loggedIn = true;
      state.loading = false;
      const { session_id, role, user_name } = action.payload;
      state.session_id = session_id;
      state.role = role;
      state.user_name = user_name;
      localStorage.setItem("session_id", session_id);
      localStorage.setItem("role", role);
      localStorage.setItem("user_name", user_name);
      //UPDATE SESSION ID
      Axios.updateHeadersWithSession(action.payload.session_id);
    });
    builder.addCase(makeLogin.rejected, (state, action) => {
      state.session_id = "";
      state.loggedIn = false;
      state.loading = false;
    });
    builder.addCase(makeLogin.pending, (state, action) => {
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { checkUserLogin, logout } = loginSlice.actions;

export default loginSlice.reducer;
