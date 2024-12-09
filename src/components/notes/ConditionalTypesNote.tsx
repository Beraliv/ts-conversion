import { Link } from "../Link";

export const ConditionalTypesNote = () => (
  <>
    <Link
      text="Conditional types"
      external
      href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html"
    />{" "}
    allow engineers to check the assignability of one type to another type. If
    the type on the left side of <code>extends</code> is assignable to the type
    on the right side, then you'll get the type in the first (also called
    "true") branch. Otherwise, you'll get the type from the second (or "false")
    branch.
  </>
);
