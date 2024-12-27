import styles from "./Intro.module.css";

export const Intro = () => (
  <div className={styles.Intro}>
    <h2>
      Converting types in TypeScript
      <sup className={styles.ProgressData}>beta</sup>
    </h2>
    <p>
      Interactive TypeScript tool: learn how to transform types effectively with
      hands-on examples, TypeScript Playground, and references to widely used
      libraries.
    </p>
  </div>
);
