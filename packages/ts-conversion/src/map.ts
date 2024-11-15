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
    tuple: {
      code: `
        const array = [1, 2, 3, 4];
        //    ^? number[]
        const readonlyTuple = [1, 2, 3, 4] as const;
        //    ^? readonly [1, 2, 3, 4]

        const toTuple = <NumericArray extends number[]>(tuple: [...NumericArray]) => tuple;
        const tuple = toTuple([1, 2, 3, 4]);
        //    ^? [1, 2, 3, 4]
      `,
      playgroundUrl: "https://tsplay.dev/WJPERN",
      notes: [
        `
          TypeScript 3.4 introduced the \`as const\` construct, called const assertions. When
          working with array literals like \`[1, 2, 3, 4]\`, you can use const assertions
          to convert array literals into readonly tuples, such as \`readonly [1, 2, 3, 4]\`.
        `,
        `
          When passing array literals (e.g. \`NumericArray\`) as parameters of a function,
          \`[...NumericArray]\` transforms this to a tuple representation.
        `,
      ],
    },
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
    // TODO: Pop, Push, Shift, Unshift, Flatten
    tuple: {
      code: `
        type Filter<Tuple extends unknown[], What, Filtered extends unknown[] = []> = Tuple extends [infer Head, ...infer Tail]
          ? Head extends What
            ? Filter<Tail, What, Filtered>
            : Filter<Tail, What, [...Filtered, Head]>
          : Filtered;

        type WithoutNumbers = Filter<[number, string], number>
        //   ^? [string]
      `,
      playgroundUrl: "https://tsplay.dev/weq7Xw",
      notes: [
        `
          TypeScript 4.1 introduced recursive conditional types, which are effective for iterating
          over tuples.
        `,
        createTailRecursionEliminationNote({
          parameterType: "Filtered",
          utilityType: "Filter",
        }),
      ],
    },
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
    object: {
      code: `
        type Person = {
          name: string;
        };

        type Create<Object> = {
          [Key in keyof Object as \`get$\{Capitalize<Key & string>}\`]: () => Object[Key];
        } & {
          [Key in keyof Object as \`set$\{Capitalize<Key & string>}\`]: (value: Object[Key]) => void;
        }

        type CreatePerson = Create<Person>;
        //   ^? {getName: () => string} & {setName: (value: string) => void}
      `,
      playgroundUrl: "https://tsplay.dev/W4Dq7W",
      notes: [
        `
          Mapped types are effective in converting an object to another object by modifying keys and values.
          The syntax is \`[Key in keyof Object]: Type[Key]\`, where \`Key\` is a property name and \`Type[Key]\`
          is the value by the correspondent property.
        `,
        `
          TypeScript 4.1 introduced key remapping, which simplifies changing the object keys.
          Use syntax \`as NewKey\` in \`[Key in keyof Type as NewKey]: Type[Key]\`
          to re-map the key to whatever value you need.
        `,
        `
          When defining an object (e.g. \`type Person = {name: string}\`), the properties are required and
          writable by default. When you need to change this behaviour, use property modifiers: optional and
          readonly. Optional modifier is \`?\` (as in \`type Person = {address?: Address}\`). Readonly
          modifier is \`readonly\` (as in \`type Person = {readonly name: string}\`).
        `,
      ],
    },
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
    object: {
      code: `
        type UnionToIntersection<Union> = (Union extends any ? (arg: Union) => void : never) extends (
          arg: infer Intersection,
        ) => void
          ? Intersection
          : never;

        type Metadata = { pageUrl: string } | { videoId: string };

        type AllMetadata = UnionToIntersection<Metadata>;
        //   ^? { pageUrl: string; videoId: string }
      `,
      playgroundUrl: "https://tsplay.dev/WkZ7Dm",
      notes: [
        `
          TypeScript 2.8 introduced Distributive conditional types. Using constructs like \`Union extends any\`,
          it "iterates" over all union types, or "elements". For example, an instantiation
          \`Union extends Filter ? never : Union\` with the type parameter \`A | B\` for \`Union\` is resolved as
          \`(A extends Filter ? never : A) | (B extends Filter ? never : B)\`.
        `,
        `
          When working with distributive conditional types, you may come across terms "Co-variance",
          "Contra-variance" and "In-variance".
        `,
        `
          The reason, \`UnionToIntersection\` infers an intersection, is that the second
          distributive conditional type uses \`infer Intersection\`. The type \`Intersection\`
          appears in a contra-variant position (i.e. a function parameter).
        `,
        `
          TL;dr - "Co-variance" preserves the direction of assignability. In more details:
          given there are variables \`animal: Animal\` and \`dog: Dog\` and functions
          \`getAnimal: () => Animal\` and \`getDog: () => Dog\`, because dog is assignable to animal
          (i.e. you can do \`animal = dog\`), extracting dog is also assignable to extracting animal
          (i.e. you can do \`getAnimal = getDog\`).
        `,
        `
          TL;dr - "Contra-variance" reverts the direction of assignability. In more details:
          given there are variables \`animal: Animal\` and \`dog: Dog\` and functions
          \`walkAnimal: (animal: Animal) => void\` and \`walkDog: (dog: Dog) => void\`,
          because dog is assignable to animal (i.e. you can do \`animal = dog\`),
          walking an animal is assignable to walking a dog (i.e. you can do \`walkDog = walkAnimal\`).
        `,
        `
          TL;dr - "In-variance" doesn't let assign both directions. In more details:
          given there are variables \`animal: Animal\` and \`dog: Dog\` and functions
          \`groomAnimal: (animal: Animal) => Animal\` and \`groomDog: (dog: Dog) => Dog\`,
          even though dog is assignable to animal (i.e. you can do \`animal = dog\`),
          grooming an animal and a dog are not assignable to each other.
        `,
      ],
    },
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
