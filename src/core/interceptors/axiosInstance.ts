import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AUTH_ERROR } from "../auth.constants";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const baseURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (
      response &&
      response.status === 401 &&
      response.data?.message !== AUTH_ERROR.TOKEN_EXPIRED
    ) {
      try {
        const refreshToken = getCookie("refreshToken");

        if (!refreshToken) {
          throw new Error(AUTH_ERROR.TOKEN_UNAVAILABLE);
        }

        const { data } = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(`${baseURL}/authentication/refresh-token`, { refreshToken });

        const { accessToken, refreshToken: newRefreshToken } = data;

        localStorage.setItem("authToken", accessToken);
        document.cookie = `refreshToken=${newRefreshToken}; path=/; secure; samesite=strict`;

        config.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(config);
      } catch (refreshError) {
        console.error(AUTH_ERROR.TOKEN_UNAVAILABLE, refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const axiosGet = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res: AxiosResponse<T> = await axiosInstance.get(url, config);
  return res.data;
};

export const axiosPost = async <T, U = unknown>(
  url: string,
  data: U,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res: AxiosResponse<T> = await axiosInstance.post(url, data, config);
  return res.data;
};

export const axiosPut = async <T, U = unknown>(
  url: string,
  data: U,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res: AxiosResponse<T> = await axiosInstance.put(url, data, config);
  return res.data;
};

export const axiosDelete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res: AxiosResponse<T> = await axiosInstance.delete(url, config);
  return res.data;
};
