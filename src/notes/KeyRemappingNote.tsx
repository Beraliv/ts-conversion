import { Link } from "../components/Link";

export const KeyRemappingNote = () => (
  <>
    TypeScript 4.1 introduced{" "}
    <Link
      href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types"
      external
      text="key remapping"
    />
    , which simplifies changing the object keys. Use syntax{" "}
    <code>as NewKey</code> in{" "}
    <code>[Key in keyof Type as NewKey]: Type[Key]</code> to re-map the key to
    whatever value you need.
  </>
);
