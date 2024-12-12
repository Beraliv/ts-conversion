import { conjunction } from "../../utils/conjunction";
import { Link } from "../Link";

interface TailRecursionEliminationNoteProps {
  props: { parameterType: string; utilityType: string }[];
}

export const TailRecursionEliminationNote = ({
  props,
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
    <>
      {props.map(({ parameterType, utilityType }, index) => (
        <span key={index}>
          <code>{parameterType}</code> in <code>{utilityType}</code>
          {conjunction(index, props)}
        </span>
      ))}
    </>
    .
  </>
);
