import axios from "axios";

const API_BASE_URL = "/api";


const getCSRFToken = () => {
  let csrfToken = null;
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key.trim() === "csrftoken") {
      csrfToken = value;
      break;
    }
  }
  return csrfToken;
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }

    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
