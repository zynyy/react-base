import { conversion10to62, conversion62to10 } from '.';

describe('测试10 进制转 62 进制', () => {
  test('0', () => {
    expect(conversion10to62(0)).toBe('0');
  });
  test('62', () => {
    expect(conversion10to62(62)).toBe('10');
  });
  test('61', () => {
    expect(conversion10to62(61)).toBe('Z');
  });
  test('3844', () => {
    expect(conversion10to62(3844)).toBe('100');
  });
});

describe('测试 62 进制转 10 进制', () => {
  test('0', () => {
    expect(conversion62to10(0)).toBe(0);
  });
  test('10', () => {
    expect(conversion62to10(10)).toBe(62);
  });
  test('100', () => {
    expect(conversion62to10('100')).toBe(3844);
  });
});
