import { Request } from '/@/utils/request';

//搜索商店
export function storeSearch(data) {
  return Request.axiosInstance({
    url: `/api/landing/v1/store/search`,
    method: 'POST',
    data
  });
}


//落地页-配置
export function storeSetting() {
  return Request.axiosInstance({
    url: `/api/landing/v1/pre/setting`,
    method: 'POST'
  });
}
