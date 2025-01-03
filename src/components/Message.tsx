import { PropsWithChildren } from "react";

import { classNames } from "../utils/classNames";
import { NoteIcon } from "./icons/NoteIcon";
import { WarningIcon } from "./icons/WarningIcon";

import styles from "./Message.module.css";

export interface MessageProps {
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
      <div>
        {type === "warning" && <WarningIcon />}
        {type === "note" && <NoteIcon />}
      </div>
      <div>
        <div className={styles.MessageHeader}>
          <span>
            {type === "warning" && "Warning"}
            {type === "note" && "Note"}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};
