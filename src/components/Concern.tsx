import { useContext } from "react";
import { map } from "../utils/map";
import { Message } from "./Message";
import { UserInputContext } from "../contexts/UserInputContext";

export const Concern = () => {
  const { source, target } = useContext(UserInputContext);

  if (!source || !target || map[source][target] === "empty") {
    return null;
  }

  const Concern = map[source][target].Concern;

  if (!Concern) {
    return null;
  }

  return (
    <div>
      <Message type="warning">
        <Concern />
      </Message>
    </div>
  );
};
