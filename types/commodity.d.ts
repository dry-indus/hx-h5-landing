export interface Sp {
  id: string;
  picUrl: string;
  pricing: number;
  specifications: string;
  num?: number | string;
}

export interface Tag {
  id: string;
  name: string;
  selected: boolean;
}

export interface Commodity {
  name: string;
  picURL?: string;
  picUrl?: string;
  sps: Sp[];
  tags: Tag[];
  category?: number;
  count?: number;
  id?: string;
  createdAt?: string;
  online?: number;
  show?: number;
  weight?: number;
  isShowModal?: boolean;
}
export interface CommoditySpAddObject {
  commodityId?: string;
  id?: string;
  picUrl: string;
  pricing: number;
  specifications: string;
}
export interface ModifySpAddObject {
  id: string;
  picUrl: string;
  pricing: number;
  specifications: string;
  num?: number | string;
}
export interface CommodityAddObject {
  commoditys: Commodity[];
}

export interface CommodityDelObject {
  id: string;
  name: string;
  picURL: string;
  tags: Tag[];
}
