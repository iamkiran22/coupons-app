import Axios from "../utils/Axios";

const hostName = "http://cf9d-13-234-188-23.ngrok.io";

const LoginAPI = {
  loginUser: async (payload: { [key: string]: any }) => {
    const url = `${hostName}/coupon/login`;
    return await Axios.post(url, payload);
  },
};

export default LoginAPI;
