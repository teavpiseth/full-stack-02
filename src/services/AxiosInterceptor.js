import axios from "axios";
import AuthService from "./AuthService";
import LocalStorage from "../utils/LocalStorage";

// request and response

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // console.log({ error });
    const config = error.config;
    if (
      error.response.status === 401 &&
      !config._isRetry &&
      !config.url.includes("refreshToken")
    ) {
      {
        await AuthService.refreshToken();

        if (
          config.headers.Authorization !==
          "Bearer " + LocalStorage.getAccessToken()
        ) {
          config._isRetry = true;
          config.headers.Authorization =
            "Bearer " + LocalStorage.getAccessToken();
          const response = await axios(config);
          return response;
        }
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
