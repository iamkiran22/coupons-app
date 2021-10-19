import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import LoginAPI from "../api/LoginAPI";

export interface LoginState {
  username: string;
  password: string;
  sessionCode: string;
  loggedIn: boolean;
}

const initialState: LoginState = {
  username: "",
  password: "",
  sessionCode: "",
  loggedIn: false,
};

export const makeLogin = createAsyncThunk(
  "login/user",
  async (userObj: any, thunkAPI) => {
    const response = await LoginAPI.loginUser(userObj);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // loginUser: (state, action) => {
    //   //   state.value -= 1;
    //   console.log("STATE", action.payload);
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(makeLogin.fulfilled, (state, action: any) => {
      // Add user to the state array
      state.sessionCode = action.payload.response;
      state.loggedIn = true;
    });
    builder.addCase(makeLogin.rejected, (state, action) => {
      // Add user to the state array
      state.sessionCode = "";
      state.loggedIn = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = loginSlice.actions;

export default loginSlice.reducer;
