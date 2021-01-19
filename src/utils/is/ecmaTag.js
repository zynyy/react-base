import { getTag } from '@/utils/utils';

// https://tc39.es/ecma262/
const ECMA_STRING_TAG = {
  null: '[object Null]', // 55
  undefined: '[object Undefined]', // 65
  string: '[object String]', // 75
  object: '[object Object]', // 85
  number: '[object Number]', // 95
  bigInt: '[object BigInt]', // 106
  boolean: '[object Boolean]', // 116
  symbol: '[object Symbol]', // 127
  function: '[object Function]', // 138
  asyncFunction: '[object AsyncFunction]', // 149
  generatorFunction: '[object GeneratorFunction]', // 160
  asyncGeneratorFunction: '[object AsyncGeneratorFunction]', // 171
  promise: '[object Promise]', // 185
  array: '[object Array]', // 195
  int8Array: '[object Int8Array]', // 206
  uint8Array: '[object Uint8Array]', // 217
  uint8ClampedArray: '[object Uint8ClampedArray]', // 228
  int16Array: '[object Int16Array]', // 239
  uint16Array: '[object Uint16Array]', // 250
  int32Array: '[object Int32Array]', // 261
  uint32Array: '[object Uint32Array]', // 272
  float32Array: '[object Float32Array]', // 283
  float64Array: '[object Float64Array]', // 294
  bigUint64Array: '[object BigUint64Array]', // 305
  bigInt64Array: '[object BigInt64Array]', // 316
  arrayBuffer: '[object ArrayBuffer]', // 327
  dataView: '[object DataView]', // 339
  sharedArrayBuffer: '[object SharedArrayBuffer]', // 350
  atomics: '[object Atomics]', // 360
  json: '[object JSON]', // 370
  error: '[object Error]', // 381
  regExp: '[object RegExp]', // 392
  date: '[object Date]', // 403
  math: '[object Math]', // 413
  map: '[object Map]', // 424
  weakMap: '[object WeakMap]', // 435
  set: '[object Set]', // 446
  weakSet: '[object WeakSet]', // 457
};

const checkECMAType = (value, type) => getTag(value) === ECMA_STRING_TAG[type];

/**
 *
 * @param {*} value
 * isNull(null)
 *  => true
 */
export const isNull = (value) => checkECMAType(value, 'null');

/**
 *
 * @param {*} value
 * isUndefined(undefined)
 *  => true
 */
export const isUndefined = (value) => checkECMAType(value, 'undefined');

/**
 *
 * @param {*} value
 * isString('')
 * => true
 */
export const isString = (value) => checkECMAType(value, 'string');

/**
 *
 * @param {*} value
 * isObject({})
 * => true
 */
export const isObject = (value) => checkECMAType(value, 'object');

/**
 *
 * @param {*} value
 * isNumber(0)
 *  => true
 */
export const isNumber = (value) => checkECMAType(value, 'number');

/**
 *
 * @param {*} value
 * const bigInt = 1n || BigInt(1)
 * isBigInt(bigInt)
 *  => true
 */
export const isBigInt = (value) => checkECMAType(value, 'bigInt');

/**
 *
 * @param {*} value
 * isBoolean(false)
 *  => true
 */
export const isBoolean = (value) => checkECMAType(value, 'boolean');

/**
 *
 * @param {*} value
 * const symbol = Symbol(0)
 * isSymbol(symbol)
 *  => true
 */
export const isSymbol = (value) => checkECMAType(value, 'symbol');

/**
 *
 * @param {*} value
 * function func() {} || const func = () => {} || const func = function() {}
 * isFunction(func)
 *  => true
 */
export const isFunction = (value) => checkECMAType(value, 'function');

/**
 *
 * @param {*} value
 * async function func() {} || const func = async () => {} || const func = async function() {}
 * isAsyncFunction(func)
 *  => true
 */
export const isAsyncFunction = (value) => checkECMAType(value, 'AsyncFunction');

/**
 *
 * @param {*} value
 * function * func() {} || const func = function * () {}
 * isGeneratorFunction(func)
 *  => true
 */
export const isGeneratorFunction = (value) => checkECMAType(value, 'generatorFunction');

/**
 *
 * @param {*} value
 * async function * func() {} || const func = async function * () {}
 * isAsyncGeneratorFunction(func)
 *  => true
 */
export const isAsyncGeneratorFunction = (value) => checkECMAType(value, 'asyncGeneratorFunction');

/**
 *
 * @param {*} value
 * const promise = new Promise((resolve,reject) => {}) || Promise.resolve() || Promise.reject() || Promise.all([]) || Promise.allSettled() || Promise.race()
 * const asyncFunc = async function * func() {} || const func = async function * () {} || async function func() {} || const func = async () => {} || const func = async function() {}
 * isPromise(promise)
 *  => true
 * isPromise(asyncFunc())
 *  => true
 */
export const isPromise = (value) => checkECMAType(value, 'promise');

/**
 *
 * @param {*} value
 * isArray([])
 *  => true
 */
export const isArray = (value) => checkECMAType(value, 'array');

/**
 *
 * @param {*} value
 * const int8Array = new Int8Array()
 * isInt8Array(int8Array)
 *  => true
 */
export const isInt8Array = (value) => checkECMAType(value, 'int8Array');

/**
 *
 * @param {*} value
 * const uint8Array = new Uint8Array()
 * isUint8Array(uint8Array)
 *  => true
 */
export const isUint8Array = (value) => checkECMAType(value, 'uint8Array');

/**
 *
 * @param {*} value
 * const uint8ClampedArray = new Uint8ClampedArray()
 * isUint8ClampedArray(uint8ClampedArray)
 *  => true
 */
export const isUint8ClampedArray = (value) => checkECMAType(value, 'uint8ClampedArray');

/**
 *
 * @param {*} value
 * const int16Array = new Int16Array()
 * isInt16Array(int16Array)
 *  => true
 */
export const isInt16Array = (value) => checkECMAType(value, 'int16Array');

/**
 *
 * @param {*} value
 * const uint16Array = new Uint16Array()
 * isUint16Array(uint16Array)
 *  => true
 */
export const isUint16Array = (value) => checkECMAType(value, 'uint16Array');

/**
 *
 * @param {*} value
 * const int32Array = new Int32Array()
 * isInt32Array(int32Array)
 *  => true
 */
export const isInt32Array = (value) => checkECMAType(value, 'int32Array');

/**
 *
 * @param {*} value
 * const uint32Array = new Uint32Array()
 * isUint32Array(uint32Array)
 *  => true
 */
export const isUint32Array = (value) => checkECMAType(value, 'uint32Array');

/**
 *
 * @param {*} value
 * const float32Array = new Float32Array()
 * isFloat32Array(float32Array)
 *  => true
 */
export const isFloat32Array = (value) => checkECMAType(value, 'float32Array');

/**
 *
 * @param {*} value
 * const float64Array = new Float64Array()
 * isFloat64Array(float64Array)
 *  => true
 */
export const isFloat64Array = (value) => checkECMAType(value, 'float64Array');

/**
 *
 * @param {*} value
 * const bigUint64Array = new BigUint64Array()
 * isBigUint64Array(bigUint64Array)
 *  => true
 */
export const isBigUint64Array = (value) => checkECMAType(value, 'bigUint64Array');

/**
 *
 * @param {*} value
 * const bigInt64Array = new BigInt64Array()
 * isBigInt64Array(bigInt64Array)
 *  => true
 */
export const isBigInt64Array = (value) => checkECMAType(value, 'bigInt64Array');

/**
 *
 * @param {*} value
 * const arrayBuffer = new ArrayBuffer()
 * isArrayBuffer(arrayBuffer)
 *  => true
 */
export const isArrayBuffer = (value) => checkECMAType(value, 'arrayBuffer');

/**
 *
 * @param {*} value
 * const arrayBuffer = new ArrayBuffer();
 * const dataView = new DataView(arrayBuffer)
 * isDataView(dataView)
 *  => true
 */
export const isDataView = (value) => checkECMAType(value, 'dataView');

/**
 *
 * @param {*} value
 * const sharedArrayBuffer = new SharedArrayBuffer()
 * isSharedArrayBuffer(sharedArrayBuffer)
 *  => true
 */
export const isSharedArrayBuffer = (value) => checkECMAType(value, 'sharedArrayBuffer');

/**
 *
 * @param {*} value
 * isAtomics(Atomics)
 * => true
 */
export const isAtomics = (value) => checkECMAType(value, 'atomics');

/**
 *
 * @param {*} value
 * isJSON(JSON)
 *  => true
 */
export const isJSON = (value) => checkECMAType(value, 'json');

/**
 *
 * @param {*} value
 * const error = new Error()
 * isError(error)
 *  => true
 */
export const isError = (value) => checkECMAType(value, 'error');

/**
 *
 * @param {*} value
 * const regExp = new RegExp('^$') || new RegExp(/^$/) || /^$/
 * isRegExp(regExp)
 *  => true
 */
export const isRegExp = (value) => checkECMAType(value, 'regExp');

/**
 *
 * @param {*} value
 * const date = new Date()
 * isDate(date)
 *  => true
 */
export const isDate = (value) => checkECMAType(value, 'date');

/**
 *
 * @param {*} value
 * isMath(Math)
 *  => true
 */
export const isMath = (value) => checkECMAType(value, 'math');

/**
 *
 * @param {*} value
 * const map = new Map()
 * isMap(map)
 *  => true
 */
export const isMap = (value) => checkECMAType(value, 'map');

/**
 *
 * @param {*} value
 * const weakMap = new WeakMap()
 * isWeakMap(weakMap)
 *  => true
 */
export const isWeakMap = (value) => checkECMAType(value, 'weakMap');

/**
 *
 * @param {*} value
 * const set = new Set()
 * isSet(set)
 *  => true
 */
export const isSet = (value) => checkECMAType(value, 'set');

/**
 *
 * @param {*} value
 * const weakSet = new WeakSet()
 * isWeakSet(weakSet)
 *  => true
 */
export const isWeakSet = (value) => checkECMAType(value, 'weakSet');
