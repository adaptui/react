import React from "react";
import {
  useCompositeItem,
  CompositeItemHTMLProps,
  CompositeItemOptions,
} from "reakit/Composite";
import { SELECT_KEYS } from "./__keys";
import { SelectStateReturn } from "./SelectState";
import { createHook, createComponent } from "reakit-system";
import { useLiveRef, hasFocusWithin } from "reakit-utils";

export type SelectItemOptions = CompositeItemOptions &
  Pick<SelectStateReturn, "setSelected" | "selected"> & {
    value: string;
  };

export type SelectItemHTMLProp = CompositeItemHTMLProps;

const useSelectOption = createHook<SelectItemOptions, SelectItemHTMLProp>({
  name: "SelectOption",
  compose: useCompositeItem,
  keys: ["value", ...SELECT_KEYS],
  useProps(
    { selected, value, setSelected, disabled },
    { onClick: htmlOnClick, onMouseMove: htmlOnMouseMove, ...htmlProps },
  ) {
    const onMouseMoveRef = useLiveRef(htmlOnMouseMove);
    const onClickRef = useLiveRef(htmlOnClick);

    const onMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onMouseMoveRef.current?.(event);
        if (event.defaultPrevented) return;
        if (disabled) return;
        if (hasFocusWithin(event.currentTarget)) return;

        event.currentTarget.focus();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [disabled],
    );

    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickRef.current?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      setSelected(value);
    };

    return {
      role: "option",
      "aria-label": value,
      "data-selected": selected.includes(value),
      "data-value": value,
      onMouseMove,
      onClick,
      ...htmlProps,
    };
  },
});

export const SelectOption = createComponent({
  as: "div",
  memo: true,
  useHook: useSelectOption,
});
