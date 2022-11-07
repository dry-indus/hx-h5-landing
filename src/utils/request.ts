import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { i18n } from '/@/i18n/index';
import { Notify } from '@nutui/nutui';
import { getCookie } from '/@/utils/jsCookie';

const locale = 'zh-CN' || i18n.global.locale.value || localStorage.getItem('lang');

export class Request {
  public static axiosInstance: AxiosInstance;
  public static loading: any;
  public static init() {
    this.axiosInstance = axios.create({
      timeout: 5000,
      baseURL: process.env.VITE_BASIC_URL,
    });
    this.initInterceptors();
    return axios;
  }
  public static initInterceptors() {
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        //请求头添加hoken
        const hoken: string = getCookie('hoken');
        (config.headers as AxiosRequestHeaders)['language'] = locale;
        (config.headers as AxiosRequestHeaders)['hoken'] = hoken;
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.data;
        // http status !== 200 || http status !== 500
        if (response.status !== 200) {
          Notify.danger((i18n.global as any).t('server.error'), { background: 'rgba(230,67,46, 0.5)' });
        }
        if (response.status !== 500) {
          if (response.status == 200) {
          } else {
            Notify.danger((i18n.global as any).t('server.error'), { background: 'rgba(230,67,46, 0.5)' });
          }
        }
        // http status == 200
        if (response.status == 200) {
          //业务码
          if (res.status === 3000) {
            Notify.primary(res.message, { background: 'rgba(35,11,92, 0.5)' });
          }
        }
        // http status == 500
        if (response.status == 500) {
          //业务码
          if (res.status && res.status === 3000) {
            Notify.danger(res.message, { background: 'rgba(230,67,46, 0.8)' });
          } else {
            Notify.danger((i18n.global as any).t('server.error'), { background: 'rgba(230,67,46, 0.5)' });
          }
        }
        if (response.status !== 500 && response.status !== 200) {
          Notify.danger((i18n.global as any).t('server.error'), { background: 'rgba(230,67,46, 0.5)' });
        }
        return response;
      },
      (error: any) => {
        const { response } = error;
        if (response) {
          Request.errorHandle(response);
          return Promise.reject(response.data);
        } else {
        }
      },
    );
  }
  private static errorHandle(res: any) {
    switch (res.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        Notify.danger((i18n.global as any).t('server.error'), { background: 'rgba(230,67,46, 0.5)' });
        break;
      default:
    }
  }
}
