import { useContext } from "react";

import { map } from "../utils/map";
import { Message } from "./Message";
import { UserInputContext } from "../contexts/UserInputContext";

import style from "./Insights.module.css";

export const Insights = () => {
  const { source, target } = useContext(UserInputContext);

  if (
    !source ||
    !target ||
    map[source][target] === "empty" ||
    !map[source][target].insights
  ) {
    return null;
  }

  return (
    <div className={style.Insights}>
      <h3>Insights</h3>

      {map[source][target].insights.map((insight, index) => (
        <Message key={index} type={insight.type}>
          {insight.Element}
        </Message>
      ))}
    </div>
  );
};
