import { ValueOf } from "../types/ValueOf";

export const inputs = [
  "array",
  "tuple",
  "object",
  "union",
  "stringLiteral",
  "numericLiteral",
] as const;

export type InputType = ValueOf<typeof inputs>;
