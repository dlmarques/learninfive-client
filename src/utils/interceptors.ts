import axios from "axios";
import { getApiError } from "./apiError";
import { queryByError } from "./pathByError";

export const buildApiBaseUrl = (baseUrl: string) => {
  return `${baseUrl.replace(/\/+$/, "")}/api/v1`;
};

export const axiosInstance = axios.create({
  baseURL: buildApiBaseUrl(import.meta.env.VITE_BACKEND_API_URL ?? ""),
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
      const apiError = getApiError(error);

      if (
        apiError.code === "TOPIC_GENERATION_IN_PROGRESS" ||
        apiError.code === "USER_NOT_FOUND"
      ) {
        return Promise.reject(error);
      }

      const statusCode = apiError.statusCode ?? 500;
      const query = queryByError(statusCode);

      localStorage.setItem("error", query);
      window.location.assign("/error");

      return Promise.reject(error);
    }
  );
};
