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
  return [...new Set(result)];
};

// eslint-disable-next-line import/prefer-default-export
export const getChineseFirstLetter = (str, isPolyphone) => {
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
