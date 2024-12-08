import styles from "./Intro.module.css";

export const Intro = () => (
  <div className={styles.Intro}>
    <h2>
      Converting types in TypeScript
      <sup className={styles.ProgressData}>beta</sup>
    </h2>
    <p>
      Interactive website, helping engineers understand, how they can convert
      one type to another in TypeScript, with examples and links to TypeScript
      playground.
    </p>
  </div>
);
