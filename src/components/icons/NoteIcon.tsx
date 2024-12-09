import { useTheme } from "../../utils/useTheme";

export const NoteIcon = () => {
  const theme = useTheme();
  const fill = theme === "light" ? "#8270DB" : "#a99de0";

  return (
    <svg width="24" height="24" fill={fill}>
      <path d="M7 2h10a2.5 2.5 0 0 1 2.5 2.5v15A2.5 2.5 0 0 1 17 22H7a2.5 2.5 0 0 1-2.5-2.5v-15A2.5 2.5 0 0 1 7 2Zm1.9 5a.6.6 0 0 0-.7.6V9a.6.6 0 0 0 .7.6H15a.6.6 0 0 0 .7-.6V7.6A.6.6 0 0 0 15 7H9Zm0 5a.6.6 0 0 0-.7.6V14a.6.6 0 0 0 .7.6h3.7a.6.6 0 0 0 .7-.6v-1.3a.6.6 0 0 0-.7-.6H9Z" />
    </svg>
  );
};
