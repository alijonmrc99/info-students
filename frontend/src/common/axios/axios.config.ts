import { AxiosRequestConfig } from "axios";
import { ENDOINT_ROOT } from "../constants/endpoind.constants";

export const axiosConfig: AxiosRequestConfig = {
    baseURL: ENDOINT_ROOT,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
}