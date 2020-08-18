import { HTTPGet, HTTPPost } from '@/utils/request';

/**
 *
 * @param {
 *  enterpriseCode: qiao,
    username: 18020740000,
    password: h123456,
    vcode: 4
 * } params
 */
export const addClient = (params) => {
  return HTTPPost('/zgj/user/client/addClient', params);
};

export const delClient = (params) => {
  return HTTPPost('/zgj/user/client/opeRecycleBin', params);
};

export const updateClient = (params) => {
  return HTTPPost('/zgj/user/client/updateClient', params);
};

export const selectClient = (params) => {
  return HTTPGet('/zgj/user/client/getClientOwn', params);
};

export const selectClientOne = (params) => {
  return HTTPGet('/zgj/user/client/getClientById', params);
};
