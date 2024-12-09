/// <reference types="vite/client" />

import { InputType } from "./utils/inputs";

declare global {
  interface PlausibleEventOptions {
    Page: {
      props: {
        source: InputType;
        target: InputType;
        query: `${InputType} to ${InputType}`;
      };
    };
  }

  declare const plausible:
    | (<K extends keyof PlausibleEventOptions>(
        event: K,
        options: PlausibleEventOptions[K]
      ) => void)
    | undefined;
}
