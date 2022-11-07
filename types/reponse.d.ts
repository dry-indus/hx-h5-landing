export interface AddTagsSuccess {
  message: string;
  status: number;
  data: {
    id: string;
  };
}
export interface AddSpSuccess {
  data: string;
  message: string;
  status: number;
  Data: {
    id: string;
  };
}
export interface AddCommoditySuccess {
  data: string;
  message: string;
  status: number;
  Data: {
    count: number;
    ids: Array<string>;
  };
}
