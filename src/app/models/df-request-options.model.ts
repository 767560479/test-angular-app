import { HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * 网络请求配置结构
 *
 * @memberOf DfHttp
 */
export class RequestOptionsArgs {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    withCredentials?: boolean;
}


/**
 * 网络请求配置结构
 *
 * @memberOf DfHttp
 */
export class RequestOptionsBlob {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
}


/**
 * 客制化网络请求配置结构
 *
 * @memberOf DfHttp
 */
export class DfRequestOptionsArgs extends RequestOptionsArgs {
    timeout?: number | null;
    showLoading?: boolean | null;
    loadingText?: string | null;
    showToast?: boolean | null;
    errorText?: string | null;
    responseType?: string;
}
