export type ValueOf<Type> = Type extends readonly unknown[]
  ? Type[number]
  : Type[keyof Type];
