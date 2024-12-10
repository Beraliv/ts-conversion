import { useContext, useEffect } from "react";
import { UserInputContext } from "../contexts/UserInputContext";

// eslint-disable-next-line prefer-const
let DEV_MODE = false;

export const useTrackPage = () => {
  const { source, target } = useContext(UserInputContext);

  useEffect(() => {
    if (source && target) {
      if (DEV_MODE) {
        console.log("Page", {
          source,
          target,
          query: `${source} to ${target}`,
        });
      }

      plausible?.("Page", {
        props: { source, target, query: `${source} to ${target}` },
      });
    }
  }, [source, target]);
};
