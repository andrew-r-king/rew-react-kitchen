import { AxiosRequestConfig } from "axios";
declare type ApiResponse = {
    headers: any;
    request?: any;
    status: number;
    statusText: string;
};
declare type ApiResponseWithBody<T> = ApiResponse & {
    data: T;
};
export declare abstract class BaseApi {
    private baseUrl;
    private axios;
    private contentType;
    private config;
    constructor(baseUrl: string, config?: AxiosRequestConfig);
    private getRequestConfig;
    protected setConfig: (config: AxiosRequestConfig) => void;
    protected OPTIONS: <T extends object>(route: string) => Promise<ApiResponseWithBody<T>>;
    protected GET: <T extends object>(route: string) => Promise<T>;
    protected HEAD: (route: string) => Promise<any>;
    protected POST: <T extends object, Data extends object>(route: string, data: Data) => Promise<T>;
    protected PUT: <Data extends object>(route: string, data: Data) => Promise<ApiResponse>;
    protected PATCH: <T extends object, Data extends object>(route: string, data: Data) => Promise<T>;
    protected DELETE: (route: string) => Promise<boolean>;
}
export {};
