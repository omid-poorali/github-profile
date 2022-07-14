import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';


const ConstantsList = Object.freeze({
    ACTION_UNAUTHORIZED: 'The user is unauthorized',
    ACTION_NOT_FOUND: 'Resource Not Found',
    ACTION_INTERNAL_SERVER: 'Internal Server Error',
    ACTION_BAD_GATEWAY: 'Bad Gateway',
    ACTION_SERVICE_UNAVAILABLE: 'The service is unavailable',
    ACTION_REQUEST_TIMED_OUT: 'Request Timed Out',
    ACTION_TOO_MANY: 'Too Many Requests',
    ACTION_INSUFFICIENT_STORAGE: 'Insuffucient Storage',
});

class API {

    service: Axios;
    constructor() {
        let service = axios.create({});
        service.defaults.baseURL = process.env.REACT_APP_BASE_URL
        service.defaults.headers.common["accept"] = "application/vnd.github+json";
        service.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);

        this.service = service;
    }

    handleSuccessResponse(response: AxiosResponse) {
        return response;
    }

    handleErrorResponse = (error: AxiosError) => {
        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    toast.error(ConstantsList.ACTION_UNAUTHORIZED, { className: "error-toast" });
                    break;
                case 404:
                    toast.error(ConstantsList.ACTION_NOT_FOUND, { className: "warn-toast" });
                    break;
                case 408:
                    toast.error(ConstantsList.ACTION_REQUEST_TIMED_OUT, { className: "warn-toast" });
                    break;
                case 500:
                    toast.error(ConstantsList.ACTION_INTERNAL_SERVER, { className: "warn-toast" });
                    break;
                case 502:
                    toast.error(ConstantsList.ACTION_BAD_GATEWAY, { className: "warn-toast" });
                    break;
                case 503:
                    toast.error(ConstantsList.ACTION_SERVICE_UNAVAILABLE, { className: "warn-toast" });
                    break;
                case 507:
                    toast.error(ConstantsList.ACTION_INSUFFICIENT_STORAGE, { className: "warn-toast" });
                    break;
                case 400:
                    toast.error(error.message, { className: "error-toast" });
                    break;
                default:
                    toast.error(error.response.status + ": " + error.response.statusText, { className: "error-toast" });
                    break;
            }
        }
        return Promise.reject(error)
    }

    get<T>(path: string) {
        return new Promise<T>((resolve, reject) => {
            this.service.get(path).then(
                (response) => resolve(response.data as T)
            ).catch(err => {
                reject(err)
            })
        });
    }


    post<T>(path: string, payload: any) {
        return new Promise<T>((resolve, reject) => {
            this.service.post(path, payload).then(
                (response) => resolve(response.data as T)
            ).catch(err => {
                reject(err)
            })
        });
    }

}

export default new API();