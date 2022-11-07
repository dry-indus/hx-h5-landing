import Cookies from 'js-cookie';
export const KEY = 'm_tg_user';
export const setCookie = (data: any, hoken?: string) => {
  if (hoken && hoken === 'hoken') {
    Cookies.set(hoken, data, { expires: 7 });
  } else {
    if (typeof data !== 'string') {
      Cookies.set(KEY, JSON.stringify(data), { expires: 7 });
    } else {
      Cookies.set(KEY, data, { expires: 7 });
    }
  }
};

export const getCookie = (hoken?: string) => {
  let data: any = '';
  if (hoken && hoken === 'hoken') {
    data = Cookies.get('hoken');
  } else {
    data = Cookies.get(KEY);
  }
  return data;
};

export const removeCookie = () => {
  Cookies.remove(KEY);
  if (Cookies.get('stel_token')) {
    Cookies.remove('stel_token');
  }
  if (Cookies.get('stel_ssid')) {
    Cookies.remove('stel_ssid');
  }
  if (Cookies.get('hoken')) {
    Cookies.remove('hoken');
  }
};
