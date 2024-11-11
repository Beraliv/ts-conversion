import "./App.css";
import { TsConversion } from "./TsConversion";

function App() {
  return (
    <>
      <div style={{ maxWidth: "42rem" }}>
        <h2>Converting types in TypeScript</h2>
        <p>
          Interactive website, helping engineers understand, how they can
          convert one type to another in TypeScript, with examples and a link to
          TypeScript playground.
        </p>
        <TsConversion />
      </div>
    </>
  );
}

export default App;
