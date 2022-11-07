import { Request } from '/@/utils/request';

//获取文件上传状态
export function getFileStatus(taskId: string) {
  return Request.axiosInstance({
    url: `/file/status`,
    method: 'POST',
    data: {
      taskId,
    },
  });
}
//上传文件
export function upload(data: any) {
  return Request.axiosInstance({
    url: `/file/upload`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
    data: data,
  });
}
