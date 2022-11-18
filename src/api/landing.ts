import { Request } from '/@/utils/request';

//搜索商店
export function storeSearch(taskId: string) {
  return Request.axiosInstance({
    url: `/api/landing/v1/store/search`,
    method: 'POST',
    data: {
      taskId,
    },
  });
}
