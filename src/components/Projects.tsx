import { useContext } from "react";
import { map } from "../utils/map";
import { UserInputContext } from "../contexts/UserInputContext";
import { Link } from "./Link";

export const Projects = () => {
  const { source, target } = useContext(UserInputContext);

  if (!source || !target || map[source][target] === "empty") {
    return null;
  }

  return (
    <>
      {map[source][target].applications.length > 0 && (
        <div>
          <h3>Projects</h3>
          <span>Links to the libraries that already use this conversion:</span>
          <ol>
            {map[source][target].applications.map((application, index) => (
              <li key={index}>
                <span>
                  <Link
                    href={application.href}
                    external
                    text={application.text}
                  />
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};
