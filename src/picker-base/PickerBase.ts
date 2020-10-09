import { createOnKeyDown } from "reakit-utils";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";

import { isTouch } from "../utils";
import { PICKER_BASE_KEYS } from "./__keys";
import { PickerBaseStateReturn } from "./PickerBaseState";

export type PickerBaseOptions = BoxOptions &
  Pick<
    PickerBaseStateReturn,
    | "visible"
    | "isDisabled"
    | "isReadOnly"
    | "show"
    | "pickerId"
    | "dialogId"
    | "focus"
  >;

export type PickerBaseHTMLProps = BoxHTMLProps;

export type PickerBaseProps = PickerBaseOptions & PickerBaseHTMLProps;

export const usePickerBase = createHook<PickerBaseOptions, PickerBaseHTMLProps>(
  {
    name: "PickerBase",
    compose: useBox,
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
        focus,
      } = options;

      const onClick = () => {
        if (isTouch()) show();
      };

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

      const onMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        focus?.();
      };

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
