import PinYinDictFirstLetter from './PinYinDictFirstLetter';

const handlePolyphone = (array) => {
  const { length } = array;
  let result = [''];
  for (let i = 0; i < length; i += 1) {
    const tem = array[i].split('');
    const temp = [];
    const temLen = tem.length;
    for (let j = 0; j < temLen; j += 1) {
      const resLen = result.length;
      for (let k = 0; k < resLen; k += 1) {
        temp.push(`${result[k]}${tem[j]}`);
      }
    }
    result = temp;
  }
  return Array.from(new Set(result));
};

const getChineseFirstLetter = (str, isPolyphone) => {
  if (!str || /^ +$/g.test(str)) return '';

  const result = [];
  const { length } = str;

  for (let i = 0; i < length; i += 1) {
    const unicode = str.charCodeAt(i);
    let chineseFirstLetter = str.charAt(i);

    if (unicode >= 19968 && unicode <= 40869) {
      chineseFirstLetter = PinYinDictFirstLetter.all.charAt(unicode - 19968);
      if (isPolyphone) {
        chineseFirstLetter = PinYinDictFirstLetter.polyphone[unicode] || chineseFirstLetter;
      }
    }
    result.push(chineseFirstLetter);
  }

  if (!isPolyphone) {
    return result.join('');
  }
  return handlePolyphone(result);
};

export const handleCascaderFilter = (inputValue, path) => {
  const [first] = path;
  const nameFirstLetter = getChineseFirstLetter(first.label, true);

  const index =
    nameFirstLetter &&
    nameFirstLetter.findIndex((val) => val.toLowerCase().startsWith(inputValue.toLowerCase()));
  return index !== -1;
};

export default getChineseFirstLetter;
