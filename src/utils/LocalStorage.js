class LocalStorage {
  setUserInfo(data) {
    if (data) {
      this.setAccessToken(data.accessToken);
      this.setRefreshToken(data.refreshToken);
      this.setExpiredIn(data.expiredIn);
      this.setUserRole(data.role);
      this.setUser(data.user);
    }
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
