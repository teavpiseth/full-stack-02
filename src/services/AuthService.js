import LocalStorage from "../utils/LocalStorage";
import BaseService from "./BaseService";

class AuthService {
  api = "http://localhost:8081/api/employee/refreshToken";
  async refreshToken() {
    const res = await BaseService.post(this.api, {
      refreshToken: LocalStorage.getRefreshToken(),
    });
    if (res?.errors || !res) {
      //   console.log({ res });
      window.location.href = "/dashboard/login";
      localStorage.clear();
    } else {
      // LocalStorage.setUserInfo({ ...res, user: res.data.data });
      LocalStorage.setAccessToken(res.data.accessToken);
      LocalStorage.setRefreshToken(res.data.refreshToken);
    }
  }
}

export default new AuthService();
