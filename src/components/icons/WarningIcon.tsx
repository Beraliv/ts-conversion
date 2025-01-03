import { useTheme } from "../../utils/useTheme";

export const WarningIcon = () => {
  const theme = useTheme();
  const fill = theme === "light" ? "#E56910" : "#cfa88d";

  return (
    <svg width="24" height="24" fill={fill}>
      <path d="M13.5 4.3 21.9 19a1 1 0 0 1-.5 1.5l-.5.1H3a1.2 1.2 0 0 1-1-.5 1 1 0 0 1 0-1.1l8.4-14.6.6-.6a1.7 1.7 0 0 1 2.4.6ZM12 7.8a1.3 1.3 0 0 0-1 .4 1.2 1.2 0 0 0-.2 1l.6 4.1c0 .2 0 .3.2.4a.7.7 0 0 0 .8 0l.2-.4.6-4.1a1.2 1.2 0 0 0-.3-1 1.2 1.2 0 0 0-.9-.4Zm0 9.5c.3 0 .7 0 .9-.3a1.2 1.2 0 0 0 0-1.8 1.3 1.3 0 0 0-1.8 0 1.2 1.2 0 0 0 0 1.8c.2.2.6.3.9.3Z" />
    </svg>
  );
};
