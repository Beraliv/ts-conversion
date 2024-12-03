import { Link } from "./Link";

interface ArrayConversionNoteProps {
  parameterType: string;
}

export const ArrayConversionNote = ({
  parameterType,
}: ArrayConversionNoteProps) => (
  <>
    To convert any type to{" "}
    <Link
      href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays"
      external
      text="an array"
    />
    , you may use the syntax <code>{parameterType}[]</code> or the syntax{" "}
    <code>{`Array<${parameterType}>`}</code>
  </>
);
