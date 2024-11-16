import { getProgress } from "../utils/getProgress";
import "./App.css";
import { ProgressBar } from "./ProgressBar";
import { TsConversion } from "./TsConversion";

function App() {
  const { current, total } = getProgress();
  const percent = (current / total) * 100;

  return (
    <>
      <div style={{ maxWidth: "42rem" }}>
        <h2>
          Converting types in TypeScript
          <sup className="ProgressData">
            {percent < 100 ? `in alpha` : "in beta"}
          </sup>
        </h2>
        {percent < 100 && <ProgressBar percent={percent} />}
        <p>
          Interactive website, helping engineers understand, how they can
          convert one type to another in TypeScript, with examples and links to
          TypeScript playground.
        </p>
        <TsConversion />
      </div>
    </>
  );
}

export default App;
