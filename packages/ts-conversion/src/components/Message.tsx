import { PropsWithChildren } from "react";
import { classNames } from "../utils/classNames";
import { NoteIcon } from "./NoteIcon";
import { WarningIcon } from "./WarningIcon";
import styles from "./Message.module.css";

interface MessageProps {
  type: "warning" | "note";
}

export const Message = ({
  children,
  type,
}: PropsWithChildren<MessageProps>) => {
  return (
    <div
      className={classNames(styles.MessageContainer, {
        [styles.warning]: type === "warning",
        [styles.note]: type === "note",
      })}
    >
      <div className={styles.MessageHeader}>
        {type === "warning" && <WarningIcon />}
        {type === "note" && <NoteIcon />}
        <span>
          {type === "warning" && "Warning"}
          {type === "note" && "Note"}
        </span>
      </div>
      <div className={styles.MessageBody}>{children}</div>
    </div>
  );
};
