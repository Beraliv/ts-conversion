import styles from "./ProgressBar.module.css";
import { roundTo1DecimalPlace } from "./roundTo1DecimalPlace";

interface ProgressBarProps {
  percent: number;
}

export const ProgressBar = ({ percent }: ProgressBarProps) => (
  <div>
    <sup>{roundTo1DecimalPlace(percent)}% completed</sup>
    <div className={styles.ProgressBar}>
      <div
        style={{
          width: `${percent}%`,
          backgroundColor: (() => {
            switch (true) {
              case percent < 50:
                return "#b4b91f";
              case percent < 75:
                return "#84c11b";
              case percent < 100:
                return "#0f5b0b";
            }
          })(),
        }}
      />
    </div>
  </div>
);
