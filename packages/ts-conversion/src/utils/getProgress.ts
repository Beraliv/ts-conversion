import { map } from "./map";

export const getProgress = () => {
  const current = Object.values(map)
    .flatMap((value) => Object.values(value))
    .filter(Boolean).length;
  const total = Object.values(map).flatMap((value) =>
    Object.values(value)
  ).length;

  return { current, total };
};
