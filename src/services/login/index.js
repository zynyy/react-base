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
export const accountLogin = (params) => HTTPPost('/zgj/user/login', params);

export const captchaFetch = (params) => HTTPPost('zgj/user/getVerifyCode', params);
