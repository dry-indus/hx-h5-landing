import { Request } from '/@/utils/request';
import { registerData, loginData, VerifyCodeParams } from '../../types/register';

//注册
export function register(data: registerData) {
  return Request.axiosInstance({
    url: `/auth/register`,
    method: 'POST',
    data: data,
  });
}
//登录
export function login(data: loginData) {
  return Request.axiosInstance({
    url: `/auth/login`,
    method: 'POST',
    data: data,
  });
}
//获取验证码
export function getTelegramVerifyCode(data: VerifyCodeParams, sence: string) {
  return Request.axiosInstance({
    url: `/verify/${sence}/code/send`,
    method: 'POST',
    data: data,
  });
}
//退出登录
export function loginOut() {
  return Request.axiosInstance({
    url: '/auth/logout',
    method: 'POST',
  });
}
