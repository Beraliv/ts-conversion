import { map } from "./map";

export const getProgress = () => {
  let missing = 0;
  let empty = 0;
  let implemented = 0;
  let total = 0;

  for (const values of Object.values(map)) {
    for (const value of Object.values(values)) {
      total++;

      if (value === "empty") {
        empty++;
      } else if (value === "missing") {
        missing++;
      } else {
        implemented++;
      }
    }
  }

  return { missing, empty, implemented, total };
};
