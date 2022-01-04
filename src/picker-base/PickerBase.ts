import * as React from "react";
import { createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { createOnKeyDown } from "reakit-utils";
import { callAllHandlers } from "@chakra-ui/utils";

import { createComponent } from "../system";
import { ariaAttr, isTouch } from "../utils";

import { PICKER_BASE_KEYS } from "./__keys";
import { PickerBaseStateReturn } from "./PickerBaseState";

export type PickerBaseOptions = RoleOptions &
  Pick<
    PickerBaseStateReturn,
    | "visible"
    | "isDisabled"
    | "isReadOnly"
    | "show"
    | "pickerId"
    | "dialogId"
    | "segmentFocus"
  >;

export type PickerBaseHTMLProps = RoleHTMLProps;

export type PickerBaseProps = PickerBaseOptions & PickerBaseHTMLProps;

export const usePickerBase = createHook<PickerBaseOptions, PickerBaseHTMLProps>(
  {
    name: "PickerBase",
    compose: useRole,
    keys: PICKER_BASE_KEYS,

    useProps(
      options,
      {
        onKeyDown: htmlOnKeyDown,
        onClick: htmlOnClick,
        onMouseDown: htmlOnMouseDown,
        ...htmlProps
      },
    ) {
      const {
        visible,
        isDisabled,
        isReadOnly,
        show,
        pickerId,
        dialogId,
        segmentFocus,
      } = options;

      const onClick = React.useCallback(() => {
        if (isTouch()) show();
      }, [show]);

      // Open the popover on alt + arrow down
      const onKeyDown = createOnKeyDown({
        onKey: htmlOnKeyDown,
        preventDefault: true,
        keyMap: event => {
          const isAlt = event.altKey;

          return {
            ArrowDown: () => {
              isAlt && show();
            },
          };
        },
      });

      const onMouseDown = React.useCallback(
        (e: React.MouseEvent) => {
          e.stopPropagation();
          segmentFocus?.();
        },
        [segmentFocus],
      );

      return {
        id: pickerId,
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": visible,
        "aria-owns": visible ? dialogId : undefined,
        "aria-disabled": ariaAttr(isDisabled),
        "aria-readonly": ariaAttr(isReadOnly),
        onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
        onClick: callAllHandlers(htmlOnClick, onClick),
        onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
        ...htmlProps,
      };
    },
  },
);

export const PickerBase = createComponent({
  as: "div",
  memo: true,
  useHook: usePickerBase,
});
