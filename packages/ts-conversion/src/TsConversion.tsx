import { useCallback, useState } from "react";
import { ValueOf } from "./ValueOf";
import { clampLines } from "./clampLines";
import { ExternalIcon } from "./ExternalIcon";

const inputs = [
  "array",
  "tuple",
  "object",
  "union",
  "stringLiteral",
  "numericLiteral",
] as const;

type InputType = ValueOf<typeof inputs>;

type MapConfig = {
  code: string;
  playgroundUrl?: string;
};

const map: Record<InputType, Partial<Record<InputType, MapConfig>>> = {
  array: {
    array: undefined,
    tuple: undefined,
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
    tuple: undefined,
    object: undefined,
    union: {
      code: `
        type UnionFrom<Tuple extends readonly number[]> = Tuple[number];
        type Tuple = [1, 2, 3];
        type Union = UnionFrom<Tuple>;
        //   ^? 1 | 2 | 3
      `,
      playgroundUrl: "https://tsplay.dev/WoZ9gm",
    },
    stringLiteral: undefined,
    numericLiteral: {
      code: `
        type LengthOf<Tuple extends {length: number}> = Tuple['length'];
        type Tuple = [1, 2, 3];
        type Length = LengthOf<Tuple>;
        //   ^? 3
      `,
      playgroundUrl: "https://tsplay.dev/w280rm",
    },
  },
  object: {
    array: undefined,
    tuple: undefined,
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
    tuple: undefined,
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    // TODO: number of union elements
    numericLiteral: undefined,
  },
  stringLiteral: {
    array: undefined,
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
      playgroundUrl: "https://tsplay.dev/mA63ZW",
    },
    stringLiteral: undefined,
    numericLiteral: {
      code: `
        type LengthFrom<StringLiteral, Tuple extends any[] = []> = StringLiteral extends \`$\{infer _}$\{infer Tail}\`
            ? LengthFrom<Tail, [...Tuple, any]>
            : Tuple['length'];
        type StringLiteral = 'world';
        type Length = LengthFrom<StringLiteral>;
        //   ^? 5
      `,
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
      playgroundUrl: "https://tsplay.dev/m3D8kW",
    },
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
};

export const TsConversion = () => {
  const [source, setSource] = useState<InputType | undefined>(undefined);
  const [target, setTarget] = useState<InputType | undefined>(undefined);

  const handleSourceChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSource(event.target.value as InputType);
    },
    []
  );

  const handleTargetChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setTarget(event.target.value as InputType);
    },
    []
  );

  return (
    <div>
      <div className="row">
        <label>Source</label>
        <select onChange={handleSourceChange}>
          <option disabled hidden selected>
            Choose option:
          </option>
          {inputs.map((input) => (
            <option key={input} value={input}>
              {input}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        <label>Target</label>
        <select onChange={handleTargetChange}>
          <option disabled hidden selected>
            Choose option:
          </option>
          {inputs.map((input) => (
            <option
              key={input}
              disabled={!source || (source && map[source][input] === undefined)}
            >
              {input}
            </option>
          ))}
        </select>
      </div>
      {source && target && map[source][target] && (
        <>
          <pre>
            <code>{clampLines(map[source][target].code)}</code>
          </pre>
          {map[source][target].playgroundUrl && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={map[source][target].playgroundUrl}
            >
              <span>
                Playground &#xFEFF;
                <ExternalIcon />
              </span>
            </a>
          )}
        </>
      )}
    </div>
  );
};
