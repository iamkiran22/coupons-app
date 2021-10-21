import Axios from "../utils/Axios";
import URLHelper from "./URLHelper";

const { hostName } = URLHelper;

const baseURL = `${hostName}/coupons`;

const CouponAPI = {
  createCoupon: async (payload: { [key: string]: any }) => {
    return await Axios.post(baseURL, payload);
  },
  getCoupons: async () => {
    return await Axios.get(baseURL);
  },
  approveCoupon: async (couponId: string | number) => {
    const url = `${baseURL}/${couponId}/approve`;
    return await Axios.patch(url);
  },
  rejectCoupon: async (couponId: string | number) => {
    const url = `${baseURL}/${couponId}/reject`;
    return await Axios.patch(url);
  },
};

export default CouponAPI;
