type ClassName = string | Record<string, boolean> | ClassName[] | undefined;

export const classNames = (...classes: ClassName[]): string => {
  const result: string[] = [];

  for (const aClass of classes) {
    if (!aClass) {
      // do nothing
    } else if (typeof aClass === "string") {
      result.push(aClass);
    } else if (Array.isArray(aClass)) {
      result.push(classNames(...aClass));
    } else {
      const keys = Object.keys(aClass);

      for (const key of keys) {
        const flag = aClass[key];

        if (flag) {
          result.push(key);
        }
      }
    }
  }

  return result.join(" ");
};
