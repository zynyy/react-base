// js 判断类型可以通过 instanceof、Object.prototype.toString.call、typeof
// 这三种判断类型各有局限性
// instanceof 可通过修改 Symbol.hasInstance 并且不能用于判断除了Object原始数据类型之外的数据
// Object.prototype.toString.call 可通过修改 Symbol.toStringTag
// typeof 只能判断基础类型
const STRING_TAG = {
  array: '[object Array]',
  int8Array: '[object Int8Array]',
  uint8Array: '[object Uint8Array]',
  uint8ClampedArray: '[object Uint8ClampedArray]',
  int16Array: '[object Int16Array]',
  uint16Array: '[object Uint16Array]',
  int32Array: '[object Int32Array]',
  uint32Array: '[object Uint32Array]',
  float32Array: '[object Float32Array]',
  float64Array: '[object Float64Array]',
  bigUint64Array: '[object BigUint64Array]',
  bigInt64Array: '[object BigInt64Array]',
  arrayBuffer: '[object ArrayBuffer]',
  sharedArrayBuffer: '[object SharedArrayBuffer]',
  atomics: '[object Atomics]',
  json: '[object JSON]',
  error: '[object Error]',
  regExp: '[object RegExp]', // 正则表达式
  nativeJSON: '[object JSON]',
  date: '[object Date]',
  function: '[object Function]',
  asyncFunction: '[object AsyncFunction]',
  generatorFunction: '[object GeneratorFunction]',
  asyncGeneratorFunction: '[object AsyncGeneratorFunction]',
  undefined: '[object Undefined]',
  null: '[object Null]',
  math: '[object Math]',
  string: '[object String]',
  fileReader: '[object FileReader]', // 该方法是 DOM 方法 非 ECMA 制定
  file: '[object File]',
  object: '[object Object]',
  blob: '[object Blob]',
  number: '[object Number]', // 0
  map: '[object Map]', // new Map
  weakMap: '[object WeakMap]',
  set: '[object Set]',
  weakSet: '[object WeakSet]',
  boolean: '[object Boolean]',
  symbol: '[object Symbol]',
  promise: '[object Promise]',
};

const checkType = (value, type) => {
  return Object.prototype.toString.call(value) === STRING_TAG[type];
};

export const isError = (value) => {
  return checkType(value, 'error');
};

export const isFunction = (value) => {
  return checkType(value, 'function');
};

export const isString = (value) => {
  return checkType(value, 'string');
};

// eslint-disable-next-line no-useless-escape
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path) => reg.test(path);
