import Axios from "../utils/Axios";

const hostName = "http://364b-2405-201-c00a-20a9-d5b9-fc3b-e6de-7485.ngrok.io";

const CouponAPI = {
  createCoupon: async (payload: { [key: string]: any }) => {
    const url = `${hostName}/coupons`;
    return await Axios.post(url, payload);
  },

  getCoupons: async () => {
    const url = `${hostName}/coupons`;
    return Axios.get(url);
  },
};

export default CouponAPI;
