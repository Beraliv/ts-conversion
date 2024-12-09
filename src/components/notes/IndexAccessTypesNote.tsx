import { Link } from "../Link";

interface IndexAccessTypesNoteProps {
  capital?: boolean;
}

export const IndexAccessTypesNote = ({
  capital = true,
}: IndexAccessTypesNoteProps) => (
  <>
    {capital ? "Engineers" : "engineers"} can use{" "}
    <Link
      href="https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html"
      external
      text="Indexed Access types"
    />{" "}
    to access a specific property on another type.
  </>
);
