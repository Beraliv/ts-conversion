import { ArrayConversionNote } from "../components/ArrayConversionNote";
import { IndexAccessTypesNote } from "../components/IndexAccessTypesNote";
import { Link } from "../components/Link";
import { MessageProps } from "../components/Message";
import { AccumulatorParameterTypesNote } from "../notes/AccumulatorParameterTypesNote";
import { RecursiveConditionalTypesWarning } from "../warnings/RecursiveConditionalTypesWarning";
import { RecursiveConditionalTypesNote } from "../notes/RecursiveConditionalTypesNote";
import { TailRecursionEliminationNote } from "../notes/TailRecursionEliminationNote";
import { InputType } from "./inputs";
import { KeyRemappingNote } from "../notes/KeyRemappingNote";
import { ConditionalTypesNote } from "../notes/ConditionalTypesNote";

type MapConfigWithExample = {
  label?: string;
  code: string;
  Warning?: React.FunctionComponent;
  insights?: {
    Element: JSX.Element;
    type: MessageProps["type"];
  }[];
  playgroundUrl?: string;
};
type MapConfigWithoutExample = "empty";

type MapConfig = MapConfigWithExample | MapConfigWithoutExample;

// eslint-disable-next-line react-refresh/only-export-components
const DistributiveConditionalTypes = () => (
  <Link
    href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types"
    external
    text="distributive conditional types"
  />
);

// TODO: examples from real libraries
export const map: Record<InputType, Record<InputType, MapConfig>> = {
  array: {
    array: {
      code: `
        type GetPersonWithNames<ObjectType> = {
          [Key in keyof ObjectType as ObjectType[Key] extends ObjectType[] ? \`\${Key & string}Names\` : Key]: ObjectType[Key] extends Person[]
            ? string[]
            : ObjectType[Key];
        }

        type Person = {
          children: Person[];
          name: string;
          parents: Person[];
        }

        type PersonWithChildrenNames = GetPersonWithNames<Person>;
        //   ^? {childrenNames: string[]; name: string; parentsNames: string[]}
      `,
      playgroundUrl: "https://tsplay.dev/W4DAaW",
      insights: [
        {
          Element: (
            <>
              This technique is useful, when you have to update the existing
              type in multiple places (e.g. <code>children</code> and{" "}
              <code>parents</code> properties) and synchronise your changes with
              runtime logic.
            </>
          ),
          type: "note",
        },
        {
          Element: <KeyRemappingNote />,
          type: "note",
        },
      ],
    },
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
      insights: [
        {
          Element: (
            <>
              TypeScript 3.4 introduced the <code>as const</code> construct,
              called{" "}
              <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions">
                const assertions
              </a>
              . When working with array literals like <code>[1, 2, 3, 4]</code>,
              you can use const assertions to convert array literals into
              readonly tuples, such as <code>readonly [1, 2, 3, 4]</code>.
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              When passing array literals (e.g. <code>NumericArray</code>) as
              parameters of a function, <code>[...NumericArray]</code>{" "}
              transforms this to a tuple representation.
            </>
          ),
          type: "note",
        },
      ],
    },
    object: {
      code: `
        type ElementOf<ArrayType> = ArrayType extends readonly (infer Element)[]
          ? Element
          : never;

        type HasAge = ElementOf<readonly {age: number}[]>;
        //   ^? {age: number}
      `,
      playgroundUrl: "https://tsplay.dev/NaxJnw",
      insights: [
        {
          Element: <ConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <>
              <Link
                text="Conditional types"
                external
                href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html"
              />
              , provisioned with the <code>infer</code> keyword, allow engineer
              to infer another type in the "true" branch. For example, the
              utility type <code>ElementOf</code> returns an array element type{" "}
              <code>Element</code>.
            </>
          ),
          type: "note",
        },
      ],
    },
    union: {
      code: `
        type UnionFrom<Array extends unknown[]> = Array[number];
        type ArrayType = (number | string)[];
        type Union = UnionFrom<ArrayType>;
        //   ^? number | string
      `,
      playgroundUrl: "https://tsplay.dev/mqlBrN",
    },
    stringLiteral: "empty",
    numericLiteral: "empty",
  },
  tuple: {
    array: {
      code: `
        type ArrayFrom<Tuple extends readonly unknown[]> = Tuple[number][];

        type Tuple = [string, number];
        type ArrayFromType = ArrayFrom<Tuple>;
        //   ^? (string | number)[]

        const tuple: [string, number] = ['label', 2];
        type ArrayFromRuntimeCode = ArrayFrom<typeof tuple>;
        //   ^? (string | number)[]
      `,
      playgroundUrl: "https://tsplay.dev/m0DBxm",
      insights: [
        {
          Element: (
            <>
              Similarly to{" "}
              <Link
                href="/?source=tuple&target=union"
                text="Tuple to Union conversion"
              />
              , <IndexAccessTypesNote capital={false} /> All tuple's elements
              are accessible by numeric keys, so you can get them by using the
              syntax <code>[number]</code>. For example, for the tuple{" "}
              <code>Tuple</code>, it will be <code>Tuple[number]</code>.
            </>
          ),
          type: "note",
        },
      ],
    },
    // TODO: Pop, Push, Shift, Unshift, Flatten, MergeAll
    tuple: {
      code: `
        type InternalFilter<
          Tuple extends unknown[],
          What,
          Filtered extends unknown[] = []
        > = Tuple extends [infer Head, ...infer Tail]
          ? Head extends What
              ? InternalFilter<Tail, What, Filtered>
              : InternalFilter<Tail, What, [...Filtered, Head]>
          : Filtered;

        type Filter<Tuple extends unknown[], What> = InternalFilter<Tuple, What>;

        type WithoutNumbers = InternalFilter<[number, string], number>
        //   ^? [string]
      `,
      playgroundUrl: "https://tsplay.dev/WJPQ5N",
      insights: [
        {
          Element: <RecursiveConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <RecursiveConditionalTypesWarning
              baseCaseExample={
                <>
                  For example, an empty tuple when iterating over tuples, i.e.{" "}
                  <code>Tuple extends []</code>
                </>
              }
            />
          ),
          type: "warning",
        },
        {
          Element: (
            <TailRecursionEliminationNote
              props={[
                { parameterType: "Filtered", utilityType: "InternalFilter" },
              ]}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <AccumulatorParameterTypesNote
              internalUtilityType="InternalFilter"
              internalParameterTypes={3}
              publicUtilityType="Filter"
              publicParameterTypes={2}
            />
          ),
          type: "note",
        },
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
      insights: [
        {
          Element: (
            <>
              <Link
                href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content"
                external
                text="Mapped types"
              />{" "}
              are particularly useful for tuples, when the return type is
              expected to be an object. Object keys can be either tuple indices
              using <code>keyof Tuple</code> (e.g. <code>0</code> and{" "}
              <code>1</code>) or tuple elements using <code>Tuple[number]</code>{" "}
              (e.g. <code>"TypeScript"</code> and <code>"Python"</code>).
            </>
          ),
          type: "note",
        },
      ],
    },
    // TODO: Distribute Unions, e.g. [1 | 2, 3 | 4] => [1, 3] | [1, 4] | [2, 3] | [2, 4]
    union: {
      code: `
        type ValueOf<Tuple extends readonly unknown[]> = Tuple[number];

        type Tuple = [1, 2, 3];
        type UnionFromType = ValueOf<Tuple>;
        //   ^? 3 | 1 | 2

        const tuple = [1, 2, 3] as const;
        type UnionFromRuntimeCode = ValueOf<typeof tuple>;
        //   ^? 3 | 1 | 2
      `,
      playgroundUrl: "https://tsplay.dev/wQQ9Yw",
      insights: [
        {
          Element: (
            <>
              <IndexAccessTypesNote /> All tuple's elements are accessible by
              numeric keys, so you can get them by using the syntax{" "}
              <code>[number]</code>. For example, for the tuple{" "}
              <code>Tuple</code>, it will be <code>Tuple[number]</code>.
            </>
          ),
          type: "note",
        },
      ],
    },
    stringLiteral: "empty",
    numericLiteral: {
      code: `
        type LengthOf<Tuple extends {length: number}> = Tuple['length'];
        type Tuple = [1, 2, 3];
        type Length = LengthOf<Tuple>;
        //   ^? 3
      `,
      insights: [
        {
          Element: (
            <>
              <IndexAccessTypesNote /> As Tuples have a property called{" "}
              <code>length</code>, it's possible to use the syntax{" "}
              <code>['length']</code>. For example, for the tuple{" "}
              <code>Tuple</code>, it will be <code>Tuple['length']</code>.
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              One of differences between Arrays and Tuples is{" "}
              <code>length</code> property: it's numeric literal for Tuples
              (e.g. <code>3</code>), but <code>number</code> for Arrays.
            </>
          ),
          type: "note",
        },
      ],
      playgroundUrl: "https://tsplay.dev/w280rm",
    },
  },
  object: {
    array: {
      code: `
        type Person = {
          name: string;
        }

        const people: Person[] = [{name: 'Alexey'}, {name: 'Ksenia'}];
        //            ^^^^^^^^
      `,
      playgroundUrl: "https://tsplay.dev/mqlPjN",
      insights: [
        {
          Element: <ArrayConversionNote parameterType="Person" />,
          type: "note",
        },
      ],
    },
    tuple: {
      Warning: () => (
        <>
          In 99% of cases, it's recommended to keep a source of truth in a
          Tuple, rather than an Object (see{" "}
          <Link
            href="/?source=tuple&target=object"
            text="Tuple to Object conversion"
          />
          ). The reason to avoid it is, because it's an expensive conversion,
          and it relies on a very fragile logic that may break at any TypeScript
          version. However, in 1% of cases, it's acceptable to use the utility
          type <code>ObjectToTuple</code>, specifically when logic doesn't rely
          on the tuple order.
        </>
      ),
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

        type InternalObjectToTuple<
            ObjectType,
            What extends 'entries' | 'keys' | 'values',
            Accumulator extends unknown[] = [],
            UnionType extends string = keyof ObjectType & string,
        > = [UnionType] extends [never]
            ? Accumulator
            : LastOfUnion<UnionType> extends infer LastKey extends keyof ObjectType
            ? InternalObjectToTuple<
                Omit<ObjectType, LastKey>,
                What,
                [
                    What extends 'entries'
                        ? [LastKey, ObjectType[LastKey]]
                        : What extends 'values'
                            ? ObjectType[LastKey]
                            : LastKey
                    , 
                    ...Accumulator
                ]
            >
            : never;

        type ObjectToTuple<ObjectType, What extends 'entries' | 'keys' | 'values'> = InternalObjectToTuple<ObjectType, What>;

        type ObjectType = {locale: string, pageId: string};
        type Keys = ObjectToTuple<ObjectType, 'keys'>;
        //   ^? ['locale', 'pageId']
        type Values = ObjectToTuple<ObjectType, 'values'>;
        //   ^? [string, string]
        type Entries = ObjectToTuple<ObjectType, 'entries'>;
        //   ^? [['locale', string], ['pageId', string]]
      `,
      playgroundUrl: "https://tsplay.dev/NdxG6N",
      insights: [
        {
          Element: <RecursiveConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <RecursiveConditionalTypesWarning
              baseCaseExample={
                <>
                  For example, never when iterating over a union type, i.e.{" "}
                  <code>[UnionType] extends [never]</code>
                </>
              }
            />
          ),
          type: "warning",
        },
        {
          Element: (
            <TailRecursionEliminationNote
              props={[
                {
                  parameterType: "Accumulator",
                  utilityType: "InternalObjectToTuple",
                },
              ]}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <AccumulatorParameterTypesNote
              internalUtilityType="InternalObjectToTuple"
              internalParameterTypes={4}
              publicUtilityType="ObjectToTuple"
              publicParameterTypes={2}
            />
          ),
          type: "note",
        },
      ],
    },
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
      insights: [
        {
          Element: (
            <>
              <a href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content">
                Mapped types
              </a>{" "}
              are effective in converting an object to another object by
              modifying keys and values. The syntax is{" "}
              <code>[Key in keyof Object]: Type[Key]</code>, where{" "}
              <code>Key</code> is a property name and <code>Type[Key]</code> is
              the value by the correspondent property.
            </>
          ),
          type: "note",
        },
        {
          Element: <KeyRemappingNote />,
          type: "note",
        },
        {
          Element: (
            <>
              When defining an object (e.g.{" "}
              <code>
                type Person = {"{"}name: string{"}"}
              </code>
              ), the properties are required and writable by default. When you
              need to change this behaviour, use property modifiers: optional
              and readonly. Optional modifier is <code>?</code> (as in{" "}
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
          type: "note",
        },
        {
          Element: (
            <>
              In 2024, there is no mechanism to manage property modifiers
              conditionally (i.e. when property type is nullable, add optional
              modifier, otherwise use required property). Currently, it's
              mitigated by using multiple mapped types and then intersecting
              them (i.e. <code>A & B</code>). The relevant GitHub issue is{" "}
              <Link
                href="https://github.com/microsoft/TypeScript/issues/32562"
                external
                text="TypeScript#32562"
              />
            </>
          ),
          type: "warning",
        },
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
    stringLiteral: "empty",
    numericLiteral: "empty",
  },
  union: {
    array: {
      code: `
        type CreatePlayerMessage = {version: string};
        type LoadPlayerMessage = {startTime: number; sessionId: string};
        type HeartbeatMessage = {playingTime: number; sessionId: string}

        type Message =
          | CreatePlayerMessage
          | LoadPlayerMessage
          | HeartbeatMessage;

        const messageHistory: Message[] = [];
        //                    ^^^^^^^^^

        messageHistory.push({version: '1.0.0'});
        messageHistory.push({startTime: 3, sessionId: '123456789'});
        messageHistory.push({playingTime: 10, sessionId: '123456789'});
      `,
      playgroundUrl: "https://tsplay.dev/mA6eRW",
      insights: [
        {
          Element: <ArrayConversionNote parameterType="Message" />,
          type: "note",
        },
      ],
    },
    tuple: {
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
    },
    object: {
      label: "Object / Intersection",
      // TODO: Highlight that it's an Intersection of multiple objects
      code: `
        type UnionToIntersection<Union> = (Union extends any ? (arg: Union) => void : never) extends (
          arg: infer Intersection,
        ) => void
          ? Intersection
          : never;

        type Metadata = {pageUrl: string} | {videoId: string};

        type AllMetadata = UnionToIntersection<Metadata>;
        //   ^? {pageUrl: string} & {videoId: string}
      `,
      playgroundUrl: "https://tsplay.dev/WzV3eW",
      insights: [
        {
          Element: (
            <>
              TypeScript 2.8 introduced <DistributiveConditionalTypes />. Using
              constructs like <code>Union extends any</code>, it "iterates" over
              all union types, or "elements". For example, an instantiation{" "}
              <code>Union extends Filter ? never : Union</code> with the type
              parameter <code>A | B</code> for <code>Union</code> is resolved as{" "}
              <code>
                (A extends Filter ? never : A) | (B extends Filter ? never : B)
              </code>
              .
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              When working with <DistributiveConditionalTypes />, you may come
              across terms "Co-variance", "Contra-variance" and "In-variance".
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              The reason, <code>UnionToIntersection</code> infers an
              intersection, is that the second distributive conditional type
              uses <code>infer Intersection</code>. The type{" "}
              <code>Intersection</code> appears in a contra-variant position
              (i.e. a function parameter).
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              TL;dr - "Co-variance" preserves the direction of assignability. In
              more details: given there are variables{" "}
              <code>animal: Animal</code> and <code>dog: Dog</code> and
              functions <code>getAnimal: () {"=>"} Animal</code> and{" "}
              <code>getDog: () {"=>"} Dog</code>, because dog is assignable to
              animal (i.e. you can do <code>animal = dog</code>), extracting dog
              is also assignable to extracting animal (i.e. you can do{" "}
              <code>getAnimal = getDog</code>).
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              TL;dr - "Contra-variance" reverts the direction of assignability.
              In more details: given there are variables{" "}
              <code>animal: Animal</code> and <code>dog: Dog</code> and
              functions <code>walkAnimal: (animal: Animal) {"=>"} void</code>{" "}
              and <code>walkDog: (dog: Dog) {"=>"} void</code>, because dog is
              assignable to animal (i.e. you can do <code>animal = dog</code>),
              walking an animal is assignable to walking a dog (i.e. you can do{" "}
              <code>walkDog = walkAnimal</code>).
            </>
          ),
          type: "note",
        },
        {
          Element: (
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
          type: "note",
        },
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
      insights: [
        {
          Element: (
            <>
              TypeScript 2.8 introduced <DistributiveConditionalTypes />. Using
              constructs like <code>Union extends 'grass'</code>, it "iterates"
              over all union types, or "elements". For example, an instantiation{" "}
              <code>Union extends 'grass' ? Union : never</code> with the type
              parameter <code>'grass' | 'sky' | 'sun'</code> for{" "}
              <code>Union</code> is resolved as{" "}
              <code>
                ('grass' extends 'grass' ? 'grass' : never) | ('sky' extends
                'grass' ? 'sky' : never) | ('sun' extends 'grass' ? 'sun' :
                never)
              </code>
              equivalent to <code>'grass'</code>.
            </>
          ),
          type: "note",
        },
        {
          Element: (
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
              , already use distributive conditional types to update a union
              type.
            </>
          ),
          type: "note",
        },
      ],
    },
    stringLiteral: "empty",
    numericLiteral: "empty",
  },
  stringLiteral: {
    array: "empty",
    tuple: {
      code: `
        type InternalPath<StringLiteral, Tuple extends unknown[] = []> = StringLiteral extends \`\${infer Key}.\${infer Rest}\`
          ? InternalPath<Rest, [...Tuple, Key]>
          : StringLiteral extends \`$\{infer Key}\`
          ? [...Tuple, Key]
          : Tuple;

        type Path<StringLiteral extends string> = InternalPath<StringLiteral>;

        type Keys = Path<'address.postcode'>;
        //   ^? ['address', 'postcode']
      `,
      playgroundUrl: "https://tsplay.dev/wgxnvN",
      insights: [
        {
          Element: <ConditionalTypesNote />,
          type: "note",
        },
        {
          Element: <RecursiveConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <RecursiveConditionalTypesWarning
              baseCaseExample={
                <>
                  For example, an empty string when iterating over a string
                  literal, i.e. <code>StringLiteral extends ''</code>
                </>
              }
            />
          ),
          type: "warning",
        },
        {
          Element: (
            <TailRecursionEliminationNote
              props={[{ parameterType: "Tuple", utilityType: "InternalPath" }]}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <AccumulatorParameterTypesNote
              internalUtilityType="InternalPath"
              internalParameterTypes={2}
              publicUtilityType="Path"
              publicParameterTypes={1}
            />
          ),
          type: "note",
        },
      ],
    },
    // TODO: Query string parser, e.g. a=1&b=2&c=3 => {a: '1', b: '2', c: '3'}
    // TODO(usage): router (e.g. react-router)
    object: {
      code: `
        type InternalDynamicRoute<
          StringLiteral extends string,
          ObjectType extends  Record<string, string> = {}
        > = StringLiteral extends ''
          ? {[Key in keyof ObjectType]: ObjectType[Key]}
          : StringLiteral extends \`\${infer Key}/\${infer Rest}\`
            ? Key extends \`:\${infer Parameter}\`
              ? InternalDynamicRoute<Rest, ObjectType & Record<Parameter, string>>
              : InternalDynamicRoute<Rest, ObjectType>
            : InternalDynamicRoute<\`\${StringLiteral}/\`, ObjectType>;

        type DynamicRoute<StringLiteral extends string> = InternalDynamicRoute<StringLiteral>;

        type BlogPageIdParameters = DynamicRoute<'/blog/:locale/:pageId'>;
        //   ^? {locale: string; pageId: string}
      `,
      playgroundUrl: "https://tsplay.dev/N57poW",
      insights: [
        {
          Element: <RecursiveConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <RecursiveConditionalTypesWarning
              baseCaseExample={
                <>
                  For example, an empty string when iterating over a string
                  literal, i.e. <code>StringLiteral extends ''</code>
                </>
              }
            />
          ),
          type: "warning",
        },
        {
          Element: (
            <TailRecursionEliminationNote
              props={[
                {
                  parameterType: "ObjectType",
                  utilityType: "InternalDynamicRoute",
                },
              ]}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <AccumulatorParameterTypesNote
              internalUtilityType="InternalCharUnionFrom"
              internalParameterTypes={2}
              publicUtilityType="CharUnionFrom"
              publicParameterTypes={1}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <>
              When string literal is processed (i.e. <code>StringLiteral</code>{" "}
              is empty),{" "}
              <code>{"{[Key in keyof ObjectType]: ObjectType[Key]}"}</code>{" "}
              (called <code>Prettier</code>) is used for a more readable output.
              Without this line, you would see{" "}
              <code>
                {"Record<'locale', string> & Record<'pageId', string>"}
              </code>
              .
            </>
          ),
          type: "note",
        },
      ],
    },
    union: {
      code: `
        type InternalCharUnionFrom<StringLiteral, Union = never> = StringLiteral extends \`$\{infer Char}$\{infer Tail}\`
          ? InternalCharUnionFrom<Tail, Union | Char>
          : Union;

        type CharUnionFrom<StringLiteral extends string> = InternalCharUnionFrom<StringLiteral>;

        type StringLiteral = 'world';
        type CharUnion = CharUnionFrom<StringLiteral>;
        //   ^? 'w' | 'o' | 'r' | 'l' | 'd'
      `,
      playgroundUrl: "https://tsplay.dev/NnZxBN",
      insights: [
        {
          Element: <RecursiveConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <RecursiveConditionalTypesWarning
              baseCaseExample={
                <>
                  For example, an empty string when iterating over a string
                  literal, i.e. <code>StringLiteral extends ''</code>
                </>
              }
            />
          ),
          type: "warning",
        },
        {
          Element: (
            <TailRecursionEliminationNote
              props={[
                {
                  parameterType: "Union",
                  utilityType: "InternalCharUnionFrom",
                },
              ]}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <AccumulatorParameterTypesNote
              internalUtilityType="InternalCharUnionFrom"
              internalParameterTypes={2}
              publicUtilityType="CharUnionFrom"
              publicParameterTypes={1}
            />
          ),
          type: "note",
        },
      ],
    },
    // TODO: Trim, Replace, CamelCase (etc)
    stringLiteral: {
      code: `
        type ShakaError<StringLiteral extends string> = \`SHAKA-\${StringLiteral}\`
        type ShakaVideoError = ShakaError<'3016'>;
        //   ^? SHAKA-3016
      `,
      playgroundUrl: "https://tsplay.dev/NBrpkN",
      insights: [
        {
          Element: (
            <>
              There are 3 ways of converting a string literal to another string
              literal (from the simplest to the hardest):
              <ol>
                <li>
                  No iteration needed, as in the current example{" "}
                  <code>
                    `SHAKA-${"{"}StringLiteral{"}"}`
                  </code>
                </li>
                <li>
                  By iterating over sub-strings, e.g.{" "}
                  <code>
                    StringLiteral extends `${"{"}infer Key{"}"}.${"{"}infer Rest
                    {"}"}`
                  </code>
                  , i.e. jumping between "dots". See{" "}
                  <Link
                    href="/?source=stringLiteral&target=tuple"
                    text="String Literal to Tuple"
                  />
                  .
                </li>
                <li>
                  By iterating character by character, e.g.{" "}
                  <code>
                    StringLiteral extends `${"{"}infer Char{"}"}${"{"}infer Tail
                    {"}"}`
                  </code>
                  . See{" "}
                  <Link
                    href="/?source=stringLiteral&target=union"
                    text="String Literal to Union"
                  />
                  .
                </li>
              </ol>
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              There are 4 built-in utility types in TypeScript, that you can
              use:{" "}
              <Link
                href="https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype"
                external
                text="Uppercase"
              />
              ,{" "}
              <Link
                href="https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#lowercasestringtype"
                external
                text="Lowercase"
              />
              ,{" "}
              <Link
                href="https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#capitalizestringtype"
                external
                text="Capitalize"
              />{" "}
              and{" "}
              <Link
                href="https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uncapitalizestringtype"
                external
                text="Uncapitalize"
              />
            </>
          ),
          type: "note",
        },
      ],
    },
    numericLiteral: {
      code: `
        type InternalLengthFrom<StringLiteral, Tuple extends unknown[] = []> = StringLiteral extends \`$\{infer _}$\{infer Tail}\`
          ? InternalLengthFrom<Tail, [...Tuple, unknown]>
          : Tuple['length'];

        type LengthFrom<StringLiteral extends string> = InternalLengthFrom<StringLiteral>;

        type StringLiteral = 'world';
        type Length = LengthFrom<StringLiteral>;
        //   ^? 5
      `,
      playgroundUrl: "https://tsplay.dev/WyZM2w",
      insights: [
        {
          Element: <RecursiveConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <RecursiveConditionalTypesWarning
              baseCaseExample={
                <>
                  For example, an empty tuple when iterating over tuples, i.e.{" "}
                  <code>Tuple extends []</code>
                </>
              }
            />
          ),
          type: "warning",
        },
        {
          Element: (
            <TailRecursionEliminationNote
              props={[
                { parameterType: "Tuple", utilityType: "InternalLengthFrom" },
              ]}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <AccumulatorParameterTypesNote
              internalUtilityType="InternalLengthFrom"
              internalParameterTypes={2}
              publicUtilityType="LengthFrom"
              publicParameterTypes={1}
            />
          ),
          type: "note",
        },
      ],
    },
  },
  numericLiteral: {
    array: "empty",
    tuple: {
      code: `
        type InternalRepeat<
          Value,
          NumericLiteral,
          Tuple extends Value[] = []
        > = Tuple['length'] extends NumericLiteral
          ? Tuple
          : InternalRepeat<Value, NumericLiteral, [...Tuple, Value]>;

        type Repeat<Value, NumericLiteral extends number> = InternalRepeat<Value, NumericLiteral>;

        type NumericPair = Repeat<number, 2>;
        //   ^? [number, number]
      `,
      playgroundUrl: "https://tsplay.dev/NDQv1m",
      insights: [
        {
          Element: <RecursiveConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <RecursiveConditionalTypesWarning
              baseCaseExample={
                <>
                  For example, tuple length and numeric literal equality when
                  adding elements to a tuple, i.e.{" "}
                  <code>Tuple['length'] extends NumericLiteral</code>.
                </>
              }
            />
          ),
          type: "warning",
        },
        {
          Element: (
            <TailRecursionEliminationNote
              props={[
                { parameterType: "Tuple", utilityType: "InternalRepeat" },
              ]}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <AccumulatorParameterTypesNote
              internalUtilityType="InternalRepeat"
              internalParameterTypes={3}
              publicUtilityType="Repeat"
              publicParameterTypes={2}
            />
          ),
          type: "note",
        },
      ],
    },
    object: "empty",
    union: {
      code: `
        type OneTupleOf<NumericLiteral, Tuple extends unknown[] = []> = Tuple['length'] extends NumericLiteral
          ? Tuple
          : OneTupleOf<NumericLiteral, [...Tuple, 1]>;

        type InternalNumericRange<
          StartNumericLiteral,
          EndNumericLiteral,
          Tuple extends unknown[] = OneTupleOf<StartNumericLiteral>,
          Union = never,
          NextTuple extends unknown[] = [...Tuple, 1]
        > = StartNumericLiteral extends EndNumericLiteral
          ? Union | StartNumericLiteral
          : InternalNumericRange<NextTuple['length'], EndNumericLiteral, NextTuple, Union | StartNumericLiteral>;

        type NumericRange<StartNumericLiteral, EndNumericLiteral> = InternalNumericRange<StartNumericLiteral, EndNumericLiteral>;

        type Digit = InternalNumericRange<0, 9>;
        //   ^? 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
      `,
      playgroundUrl: "https://tsplay.dev/WKQ5yN",
      insights: [
        {
          Element: <RecursiveConditionalTypesNote />,
          type: "note",
        },
        {
          Element: (
            <RecursiveConditionalTypesWarning
              baseCaseExample={
                <>
                  For example, start and end number equality when iterating over
                  a numeric range, i.e.{" "}
                  <code>StartNumericLiteral extends EndNumericLiteral</code>.
                </>
              }
            />
          ),
          type: "warning",
        },
        {
          Element: (
            <TailRecursionEliminationNote
              props={[
                { parameterType: "Tuple", utilityType: "OneTupleOf" },
                { parameterType: "Tuple", utilityType: "InternalNumericRange" },
                { parameterType: "Union", utilityType: "InternalNumericRange" },
              ]}
            />
          ),
          type: "note",
        },
        {
          Element: (
            <AccumulatorParameterTypesNote
              internalUtilityType="InternalNumericRange"
              internalParameterTypes={5}
              publicUtilityType="NumericRange"
              publicParameterTypes={2}
            />
          ),
          type: "note",
        },
      ],
    },
    stringLiteral: "empty",
    numericLiteral: {
      code: `
        declare const __opaque__type__: unique symbol;

        type OpaqueType<BaseType, TagName> = BaseType & {
          readonly [__opaque__type__]: TagName;
        };

        type Seconds = OpaqueType<number, "seconds">;
        type Minutes = OpaqueType<number, "minutes">;

        declare let startTimeSeconds: Seconds;
        declare let leftMinutes: Minutes;

        // Type '"minutes"' is not assignable to type '"seconds"'
        startTimeSeconds = leftMinutes;
        //  Type '"seconds"' is not assignable to type '"minutes"'
        leftMinutes = startTimeSeconds;
      `,
      playgroundUrl: "https://tsplay.dev/mZRp9m",
      insights: [
        {
          Element: (
            <>
              An opaque type (also called nominal, brand or tagged type), is a
              common utility, implemented in{" "}
              <Link
                text="type-fest"
                external
                href="https://github.com/sindresorhus/type-fest/blob/main/source/tagged.d.ts"
              />
              ,{" "}
              <Link
                text="ts-essentials"
                external
                href="https://github.com/ts-essentials/ts-essentials/blob/master/lib/opaque/index.ts"
              />{" "}
              and other libraries.
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              As of 2024, TypeScript has no support of nominal (or
              non-structural) types. There is an open GitHub issue -
              <Link
                href="https://github.com/Microsoft/TypeScript/issues/202"
                external
                text="TypeScript#202"
              />
              , where engineers work on the proposal.
            </>
          ),
          type: "warning",
        },
      ],
    },
  },
};
