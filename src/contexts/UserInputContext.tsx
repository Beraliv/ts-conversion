import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from "react";
import { InputType } from "../utils/inputs";
import { noop } from "../utils/noop";

interface UserInputContextType {
  setSource: ReturnType<typeof useState<InputType | undefined>>[1];
  setTarget: ReturnType<typeof useState<InputType | undefined>>[1];
  source: InputType | undefined;
  target: InputType | undefined;
}

export const UserInputContext = createContext<UserInputContextType>({
  setSource: noop,
  setTarget: noop,
  source: undefined,
  target: undefined,
});

export const UserInputContextProvider: FunctionComponent<
  PropsWithChildren<{}>
> = ({ children }) => {
  const query = new URLSearchParams(window.location.search);

  const [source, setSource] = useState<InputType | undefined>(
    (query.get("source") as InputType) ?? undefined
  );
  const [target, setTarget] = useState<InputType | undefined>(
    (query.get("target") as InputType) ?? undefined
  );

  return (
    <UserInputContext.Provider value={{ source, setSource, target, setTarget }}>
      {children}
    </UserInputContext.Provider>
  );
};
