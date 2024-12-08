import style from "./App.module.css";
import { Footer } from "./Footer";
import { Intro } from "./Intro";
import { TsConversion } from "./TsConversion";

function App() {
  return (
    <div className={style.App}>
      <Intro />
      <TsConversion />
      <Footer />
    </div>
  );
}

export default App;
