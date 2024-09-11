import LocalStorage from "../utils/LocalStorage";
import BaseService from "./BaseService";

class AuthService {
  api = "https://piseth.site/api/refreshToken";
  async refreshToken() {
    const res = await BaseService.post(this.api, {
      refreshToken: LocalStorage.getRefreshToken(),
    });
    if (res?.errors) {
      //   console.log({ res });
      window.location.href = "/login";
    } else {
      LocalStorage.setUserInfo({ ...res, user: res.data.data });
    }
  }
}

export default new AuthService();
