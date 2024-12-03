import { getProgress } from "../utils/getProgress";
import { ProgressBar } from "./ProgressBar";
import styles from "./Intro.module.css";
import { roundTo1DecimalPlace } from "./roundTo1DecimalPlace";

const { missing, total } = getProgress();
const percent = roundTo1DecimalPlace(((total - missing) / total) * 100);

export const Intro = () => (
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
