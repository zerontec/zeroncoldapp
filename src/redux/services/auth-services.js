import axios from "axios";

const API_URL = "http://localhost:5040/api/auth/";

// eslint-disable-next-line prefer-template
const register = (name,username, email, password) => axios.post(API_URL + "register-user", {
    name,
    username,
    email,
    password,
   
  });

const login = (username, password) => axios
    // eslint-disable-next-line prefer-template
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });

const logout = () => {
  localStorage.removeItem("user");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout
}