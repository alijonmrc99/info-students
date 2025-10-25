import axios, { AxiosRequestConfig } from "axios";
import { AxiosConfig, AxiosInstance } from "./axios.types";
import { axiosConfig } from "./axios.config";
import { BASE_AUTH_TOKEN } from "../constants/base.constants";
import { store } from "../../store";
import { notificationSlice } from "../notification";

export const createAxiosInstance = (config: AxiosRequestConfig) => {
    const AxiosInstance = axios.create(config) as AxiosInstance;

    axios.interceptors.request.use((config: AxiosConfig) => {
        if (!config.url) {
            return config
        }

        console.log(config.pathParams);
        const currentUrl = new URL(config.url, config.baseURL);
        Object.entries(config.pathParams || {}).forEach(([k, v]: [string, string]) => {

            currentUrl.pathname = currentUrl.pathname.replace(
                `${k}`,
                Array.isArray(v) ? v.join(",") : encodeURIComponent(v)
            )
        })

        if (config.formData) {
            const formData = new FormData();
            Object.keys(config.data).forEach((fieldName) => {
                formData.append(fieldName, config.data[fieldName])
            })

            if (config.headers) {
                config.headers['Content-Type'] = 'multipart/form-data';
            }

            config.data = formData;
        }

        return {
            ...config,
            baseURL: `${currentUrl.protocol}//${currentUrl.host}`,
            url: currentUrl.pathname
        };
    })

    axios.interceptors.response.use((response => {
        return response
    }), (error) => {
        if (error.response.status === 400 || error.response.status === 500) {
            store.dispatch(notificationSlice.actions.open(error.response.toString() || "Some error"))
        }

        if (error.response.status === 401) {
            clearBearerToken();
            window.location.href = '';
        }

        return Promise.reject(error)
    })

    return AxiosInstance
}

export const axiosInstance = createAxiosInstance(axiosConfig);

export const setBearerToken = (token: string) => {
    localStorage.setItem(BASE_AUTH_TOKEN, token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const clearBearerToken = () => {
    localStorage.removeItem(BASE_AUTH_TOKEN);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem('role');

}

// export const AuthUser = localStorage.getItem(BASE_AUTH_TOKEN)

const accessToken = localStorage.getItem(BASE_AUTH_TOKEN);

if (accessToken) setBearerToken(accessToken)