import { callAllHandlers } from "@chakra-ui/utils";
import { createHook, createComponent } from "reakit-system";
import { useButton, DialogStateReturn, ButtonProps } from "reakit";

import { DRAWER_KEYS } from "./__keys";

export const useDrawerCloseButton = createHook<
  Pick<DialogStateReturn, "hide">,
  ButtonProps
>({
  name: "DrawerCloseButton",
  compose: useButton,
  keys: [...DRAWER_KEYS, "hide"],

  useProps({ hide }, { onClick: htmlOnClick, ...htmlProps }) {
    return {
      onClick: callAllHandlers(hide, htmlOnClick),
      ...htmlProps,
    };
  },
});

export const DrawerCloseButton = createComponent({
  as: "button",
  useHook: useDrawerCloseButton,
});
