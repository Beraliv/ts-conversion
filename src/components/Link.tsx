import { ExternalIcon } from "./icons/ExternalIcon";

import style from "./Link.module.css";

export type LinkProps = {
  href: string;
  text: string;
  external?: boolean;
};

export const Link = ({ href, text, external }: LinkProps) => {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a href={href} {...linkProps}>
      {text}
      {external ? (
        <span className={style.LinkExternal}>
          &#xFEFF;
          <ExternalIcon />
        </span>
      ) : (
        ""
      )}
    </a>
  );
};
