import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import CouponAPI from "../api/CouponAPI";
import { message } from "antd";

export interface CouponState {
  [key: string]: any;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  errors: null,
  additionalLoader: false,
  couponTypes: [],
};

export const createCoupon = createAsyncThunk(
  "coupon/create_coupon",
  async (couponData: any, thunkAPI) => {
    try {
      const response = await CouponAPI.createCoupon(couponData);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.error);
    }
  }
);

export const getCoupons = createAsyncThunk(
  "coupon/get_coupons",
  async (couponData: any, thunkAPI) => {
    try {
      const response = await CouponAPI.getCoupons();
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.error);
    }
  }
);

export const getCouponsTypes = createAsyncThunk(
  "coupon/get_coupons_types",
  async (couponData: any, thunkAPI) => {
    try {
      const response = await CouponAPI.getCouponsTypes();
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.error);
    }
  }
);

export const approveCoupon = createAsyncThunk(
  "coupon/approve_coupon",
  async (id: string | number, thunkAPI) => {
    try {
      const response = await CouponAPI.approveCoupon(id);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        "There is an error while approving your coupon"
      );
    }
  }
);

export const rejectCoupon = createAsyncThunk(
  "coupon/reject_coupon",
  async (id: string | number, thunkAPI) => {
    try {
      const response = await CouponAPI.rejectCoupon(id);
      return thunkAPI.fulfillWithValue(response);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        "There is an error while rejecting your coupon"
      );
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Create coupons */
    builder.addCase(createCoupon.fulfilled, (state, action: any) => {
      state.coupons.unshift(action.payload);
      state.loading = false;
    });
    builder.addCase(createCoupon.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(createCoupon.pending, (state, action) => {
      state.loading = true;
    });

    /* Get coupons */
    builder.addCase(getCoupons.fulfilled, (state, action: any) => {
      state.coupons = action.payload;
      state.loading = false;
      state.errors = null;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(getCoupons.pending, (state, action) => {
      state.loading = true;
    });

    /* Get coupons types */
    builder.addCase(getCouponsTypes.fulfilled, (state, action: any) => {
      state.couponTypes = action.payload;
      state.loading = false;
      state.errors = null;
    });
    builder.addCase(getCouponsTypes.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(getCouponsTypes.pending, (state, action) => {
      state.loading = true;
    });

    /* Approve Coupons */
    builder.addCase(approveCoupon.fulfilled, (state, action: any) => {
      state.coupons = action.payload;
      state.additionalLoader = false;
      // message.info("Your coupon has been approved!");
    });
    builder.addCase(approveCoupon.rejected, (state, action) => {
      state.additionalLoader = false;
      // message.error("There is an error while approving your coupon");
    });
    builder.addCase(approveCoupon.pending, (state, action) => {
      state.additionalLoader = true;
    });

    /* Reject Coupons */
    builder.addCase(rejectCoupon.fulfilled, (state, action: any) => {
      state.coupons = action.payload;
      state.additionalLoader = false;
      // message.info("Your coupon has been rejected!");
    });
    builder.addCase(rejectCoupon.rejected, (state, action) => {
      state.additionalLoader = false;
      // message.error("There is an error while rejecting your coupon");
    });
    builder.addCase(rejectCoupon.pending, (state, action) => {
      state.additionalLoader = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = couponSlice.actions;

export default couponSlice.reducer;
