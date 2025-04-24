import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL,
});

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
