class LocalStorage {
  setUserInfo(data) {
    if (data) {
      console.log(data, "data");
      this.setAccessToken(data.result.accessToken);
      this.setRefreshToken(data.result.refreshToken);
      // this.setExpiredIn(data.expiredIn);
      // this.setUserRole(data.role);
      this.setUser(data.result);
      this.setRole(data.result.role);
    }
  }
  setRole(value) {
    localStorage.setItem("role", JSON.stringify(value));
  }
  getRole() {
    return JSON.parse(localStorage.getItem("role"));
  }
  setAccessToken(value) {
    localStorage.setItem("accessToken", value);
  }

  setRefreshToken(value) {
    localStorage.setItem("refreshToken", value);
  }

  setExpiredIn(value) {
    localStorage.setItem("expiredIn", value);
  }

  setUserRole(value) {
    localStorage.setItem("role", JSON.stringify(value));
  }

  setUser(value) {
    localStorage.setItem("user", JSON.stringify(value));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  getExpiredIn() {
    return localStorage.getItem("expiredIn");
  }

  getUserRole() {
    return JSON.parse(localStorage.getItem("role"));
  }
}

export default new LocalStorage();
