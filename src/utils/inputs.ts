import { ValueOf } from "../types/ValueOf";

export const inputs = [
  "array",
  "tuple",
  "object",
  "union",
  "stringLiteral",
  "numericLiteral",
  // TODO: add intersection (example union to intersection)
] as const;

export type InputType = ValueOf<typeof inputs>;
