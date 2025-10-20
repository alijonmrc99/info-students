import { BaseApi } from "../axios";
import { ENDOINT_ROOT } from "../constants/endpoind.constants";
import qs from 'qs'
export class HttpApi extends BaseApi {
    constructor() {
        super();
        this.baseUrl = ENDOINT_ROOT;
    }

    async get<T>(route: string, params: any): Promise<T> {

        return await this.httpClient
            .get(this.url(route), {
                params,
                paramsSerializer: params => {
                    params.lang = localStorage.getItem("i18nextLng")

                    return qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true })
                }
            })
            .then(response => response.data)
            .catch((error) => {
                console.error("Get request failed", error);
                throw error;
            });;
    }

    async post(route: string, body: any, config: any = {}): Promise<any> {
        return await this.httpClient.post(this.url(route), body, config)
            .then(response => response.data)
            .catch((error) => {
                console.error("POST request failed", error);
                throw error;
            });
    }

    async put(route: string, body: any, config: any = {}): Promise<any> {
        return await this.httpClient
            .put(this.url(route), body, config)
            .then((response) => response.data)
            .catch((error) => {
                console.error("PUT request failed", error);
                throw error;
            });
    }

    async delete(route: string, params: any): Promise<any> {
        return await this.httpClient
            .delete(this.url(route), { params })
            .then((response) => response.data)
            .catch((error) => {
                console.error("DELETE request failed", error);
                throw error;
            });
    }
}