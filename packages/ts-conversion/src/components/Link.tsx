import { ExternalIcon } from "./ExternalIcon";

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
        <span className="linkExternal">
          &#xFEFF;
          <ExternalIcon />
        </span>
      ) : (
        ""
      )}
    </a>
  );
};
