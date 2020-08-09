const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

const NUMBER_REG = /^([+-])?0*(\d+)(\.)?(\d+)?$/;

class DigitalToChinese {
  #defaultOptions = {
    characterSet: '零壹贰叁肆伍陆柒捌玖',
    quantifier: '个拾佰仟万亿兆京',
    dot: '点',
    currency: '人名币',
    monetaryUnit: '元角分厘',
    colloquialism: true,
    negative: '负',
  };

  constructor(options) {
    this.options = Object.assign(this.#defaultOptions, options);
  }

  setOptions = (options) => {
    this.options = Object.assign(this.options, options);
    return this;
  };

  /**
   * 科技计数法转十进制 eg 0.00345 = 3.45E-3 , 345 = 3.45E2
   */
  scientificNotation = (num) => {
    if (!isNumeric(num)) return num;

    const numToString = num.toString();

    const F_E_REG = /^([+-])?0*(\d+)(\.)?(\d+)?e([+-])?(\d+)$/i;

    const result = F_E_REG.exec(numToString);

    if (!result) return numToString;

    const [, sign, integer, , decimal, FESign, power] = result;

    const decimalLength = decimal ? decimal.length : 0;
    const integerLength = integer ? integer.length : 0;

    const [startZero] = `${integer || ''}`.match(/^0*/);

    const { length: startLength } = startZero;

    const diffLength = decimalLength - power;

    const beginIndex =
      diffLength >= 0 && FESign !== '-' && decimal && Number(power) ? diffLength : 0;

    const number = `${integer || ''}${beginIndex ? `${decimal.slice(0, beginIndex)}.` : ''}${
      decimal ? decimal.slice(beginIndex) : ''
    }`;

    if (FESign === '-') {
      const padStartLength = power ? Number(power) + Number(decimalLength) : 0;
      return `${sign || ''}0.${number.padStart(padStartLength, 0)}`;
    }

    const padEndLength = power ? Number(power) + Number(integerLength) - startLength : 0;

    return `${sign || ''}${number.substr(startLength).padEnd(padEndLength, 0)}`;
  };

  analysisNumber = (num) => {
    const decimalDigit = this.scientificNotation(num);
    const result = NUMBER_REG.exec(decimalDigit);
    if (!result) return {};
    const [, sign, integer, , decimal] = result;
    return {
      integer,
      decimal,
      isNegative: sign === '-',
      number: result.slice(1, 5).join(''),
    };
  };

  transformInteger = (int) => {
    const { characterSet, quantifier, colloquialism } = this.options;

    const { integer } = this.analysisNumber(int);

    const { length } = integer;

    if (length === 1) return characterSet.charAt(integer);

    if (length <= 4) {
      const maxIndex = length - 1;

      return integer.split('').reduce((accumulate, currentValue, currentIndex) => {
        const quantifierIndex = maxIndex - currentIndex;

        const isZero = currentValue === '0';

        return `${accumulate}${
          length === 2 && currentValue === '1' && currentIndex === 0 && colloquialism
            ? ''
            : characterSet.charAt(currentValue)
        }${
          quantifierIndex === 0 || (colloquialism && isZero)
            ? ''
            : quantifier.charAt(quantifierIndex)
        }`;
      }, '');
    }
    let quotientInt = parseInt(length / 4, 10);

    let modulo = length % 4;

    let quantifierIndex = quotientInt + 3;

    while (modulo === 0 || !quantifier.charAt(quantifierIndex)) {
      modulo += 4;
      quotientInt -= 1;
      quantifierIndex = quotientInt + 3;
    }

    const quantifierNum = integer.substr(0, modulo);

    const restNum = integer.substr(modulo);

    return `${this.#format(this.transformInteger(quantifierNum))}${quantifier.charAt(
      quantifierIndex,
    )}${restNum.charAt(0) === '0' ? characterSet.charAt(0) : ''}${this.transformInteger(restNum)}`;
  };

  #format = (str) => {
    const { characterSet, colloquialism } = this.options;

    if (!colloquialism) return str;

    const zeroSymbol = characterSet.charAt(0);

    const REG = new RegExp(`${zeroSymbol}{${2}}`, 'g');
    const RIGHT_REG = new RegExp(`${zeroSymbol}+$`);

    return str === zeroSymbol ? str : str.replace(RIGHT_REG, '').replace(REG, zeroSymbol);
  };

  encode = (num) => {
    const { characterSet, dot, negative } = this.options;
    const { integer, decimal, isNegative } = this.analysisNumber(num);

    const encodeInteger = this.transformInteger(integer);

    const encodeDecimal = `${decimal || ''}`.split('').reduce((accumulate, currentValue) => {
      return `${accumulate}${characterSet.charAt(currentValue)}`;
    }, '');

    const encodeNum = `${isNegative ? negative : ''}${encodeInteger}${
      decimal ? dot : ''
    }${encodeDecimal}`;

    return this.#format(encodeNum);
  };

  #getDigitQuantifierIndex = (index) => {
    return index >= 5 ? (index - 4) * 4 + 4 : index;
  };

  decode = (characterNum) => {
    if (!characterNum) return characterNum;

    const numToString = characterNum.toString();

    const { characterSet, dot, negative, quantifier } = this.options;

    const [integer, decimal] = numToString.split(dot);

    const isNegative = integer.startsWith(negative);

    const int = integer.replace(negative, '');

    const tenQuantifier = quantifier.charAt(1);

    const decodeNum = [];

    if (int) {
      let latelyQuantifierIndex = 0; // 最近一个单位所在的位置
      let maxQuantifierIndex = 0; // 最大单位所在的位置

      const lastIndex = int.length - 1;

      let tempArr = [];

      const quantifierNum = [];

      int.split('').forEach((val, index) => {
        const characterIndex = characterSet.indexOf(val);

        if (characterIndex > -1) {
          tempArr.unshift(characterIndex);

          if (lastIndex === index) {
            const prevQuantifierIndex = quantifier.indexOf(int[index - 1]);

            if (
              latelyQuantifierIndex === prevQuantifierIndex ||
              prevQuantifierIndex === maxQuantifierIndex
            ) {
              tempArr.unshift(
                ...Array.from(
                  {
                    length: this.#getDigitQuantifierIndex(prevQuantifierIndex - 1),
                  },
                  () => 0,
                ),
              );
            }
          }
        } else {
          const quantifierIndex = quantifier.indexOf(val);
          if (quantifierIndex > -1) {
            const digitQuantifierIndex = this.#getDigitQuantifierIndex(quantifierIndex);
            const padZero = Array.from(
              {
                length: digitQuantifierIndex,
              },
              () => 0,
            );
            if (latelyQuantifierIndex > quantifierIndex) {
              tempArr.unshift(...padZero);
              quantifierNum.splice(0, tempArr.length, ...tempArr);
            } else if (quantifierIndex >= maxQuantifierIndex) {
              if (index === 0) {
                tempArr = [1];
              }
              decodeNum.splice(0, quantifierNum.length, ...quantifierNum);
              quantifierNum.splice(0);
              decodeNum.splice(0, tempArr.length, ...tempArr);
              if (decodeNum.length > 0) {
                decodeNum.unshift(...padZero);
              }
              maxQuantifierIndex = quantifierIndex;
            } else {
              if (decodeNum.length === 0 && val === tenQuantifier) {
                tempArr = [1];
              }
              quantifierNum.splice(0, tempArr.length, ...tempArr);
              quantifierNum.unshift(...padZero);

              latelyQuantifierIndex = quantifierIndex;
            }
          }
          tempArr = [];
        }
      });

      decodeNum.splice(0, quantifierNum.length, ...quantifierNum);
      decodeNum.splice(0, tempArr.length, ...tempArr);
      decodeNum.reverse();
    } else {
      decodeNum.push('0');
    }

    if (decimal) {
      decodeNum.push('.');

      decimal.split('').forEach((val) => {
        const characterIndex = characterSet.indexOf(val);

        if (characterIndex > -1) {
          decodeNum.push(characterIndex);
        }
      });
    }

    if (isNegative) {
      decodeNum.unshift('-');
    }

    return decodeNum.join('');
  };

  formatUpperMoney(num) {
    const { characterSet, negative, monetaryUnit, currency } = this.options;
    const { integer, decimal, isNegative } = this.analysisNumber(num);

    const encodeInteger = this.transformInteger(integer);

    const encodeDecimal = `${decimal || ''}`
      .split('')
      .reduce((accumulate, currentValue, currentIndex) => {
        return `${accumulate}${characterSet.charAt(currentValue)}${monetaryUnit.charAt(
          currentIndex + 1,
        )}`;
      }, '');

    const encodeNum = `${currency}${
      isNegative ? negative : ''
    }${encodeInteger}${monetaryUnit.charAt(0)}${encodeDecimal}`;

    return this.#format(encodeNum);
  }
}

export default DigitalToChinese;
