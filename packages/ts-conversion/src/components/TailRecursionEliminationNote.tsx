import { Link } from "./Link";

interface TailRecursionEliminationNoteProps {
  parameterType: string;
  utilityType: string;
}

export const TailRecursionEliminationNote = ({
  parameterType,
  utilityType,
}: TailRecursionEliminationNoteProps) => (
  <>
    TypeScript 4.5 introduced a{" "}
    <Link
      href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types"
      external
      text="tail-recursion elimination"
    />{" "}
    to optimise conditional types, which avoid intermediate instantiations.
    Therefore, it's recommended to use accumulator parameter types, such as{" "}
    <code>{parameterType}</code> in <code>{utilityType}</code>.
  </>
);
