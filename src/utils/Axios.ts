import axios from "axios";

class ApiAxios {
  headers: any;
  constructor() {
    this.headers = {
      headers: {
        "x-gateway-key": "default",
      },
    };
  }

  private getHeaders() {
    return { ...this.headers };
  }

  updateHeadersWithUserInfo(userId: string) {
    const headersData = this.getHeaders();
    headersData.headers["userid"] = userId;
    this.headers = { ...headersData };
  }

  async get(url: string) {
    return axios.get(url, this.getHeaders());
  }

  async post(url: string, payload: any = {}) {
    // const url = `${hostName}/coupons`;
    // try {
    //   const response = await Axios.post(url, payload);
    //   return response;
    // } catch (error: any) {
    //   throw error.data;
    // }
    try {
      const response = await axios.post(url, payload, this.getHeaders());
      return response.data;
    } catch (e: any) {
      throw e.response.data;
    }
    // return axios.post(url, payload, this.getHeaders());
  }
}

/**
 * A INTERCEPTOR AROUND AXIOS WHERE YOU CAN ADD HEADERS AND OTHERS
 */
const Axios = Object.freeze(new ApiAxios());

export default Axios;
