export const conjunction = <T>(index: number, array: T[]): string => {
  if (index === array.length - 2) {
    return " and ";
  }

  if (index === array.length - 1) {
    return "";
  }

  return ", ";
};
