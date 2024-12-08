import { Link } from "../components/Link";

export const RecursiveConditionalTypesWarning = () => (
  <>
    Please pay close attention to a recursion depth, when using{" "}
    <Link
      href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types"
      external
      text="recursive conditional types"
    />
    . When recursive depth limit is hit, TypeScript will throw a compile-time
    error (e.g.{" "}
    <code>Type instantiation is excessively deep and possibly infinite</code>).
    In this case, validate all the following scenarios:
    <ol>
      <li>
        Handle base case correctly. For example, an empty tuple when iterating
        over tuples, i.e. <code>Tuple extends []</code>
      </li>
      <li>
        Avoid too large union types. For example, instead of storing all
        integers, add a generic constraint to your API, i.e.{" "}
        <code>
          {"const setYear = <Year>(year: Integer<Year>): void => { ... }"}
        </code>
        . <Link href="https://tsplay.dev/weqgBw" external text="Full example" />
      </li>
      <li>
        Use tail-recursion elimination to avoid intermediate instantiations on
        conditional types. Read more about{" "}
        <Link
          href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types"
          external
          text="tail-recursion elimination"
        />
      </li>
      <li>
        Avoid eager evaluation of some types, e.g. arrays in{" "}
        <code>PartialRecursive</code> in type-fest. Read more about{" "}
        <Link
          text="TypeScript#35156 issue"
          external
          href="https://github.com/microsoft/TypeScript/issues/35156"
        />{" "}
        and{" "}
        <Link
          text="solution"
          external
          href="https://github.com/sindresorhus/type-fest/pull/296"
        />
        .
      </li>
    </ol>
  </>
);
