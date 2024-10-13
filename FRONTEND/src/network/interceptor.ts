import { useAuthStore, useLoaderStore } from "@/store";
import { showErrorToast } from "@/utils/toast";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    useLoaderStore.getState().setLoading(true);
    console.log("config", config);

    const access_token = useAuthStore.getState().access_token;
    if (access_token) config.headers["access_token"] = access_token;

    return config;
  },
  (error) => {
    useLoaderStore.getState().setLoading(false);
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    useLoaderStore.getState().setLoading(false);
    console.log("response", response);

    if (response.data.error) {
      showErrorToast(response.data.error);
    }

    return response;
  },
  async (error) => {
    useLoaderStore.getState().setLoading(false);

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // GET New Access Token
      console.log("GET NEW ACCESS TOKEN");
      try {
        const res = await axios.post("/api/auth/refresh");
        useAuthStore.getState().setToken(res.data.access_token);

        // Retry the original request with the new token
        originalRequest.headers.access_token = res.data.access_token;

        // Retry the original request
        return axios(originalRequest);
      } catch (error) {
        console.log("Refresh token error", error);
        useAuthStore.getState().clearAuthData();
      }
    }

    // Logout
    useAuthStore.getState().clearAuthData();

    return Promise.reject(error);
  }
);

export default axiosInstance;
