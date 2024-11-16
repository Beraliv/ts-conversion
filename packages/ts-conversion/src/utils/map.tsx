import { Link } from "../components/Link";
import { TailRecursionEliminationNote } from "../components/TailRecursionEliminationNote";
import { InputType } from "./inputs";

type MapConfig = {
  code: string;
  Warning?: React.FunctionComponent;
  Notes?: React.FunctionComponent[];
  playgroundUrl?: string;
};

// eslint-disable-next-line react-refresh/only-export-components
const DistributiveConditionTypes = () => (
  <Link
    href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types"
    external
    text="distributive conditional types"
  />
);

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
      Notes: [
        () => (
          <>
            TypeScript 3.4 introduced the <code>as const</code> construct,
            called{" "}
            <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions">
              const assertions
            </a>
            . When working with array literals like <code>[1, 2, 3, 4]</code>,
            you can use const assertions to convert array literals into readonly
            tuples, such as <code>readonly [1, 2, 3, 4]</code>.
          </>
        ),
        () => (
          <>
            When passing array literals (e.g. <code>NumericArray</code>) as
            parameters of a function, <code>[...NumericArray]</code> transforms
            this to a tuple representation.
          </>
        ),
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
      Notes: [
        () => (
          <>
            TypeScript 4.1 introduced{" "}
            <Link
              href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types"
              external
              text="recursive conditional types"
            />
            , which are effective for iterating over tuples.
          </>
        ),
        () => (
          <TailRecursionEliminationNote
            parameterType="Filtered"
            utilityType="Filter"
          />
        ),
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
      Notes: [
        () => (
          <>
            <Link
              href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content"
              external
              text="Mapped types"
            />{" "}
            are particularly useful for tuples, when the return type is expected
            to be an object. Object keys can be either tuple indices using{" "}
            <code>keyof Tuple</code> (e.g. <code>0</code> and <code>1</code>) or
            tuple elements using <code>Tuple[number]</code> (e.g.{" "}
            <code>"TypeScript"</code> and <code>"Python"</code>).
          </>
        ),
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
      Notes: [
        () => (
          <>
            One of differences between Arrays and Tuples is <code>length</code>{" "}
            property: it's numeric literal for Tuples (e.g. <code>3</code>), but{" "}
            <code>number</code> for Arrays.
          </>
        ),
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
      Notes: [
        () => (
          <>
            <a href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content">
              Mapped types
            </a>{" "}
            are effective in converting an object to another object by modifying
            keys and values. The syntax is{" "}
            <code>[Key in keyof Object]: Type[Key]</code>, where{" "}
            <code>Key</code> is a property name and <code>Type[Key]</code> is
            the value by the correspondent property.
          </>
        ),
        () => (
          <>
            TypeScript 4.1 introduced{" "}
            <Link
              href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types"
              external
              text="key remapping"
            />
            , which simplifies changing the object keys. Use syntax{" "}
            <code>as NewKey</code> in{" "}
            <code>[Key in keyof Type as NewKey]: Type[Key]</code> to re-map the
            key to whatever value you need.
          </>
        ),
        () => (
          <>
            When defining an object (e.g.{" "}
            <code>
              type Person = {"{"}name: string{"}"}
            </code>
            ), the properties are required and writable by default. When you
            need to change this behaviour, use property modifiers: optional and
            readonly. Optional modifier is <code>?</code> (as in{" "}
            <code>
              type Person = {"{"}address?: Address{"}"}
            </code>
            ). Readonly modifier is <code>readonly</code> (as in{" "}
            <code>
              type Person = {"{"}readonly name: string{"}"}
            </code>
            ).
          </>
        ),
        () => (
          <>
            In 2024, there is no mechanism to manage property modifiers
            conditionally (i.e. when property type is nullable, add optional
            modifier, otherwise use required property). Currently, it's
            mitigated by using multiple mapped types and then intersecting them
            (i.e. <code>A & B</code>). The relevant GitHub issue is{" "}
            <Link
              href="https://github.com/microsoft/TypeScript/issues/32562"
              external
              text="TypeScript#32562"
            />
          </>
        ),
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
      Warning: () => (
        <>
          In 99% of cases, it's recommended to keep a source of truth in a
          Tuple, rather than a Union (see{" "}
          <Link
            href="/?source=tuple&target=union"
            text="Tuple to Union conversion"
          />
          ). The reason to avoid it is, because it's an expensive conversion,
          and it relies on a very fragile logic that may break at any TypeScript
          version. However, in 1% of cases, it's acceptable to use the utility
          type <code>UnionToTuple</code>, specifically when logic doesn't rely
          on the tuple order.
        </>
      ),
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
      Notes: [
        () => (
          <>
            TypeScript 2.8 introduced{" "}
            <Link
              href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types"
              external
              text="distributive conditional types"
            />
            . Using constructs like <code>Union extends any</code>, it
            "iterates" over all union types, or "elements". For example, an
            instantiation <code>Union extends Filter ? never : Union</code> with
            the type parameter <code>A | B</code> for <code>Union</code> is
            resolved as{" "}
            <code>
              (A extends Filter ? never : A) | (B extends Filter ? never : B)
            </code>
            .
          </>
        ),
        () => (
          <>
            When working with <DistributiveConditionTypes />, you may come
            across terms "Co-variance", "Contra-variance" and "In-variance".
          </>
        ),
        () => (
          <>
            The reason, <code>UnionToIntersection</code> infers an intersection,
            is that the second distributive conditional type uses{" "}
            <code>infer Intersection</code>. The type <code>Intersection</code>{" "}
            appears in a contra-variant position (i.e. a function parameter).
          </>
        ),
        () => (
          <>
            TL;dr - "Co-variance" preserves the direction of assignability. In
            more details: given there are variables <code>animal: Animal</code>{" "}
            and <code>dog: Dog</code> and functions{" "}
            <code>getAnimal: () {"=>"} Animal</code> and{" "}
            <code>getDog: () {"=>"} Dog</code>, because dog is assignable to
            animal (i.e. you can do <code>animal = dog</code>), extracting dog
            is also assignable to extracting animal (i.e. you can do{" "}
            <code>getAnimal = getDog</code>).
          </>
        ),
        () => (
          <>
            TL;dr - "Contra-variance" reverts the direction of assignability. In
            more details: given there are variables <code>animal: Animal</code>{" "}
            and <code>dog: Dog</code> and functions{" "}
            <code>walkAnimal: (animal: Animal) {"=>"} void</code> and{" "}
            <code>walkDog: (dog: Dog) {"=>"} void</code>, because dog is
            assignable to animal (i.e. you can do <code>animal = dog</code>),
            walking an animal is assignable to walking a dog (i.e. you can do{" "}
            <code>walkDog = walkAnimal</code>).
          </>
        ),
        () => (
          <>
            TL;dr - "In-variance" doesn't let assign both directions. In more
            details: given there are variables <code>animal: Animal</code> and{" "}
            <code>dog: Dog</code> and functions{" "}
            <code>groomAnimal: (animal: Animal) {"=>"} Animal</code> and{" "}
            <code>groomDog: (dog: Dog) {"=>"} Dog</code>, even though dog is
            assignable to animal (i.e. you can do <code>animal = dog</code>),
            grooming an animal and a dog are not assignable to each other.
          </>
        ),
      ],
    },
    // TODO: Permutations
    union: {
      code: `        
        type Green<Union> = Union extends 'grass' ? Union : never;
        type ObjectName = 'grass' | 'sky' | 'sun';
        type GreenObjectName = Green<ObjectName>;
        //   ^? 'grass'
      `,
      playgroundUrl: "https://tsplay.dev/w28Yjm",
      Notes: [
        () => (
          <>
            TypeScript 2.8 introduced <DistributiveConditionTypes />. Using
            constructs like <code>Union extends 'grass'</code>, it "iterates"
            over all union types, or "elements". For example, an instantiation{" "}
            <code>Union extends 'grass' ? Union : never</code> with the type
            parameter <code>'grass' | 'sky' | 'sun'</code> for{" "}
            <code>Union</code> is resolved as{" "}
            <code>
              ('grass' extends 'grass' ? 'grass' : never) | ('sky' extends
              'grass' ? 'sky' : never) | ('sun' extends 'grass' ? 'sun' : never)
            </code>
            equivalent to <code>'grass'</code>.
          </>
        ),
        () => (
          <>
            Some built-in types, such as{" "}
            <Link
              href="https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers"
              external
              text="Exclude"
            />{" "}
            and{" "}
            <Link
              href="https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union"
              external
              text="Extract"
            />
            , already use distributive conditional types to update a union type.
          </>
        ),
      ],
    },
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
      Notes: [
        () => (
          <TailRecursionEliminationNote
            parameterType="Union"
            utilityType="CharUnionFrom"
          />
        ),
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
      Notes: [
        () => (
          <TailRecursionEliminationNote
            parameterType="Tuple"
            utilityType="LengthFrom"
          />
        ),
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
      Notes: [
        () => (
          <TailRecursionEliminationNote
            parameterType="Tuple"
            utilityType="Repeat"
          />
        ),
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
