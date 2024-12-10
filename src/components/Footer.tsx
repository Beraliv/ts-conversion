import { Link } from "./Link";

import style from "./Footer.module.css";

export const Footer = () => (
  <footer className={style.Footer}>
    <p>
      Made with 🧡 to TS by{" "}
      <Link href="https://beraliv.com" text="beraliv" external />
    </p>
    <div>
      <Link
        href="https://github.com/Beraliv/ts-conversion"
        text="Contribute to GitHub"
        external
      />
    </div>
  </footer>
);
