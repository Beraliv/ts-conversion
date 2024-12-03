import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  percent: number;
}

export const ProgressBar = ({ percent }: ProgressBarProps) => (
  <div>
    <sup>{percent}% completed</sup>
    <div className={styles.ProgressBar}>
      <div
        className={styles.Progress}
        style={{
          width: `${percent}%`,
        }}
      />
    </div>
  </div>
);
