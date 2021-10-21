import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import ReferralAPI from "../api/ReferralAPI";

export interface ReferralState {
  [key: string]: any;
}

const initialState: ReferralState = {
  referrals: [],
  loading: false,
  errors: null,
};

export const getReferrals = createAsyncThunk(
  "coupon/get_coupons",
  async (couponData: any, thunkAPI) => {
    try {
      const response = await ReferralAPI.getReferrals();
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.error);
    }
  }
);

export const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Get referrals */
    builder.addCase(getReferrals.fulfilled, (state, action: any) => {
      state.referrals = action.payload;
      state.loading = false;
      state.errors = null;
    });
    builder.addCase(getReferrals.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(getReferrals.pending, (state, action) => {
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = referralSlice.actions;

export default referralSlice.reducer;
