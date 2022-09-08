import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

type TBaseResponse<TData> = {
  Data: TData;
  Messages: unknown;
  ResultCode: number;
  ResultMessage: string;
  Success: boolean;
};

type TBasePagination<TData> = {
  Items: TData[];
  PageIndex: number;
  PageSize: number;
  TotalItem: number;
  TotalPage: number;
};

const instance = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
  },
  timeout: 5000,
});

export const setHeader = (token: string) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      // Do something with axios error
    } else {
      toast.error("Unexpected error");
    }

    return Promise.reject(error);
  }
);

const handleResponse = (response: AxiosResponse) => response.data;

const handleError = (error: AxiosError) => error.response;

export default {
  get: <TData>(url: string, config?: AxiosRequestConfig) =>
    instance
      .get<TBaseResponse<TData>>(url, config)
      .then(handleResponse)
      .catch(handleError),

  getPagination: <TData>(url: string, config?: AxiosRequestConfig) =>
    instance
      .get<TBaseResponse<TBasePagination<TData>>>(url, config)
      .then(handleResponse)
      .catch(handleError),

  post: <TData, TPayload>(
    url: string,
    payload: TPayload,
    config?: AxiosRequestConfig
  ) =>
    instance
      .post<TBaseResponse<TData>>(url, payload, config)
      .then(handleResponse)
      .catch(handleError),

  put: <TData, TPayload>(
    url: string,
    payload: TPayload,
    config?: AxiosRequestConfig
  ) =>
    instance
      .put<TBaseResponse<TData>>(url, payload, config)
      .then(handleResponse)
      .catch(handleError),

  delete: <TData>(url: string, config?: AxiosRequestConfig) =>
    instance
      .delete<TBaseResponse<TData>>(url, config)
      .then(handleResponse)
      .catch(handleError),
};
