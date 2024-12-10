import { useContext } from "react";
import { Message } from "./Message";
import { toCamelCase } from "../utils/toCamelCase";
import { Link } from "./Link";
import { UserInputContext } from "../contexts/UserInputContext";
import { map } from "../utils/map";

export const NoExampleWarning = () => {
  const { source, target } = useContext(UserInputContext);

  if (!source || !target || map[source][target] !== "empty") {
    return null;
  }

  return (
    <div>
      <Message type="warning">
        <>
          At the moment of writing, I wasn't able to find an application for{" "}
          {toCamelCase(source)} to {toCamelCase(target)} conversion. If you have
          a practical example, feel free to{" "}
          <Link
            href="https://github.com/Beraliv/ts-conversion/issues"
            text="raise an issue"
            external
          />
          , I would be more than happy to re-consider my decision.
        </>
      </Message>
    </div>
  );
};
