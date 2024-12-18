import { useContext } from "react";
import { map } from "../utils/map";
import { UserInputContext } from "../contexts/UserInputContext";
import { Link } from "./Link";
import { conjunction } from "../utils/conjunction";
// import { ArrowIcon } from "./icons/ArrowIcon";

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
            {map[source][target].applications.map((application, i) => (
              <li key={i}>
                {application.library && (
                  <span>
                    {application.library}
                    {": "}
                  </span>
                )}
                <span>
                  {application.breadcrumbs &&
                    application.breadcrumbs.map(
                      (breadcrumb, j, breadcrumbs) => (
                        <>
                          <Link
                            href={breadcrumb.href}
                            external
                            text={breadcrumb.text}
                          />

                          {conjunction(j, breadcrumbs, {
                            last: "",
                            secondToLast: (
                              <>
                                {" "}
                                {/* <ArrowIcon /> */}
                                {">"}{" "}
                              </>
                            ),
                            others: (
                              <>
                                {" "}
                                {/* <ArrowIcon /> */}
                                {">"}{" "}
                              </>
                            ),
                          })}
                        </>
                      )
                    )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};
