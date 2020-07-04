const SIXTY_TWO_RADIX_CHAR = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'g',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'G',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const conversion10to62 = (num) => {
  const array = [];

  let quotient = Number(num);

  if (!quotient) return `${num}`;

  while (quotient) {
    const mod = quotient % 62;
    quotient = (quotient - mod) / 62;
    array.push(SIXTY_TWO_RADIX_CHAR[mod]);
  }

  return array.reverse().join('');
};

export const conversion62to10 = (num) => {
  const numberCode = String(num);
  const { length } = numberCode;

  let originNumber = 0;
  let i = 0;
  const maxIndex = length - 1;

  while (i <= maxIndex) {
    originNumber += 62 ** (maxIndex - i) * SIXTY_TWO_RADIX_CHAR.indexOf(numberCode.charAt(i));

    i += 1;
  }
  return originNumber;
};
