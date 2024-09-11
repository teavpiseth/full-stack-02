import { message } from "antd";
import axios from "axios";
import LocalStorage from "../utils/LocalStorage";

class BaseService {
  async sendRequest(method, url, data, extraHeaders, extraConfig) {
    const requestOptions = {
      method: method,
      url: url,
      data: data,
      headers: {
        authorization: `Bearer ${LocalStorage.getAccessToken()}`,
        ...extraHeaders,
      },
      ...extraConfig,
    };
    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (error) {
      message.error(error?.response?.data?.errors?.msg || error?.message, [1]);
      return null;
    }
  }

  get(url, data, extraHeaders, extraConfig) {
    return this.sendRequest("get", url, data, extraHeaders, extraConfig);
  }

  post(url, data, extraHeaders, extraConfig) {
    return this.sendRequest("post", url, data, extraHeaders, extraConfig);
  }

  put(url, data, extraHeaders, extraConfig) {
    return this.sendRequest("put", url, data, extraHeaders, extraConfig);
  }

  delete(url, data, extraHeaders, extraConfig) {
    return this.sendRequest("delete", url, data, extraHeaders, extraConfig);
  }
}

export default new BaseService();
