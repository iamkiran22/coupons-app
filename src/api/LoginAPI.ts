import Axios from "../utils/Axios";
import URLHelper from "./URLHelper";

const { hostName } = URLHelper;

const LoginAPI = {
  loginUser: async (payload: { [key: string]: any }) => {
    try {
      const url = `${hostName}/coupon/login`;
      const response = await Axios.post(url, payload);
      return response;
    } catch (e: any) {
      return Promise.reject(e.error);
    }
  },
};

export default LoginAPI;
