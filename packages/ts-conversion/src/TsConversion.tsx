import { useCallback, useState } from "react";
import { clampLines } from "./clampLines";
import { ExternalIcon } from "./ExternalIcon";
import { Select } from "./Select";
import { Message } from "./Message";
import { inputs, InputType } from "./inputs";
import { map } from "./map";

export const TsConversion = () => {
  const [source, setSource] = useState<InputType | undefined>(undefined);
  const [target, setTarget] = useState<InputType | undefined>(undefined);

  const handleSourceChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSource(event.target.value as InputType);
    },
    []
  );

  const handleTargetChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setTarget(event.target.value as InputType);
    },
    []
  );

  return (
    <div className="Conversion">
      <div className="UserInput">
        <Select
          label="Source"
          handleChange={handleSourceChange}
          options={inputs}
        />

        <Select
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
            <div>
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
