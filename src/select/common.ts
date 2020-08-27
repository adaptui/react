import { SelectTriggerOptions } from "./SelectTrigger";
import React from "react";

export const enterOrSpace = (e: any, fn: Function) => {
  if (e.key === "Enter" || e.key === " ") {
    fn && fn(e);
  }
};

export const useTypeahead = ({
  setTypehead,
}: {
  setTypehead: SelectTriggerOptions["setTypehead"];
}) => {
  const keyClear = React.useRef<any>(null);
  const [typed, setTyped] = React.useState("");

  const clearKeyStrokes = () => {
    setTypehead(typed);

    if (keyClear.current) {
      clearTimeout(keyClear.current);
      keyClear.current = null;
    }

    keyClear.current = setTimeout(() => {
      setTyped("");
      keyClear.current = null;
    }, 800);
  };

  React.useEffect(() => {
    if (typed !== "") {
      clearKeyStrokes();
    }
  }, [typed]);

  const handleOnKeyPress = (e: React.KeyboardEvent) => {
    e.persist();
    // skip the enter key
    if (e.key === "Enter") return;
    setTyped(prev => prev + e.key);
  };

  return { handleOnKeyPress };
};
