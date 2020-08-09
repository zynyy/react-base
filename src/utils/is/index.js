// js 判断类型可以通过 instanceof、Object.prototype.toString.call、typeof
// 这三种判断类型各有局限性
// instanceof 可通过修改 Symbol.hasInstance 并且不能用于判断除了Object原始数据类型之外的数据
// Object.prototype.toString.call 可通过修改 Symbol.toStringTag
// typeof 只能判断基础类型

export {
  isBlob,
  isDocument,
  isFile,
  isFileReader,
  isHistory,
  isLocation,
  isNavigator,
  isScreen,
  isStorage,
  isWindow,
} from './domTag';

export {
  isArray,
  isArrayBuffer,
  isAsyncFunction,
  isAsyncGeneratorFunction,
  isAtomics,
  isBigInt,
  isBigInt64Array,
  isBigUint64Array,
  isBoolean,
  isDataView,
  isDate,
  isError,
  isFloat32Array,
  isFloat64Array,
  isFunction,
  isGeneratorFunction,
  isInt16Array,
  isInt32Array,
  isInt8Array,
  isJSON,
  isMap,
  isMath,
  isNull,
  isNumber,
  isObject,
  isPromise,
  isRegExp,
  isSet,
  isSharedArrayBuffer,
  isString,
  isSymbol,
  isUint16Array,
  isUint32Array,
  isUint8Array,
  isUint8ClampedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
} from './ecmaTag';

// eslint-disable-next-line no-useless-escape
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path) => reg.test(path);

export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
