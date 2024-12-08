interface AccumulatorParameterTypesNoteProps {
  internalUtilityType: string;
  internalParameterTypes: number;
  publicUtilityType: string;
  publicParameterTypes: number;
}

export const AccumulatorParameterTypesNote = ({
  internalUtilityType,
  internalParameterTypes,
  publicUtilityType,
  publicParameterTypes,
}: AccumulatorParameterTypesNoteProps) => (
  <>
    When using accumulator parameter types, it's useful to separate internal
    utility types from utility types that user will use. For example,{" "}
    <code>{internalUtilityType}</code> will accept {internalParameterTypes}{" "}
    parameter types, while <code>{publicUtilityType}</code> will use only{" "}
    {publicParameterTypes} parameter types that user needs.
  </>
);
