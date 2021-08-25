import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
    baseURL: process.env.TELEGRAM_URL,
};
export const API: AxiosInstance = axios.create(config);

