import SyntaxHighlighter from "react-syntax-highlighter";
import {
  tomorrow,
  tomorrowNightEighties,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useTheme } from "../utils/useTheme";
import { clampLines } from "../utils/clampLines";
import { useContext } from "react";
import { map } from "../utils/map";
import { Link } from "./Link";
import { UserInputContext } from "../contexts/UserInputContext";

import style from "./CodeExample.module.css";
import { conjunction } from "../utils/conjunction";

export const CodeExample = () => {
  const { source, target } = useContext(UserInputContext);
  const theme = useTheme();

  if (!source || !target || map[source][target] === "empty") {
    return null;
  }

  return (
    <div className={style.CodeExperience}>
      <div className={style.CodeContainer}>
        <SyntaxHighlighter
          language="typescript"
          style={theme === "dark" ? tomorrowNightEighties : tomorrow}
        >
          {clampLines(map[source][target].code)}
        </SyntaxHighlighter>
      </div>
      {map[source][target].playgroundUrl && (
        <div>
          <Link
            href={map[source][target].playgroundUrl}
            external
            text="Playground"
          />
        </div>
      )}
      {map[source][target].applications && (
        <div>
          <h3>Projects</h3>
          <span>Links to the libraries that already use this conversion</span>
          <br />
          {map[source][target].applications.map((application, index, array) => (
            <>
              <span>
                <Link
                  href={application.href}
                  external
                  text={application.text}
                />
              </span>
              {conjunction(index, array)}
            </>
          ))}
        </div>
      )}
    </div>
  );
};
