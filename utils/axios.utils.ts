import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { BASEURL } from "./constant.utils";

let api: AxiosInstance | null = null;
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const instance = (): AxiosInstance => {
  if (api) return api;

  api = axios.create({
    baseURL: BASEURL,
  });

  // Request interceptor
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const accessToken = localStorage.getItem("token");
      if (accessToken && config.headers) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError | any) => {
      const originalRequest: any = error.config;

      console.log("error",error);
      
      if (
        error.response?.data?.error === "invalid or expired token" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refresh");

        if (!refreshToken) {
          window.location.href = "/";
          localStorage.clear();

          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                resolve(api(originalRequest));
              },
              reject: (err: any) => reject(err),
            });
          });
        }

        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const response = await axios.post(
              `${BASEURL}authentication/refresh-token/`,
              {
                refresh: refreshToken,
              }
            );

            const { access, refresh } = response.data;
            localStorage.setItem("token", access);
            localStorage.setItem("refresh", refresh);

            api!.defaults.headers.common["Authorization"] = "Bearer " + access;
            originalRequest.headers["Authorization"] = "Bearer " + access;

            processQueue(null, access);
            resolve(api!(originalRequest));
          } catch (err) {
            processQueue(err, null);
            localStorage.clear();
            window.location.href = "/";
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default instance;
