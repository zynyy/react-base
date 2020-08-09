import DigitalToChinese from './index';

describe('数字编码', () => {
  test('0.0e0', () => {
    expect(new DigitalToChinese().encode('0.0e0')).toBe('零');
  });
  test('1.2e1', () => {
    expect(new DigitalToChinese().encode('1.2e1')).toBe('拾贰');
  });
  test('1.2e1', () => {
    expect(
      new DigitalToChinese({
        colloquialism: false,
      }).encode('1.2e1'),
    ).toBe('壹拾贰');
  });
  test('9999', () => {
    expect(new DigitalToChinese().encode('9999')).toBe('玖仟玖佰玖拾玖');
  });
  test('999', () => {
    expect(new DigitalToChinese().encode('999')).toBe('玖佰玖拾玖');
  });
  test('99', () => {
    expect(new DigitalToChinese().encode('99')).toBe('玖拾玖');
  });
  test('9009', () => {
    expect(new DigitalToChinese().encode('9009')).toBe('玖仟零玖');
  });
  test('1e4', () => {
    expect(new DigitalToChinese().encode('1e4')).toBe('壹万');
  });
  test('10001', () => {
    expect(new DigitalToChinese().encode('10001')).toBe('壹万零壹');
  });
  test('1e8', () => {
    expect(new DigitalToChinese().encode('1e8')).toBe('壹亿');
  });
  test('1e9', () => {
    expect(new DigitalToChinese().encode('1e9')).toBe('拾亿');
  });
  test('1000000001', () => {
    expect(new DigitalToChinese().encode('1000000001')).toBe('拾亿零壹');
  });
  test('1e12', () => {
    expect(new DigitalToChinese().encode('1e12')).toBe('壹兆');
  });
  test('1e13', () => {
    expect(new DigitalToChinese().encode('1e13')).toBe('拾兆');
  });
  test('1e13', () => {
    expect(new DigitalToChinese({ quantifier: '个拾佰仟万亿' }).encode('1e13')).toBe('拾万亿');
  });
  test('-1e13', () => {
    expect(new DigitalToChinese().encode('-1e13')).toBe('负拾兆');
  });
  test('-0.11e1', () => {
    expect(new DigitalToChinese().encode('-0.11e1')).toBe('负壹点壹');
  });
  test('-1e1', () => {
    expect(new DigitalToChinese().encode('-1e1')).toBe('负拾');
  });
});

describe('数字解码', () => {
  test('零', () => {
    expect(new DigitalToChinese().decode('零')).toBe('0');
  });
  test('拾贰', () => {
    expect(new DigitalToChinese().decode('拾贰')).toBe('12');
  });
  test('壹拾贰', () => {
    expect(new DigitalToChinese().decode('壹拾贰')).toBe('12');
  });
  test('玖仟玖佰玖拾玖', () => {
    expect(new DigitalToChinese().decode('玖仟玖佰玖拾玖')).toBe('9999');
  });
  test('玖佰玖拾玖', () => {
    expect(new DigitalToChinese().decode('玖佰玖拾玖')).toBe('999');
  });
  test('玖拾玖', () => {
    expect(new DigitalToChinese().decode('玖拾玖')).toBe('99');
  });
  test('玖仟零玖', () => {
    expect(new DigitalToChinese().decode('玖仟零玖')).toBe('9009');
  });
  test('壹万', () => {
    expect(new DigitalToChinese().decode('壹万')).toBe('10000');
  });
  test('壹万零壹', () => {
    expect(new DigitalToChinese().decode('壹万零壹')).toBe('10001');
  });
  test('壹亿', () => {
    expect(new DigitalToChinese().decode('壹亿')).toBe('100000000');
  });
  test('拾亿', () => {
    expect(new DigitalToChinese().decode('拾亿')).toBe('1000000000');
  });
  test('拾亿零壹', () => {
    expect(new DigitalToChinese().decode('拾亿零壹')).toBe('1000000001');
  });
  test('壹兆', () => {
    expect(new DigitalToChinese().decode('壹兆')).toBe('1000000000000');
  });
  test('拾兆', () => {
    expect(new DigitalToChinese().decode('拾兆')).toBe('10000000000000');
  });
  test('拾万亿', () => {
    expect(new DigitalToChinese({ quantifier: '个拾佰仟万亿' }).decode('拾万亿')).toBe(
      '10000000000000',
    );
  });
  test('负拾兆', () => {
    expect(new DigitalToChinese().decode('负拾兆')).toBe('-10000000000000');
  });
  test('负壹点壹', () => {
    expect(new DigitalToChinese().decode('负壹点壹')).toBe('-1.1');
  });
  test('负拾', () => {
    expect(new DigitalToChinese().decode('负拾')).toBe('-10');
  });
  test('壹万万', () => {
    expect(new DigitalToChinese().decode('壹万万')).toBe('100000000');
  });
  test('壹万壹', () => {
    expect(new DigitalToChinese().decode('壹万壹')).toBe('11000');
  });
});

describe('科学计数法转十进制', () => {
  test('0.0e0', () => {
    expect(new DigitalToChinese().scientificNotation('0.0e0')).toBe('0');
  });
  test('1e+27', () => {
    expect(new DigitalToChinese().scientificNotation('1e+27')).toBe('1000000000000000000000000000');
  });
  test('1.2e1', () => {
    expect(new DigitalToChinese().scientificNotation('1.2e1')).toBe('12');
  });
  test('-1e1', () => {
    expect(new DigitalToChinese().scientificNotation('-1e1')).toBe('-10');
  });
  test('-0.1e1', () => {
    expect(new DigitalToChinese().scientificNotation('-0.1e1')).toBe('-1');
  });
  test('-0.11e1', () => {
    expect(new DigitalToChinese().scientificNotation('-0.11e1')).toBe('-1.1');
  });
  test('1.2e-1', () => {
    expect(new DigitalToChinese().scientificNotation('1.2e-1')).toBe('0.12');
  });
  test('1.23e-7', () => {
    expect(new DigitalToChinese().scientificNotation('1.23e-7')).toBe('0.000000123');
  });
  test('1.2001e-1', () => {
    expect(new DigitalToChinese().scientificNotation('1.2001e-1')).toBe('0.12001');
  });
  test('1.99714E13', () => {
    expect(new DigitalToChinese().scientificNotation('1.99714E13')).toBe('19971400000000');
  });
  test('6E-6', () => {
    expect(new DigitalToChinese().scientificNotation('6E-6')).toBe('0.000006');
  });
  test('66E-6', () => {
    expect(new DigitalToChinese().scientificNotation('66E-6')).toBe('0.000066');
  });
  test('3e-7', () => {
    expect(new DigitalToChinese().scientificNotation('3e-7')).toBe('0.0000003');
  });
  test('3.3e-7', () => {
    expect(new DigitalToChinese().scientificNotation('3.3e-7')).toBe('0.00000033');
  });
  test('3.45E-3', () => {
    expect(new DigitalToChinese().scientificNotation('3.45E-3')).toBe('0.00345');
  });
  test('3.45E2', () => {
    expect(new DigitalToChinese().scientificNotation('3.45E2')).toBe('345');
  });
  test('-10.01', () => {
    expect(new DigitalToChinese().scientificNotation('-10.01')).toBe('-10.01');
  });
});

describe('分析数字', () => {
  test('0', () => {
    expect(new DigitalToChinese().analysisNumber('0')).toStrictEqual({
      integer: '0',
      decimal: undefined,
      isNegative: false,
      number: '0',
    });
  });
  test('0.0e0', () => {
    expect(new DigitalToChinese().analysisNumber('0.0e0')).toStrictEqual({
      integer: '0',
      decimal: undefined,
      isNegative: false,
      number: '0',
    });
  });
  test('0.0', () => {
    expect(new DigitalToChinese().analysisNumber('0.0')).toStrictEqual({
      integer: '0',
      decimal: '0',
      isNegative: false,
      number: '0.0',
    });
  });
  test('-1e1', () => {
    expect(new DigitalToChinese().analysisNumber('-1e1')).toStrictEqual({
      integer: '10',
      decimal: undefined,
      isNegative: true,
      number: '-10',
    });
  });
  test('-1', () => {
    expect(new DigitalToChinese().analysisNumber('-1')).toStrictEqual({
      integer: '1',
      decimal: undefined,
      isNegative: true,
      number: '-1',
    });
  });
  test('-1.1', () => {
    expect(new DigitalToChinese().analysisNumber('-1.1')).toStrictEqual({
      integer: '1',
      decimal: '1',
      isNegative: true,
      number: '-1.1',
    });
  });
  test('1', () => {
    expect(new DigitalToChinese().analysisNumber('1')).toStrictEqual({
      integer: '1',
      decimal: undefined,
      isNegative: false,
      number: '1',
    });
  });
  test('01', () => {
    expect(new DigitalToChinese().analysisNumber('01')).toStrictEqual({
      integer: '1',
      decimal: undefined,
      isNegative: false,
      number: '1',
    });
  });
  test('1.1', () => {
    expect(new DigitalToChinese().analysisNumber('1.1')).toStrictEqual({
      integer: '1',
      decimal: '1',
      isNegative: false,
      number: '1.1',
    });
  });
});

describe('数字转金额', () => {
  test('0', () => {
    expect(new DigitalToChinese().formatUpperMoney('0')).toBe('人名币零元');
  });
  test('1', () => {
    expect(new DigitalToChinese().formatUpperMoney('1')).toBe('人名币壹元');
  });
  test('1.11', () => {
    expect(new DigitalToChinese().formatUpperMoney('1.11')).toBe('人名币壹元壹角壹分');
  });
  test('1.111', () => {
    expect(new DigitalToChinese().formatUpperMoney('1.111')).toBe('人名币壹元壹角壹分壹厘');
  });
});
