import { useCallback, useEffect, useState } from "react";
import { clampLines } from "../utils/clampLines";
import { Select } from "./Select";
import { Message } from "./Message";
import { inputs, InputType } from "../utils/inputs";
import { map } from "../utils/map";
import { Link } from "./Link";
import style from "./TsConversion.module.css";
import { toCamelCase } from "../utils/toCamelCase";

// eslint-disable-next-line prefer-const
let DEV_MODE = false;

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

  useEffect(() => {
    if (source && target) {
      if (DEV_MODE) {
        console.log("Page", { source, target });
      }
      plausible?.("Page", { props: { source, target } });
    }
  }, [source, target]);

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

  let Warning: React.FunctionComponent<{}> | undefined;

  return (
    <div className={style.Conversion}>
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

      {source && target && (
        <>
          {map[source][target] === "empty" ? (
            <div>
              <Message type="warning">
                <>
                  At the moment of writing, I wasn't able to find an application
                  for {toCamelCase(source)} to {toCamelCase(target)} conversion.
                  If you have a practical example, feel free to{" "}
                  <Link
                    href="https://github.com/Beraliv/beraliv.dev/issues"
                    text="raise an issue"
                    external
                  />
                  , I would be more than happy to re-consider my decision.
                </>
              </Message>
            </div>
          ) : (
            <>
              {(Warning = map[source][target].Warning) && (
                <div>
                  <Message type="warning">
                    <Warning />
                  </Message>
                </div>
              )}
              <div className={style.CodeExperience}>
                <pre>
                  <code>{clampLines(map[source][target].code)}</code>
                </pre>
                {map[source][target].playgroundUrl && (
                  <div>
                    <Link
                      href={map[source][target].playgroundUrl}
                      external
                      text="Playground"
                    />
                  </div>
                )}
              </div>
              {map[source][target].insights && (
                <div className={style.Insights}>
                  <h3>Insights</h3>

                  {map[source][target].insights.map((insight, index) => (
                    <Message key={index} type={insight.type}>
                      {insight.Element}
                    </Message>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
