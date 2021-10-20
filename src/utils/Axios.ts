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

  updateHeadersWithSession(session_id: string) {
    this.headers.headers["session_id"] = session_id;
  }

  async get(url: string) {
    return axios.get(url, this.getHeaders());
  }

  async post(url: string, payload: any = {}) {
    try {
      const response = await axios.post(url, payload, this.getHeaders());
      return response.data;
    } catch (e: any) {
      throw e.response.data;
    }
  }

  async patch(url: string, payload: any = {}) {
    try {
      const response = await axios.patch(url, payload, this.getHeaders());
      return response.data;
    } catch (e: any) {
      throw e.response.data;
    }
  }
}

/**
 * A INTERCEPTOR AROUND AXIOS WHERE YOU CAN ADD HEADERS AND OTHERS
 */
const Axios = Object.freeze(new ApiAxios());

export default Axios;
