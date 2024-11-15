import { useCallback, useState } from "react";
import { clampLines } from "../utils/clampLines";
import { ExternalIcon } from "./ExternalIcon";
import { Select } from "./Select";
import { Message } from "./Message";
import { inputs, InputType } from "../utils/inputs";
import { map } from "../utils/map";

const updateHistory = (params: URLSearchParams) => {
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
};

export const TsConversion = () => {
  const query = new URLSearchParams(window.location.search);

  const [source, setSource] = useState<InputType>(
    (query.get("source") as InputType) ?? undefined
  );
  const [target, setTarget] = useState<InputType>(
    (query.get("target") as InputType) ?? undefined
  );

  const handleSourceChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextSource = event.target.value as InputType;
      setSource(nextSource);
      const updatedQuery = new URLSearchParams(window.location.search);
      updatedQuery.set("source", nextSource);
      updateHistory(updatedQuery);
    },
    []
  );

  const handleTargetChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextTarget = event.target.value as InputType;
      setTarget(nextTarget);
      const updatedQuery = new URLSearchParams(window.location.search);
      updatedQuery.set("target", nextTarget);
      updateHistory(updatedQuery);
    },
    []
  );

  return (
    <div className="Conversion">
      <div className="UserInput">
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
          isOptionDisabled={(input) =>
            !source || (source && map[source][input] === undefined)
          }
        />
      </div>

      {source && target && map[source][target] && (
        <>
          {map[source][target].warning && (
            <Message text={map[source][target].warning} type="warning" />
          )}
          <pre>
            <code>{clampLines(map[source][target].code)}</code>
          </pre>
          {map[source][target].playgroundUrl && (
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={map[source][target].playgroundUrl}
              >
                <span>
                  Playground &#xFEFF;
                  <ExternalIcon />
                </span>
              </a>
            </div>
          )}
          {map[source][target].notes && (
            <div className="insights">
              <h3>Insights</h3>

              {map[source][target].notes.map((note, index) => (
                <Message key={index} text={note} type="note" />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
