import { HTTPGet } from '@/utils/request';

/**
 *
 * @param {*} params
 */
export const getDepartmentAll = (params) => {
  return HTTPGet('/zgj/user/department/getDepartmentAll', params);
};
