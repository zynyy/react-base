import { HTTPPost } from '@/utils/request';

/**
 *
 * @param {
 *  enterpriseCode: qiao,
    username: 18020740000,
    password: h123456,
    vcode: 4
 * } params
 */
export const accountLogin = (params) => {
  return HTTPPost('/zgj/user/login', params);
};

export const captchaFetch = (params) => {
  return HTTPPost('zgj/user/getVerifyCode', params);
};
