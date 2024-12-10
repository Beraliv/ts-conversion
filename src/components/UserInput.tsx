import { useCallback, useContext } from "react";

import { UserInputContext } from "../contexts/UserInputContext";
import { Select } from "./Select";
import { inputs, InputType } from "../utils/inputs";
import { map } from "../utils/map";
import { toCamelCase } from "../utils/toCamelCase";
import { updateHistory } from "../utils/updateHistory";

import style from "./UserInput.module.css";

export const UserInput = () => {
  const { setSource, setTarget, source, target } = useContext(UserInputContext);

  const handleSourceChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextSource = event.target.value as InputType;
      setSource(nextSource);
      const updatedQuery = new URLSearchParams(window.location.search);
      updatedQuery.set("source", nextSource);
      updateHistory(updatedQuery);
    },
    [setSource]
  );

  const handleTargetChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextTarget = event.target.value as InputType;
      setTarget(nextTarget);
      const updatedQuery = new URLSearchParams(window.location.search);
      updatedQuery.set("target", nextTarget);
      updateHistory(updatedQuery);
    },
    [setTarget]
  );

  return (
    <div className={style.UserInput}>
      <Select
        value={source}
        label="Source"
        handleChange={handleSourceChange}
        options={inputs}
      />

      <Select
        value={target}
        label="Target"
        handleChange={handleTargetChange}
        options={inputs}
        isOptionDisabled={() => !source}
        getLabel={(input) => {
          if (
            source &&
            typeof map[source][input] === "object" &&
            map[source][input].label
          ) {
            return map[source][input].label;
          }

          return toCamelCase(input);
        }}
      />
    </div>
  );
};
