import { AxiosPromise } from 'axios';
import { Request } from '/@/utils/request';
import { CommodityAddObject, CommodityDelObject, CommoditySpAddObject, ModifySpAddObject } from '../../types/commodity';
import { AddTagsSuccess, AddSpSuccess, AddCommoditySuccess } from '../../types/reponse';

//添加商品
export function addCommodity(data: CommodityAddObject): AxiosPromise<AddCommoditySuccess> {
  return Request.axiosInstance({
    url: `/commodity/add`,
    method: 'POST',
    data: data,
  });
}
//删除商品
export function delCommodity(id: string) {
  return Request.axiosInstance({
    url: `/commodity/del`,
    method: 'POST',
    data: {
      id,
    },
  });
}
//隐藏商品
export function hideCommodity(id: string) {
  return Request.axiosInstance({
    url: `/commodity/hide`,
    method: 'POST',
    data: {
      id,
    },
  });
}
//商品列表
export function getCommodityList(pageNumber = 1, pageSize = 20) {
  return Request.axiosInstance({
    url: `/commodity/list`,
    method: 'POST',
    data: {
      pageNumber,
      pageSize,
    },
  });
}
//编辑商品
export function modifyCommodity(data: CommodityDelObject) {
  return Request.axiosInstance({
    url: `/commodity/modify`,
    method: 'POST',
    data: data,
  });
}
//发布商品
export function publishCommodity(id: string) {
  return Request.axiosInstance({
    url: `/commodity/publish`,
    method: 'POST',
    data: {
      id,
    },
  });
}
//添加商品规格与定价
export function addCommoditySp(data: CommoditySpAddObject): AxiosPromise<AddSpSuccess> {
  return Request.axiosInstance({
    url: `/commodity/sp/add`,
    method: 'POST',
    data: data,
  });
}
//删除商品规格与定价
export function delCommoditySp(id: string) {
  return Request.axiosInstance({
    url: `/commodity/sp/del`,
    method: 'POST',
    data: {
      id,
    },
  });
}
//编辑商品规格与定价
export function modifyCommoditySp(data: ModifySpAddObject) {
  return Request.axiosInstance({
    url: `/commodity/sp/modify`,
    method: 'POST',
    data: data,
  });
}
//添加标签
export function addTags(name: string): AxiosPromise<AddTagsSuccess> {
  return Request.axiosInstance({
    url: `/commodity/tag/add`,
    method: 'POST',
    data: {
      name,
    },
  });
}
//删除标签
export function delTags(id: string) {
  return Request.axiosInstance({
    url: `/commodity/tag/del`,
    method: 'POST',
    data: {
      id,
    },
  });
}
