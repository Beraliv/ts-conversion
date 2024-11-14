import { clampLines } from "./clampLines";
import { classNames } from "./classNames";
import { NoteIcon } from "./NoteIcon";
import { WarningIcon } from "./WarningIcon";

interface MessageProps {
  type: "warning" | "note";
  text: string;
}

export const Message = ({ text, type }: MessageProps) => {
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
      <p className="MessageBody">{clampLines(text)}</p>
    </div>
  );
};
