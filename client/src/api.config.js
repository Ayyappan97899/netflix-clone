import axios from "axios";

const api = axios.create();

api.interceptors.request.use((res) => {
  res.headers.common.token =
    "Bearer " + JSON.parse(localStorage.getItem("login"))?.accessToken;
  return res;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 403) {
      localStorage.removeItem("login");
    }
    return Promise.reject(err);
  }
);

export default api;
