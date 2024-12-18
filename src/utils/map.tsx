import { Link } from "../components/Link";
import { MessageProps } from "../components/Message";
import { AccumulatorParameterTypesNote } from "../components/notes/AccumulatorParameterTypesNote";
import { ArrayConversionNote } from "../components/notes/ArrayConversionNote";
import { ConditionalTypesNote } from "../components/notes/ConditionalTypesNote";
import { IndexAccessTypesNote } from "../components/notes/IndexAccessTypesNote";
import { KeyRemappingNote } from "../components/notes/KeyRemappingNote";
import { RecursiveConditionalTypesNote } from "../components/notes/RecursiveConditionalTypesNote";
import { TailRecursionEliminationNote } from "../components/notes/TailRecursionEliminationNote";
import { RecursiveConditionalTypesWarning } from "../components/warnings/RecursiveConditionalTypesWarning";
import { InputType } from "./inputs";

type MapConfigWithExample = {
  label?: string;
  code: string;
  Concern?: React.FunctionComponent;
  insights?: {
    Element: JSX.Element;
    type: MessageProps["type"];
  }[];
  playgroundUrl?: string;
  applications: {
    library: string;
    breadcrumbs: {
      text: string;
      href: string;
    }[];
    githubStars?: number;
  }[];
};
type MapConfigWithoutExample = "empty";

type MapConfig = MapConfigWithExample | MapConfigWithoutExample;

const DistributiveConditionalTypes = () => (
  <Link
    href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types"
    external
    text="distributive conditional types"
  />
);

// TODO: applications from projects: xstate, lodash

// TODO: applications for examples: Opaque, Range, Repeat, Path, CamelCase,
// UnionToIntersection, LengthOf<Tuple>, ElementOf

// TODO: intrinsic types
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
      applications: [
        {
          library: "prisma",
          breadcrumbs: [
            {
              text: "Utils.PayloadToResult",
              href: "https://github.com/prisma/prisma/blob/8957496bd9b24c3ad49d998d51c3d52912aa90d7/packages/client/src/runtime/core/types/exported/Utils.ts#L99-L105",
            },
          ],
          githubStars: 40_100,
        },
      ],
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
      applications: [
        {
          library: "rxjs",
          breadcrumbs: [
            {
              text: "combineLatest",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/observable/combineLatest.ts#L26-L29",
            },
          ],
          githubStars: 30_900,
        },
      ],
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
      applications: [
        {
          library: "ts-pattern",
          breadcrumbs: [
            {
              text: "array",
              href: "https://github.com/gvergnaud/ts-pattern/blob/d3284224b47a4ac6f8ccdc244d01190312c7ab27/src/patterns.ts#L218-L221",
            },
            {
              text: "UnwrapArray",
              href: "https://github.com/gvergnaud/ts-pattern/blob/d3284224b47a4ac6f8ccdc244d01190312c7ab27/src/patterns.ts#L197",
            },
          ],
          githubStars: 12_600,
        },
      ],
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
      applications: [
        {
          library: "rxjs",
          breadcrumbs: [
            {
              text: "of",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/observable/of.ts#L15",
            },
            {
              text: "ValueFromArray",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/types.ts#L296",
            },
          ],
          githubStars: 30_900,
        },
      ],
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
      applications: [
        {
          library: "prisma",
          breadcrumbs: [
            {
              text: "build",
              href: "https://github.com/prisma/prisma/blob/37adb2dc0f3121d8e96aa2542db07943b4d40477/helpers/compile/build.ts#L170",
            },
            {
              text: "createBuildOptions",
              href: "https://github.com/prisma/prisma/blob/37adb2dc0f3121d8e96aa2542db07943b4d40477/helpers/compile/build.ts#L71",
            },
            {
              text: "flatten",
              href: "https://github.com/prisma/prisma/blob/906d265aacae8f08e177d8c807e91513f074f1f2/helpers/blaze/flatten.ts#L19",
            },
            {
              text: "Flatten",
              href: "https://github.com/prisma/prisma/blob/906d265aacae8f08e177d8c807e91513f074f1f2/helpers/blaze/flatten.ts#L23",
            },
          ],
          githubStars: 40_100,
        },
      ],
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
    // TODO: Mapped Type, e.g. rxjs, combineLatest > ObservableInputTuple
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
      applications: [
        {
          library: "prisma",
          breadcrumbs: [
            {
              text: "prisma.$transaction",
              href: "https://github.com/prisma/prisma/blob/94cd9dcede03b25fe1a28ee4fe3a1da117d86cdb/packages/client/scripts/default-index.d.ts#L60-L63",
            },
            {
              text: "Utils.UnwrapTuple",
              href: "https://github.com/prisma/prisma/blob/8957496bd9b24c3ad49d998d51c3d52912aa90d7/packages/client/src/runtime/core/types/exported/Utils.ts#L50",
            },
          ],
          githubStars: 40_100,
        },
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "Enum.exclude",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L4420-L4425",
            },
            {
              text: "FilterEnum",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L4316-L4322",
            },
          ],
          githubStars: 34_400,
        },
        {
          library: "rxjs",
          breadcrumbs: [
            {
              text: "combineLatestWith",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/operators/combineLatestWith.ts#L45-L47",
            },
            {
              text: "Cons",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/types.ts#L277",
            },
          ],
          githubStars: 30_900,
        },
        {
          library: "ts-pattern",
          breadcrumbs: [
            {
              text: "exhaustive",
              href: "https://github.com/gvergnaud/ts-pattern/blob/58bd6f6e8bebcf4bddfd3dd92b48b28c45f2030c/src/types/Match.ts#L194-L198",
            },
            {
              text: "DeepExcludeAll",
              href: "https://github.com/gvergnaud/ts-pattern/blob/58bd6f6e8bebcf4bddfd3dd92b48b28c45f2030c/src/types/Match.ts#L234-L238",
            },
          ],
          githubStars: 12_600,
        },
      ],
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
      applications: [
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "util.arrayToEnum",
              href: "https://github.com/colinhacks/zod/blob/d969423266fccee56ef769da6744cc8bacb04550/src/helpers/util.ts#L141-L162",
            },
          ],
          githubStars: 34_400,
        },
      ],
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
      applications: [
        {
          library: "prisma",
          breadcrumbs: [
            {
              text: "prisma.$transaction",
              href: "https://github.com/prisma/prisma/blob/94cd9dcede03b25fe1a28ee4fe3a1da117d86cdb/packages/client/scripts/default-index.d.ts#L56-L59",
            },
            {
              text: "ITXClientDenyList",
              href: "https://github.com/prisma/prisma/blob/94cd9dcede03b25fe1a28ee4fe3a1da117d86cdb/packages/client/src/runtime/core/types/exported/itxClientDenyList.ts#L5",
            },
          ],
          githubStars: 40_100,
        },
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "enum",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L5427",
            },
            {
              text: "createZodEnum",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L4326-L4333",
            },
            {
              text: "ZodEnum",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L4345-L4349",
            },
          ],
          githubStars: 34_400,
        },
      ],
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
    // TODO: Join, e.g. typeorm mongodb typings - https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L4062-L4068
    stringLiteral: "empty",
    numericLiteral: {
      code: `
        type LengthOf<Tuple extends {length: number}> = Tuple['length'];
        type Tuple = [1, 2, 3];
        type Length = LengthOf<Tuple>;
        //   ^? 3
      `,
      playgroundUrl: "https://tsplay.dev/w280rm",
      applications: [
        {
          library: "ts-pattern",
          breadcrumbs: [
            {
              text: "exhaustive",
              href: "https://github.com/gvergnaud/ts-pattern/blob/58bd6f6e8bebcf4bddfd3dd92b48b28c45f2030c/src/types/Match.ts#L194-L198",
            },
            {
              text: "DeepExcludeAll",
              href: "https://github.com/gvergnaud/ts-pattern/blob/58bd6f6e8bebcf4bddfd3dd92b48b28c45f2030c/src/types/Match.ts#L234-L238",
            },
            {
              text: "DeepExclude",
              href: "https://github.com/gvergnaud/ts-pattern/blob/27dbee0cdf35f2ee8350dc763dbaa5d475351c47/src/types/DeepExclude.ts#L3",
            },
            {
              text: "DistributeMatchingUnions",
              href: "https://github.com/gvergnaud/ts-pattern/blob/8d23bc49b19d9951a61832779c2eeb03d2971fdc/src/types/DistributeUnions.ts#L41-L43",
            },
            {
              text: "FindUnionsMany",
              href: "https://github.com/gvergnaud/ts-pattern/blob/8d23bc49b19d9951a61832779c2eeb03d2971fdc/src/types/DistributeUnions.ts#L46-L60",
            },
            {
              text: "FindUnions",
              href: "https://github.com/gvergnaud/ts-pattern/blob/8d23bc49b19d9951a61832779c2eeb03d2971fdc/src/types/DistributeUnions.ts#L80-L84",
            },
            {
              text: "Length",
              href: "https://github.com/gvergnaud/ts-pattern/blob/e1272af2796979d4b370aee8cc250e978a4c26b6/src/types/helpers.ts#L61",
            },
          ],
          githubStars: 12_600,
        },
      ],
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
      applications: [
        {
          library: "rxjs",
          breadcrumbs: [
            {
              text: "race",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/observable/race.ts#L61",
            },
            {
              text: "raceInit",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/observable/race.ts#L59",
            },
            {
              text: "subscriptions",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/observable/race.ts#L61",
            },
          ],
          githubStars: 30_900,
        },
      ],
      insights: [
        {
          Element: <ArrayConversionNote parameterType="Person" />,
          type: "note",
        },
      ],
    },
    tuple: {
      Concern: () => (
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
      applications: [
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "object",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L5440",
            },
            {
              text: "ZodObject.keyof",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L3017",
            },
            {
              text: "enumUtil.UnionToTupleString",
              href: "https://github.com/colinhacks/zod/blob/1d16205a84c90ee2f0903e171e40b53c5da906cf/src/helpers/enumUtil.ts#L18",
            },
          ],
          githubStars: 34_400,
        },
      ],
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
      applications: [
        {
          library: "jest",
          breadcrumbs: [
            {
              text: "jest.mocked",
              href: "https://github.com/jestjs/jest/blob/9c9ce8ad80c6719c3378dd0058c173830621a3ff/packages/jest-environment/src/index.ts#L223",
            },
            {
              text: "Mocked",
              href: "https://github.com/jestjs/jest/blob/c5a00aa33a15e040730422af107025e2f23786b6/packages/jest-mock/src/index.ts#L79-L85",
            },
            {
              text: "MockedObject",
              href: "https://github.com/jestjs/jest/blob/c5a00aa33a15e040730422af107025e2f23786b6/packages/jest-mock/src/index.ts#L61-L69",
            },
          ],
          githubStars: 44_300,
        },
        {
          library: "typeorm",
          breadcrumbs: [
            {
              text: "Repository.create",
              href: "https://github.com/typeorm/typeorm/blob/99d8249e450f7e649685105b372e265f41a0ee47/src/repository/Repository.ts#L114-L118",
            },
            {
              text: "DeepPartial",
              href: "https://github.com/typeorm/typeorm/blob/8ba742eb36586a21a918ed178208874a53ace3f9/src/common/DeepPartial.ts#L4-L14",
            },
          ],
          githubStars: 34_600,
        },
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "object",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L5440",
            },
            {
              text: "ZodObject.partial",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L2946-L2950",
            },
          ],
          githubStars: 34_400,
        },
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "object",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L5440",
            },
            {
              text: "ZodObject.required",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L2979-L2983",
            },
          ],
          githubStars: 34_400,
        },
      ],
      insights: [
        {
          Element: (
            <>
              <Link
                text="Mapped types"
                external
                href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html"
              />{" "}
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
          Element: (
            <>
              In TypeScript, homomorphic mapped types are those that take the
              form <code>{"{[Key in keyof Type (as ...)]: ...}"}</code>, where{" "}
              <code>Type</code> is type parameter which is transformed by a
              utility type, and <code>as ...</code> is an optional{" "}
              <Link
                href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types"
                external
                text="key remapping"
              />{" "}
              clause. More about homomorphic mapped types in TypeScript in{" "}
              <Link
                text="What the heck is a homomorphic mapped type?"
                external
                href="https://andreasimonecosta.dev/posts/what-the-heck-is-a-homomorphic-mapped-type/"
              />
            </>
          ),
          type: "note",
        },
        {
          Element: (
            <>
              When updating the structure of objects types with{" "}
              <Link
                text="Mapped types"
                external
                href="https://www.typescriptlang.org/docs/handbook/2/mapped-types.html"
              />
              , keep an eye on Homomorphism. <cite> </cite>
              If you'd like to keep the same structure (i.e. property modifiers,
              such as optional and readonly), use homomorphic mapped types.
              Otherwise, use <code>Record</code>, <code>Partial</code>,{" "}
              <code>Readonly</code>, etc. TypeScript examples of homomorphic and
              non-homomorphic mapped types in a{" "}
              <Link
                text="stack overflow answer"
                external
                href="https://stackoverflow.com/a/59791889/3745332"
              />
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
    // TODO: Path
    // TODO: add values: typeorm ServerType, e.g. (typeof ServerType)[keyof typeof ServerType]
    union: {
      code: `
        type KeysFrom<Object> = keyof Object;
        type Person = {name: string; age: number};
        type Characteristics = KeysFrom<Person> & string;
        //   ^? keyof Person (i.e. 'name' | 'age')
      `,
      playgroundUrl: "https://tsplay.dev/NBrXxN",
      applications: [
        {
          library: "typeorm",
          breadcrumbs: [
            {
              text: "Repository.average",
              href: "https://github.com/typeorm/typeorm/blob/99d8249e450f7e649685105b372e265f41a0ee47/src/repository/Repository.ts#L513-L516",
            },
            {
              text: "PickKeysByType",
              href: "https://github.com/typeorm/typeorm/blob/7d1f1d69588b771c5ec393c86976008a352ddcc0/src/common/PickKeysByType.ts#L4-L7",
            },
          ],
          githubStars: 34_600,
        },
        {
          library: "typeorm",
          breadcrumbs: [
            {
              text: "mongodb.max",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L3334-L3339",
            },
            {
              text: "StrictUpdateFilter",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L6241",
            },
            {
              text: "$max",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L6252",
            },
            {
              text: "StrictMatchKeysAndValues",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L6215C21-L6215C45",
            },
            {
              text: "NestedPaths",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L5306",
            },
          ],
          githubStars: 34_600,
        },
        {
          library: "dot-path-value",
          breadcrumbs: [
            {
              text: "getByPath",
              href: "https://github.com/g-makarov/dot-path-value/blob/7911b5e2b08c286698ef8d6441a47065bad91589/src/index.ts#L63",
            },
            {
              text: "Path",
              href: "https://github.com/g-makarov/dot-path-value/blob/7911b5e2b08c286698ef8d6441a47065bad91589/src/index.ts#L13-L21",
            },
          ],
          githubStars: 342,
        },
      ],
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
      applications: [
        {
          library: "jest",
          breadcrumbs: [
            {
              text: "jest.fn",
              href: "https://github.com/jestjs/jest/blob/c5a00aa33a15e040730422af107025e2f23786b6/packages/jest-mock/src/index.ts#L1082",
            },
            {
              text: "Mock",
              href: "https://github.com/jestjs/jest/blob/c5a00aa33a15e040730422af107025e2f23786b6/packages/jest-mock/src/index.ts#L123-L128",
            },
            {
              text: "MockInstance",
              href: "https://github.com/jestjs/jest/blob/c5a00aa33a15e040730422af107025e2f23786b6/packages/jest-mock/src/index.ts#L136",
            },
            {
              text: "mock",
              href: "https://github.com/jestjs/jest/blob/c5a00aa33a15e040730422af107025e2f23786b6/packages/jest-mock/src/index.ts#L142",
            },
            {
              text: "MockFunctionState",
              href: "https://github.com/jestjs/jest/blob/c5a00aa33a15e040730422af107025e2f23786b6/packages/jest-mock/src/index.ts#L207",
            },
            {
              text: "results",
              href: "https://github.com/jestjs/jest/blob/c5a00aa33a15e040730422af107025e2f23786b6/packages/jest-mock/src/index.ts#L233",
            },
          ],
          githubStars: 44_300,
        },
        {
          library: "prisma",
          breadcrumbs: [
            {
              text: "JsonArray",
              href: "https://github.com/prisma/prisma/blob/8957496bd9b24c3ad49d998d51c3d52912aa90d7/packages/client/src/runtime/core/types/exported/Json.ts#L12",
            },
          ],
          githubStars: 40_100,
        },
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "string",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L5451",
            },
            {
              text: "ZodString",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L773",
            },
            {
              text: "ZodStringDef",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L630-L631",
            },
            {
              text: "ZodStringCheck",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L587",
            },
          ],
          githubStars: 34_400,
        },
      ],
      insights: [
        {
          Element: <ArrayConversionNote parameterType="Message" />,
          type: "note",
        },
      ],
    },
    tuple: {
      Concern: () => (
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
      applications: [
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "object",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L5440",
            },
            {
              text: "ZodObject.keyof",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L3017",
            },
            {
              text: "enumUtil.UnionToTupleString",
              href: "https://github.com/colinhacks/zod/blob/1d16205a84c90ee2f0903e171e40b53c5da906cf/src/helpers/enumUtil.ts#L18",
            },
          ],
          githubStars: 34_400,
        },
      ],
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
      applications: [
        {
          library: "ts-pattern",
          breadcrumbs: [
            {
              text: "exhaustive",
              href: "https://github.com/gvergnaud/ts-pattern/blob/58bd6f6e8bebcf4bddfd3dd92b48b28c45f2030c/src/types/Match.ts#L194-L198",
            },
            {
              text: "DeepExcludeAll",
              href: "https://github.com/gvergnaud/ts-pattern/blob/58bd6f6e8bebcf4bddfd3dd92b48b28c45f2030c/src/types/Match.ts#L234-L238",
            },
            {
              text: "DeepExclude",
              href: "https://github.com/gvergnaud/ts-pattern/blob/27dbee0cdf35f2ee8350dc763dbaa5d475351c47/src/types/DeepExclude.ts#L3",
            },
            {
              text: "DistributeMatchingUnions",
              href: "https://github.com/gvergnaud/ts-pattern/blob/8d23bc49b19d9951a61832779c2eeb03d2971fdc/src/types/DistributeUnions.ts#L41-L43",
            },
            {
              text: "FindUnionsMany",
              href: "https://github.com/gvergnaud/ts-pattern/blob/8d23bc49b19d9951a61832779c2eeb03d2971fdc/src/types/DistributeUnions.ts#L46-L60",
            },
            {
              text: "FindUnions",
              href: "https://github.com/gvergnaud/ts-pattern/blob/8d23bc49b19d9951a61832779c2eeb03d2971fdc/src/types/DistributeUnions.ts#L80-L84",
            },
            {
              text: "IsUnion",
              href: "https://github.com/gvergnaud/ts-pattern/blob/e1272af2796979d4b370aee8cc250e978a4c26b6/src/types/helpers.ts#L31",
            },
            {
              text: "UnionToIntersection",
              href: "https://github.com/gvergnaud/ts-pattern/blob/e1272af2796979d4b370aee8cc250e978a4c26b6/src/types/helpers.ts#L25-L29",
            },
          ],
          githubStars: 12_600,
        },
      ],
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
      applications: [
        {
          library: "rxjs",
          breadcrumbs: [
            {
              text: "filter",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/operators/filter.ts#L7",
            },
            {
              text: "TruthyTypesOf",
              href: "https://github.com/ReactiveX/rxjs/blob/05894120a55e6339a29ee74ec6ae2ee593af5704/packages/rxjs/src/internal/types.ts#L316",
            },
          ],
          githubStars: 30_900,
        },
        {
          library: "@reduxjs/toolkit",
          breadcrumbs: [
            {
              text: "createReducer",
              href: "https://github.com/reduxjs/redux-toolkit/blob/770a39476a428ccc062ec47bda7a1e61d8d8bf1b/packages/toolkit/src/createReducer.ts#L140-L143",
            },
            {
              text: "NotFunction",
              href: "https://github.com/reduxjs/redux-toolkit/blob/770a39476a428ccc062ec47bda7a1e61d8d8bf1b/packages/toolkit/src/createReducer.ts#L66",
            },
          ],
          githubStars: 10_800,
        },
      ],
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
      applications: [
        {
          text: "type-fest Split",
          href: "https://github.com/sindresorhus/type-fest/blob/main/source/split.d.ts#L22-L29",
          githubStars: 14_500,
        },
      ],
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
      applications: [
        {
          text: "react-router useMatch",
          // TODO: useMatch(stringLiteral) > matchPath > PathMatch['params']
          href: "https://github.com/remix-run/react-router/blob/39630069d3780897eb04451e8d4f58b075b34462/packages/react-router/lib/hooks.tsx#L160-L163",
          githubStars: 53_400,
        },
      ],
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
      applications: [
        {
          text: "react-router useMatch",
          // TODO: useMatch(stringLiteral) > ParamParseKey > PathParam
          href: "https://github.com/remix-run/react-router/blob/39630069d3780897eb04451e8d4f58b075b34462/packages/react-router/lib/hooks.tsx#L160-L163",
          githubStars: 53_400,
        },
      ],
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
      applications: [
        {
          library: "prisma",
          breadcrumbs: [
            {
              text: "prisma.$extends",
              href: "https://github.com/prisma/prisma/blob/ce11a9080844bf91d0593ca17d0bfe724d79675c/packages/client/src/runtime/core/types/exported/Extensions.ts#L304",
            },
            {
              text: "ExtendsHook",
              href: "https://github.com/prisma/prisma/blob/ce11a9080844bf91d0593ca17d0bfe724d79675c/packages/client/src/runtime/core/types/exported/Extensions.ts#L321",
            },
            {
              text: "DynamicQueryExtensionArgs",
              href: "https://github.com/prisma/prisma/blob/ce11a9080844bf91d0593ca17d0bfe724d79675c/packages/client/src/runtime/core/types/exported/Extensions.ts#L56",
            },
            {
              text: "ModelKey",
              href: "https://github.com/prisma/prisma/blob/ce11a9080844bf91d0593ca17d0bfe724d79675c/packages/client/src/runtime/core/types/exported/Extensions.ts#L423-L425",
            },
          ],
          githubStars: 40_100,
        },
        {
          // createServerSideHelpers > CreateServerSideHelpersOptions > CreateSSGHelpersInternal > TransformerOptions > TransformerOptionNo > TypeError
          text: "trpc createServerSideHelpers",
          href: "https://github.com/trpc/trpc/blob/84e267ebb09195257a6b1e88dff237af929b3f7f/packages/react-query/src/server/ssgProxy.ts#L82-L84",
          githubStars: 35_300,
        },
        {
          // tracked > TrackedEnvelope > TrackedId
          text: "trpc tracked",
          href: "https://github.com/trpc/trpc/blob/84e267ebb09195257a6b1e88dff237af929b3f7f/packages/server/src/unstable-core-do-not-import/stream/tracked.ts#L35-L38",
          githubStars: 35_300,
        },
      ],
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
    // TODO: mark as non-practical
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
      applications: [
        {
          library: "ts-pattern",
          breadcrumbs: [
            {
              text: "exhaustive",
              href: "https://github.com/gvergnaud/ts-pattern/blob/58bd6f6e8bebcf4bddfd3dd92b48b28c45f2030c/src/types/Match.ts#L194-L198",
            },
            {
              text: "DeepExcludeAll",
              href: "https://github.com/gvergnaud/ts-pattern/blob/58bd6f6e8bebcf4bddfd3dd92b48b28c45f2030c/src/types/Match.ts#L234-L238",
            },
            {
              text: "DeepExclude",
              href: "https://github.com/gvergnaud/ts-pattern/blob/27dbee0cdf35f2ee8350dc763dbaa5d475351c47/src/types/DeepExclude.ts#L3",
            },
            {
              text: "DistributeMatchingUnions",
              href: "https://github.com/gvergnaud/ts-pattern/blob/8d23bc49b19d9951a61832779c2eeb03d2971fdc/src/types/DistributeUnions.ts#L41-L43",
            },
            {
              text: "BuildMany",
              href: "https://github.com/gvergnaud/ts-pattern/blob/c5778f3f9e8c0e9bcf05a1d14dda310977b57765/src/types/BuildMany.ts#L4-L6",
            },
            {
              text: "BuildOne",
              href: "https://github.com/gvergnaud/ts-pattern/blob/c5778f3f9e8c0e9bcf05a1d14dda310977b57765/src/types/BuildMany.ts#L11-L16",
            },
            {
              text: "SetDeep",
              href: "https://github.com/gvergnaud/ts-pattern/blob/c5778f3f9e8c0e9bcf05a1d14dda310977b57765/src/types/BuildMany.ts#L19-L40",
            },
            {
              text: "Iterator",
              href: "https://github.com/gvergnaud/ts-pattern/blob/e1272af2796979d4b370aee8cc250e978a4c26b6/src/types/helpers.ts#L63-L66",
            },
          ],
          githubStars: 12_600,
        },
      ],
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
      applications: [
        {
          library: "typeorm",
          breadcrumbs: [
            {
              text: "mongodb.max",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L3334-L3339",
            },
            {
              text: "StrictUpdateFilter",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L6241",
            },
            {
              text: "$max",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L6252",
            },
            {
              text: "StrictMatchKeysAndValues",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L6215C21-L6215C45",
            },
            {
              text: "NestedPaths",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L5306",
            },
            {
              text: "Depth",
              href: "https://github.com/typeorm/typeorm/blob/3647b269ccb1f236595bf8ff3adcca5460a0d205/src/driver/mongodb/typings.ts#L5326",
            },
          ],
          githubStars: 34_600,
        },
        {
          // squared > SquareUnit > MultiplyUnits > AddIntegers > AddPositiveIntegers > TupleOfSize
          text: "safe-units TupleOfSize",
          href: "https://github.com/jscheiny/safe-units/blob/b9a6617e2fa2fe763ed1b2a67a979db0537ae267/src/measure/exponentTypeArithmetic.ts#L37-L39",
          githubStars: 266,
        },
      ],
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
      applications: [
        {
          text: "type-fest IntRange",
          href: "https://github.com/sindresorhus/type-fest/blob/main/source/int-range.d.ts#L40-L55",
          githubStars: 14_500,
        },
      ],
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
      applications: [
        {
          library: "zod",
          breadcrumbs: [
            {
              text: "branded",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L532",
            },
            {
              text: "ZodBranded",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L5068-L5071",
            },
            {
              text: "BRAND",
              href: "https://github.com/colinhacks/zod/blob/4e219d6ad9d5e56e20afd7423092f506400a29e4/src/types.ts#L5063-L5066",
            },
          ],
          githubStars: 34_400,
        },
        {
          // squared > SquareUnit > MultiplyUnits > AddIntegers > Negative
          text: "safe-units Negative",
          href: "https://github.com/jscheiny/safe-units/blob/b9a6617e2fa2fe763ed1b2a67a979db0537ae267/src/measure/exponentTypeArithmetic.ts#L1-L9",
          githubStars: 266,
        },
        {
          // squared > SquareUnit > MultiplyUnits > AddIntegers
          text: "safe-units AddInteger",
          href: "https://github.com/jscheiny/safe-units/blob/b9a6617e2fa2fe763ed1b2a67a979db0537ae267/src/measure/exponentTypeArithmetic.ts#L11-L20",
          githubStars: 266,
        },
      ],
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
