import { getProgress } from "../utils/getProgress";
import { ProgressBar } from "./ProgressBar";
import styles from "./Intro.module.css";

export const Intro = () => {
  const { current, total } = getProgress();
  const percent = (current / total) * 100;

  return (
    <div className={styles.Intro}>
      <h2>
        Converting types in TypeScript
        <sup className={styles.ProgressData}>
          {percent < 100 ? "alpha" : "beta"}
        </sup>
      </h2>
      {percent < 100 && <ProgressBar percent={percent} />}
      <p>
        Interactive website, helping engineers understand, how they can convert
        one type to another in TypeScript, with examples and links to TypeScript
        playground.
      </p>
    </div>
  );
};
