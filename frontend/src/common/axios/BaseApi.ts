import { ENDOINT_ROOT } from "../constants/endpoind.constants";
import { axiosInstance } from "./axios.instance";

export class BaseApi {
    httpClient;
    baseUrl = ENDOINT_ROOT;

    constructor() {
        this.httpClient = axiosInstance;
    }



    url(path: string) {
        return `${this.baseUrl}${path}`
    }
};