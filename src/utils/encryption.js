import CryptoJS, { AES } from 'crypto-js';

export const encryptAES = (val) => {
  return AES.encrypt(CryptoJS.enc.Utf8.parse(val), 'radix-62').toString();
};

export const decryptAES = (val) => {
  return AES.decrypt(val, 'radix-62').toString(CryptoJS.enc.Utf8);
};
