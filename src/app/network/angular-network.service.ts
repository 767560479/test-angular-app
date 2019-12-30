import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from '_rxjs@6.3.3@rxjs';
import { RequestOptionsArgs, DfRequestOptionsArgs } from '../models/df-request-options.model';
import { catchError, map, timeout } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { NETWORK_CONFIG } from './network.config';
import { DfMessages } from '../services/messages/df-messages.service';
import { DfNetworkOptions } from '../models/df-network.model';
import { isNotEmpty } from '../util/fn.utils';

@Injectable({
  providedIn: 'root'
})
export class AngularNetworkService {
  private timeout = 300000;

  constructor(
    private http: HttpClient,
    protected messages: DfMessages,
  ) { }

  /**
   * 通用网络请求error handler
   *
   * @param (HttpErrorResponse | any) error 错误信息
   * @returns (ErrorObservable) Observable错误
   *
   * @memberOf DfHttp
   */
  private handleError(error: HttpErrorResponse | any): Observable<never> {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      errMsg = error.status + ' - ' + error.statusText + '：' + error.message;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return throwError(new Error(errMsg));
  }

  /**
   * get请求方法
   *
   * @param (string) url 请求地址
   * @param (any) [params] 请求参数 可选
   * @returns (Observable<Response>) Observable请求结果
   *
   * @memberOf DfHttp
   */
  get(url: string, params?: any, options?: RequestOptionsArgs): Observable<any> {
    url += '?';
    if (!params) {
      params = {};
    }
    params['timestamp'] = new Date().getTime() + '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url += `${key}=${params[key]}&`;
      }
    }
    return this.http.get(url, options).pipe(catchError(this.handleError));
  }

  /**
   * post请求方法
   *
   * @param (string) url 请求地址
   * @param (any) [params] 请求参数 可选
   * @returns (Observable<Response>) Observable请求结果
   *
   * @memberOf DfHttp
   */
  post(url: string, params?: any, options?: RequestOptionsArgs): Observable<any> {
    if (isNullOrUndefined(options)) {
      options = {};
    }
    if (isNullOrUndefined(options.headers)) {
      options.headers = new HttpHeaders(NETWORK_CONFIG.headers);
    }
    return this.http.post(url, params, options).pipe(catchError(this.handleError));
  }

  /**
   * 不使用domain的get请求
   *
   * @param (string) url 地址全名
   * @param (any) [params] 请求参数 可选
   * @param (string) [loadingText] 请求中的提示信息 可选
   * @param (string) [errorText='网络请求失败'] 请求失败信息 可选 默认'网络请求失败'
   * @returns (Observable<any>) Observable请求结果
   *
   * @memberOf DfHttp
   */
  quickGet(url: string, params?: any, options?: DfRequestOptionsArgs): Observable<any> {
    return this.get(url, params, options)
      .pipe(map((response) => {
        if (isNullOrUndefined(response)) {
          response = {};
        } else if (response.code !== 'ok') {
          if (options && options.showToast) {
            this.messages.showErrorMessage(response.message || '网络请求失败');
          }
        }
        return response;
      }, (error: any) => {
        if (options && options.errorText) {
          this.messages.showErrorMessage(options.errorText);
        }
        return error;
      }), timeout((options && options.timeout) || this.timeout)
        , catchError((error: Response | any) => {
          if (options && options.showToast) {
            this.messages.showErrorMessage('网络出现问题，请稍候再试');
          }
          return [{ code: 'ERROR', message: '网络出现问题' }];
        }));
  }

  /**
   * 不使用domain的post请求
   *
   * @param (string) url 地址全名
   * @param (any) [params] 请求参数 可选
   * @param (string) [loadingText] 请求中的提示信息 可选
   * @param (string) [errorText='网络请求失败'] 请求失败信息 可选 默认'网络请求失败'
   * @returns (Observable<any>) Observable请求结果
   *
   * @memberOf DfHttp
   */
  quickPost(url: string, params?: any, options?: DfRequestOptionsArgs): Observable<any> {
    return this.post(url, params, options)
      .pipe(map((response) => {
        if (isNullOrUndefined(response)) {
          response = {};
        } else if (response.code !== '200') {
          if (options && options.showToast) {
            this.messages.showErrorMessage(response.message || '网络请求失败');
          }
        }
        return response;
      }, (error: any) => {
        if (options && options.errorText) {
          this.messages.showErrorMessage(options.errorText);
        }
        return error;
      }), timeout((options && options.timeout) || this.timeout)
        , catchError((error: Response | any) => {
          if (options && options.showToast) {
            this.messages.showErrorMessage('网络出现问题,请稍候再试');
          }
          return [{ code: 'ERROR', message: '网络出现问题' }];
        }));
  }

  /**
   * 使用domain的get请求
   *
   * @param (string) url 地址路径
   * @param (any) [params] 请求参数 可选
   * @param (string) [loadingText] 请求中的提示信息 可选
   * @param (string) [errorText='网络请求失败'] 请求失败信息 可选 默认'网络请求失败'
   * @returns (Observable<any>) Observable请求结果
   *
   * @memberOf DfHttp
   */
  fullGet(url: string, params?: any, options?: DfRequestOptionsArgs): Observable<any> {
    return this.quickGet(NETWORK_CONFIG.domain + url, params, options);
  }

  /**
   * 使用domain的post请求
   *
   * @param (string) url 地址路径
   * @param (any) [params] 请求参数 可选
   * @param (string) [loadingText] 请求中的提示信息 可选
   * @param (string) [errorText='网络请求失败'] 请求失败信息 可选 默认'网络请求失败'
   * @returns (Observable<any>) Observable请求结果
   */
  fullPost(url: string, params?: any, options?: DfRequestOptionsArgs): Observable<any> {
    return this.quickPost(NETWORK_CONFIG.domain + url, params, options);
  }

  /**
   * 判断请求方式且不使用domain的请求
   *
   * @param (string) url 地址全名
   * @param (any) [params] 请求参数 可选
   * @param (string) [loadingText] 请求中的提示信息 可选
   * @param (string) [errorText='网络请求失败'] 请求失败信息 可选 默认'网络请求失败'
   * @returns (Observable<any>) Observable请求结果
   *
   * @memberOf DfHttp
   */
  quickRequest(requestOptions: DfNetworkOptions, params?: any, options?: DfRequestOptionsArgs): Observable<any> {
    let optionsSet: DfRequestOptionsArgs = {};
    if (isNotEmpty(options)) {
      optionsSet = options;
    } else {
      optionsSet.headers = {};
    }
    // optionsSet.headers['uid'] = this.userContextService.employeeCode !== null ? this.userContextService.employeeCode : '';
    // optionsSet.headers['token'] = '***';
    if (requestOptions.method === 'post') {
      return this.quickPost(requestOptions.url, params, optionsSet);
    } else if (requestOptions.method === 'get') {
      return this.quickGet(requestOptions.url, params, optionsSet);
    } else {
      return;
    }
  }


  /**
   * 判断请求方式且使用domain的请求
   * @param requestOptions 接口配置
   * @param params 请求参数
   * @param options 请求配置
   */
  fullRequest(requestOptions: DfNetworkOptions, params?: any, options?: DfRequestOptionsArgs): Observable<any> {
    if (requestOptions.method === 'post') {
      return this.fullPost(requestOptions.url, params, options);
    } else if (requestOptions.method === 'get') {
      return this.fullGet(requestOptions.url, params, options);
    } else {
      return;
    }
  }

}
