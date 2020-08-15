import getChineseFirstLetter from './index';

describe('测试中文首字大写', () => {
  test('测试单音字', () => {
    expect(getChineseFirstLetter('中国')).toBe('ZG');
  });
});
