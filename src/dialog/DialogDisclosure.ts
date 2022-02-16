import * as React from "react";
import { useForkRef, useLiveRef } from "reakit-utils";
import { warning } from "reakit-warning";
import { useSafeLayoutEffect } from "@chakra-ui/hooks";

import {
  DisclosureHTMLProps,
  DisclosureOptions,
  useDisclosure,
} from "../disclosure";
import { createComponent, createHook } from "../system";

import { DIALOG_DISCLOSURE_KEYS } from "./__keys";
import { DialogStateReturn } from "./DialogState";

export type DialogDisclosureOptions = DisclosureOptions &
  Pick<Partial<DialogStateReturn>, "disclosureRef">;

export type DialogDisclosureHTMLProps = DisclosureHTMLProps;

export type DialogDisclosureProps = DialogDisclosureOptions &
  DialogDisclosureHTMLProps;

export const useDialogDisclosure = createHook<
  DialogDisclosureOptions,
  DialogDisclosureHTMLProps
>({
  name: "DialogDisclosure",
  compose: useDisclosure,
  keys: DIALOG_DISCLOSURE_KEYS,

  useProps(options, htmlProps) {
    const { disclosureRef, visible } = options;
    const { ref: htmlRef, onClick: htmlOnClick, ...restHtmlProps } = htmlProps;
    const ref = React.useRef<HTMLElement>(null);
    const onClickRef = useLiveRef(htmlOnClick);
    const [expanded, setExpanded] = React.useState(false);

    // aria-expanded may be used for styling purposes, so we useLayoutEffect
    useSafeLayoutEffect(() => {
      const element = ref.current;

      warning(
        !element,
        "Can't determine whether the element is the current disclosure because `ref` wasn't passed to the component",
      );

      if (disclosureRef && !disclosureRef.current) {
        disclosureRef.current = element;
      }

      const isCurrentDisclosure =
        !disclosureRef?.current || disclosureRef.current === element;

      setExpanded(!!visible && isCurrentDisclosure);
    }, [visible, disclosureRef]);

    const onClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onClickRef.current?.(event);

        if (event.defaultPrevented) return;

        if (disclosureRef) {
          disclosureRef.current = event.currentTarget;
        }
      },
      [disclosureRef, onClickRef],
    );

    return {
      ref: useForkRef(ref, htmlRef),
      "aria-haspopup": "dialog",
      "aria-expanded": expanded,
      onClick,
      ...restHtmlProps,
    };
  },
});

export const DialogDisclosure = createComponent({
  as: "button",
  memo: true,
  useHook: useDialogDisclosure,
});
