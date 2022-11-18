import { Request } from '/@/utils/request';

//获取文件上传状态
export function storeSearch(taskId: string) {
  return Request.axiosInstance({
    url: `/api/landing/v1/store/search`,
    method: 'POST',
    data: {
      taskId,
    },
  });
}
