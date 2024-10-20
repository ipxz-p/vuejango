import axios from "axios";
import Cookies from "js-cookie";
import store from "@/store";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const tokenParts = JSON.parse(atob(token.split(".")[1]));
  const now = Math.ceil(Date.now() / 1000);
  return tokenParts.exp < now;
};

api.interceptors.request.use(
  async (config) => {
    let accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (isTokenExpired(accessToken) && refreshToken && !isTokenExpired(refreshToken)) {
      try {
        const response = await api.post("auth/token/refresh/", {
          refresh: refreshToken,
        });
        accessToken = response.data.access;
        store.commit("setTokens", {
          access: accessToken,
          refresh: refreshToken,
        });
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }

    // Set Authorization header if accessToken is valid
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;