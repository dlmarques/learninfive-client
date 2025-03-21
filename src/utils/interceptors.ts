import axios from "axios";
import { queryByError } from "./pathByError";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const setupInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const statusCode = error.status;
      const query = queryByError(statusCode);
      localStorage.setItem("error", query);
      if (error.response.data.content !== "Topic in progress") {
        window.location.assign("/error");
      }
    }
  );
};
