import { InputType } from "./inputs";

type MapConfig = {
  code: string;
  warning?: string;
  notes?: string[];
  playgroundUrl?: string;
};

interface TailRecursionEliminationNoteProps {
  parameterType: string;
  utilityType: string;
}

const createTailRecursionEliminationNote = ({
  parameterType,
  utilityType,
}: TailRecursionEliminationNoteProps) => `
    TypeScript 4.5 introduced a tail-recursion elimination to optimise
    conditional types, which avoid intermediate instantiations. Therefore,
    it's recommended to use accumulator parameter types, such as \`${parameterType}\`
    in \`${utilityType}\`.
  `;

// TODO: examples from real libraries
export const map: Record<InputType, Partial<Record<InputType, MapConfig>>> = {
  array: {
    array: undefined,
    tuple: undefined,
    // TODO: Indexing an Array Type by a Specific Key
    // e.g. [K in T[number]["id"]]: Extract<T[number], { id: K }>
    object: undefined,
    union: {
      code: `
          type UnionFrom<Array extends unknown[]> = Array[number];
          type ArrayType = (number | string)[];
          type Union = UnionFrom<ArrayType>;
          //   ^? number | string
        `,
      playgroundUrl: "https://tsplay.dev/mqlBrN",
    },
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
  tuple: {
    array: undefined,
    // TODO: Pop, Push, Shift, Unshift, Flatten, Filter
    tuple: undefined,
    // TODO: ToIndexedObject
    // e.g. [K in keyof T]: T[K];
    // TODO: ToMirrorObject
    // e.g. [V in T[number]]: V;
    // TODO: Promise.all: [Promise<A>, ..., Promise<Z>] => Promise<[A, ..., Z]>
    object: {
      code: `
          type ToLanguageLookup<Tuple extends readonly string[]> = {
            [Element in Tuple[number]]: boolean;
          };
          type Tuple = ["TypeScript", "Python"];
          type LanguageLookup = ToLanguageLookup<Tuple>;
          //   ^? { TypeScript: boolean; Python: boolean }
        `,
      playgroundUrl: "https://tsplay.dev/NrZqVN",
      notes: [
        `
            Mapped types are particularly useful for tuples, when the return type is expected
            to be an object. Object keys can be either tuple indices using \`keyof Tuple\` (e.g. 0, 1)
            or tuple elements using \`Tuple[number]\` (e.g. "TypeScript" and "Python").
          `,
      ],
    },
    union: {
      code: `
          type UnionFrom<Tuple extends readonly unknown[]> = Tuple[number];
          type Tuple = [1, 2, 3];
          type Union = UnionFrom<Tuple>;
          //   ^? 3 | 1 | 2
        `,
      playgroundUrl: "https://tsplay.dev/mpM2XW",
    },
    stringLiteral: undefined,
    numericLiteral: {
      code: `
          type LengthOf<Tuple extends {length: number}> = Tuple['length'];
          type Tuple = [1, 2, 3];
          type Length = LengthOf<Tuple>;
          //   ^? 3
        `,
      notes: [
        `
          One of differences between Arrays and Tuples is \`length\` property:
          it's numeric literal for Tuples (e.g. 3), but \`number\` for Arrays.
        `,
      ],
      playgroundUrl: "https://tsplay.dev/w280rm",
    },
  },
  object: {
    array: undefined,
    tuple: undefined,
    // TODO: Pick, Readonly, Omit, Append key-value pair, GetOptional
    object: undefined,
    // TODO: add values
    union: {
      code: `
          type KeysFrom<Object> = keyof Object;
          type Person = {name: string; age: number};
          type Characteristics = KeysFrom<Person> & string;
          //   ^? keyof Person (i.e. 'name' | 'age')
        `,
      playgroundUrl: "https://tsplay.dev/NBrXxN",
    },
    stringLiteral: undefined,
    // TODO: number of keys
    numericLiteral: undefined,
  },
  union: {
    array: undefined,
    tuple: {
      code: `
          type UnionToIntersection<Union> = (Union extends any ? (arg: Union) => void : never) extends (
              arg: infer Intersection,
          ) => void
              ? Intersection
              : never;
  
          type LastOfUnion<UnionType> = UnionToIntersection<
              UnionType extends any ? (arg: UnionType) => any : never
          > extends (arg: infer LastUnionElement) => any
              ? LastUnionElement
              : never;
  
          type UnionToTuple<UnionType, Accumulator extends any[] = []> = [UnionType] extends [never]
              ? Accumulator
              : LastOfUnion<UnionType> extends infer LastUnionElement
              ? UnionToTuple<Exclude<UnionType, LastUnionElement>, [LastUnionElement, ...Accumulator]>
              : never;
  
          type Union = 1 | 2 | 3;
          type Tuple = UnionToTuple<Union>;
          //   ^? [1, 2, 3]
        `,
      playgroundUrl: "https://tsplay.dev/wOQvEm",
      warning: `
          In 99% of cases, it's recommended to keep a source of truth in a Tuple,
          rather than a Union (see Tuple to Union). The reason to avoid it is,
          because it's an expensive conversion, and it relies on a very fragile
          logic that may break at any TypeScript version. However, in 1% of cases,
          it's acceptable to use the utility type \`UnionToTuple\`, specifically
          when logic doesn't rely on the tuple order.
        `,
    },
    object: undefined,
    // TODO: Exclude, Extract, Permutations
    union: undefined,
    stringLiteral: undefined,
    // TODO: number of union elements
    numericLiteral: undefined,
  },
  stringLiteral: {
    array: undefined,
    // TODO: Split
    tuple: undefined,
    object: undefined,
    union: {
      code: `
          type CharUnionFrom<StringLiteral, Union = never> = StringLiteral extends \`$\{infer Char}$\{infer Tail}\`
              ? CharUnionFrom<Tail, Union | Char>
              : Union;
          type StringLiteral = 'world';
          type CharUnion = CharUnionFrom<StringLiteral>;
          //   ^? 'w' | 'o' | 'r' | 'l' | 'd'
        `,
      notes: [
        createTailRecursionEliminationNote({
          parameterType: "Union",
          utilityType: "CharUnionFrom",
        }),
      ],
      playgroundUrl: "https://tsplay.dev/mA63ZW",
    },
    // TODO: Trim, Uppercase, Lowercase, Capitalize, Uncapitalize, Replace, CamelCase (etc)
    stringLiteral: undefined,
    // TODO: ParseInt
    numericLiteral: {
      code: `
          type LengthFrom<StringLiteral, Tuple extends any[] = []> = StringLiteral extends \`$\{infer _}$\{infer Tail}\`
              ? LengthFrom<Tail, [...Tuple, any]>
              : Tuple['length'];
          type StringLiteral = 'world';
          type Length = LengthFrom<StringLiteral>;
          //   ^? 5
        `,
      notes: [
        createTailRecursionEliminationNote({
          parameterType: "Tuple",
          utilityType: "LengthFrom",
        }),
      ],
      playgroundUrl: "https://tsplay.dev/mpM27W",
    },
  },
  numericLiteral: {
    array: undefined,
    tuple: {
      code: `
          type Repeat<Value, NumericLiteral, Tuple extends Value[] = []> = Tuple['length'] extends NumericLiteral
              ? Tuple
              : Repeat<Value, NumericLiteral, [...Tuple, Value]>;
          type NumericPair = Repeat<number, 2>;
          //   ^? [number, number]
        `,
      notes: [
        createTailRecursionEliminationNote({
          parameterType: "Tuple",
          utilityType: "Repeat",
        }),
      ],
      playgroundUrl: "https://tsplay.dev/m3D8kW",
    },
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    // TODO: Brand
    numericLiteral: undefined,
  },
};
