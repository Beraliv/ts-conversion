import { UserInputContextProvider } from "../contexts/UserInputContext";
import { useTrackPage } from "../utils/useTrackPage";
import { CodeExample } from "./CodeExample";
import { Concern } from "./Concern";
import { Footer } from "./Footer";
import { Insights } from "./Insights";
import { Intro } from "./Intro";
import { NoExampleWarning } from "./NoExampleWarning";
import { UserInput } from "./UserInput";

import style from "./App.module.css";
import { Projects } from "./Projects";

function App() {
  useTrackPage();

  return (
    <div className={style.App}>
      <Intro />
      <UserInputContextProvider>
        <div className={style.Conversion}>
          <UserInput />
          {/* if map[source][target] === "empty" */}
          <>
            <NoExampleWarning />
          </>
          {/* else */}
          <>
            <Concern />
            <CodeExample />
            <Projects />
            <Insights />
          </>
        </div>
      </UserInputContextProvider>
      <Footer />
    </div>
  );
}

export default App;
