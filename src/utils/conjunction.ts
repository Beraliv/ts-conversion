type ConjunctionOptions = {
  last: JSX.Element | string;
  secondToLast: JSX.Element | string;
  others: JSX.Element | string;
};

export const conjunction = <T>(
  index: number,
  array: T[],
  options: ConjunctionOptions
): JSX.Element | string => {
  if (index === array.length - 2) {
    return options.secondToLast;
  }

  if (index === array.length - 1) {
    return options.last;
  }

  return options.others;
};
