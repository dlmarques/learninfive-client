import axios from "axios";
import { queryByError } from "./pathByError";

export const axiosInstance = axios.create();

export const setupInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const statusCode = error.status;
      const query = queryByError(statusCode);
      localStorage.setItem("error", query);
      window.location.assign("/error");
    }
  );
};
