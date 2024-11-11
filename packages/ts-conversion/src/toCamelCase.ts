const toCapitalisedCase = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const isUpperCase = (ch: string) => ch.toUpperCase() === ch;

export const toCamelCase = (str: string): string => {
  let camelCase = "";

  let word = "";
  let i = 0;
  while (i < str.length) {
    let j = i;

    while (j < str.length && !isUpperCase(str[j])) {
      word += str[j];
      j++;
    }

    camelCase += toCapitalisedCase(word);

    if (j < str.length) {
      word = str[j];
      i = j + 1;
    } else {
      word = "";
      i = j;
    }
  }

  if (word.length > 0) {
    return camelCase + toCapitalisedCase(word);
  }

  return camelCase;
};
