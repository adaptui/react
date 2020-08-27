import { UsePickerStateReturn } from "./PickerState";
import { useForkRef } from "reakit-utils";
import * as React from "react";
import { createHook, createComponent } from "reakit-system";
import { BoxHTMLProps, usePopoverDisclosure } from "reakit";
import { PICKER_STATE_KEYS } from "./__keys";
import { useLiveRef } from "reakit-utils";

const usePickerButton = createHook<UsePickerStateReturn, BoxHTMLProps>({
  name: "usePickerButton",
  compose: [usePopoverDisclosure],
  keys: PICKER_STATE_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, { ref: htmlRef, onClick: htmlOnClick, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const onClickRef = useLiveRef(htmlOnClick);

    // If disclosure is rendered as a menu bar item, it's toggable
    // That is, you can click on the expanded disclosure to close its menu.
    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        // Otherwise, if menu button is a menu bar item or an orphan menu
        // button, it's toggable.
        options.toggle?.();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [options.toggle],
    );
    return {
      ref: useForkRef(ref, htmlRef),
      "aria-haspopup": "menu",
      onClick,
      ...htmlProps,
    };
  },
});

export const PickerButton = createComponent({
  as: "button",
  memo: true,
  useHook: usePickerButton,
});
