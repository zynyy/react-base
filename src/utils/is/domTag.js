import { getTag } from '@/utils/utils';

// https://html.spec.whatwg.org/
const BOM_STRING_TAG = {
  window: '[object Window]',
  document: '[object HTMLDocument]',
  location: '[object Location]',
  navigator: '[object Navigator]',
  screen: '[object Screen]',
  history: '[object History]',
  storage: '[object Storage]',
};

// https://dom.spec.whatwg.org/
const DOM_STRING_TAG = {
  mutationObserver: '[object MutationObserver]',
};

// https://www.w3.org/TR/FileAPI/
const FILE_STRING_TAG = {
  fileReader: '[object FileReader]',
  file: '[object File]',
  url: '[object URL]',
  blob: '[object Blob]',
};

const checkBOMType = (value, type) => {
  return getTag(value) === BOM_STRING_TAG[type];
};

const checkDOMType = (value, type) => {
  return getTag(value) === DOM_STRING_TAG[type];
};

const checkFileType = (value, type) => {
  return getTag(value) === FILE_STRING_TAG[type];
};

/**
 *
 * @param {*} value
 * isWindow(window) || isWindow(globalThis)
 *  => true
 */
export const isWindow = (value) => {
  return checkBOMType(value, 'window');
};

/**
 *
 * @param {*} value
 *  isDocument(document)
 *  => true
 */
export const isDocument = (value) => {
  return checkBOMType(value, 'document');
};

/**
 *
 * @param {*} value
 * isNavigator(navigator)
 *  => true
 */
export const isNavigator = (value) => {
  return checkBOMType(value, 'navigator');
};

/**
 *
 * @param {*} value
 * isLocation(location)
 *  => true
 */
export const isLocation = (value) => {
  return checkBOMType(value, 'location');
};

/**
 *
 * @param {*} value
 * isScreen(screen)
 *  => true
 */
export const isScreen = (value) => {
  return checkBOMType(value, 'screen');
};
/**
 *
 * @param {*} value
 * isHistory(history)
 *  => true
 */
export const isHistory = (value) => {
  return checkBOMType(value, 'history');
};
/**
 *
 * @param {*} value
 * const storage = localStorage || sessionStorage
 * isStorage(storage) ||
 *  => true
 */
export const isStorage = (value) => {
  return checkBOMType(value, 'storage');
};

/**
 *
 * @param {*} value
 * const mutationObserver = new MutationObserver(() => {})
 * isMutationObserver(mutationObserver) ||
 *  => true
 */
export const isMutationObserver = (value) => {
  return checkDOMType(value, 'mutationObserver');
};

/**
 * @param {*} value
 * const reader = new FileReader()
 *  isFileReader(render)
 *  => true
 */
export const isFileReader = (value) => {
  return checkFileType(value, 'fileReader');
};

/**
 *
 * @param {*} value
 * const file = new File(["example"], "example.txt")
 *  isFile(file)
 *  => true
 */
export const isFile = (value) => {
  return checkFileType(value, 'file');
};

/**
 *
 * @param {*} value
 * const blob = new Blob();
 *  isBlob(blob)
 *  => true
 */
export const isBlob = (value) => {
  return checkFileType(value, 'blob');
};
