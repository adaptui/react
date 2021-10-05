import React from "react";
import { createComponent } from "reakit-system";
import {
  ButtonHTMLProps,
  ButtonOptions,
  useButton as useReakitButton,
} from "reakit";
import { useLiveRef } from "reakit-utils";

import { createComposableHook } from "../system";

import { DISCLOSURE_BUTTON_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";

export type DisclosureButtonOptions = ButtonOptions &
  Pick<DisclosureStateReturn, "baseId" | "toggle" | "expanded">;

export type DisclosureButtonHTMLProps = ButtonHTMLProps;

export type DisclosureButtonProps = DisclosureButtonOptions &
  DisclosureButtonHTMLProps;

export const showMoreComposableButton = createComposableHook<
  DisclosureButtonOptions,
  DisclosureButtonHTMLProps
>({
  name: "DisclosureButton",
  compose: useReakitButton,
  keys: DISCLOSURE_BUTTON_KEYS,

  useProps(options, htmlProps) {
    const { toggle, expanded } = options;
    const {
      onClick: htmlOnClick,
      "aria-controls": ariaControls,
      ...restHtmlProps
    } = htmlProps;
    const controls = ariaControls
      ? `${ariaControls} ${options.baseId}`
      : options.baseId;

    const onClickRef = useLiveRef(htmlOnClick);

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;

        toggle?.();
      },
      [onClickRef, toggle],
    );

    return {
      "aria-controls": controls,
      "aria-expanded": expanded,
      onClick,
      ...restHtmlProps,
    };
  },
});

export const useDisclosureButton = showMoreComposableButton();

export const DisclosureButton = createComponent({
  as: "button",
  memo: true,
  useHook: useDisclosureButton,
});
