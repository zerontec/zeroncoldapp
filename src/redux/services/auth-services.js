import axios from "axios";

const API_URL = "https://expressjs-postgres-production-bd69.up.railway.app/";


const register = (name, username, email, password) => axios.post(
  `${API_URL}api/auth/register-user`, {
  name,
  username,
  email,
  password,
});

const login = (username, password) => axios
  
    .post(`${API_URL}api/auth/login`, {
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