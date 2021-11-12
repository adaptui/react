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
import { getState } from "./helpers";

export type DisclosureButtonOptions = ButtonOptions &
  Pick<DisclosureStateReturn, "baseId" | "toggle" | "expanded">;

export type DisclosureButtonHTMLProps = ButtonHTMLProps;

export type DisclosureButtonProps = DisclosureButtonOptions &
  DisclosureButtonHTMLProps;

export const disclosureComposableButton = createComposableHook<
  DisclosureButtonOptions,
  DisclosureButtonHTMLProps
>({
  name: "DisclosureButton",
  compose: useReakitButton,
  keys: DISCLOSURE_BUTTON_KEYS,

  useProps(options, htmlProps) {
    const { toggle, expanded, baseId } = options;
    const {
      onClick: htmlOnClick,
      "aria-controls": ariaControls,
      ...restHtmlProps
    } = htmlProps;
    const controls = ariaControls ? `${ariaControls} ${baseId}` : baseId;

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
      "data-state": getState(expanded),
      onClick,
      ...restHtmlProps,
    };
  },
});

export const useDisclosureButton = disclosureComposableButton();

export const DisclosureButton = createComponent({
  as: "button",
  memo: true,
  useHook: useDisclosureButton,
});
