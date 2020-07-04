// https://github.com/axios/axios#axios-api
import axios from 'axios';
import { message } from 'antd';
import md5 from 'crypto-js/md5';
import { v1 } from 'uuid';
import qs from 'qs';

import { isError, isFunction, isString } from '@/utils/is';

// https://tools.ietf.org/html/rfc2616#section-10
// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
const HTTPStatusCodeMessage = {
  404: '请求失败，请求所希望得到的资源未被在服务器上发现',
};

const serviceInstance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.host}/`,
  timeout: 3000, // 设置超时时间
});

const pendingRequest = []; // 等待请求队列

// 移除请求
export const removePendingRequest = (key) => {
  const existIndex = pendingRequest.findIndex((item) => item.key === key);
  if (existIndex > -1) {
    pendingRequest.splice(existIndex, 1);
  }
};

// 取消请求
export const cancelRequest = (key, msg) => {
  const { cancel } = pendingRequest.find((item) => item.key === key) || {};
  if (isFunction(cancel)) {
    cancel(msg);
    removePendingRequest(key);
  }
};

export const generateTokenKey = (config) => {
  const { url, method, params, data } = config;

  switch (method) {
    case 'get': {
      return md5(`${url}-${method}-${qs.stringify(params)}`).toString();
    }
    case 'delete':
    case 'put':
    case 'post': {
      return md5(
        `${url}-${method}-${qs.stringify(isString(data) && data ? JSON.parse(data) : data)}`,
      ).toString();
    }
    default: {
      return md5(config).toString();
    }
  }
};

const { CancelToken } = axios;

/**
 * 请求拦截器
 */
serviceInstance.interceptors.request.use(
  (config) => {
    // https://github.com/axios/axios#request-config

    const key = generateTokenKey(config);
    cancelRequest(key);

    config.headers.Authorization = 'xxxx';
    config.cancelToken = new CancelToken((callback) => {
      pendingRequest.push({
        cancel: callback,
        key,
      });
    });

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 */
serviceInstance.interceptors.response.use(
  (response) => {
    // https://github.com/axios/axios#response-schema
    const { data, config } = response;

    const key = generateTokenKey(config);

    removePendingRequest(key);

    return Promise.resolve(data);
  },
  (error) => {
    if (isError(error)) {
      const messageArray = error.message.split(' ');

      const code = messageArray.pop();

      if (Reflect.has(HTTPStatusCodeMessage, code)) {
        message.error(HTTPStatusCodeMessage[code]);
      } else if (code === 'exceeded') {
        message.error('请求超时，请稍后再试');
      }
    } else if (error?.constructor?.name === 'Cancel') {
      message.error('取消请求');
    }

    return Promise.reject(error);
  },
);

/**
 *
 * @param url
 * @param params
 * @param config
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const HTTPGet = (url, params, config) => {
  return serviceInstance.get(url, {
    ...config,
    params,
  });
};

/**
 *
 * @param url
 * @param data
 * @param config
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const HTTPPost = (url, data, config) => {
  return serviceInstance.post(url, data, config);
};

/**
 *
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 * @constructor
 */
export const HTTPDelete = (url, data, config) => {
  return serviceInstance.delete(url, {
    ...config,
    data,
  });
};

/**
 *
 * @param url
 * @param data
 * @param config
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const HttpPut = (url, data, config) => {
  return serviceInstance.put(url, data, config);
};

/**
 * 上传到阿里云OOS 服务
 * @param params https://help.aliyun.com/document_detail/31988.html
 * @returns {Promise<AxiosResponse<T>>}
 */
const uploadALiYunOOSFile = (params) => {
  const url = '*.aliyuncs.com';
  return axios.post(url, params);
};

export const generateUploadPromise = async (fileInfo, ossSignatureConfig) => {
  return new Promise((resolve, reject) => {
    const { accessid, signature, policy, dir } = ossSignatureConfig;

    const { suffix, file } = fileInfo;

    const key = `${dir}/${v1()}${suffix}`;

    const formData = new FormData();

    formData.append('key', key);
    formData.append('policy', policy);
    formData.append('OSSAccessKeyId', accessid);
    formData.append('success_action_status', '200');
    formData.append('signature', signature);
    formData.append('file', file);

    uploadALiYunOOSFile(formData)
      .then((res) => {
        const { status } = res;

        if (status === 200) {
          resolve({
            objectName: key,
            fileNameKey: key,
            ...fileInfo,
            uploadFlag: true,
          });
        } else {
          reject(
            new Error({
              message: '上传失败',
              fileNameKey: key,
              ...fileInfo,
            }),
          );
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadOOSFile = async (fileList = [], ossSignatureConfig) => {
  if (!fileList.length) return Promise.resolve([]);
  const allUploadPromise = [];
  fileList.forEach((current) => {
    const { uploadFlag } = current;
    if (uploadFlag) {
      allUploadPromise.push(Promise.resolve(current));
    } else {
      allUploadPromise.push(generateUploadPromise(current, ossSignatureConfig));
    }
  });
  return Promise.all(allUploadPromise);
};

/**
 * 上传文件到本地
 * @param url
 * @param file
 * @returns {Promise<AxiosResponse<T>>}
 */
export const uploadFile = (url, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return serviceInstance.post(url, formData, {
    responseType: 'blob',
  });
};
