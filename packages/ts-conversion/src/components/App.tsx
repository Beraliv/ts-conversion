import style from "./App.module.css";
import { Intro } from "./Intro";
import { TsConversion } from "./TsConversion";

function App() {
  return (
    <div className={style.App}>
      <Intro />
      <TsConversion />
    </div>
  );
}

export default App;
