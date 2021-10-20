import Axios from "../utils/Axios";

//const hostName = "http://364b-2405-201-c00a-20a9-d5b9-fc3b-e6de-7485.ngrok.io"; //HARISH HOST

const hostName = "http://cf9d-13-234-188-23.ngrok.io"; //CHANKAYA HOST

const CouponAPI = {
  createCoupon: async (payload: { [key: string]: any }) => {
    const url = `${hostName}/coupons`;
    return await Axios.post(url, payload);
  },
  getCoupons: async () => {
    const url = `${hostName}/coupons`;
    return await Axios.get(url);
  },
  approveCoupon: async (couponId: string | number) => {
    const url = `${hostName}/coupons/${couponId}/approve`;
    return await Axios.patch(url);
  },
  rejectCoupon: async (couponId: string | number) => {
    const url = `${hostName}/coupons/${couponId}/reject`;
    return await Axios.get(url);
  },
};

export default CouponAPI;
