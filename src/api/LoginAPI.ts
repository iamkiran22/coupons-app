import Axios from "../utils/Axios";

const hostName = "http://d713-2401-4900-47f6-39d3-b45d-32e6-ab03-d780.ngrok.io";

const LoginAPI = {
  loginUser: async (payload: { [key: string]: any }) => {
    const url = `${hostName}/coupon/login`;
    return await Axios.post(url, payload);
  },
};

export default LoginAPI;
