import styles from "./Intro.module.css";
import { Link } from "./Link";

export const Intro = () => (
  <div className={styles.Intro}>
    <div className={styles.Title}>
      <Link
        className={styles.IconWrapper}
        text={<img className={styles.Icon} src="/favicon-64x64.png" />}
        href="/"
      />
      <h2>
        ts-conversion
        <sup className={styles.ProgressData}>beta</sup>
      </h2>
    </div>
    <p>
      Learn how to convert types effectively with hands-on examples, TypeScript
      Playground, and references to widely used libraries.
    </p>
  </div>
);
