import * as React from "react";
import { warning } from "reakit-warning";
import { createEvent } from "reakit-utils";

import { CheckboxOptions } from "./Checkbox";

export function getChecked(options: CheckboxOptions) {
  const { checked, value, state } = options;
  if (typeof checked !== "undefined") return checked;

  if (typeof value === "undefined") return !!state;

  const stateProp = Array.isArray(state) ? state : [];

  return stateProp.indexOf(value) !== -1;
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

export function useIndeterminateState(
  ref: React.RefObject<HTMLInputElement>,
  options: CheckboxOptions,
) {
  const { state } = options;

  React.useEffect(() => {
    const element = ref.current;

    if (!element) {
      warning(
        state === "indeterminate",
        "Can't set indeterminate state because `ref` wasn't passed to component.",
        "See https://reakit.io/docs/checkbox/#indeterminate-state",
      );
      return;
    }

    if (state === "indeterminate") {
      element.indeterminate = true;
    } else if (element.indeterminate) {
      element.indeterminate = false;
    }
  }, [state, ref]);
}
