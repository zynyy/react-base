import { HTTPPost } from '@/utils/request';

/**
 *
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 * @constructor
 */
export const accountLogin = (params) => {
  return HTTPPost('/api/login/account', params);
};

export const testAccountLogin = (params) => {
  return HTTPPost('', params);
};
