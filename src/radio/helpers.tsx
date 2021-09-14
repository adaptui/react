import React from "react";
import { createEvent } from "reakit-utils";

import { RadioOptions } from "./Radio";

export function getChecked(options: RadioOptions) {
  const { checked, value, state } = options;
  if (typeof checked !== "undefined") return checked;

  return typeof value !== "undefined" && state === value;
}

export function useInitialChecked(options: RadioOptions) {
  const [initialChecked] = React.useState(() => getChecked(options));
  const { id, currentId, setCurrentId } = options;
  const [initialCurrentId] = React.useState(currentId);

  React.useEffect(() => {
    if (initialChecked && id && initialCurrentId !== id) {
      setCurrentId?.(id);
    }
  }, [initialChecked, id, setCurrentId, initialCurrentId]);
}

export function fireChange(
  element: HTMLElement,
  onChange?: React.ChangeEventHandler,
) {
  const event = createEvent(element, "change");

  Object.defineProperties(event, {
    type: { value: "change" },
    target: { value: element },
    currentTarget: { value: element },
  });
  onChange?.(event as any);
}
