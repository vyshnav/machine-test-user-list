import axios from "axios";

//Create default axios instance
const api = axios.create();
api.defaults.baseURL = process.env.REACT_APP_API_URL;

// Request interceptor
api.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
