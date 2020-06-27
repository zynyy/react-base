import qs from 'qs';

// eslint-disable-next-line import/prefer-default-export
export const getPageQuery = (search) => {
  return qs.parse(search, { ignoreQueryPrefix: true });
};
