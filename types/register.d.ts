export type registerData = {
  category: number;
  name: string;
  password: string;
  passwordTwo: string;
  tgId: number;
  tgName: string;
  tgPrtrait: string;
  verifyCode: string;
};

export type loginData = {
  name: string;
  password: string;
};

export type VerifyCodeParams = {
  name: string;
  tgId: number;
};
