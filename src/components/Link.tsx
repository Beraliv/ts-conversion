import { ExternalIcon } from "./icons/ExternalIcon";

import style from "./Link.module.css";

export type LinkProps = {
  className?: string;
  href: string;
  text: string | JSX.Element;
  external?: boolean;
};

export const Link = ({ className, href, text, external }: LinkProps) => {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a className={className} href={href} {...linkProps}>
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
