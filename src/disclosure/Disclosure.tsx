import React from "react";
import { createComponent } from "reakit-system";
import {
  ButtonHTMLProps,
  ButtonOptions,
  useButton as useReakitButton,
} from "reakit";
import { useLiveRef } from "reakit-utils";

import { createComposableHook } from "../system";

import { DISCLOSURE_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";

export type DisclosureOptions = ButtonOptions &
  Pick<DisclosureStateReturn, "baseId" | "toggle" | "visible">;

export type DisclosureHTMLProps = ButtonHTMLProps;

export type DisclosureProps = DisclosureOptions & DisclosureHTMLProps;

export const disclosureComposableButton = createComposableHook<
  DisclosureOptions,
  DisclosureHTMLProps
>({
  name: "Disclosure",
  compose: useReakitButton,
  keys: DISCLOSURE_KEYS,

  useProps(options, htmlProps) {
    const { toggle, visible, baseId } = options;
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
      "aria-expanded": visible,
      "data-enter": visible ? "" : undefined,
      "data-leave": !visible ? "" : undefined,
      onClick,
      ...restHtmlProps,
    };
  },
});

export const useDisclosure = disclosureComposableButton();

export const Disclosure = createComponent({
  as: "button",
  memo: true,
  useHook: useDisclosure,
});
