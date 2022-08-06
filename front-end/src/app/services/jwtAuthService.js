import axios from "axios";
import localStorageService from "./localStorageService";
class JwtAuthService {
  loginWithEmailAndPassword = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/auth/signin", {
          password: password,
          username: username,
        })
        .then((res) => {
          console.log(res);
          if (res?.data?.messageCode === "00") {
            let payload = res?.data?.payload;
            this.setSession(payload?.accessToken);
            this.setUser(payload?.user);
            resolve({
              token: payload?.accessToken,
              user: payload.user,
            });
          } else {
            reject();
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  loginWithToken = (token) => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.authorization = "Bearer " + localStorage.getItem("jwt_token");
      return axios
        .post("/auth/signinToken", {})
        .then((res) => {
          let data = res.data.payload;
          this.setSession(data.accessToken);
          this.setUser(data.user);
          resolve({
            ...data.user,
            token: data.accessToken,
          });
          return {
            ...data.user,
            token: data.accessToken,
          };
        })
        .catch((err) => {
          this.logout();
          reject();
        });
    });
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();
  };

  setSession = (token) => {
    if (token) {
      localStorage.setItem("jwt_token", token);
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  };

  removeUser = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("auth_user");
  };
}

export default new JwtAuthService();
