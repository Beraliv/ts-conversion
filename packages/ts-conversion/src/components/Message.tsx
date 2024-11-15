import { PropsWithChildren } from "react";
import { classNames } from "../utils/classNames";
import { NoteIcon } from "./NoteIcon";
import { WarningIcon } from "./WarningIcon";

interface MessageProps {
  type: "warning" | "note";
}

export const Message = ({
  children,
  type,
}: PropsWithChildren<MessageProps>) => {
  return (
    <div
      className={classNames("MessageContainer", {
        warning: type === "warning",
        note: type === "note",
      })}
    >
      <div className="MessageHeader">
        {type === "warning" && <WarningIcon />}
        {type === "note" && <NoteIcon />}
        <span>
          {type === "warning" && "Warning"}
          {type === "note" && "Note"}
        </span>
      </div>
      <p className="MessageBody">{children}</p>
    </div>
  );
};
