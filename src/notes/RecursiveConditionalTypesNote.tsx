import { Link } from "../components/Link";

export const RecursiveConditionalTypesNote = () => (
  <>
    TypeScript 4.1 introduced{" "}
    <Link
      href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types"
      external
      text="recursive conditional types"
    />
    . They are type of conditional types, that can reference themselves within
    their branches.
  </>
);
