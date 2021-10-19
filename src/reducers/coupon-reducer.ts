import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import CouponAPI from "../api/CouponAPI";

export interface CouponState {
  [key: string]: any;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
};

export const createCoupon = createAsyncThunk(
  "coupon/create_coupon",
  async (couponData: any, thunkAPI) => {
    const response = await CouponAPI.createCoupon(couponData);
    return response.data;
  }
);

export const getCoupons = createAsyncThunk(
  "coupon/get_coupons",
  async (couponData: any, thunkAPI) => {
    const response = await CouponAPI.getCoupons();
    return response.data;
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Create coupons */
    builder.addCase(createCoupon.fulfilled, (state, action: any) => {
      state.coupons.push(action.payload);
      state.loading = true;
    });
    builder.addCase(createCoupon.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createCoupon.pending, (state, action) => {
      state.loading = false;
    });

    /* Get coupons */
    builder.addCase(getCoupons.fulfilled, (state, action: any) => {
      state.coupons = action.payload;
      state.loading = true;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getCoupons.pending, (state, action) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = couponSlice.actions;

export default couponSlice.reducer;
