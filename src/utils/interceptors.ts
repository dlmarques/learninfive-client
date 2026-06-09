import axios from "axios";
import { queryByError } from "./pathByError";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(async (config) => {
    config.headers["X-CSRF-TOKEN"] = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const statusCode = error.response?.status ?? error.status ?? 500;
      const query = queryByError(statusCode);
      const content = error.response?.data?.content;

      localStorage.setItem("error", query);
      if (content !== "Topic in progress") {
        window.location.assign("/error");
      }

      return Promise.reject(error);
    }
  );
};
