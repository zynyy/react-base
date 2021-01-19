import { HTTPGet } from '@/utils/request';

/**
 *
 * @param {*} params
 */
export const getDepartmentAll = (params) =>
  HTTPGet('/zgj/user/department/getDepartmentAll', params);
