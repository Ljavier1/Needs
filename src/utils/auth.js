import { jwtDecode } from "jwt-decode";

class Auth {
  constructor() {
    this.tokenKey = "authToken";
  }

  getProfile() {
    return jwtDecode(this.getToken());
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  loggedIn() {
    const token = this.getToken();
    return !!token;
  }

  login(token) {
    localStorage.setItem(this.tokenKey, token);
    window.location.reload();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    window.location.reload();
  }
}

export default new Auth();
