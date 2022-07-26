import constants from "app/utils/constants";
import { axios, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const onRequest = (config) => {
  config.baseURL = constants.BASE_URL;
  //   console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const onRequestError = (error) => {
  //   console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response) => {
  //   console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error) => {
  //   console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
