import { createComponent, createHook } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { useForkRef } from "reakit-utils";

import { PRESENCE_KEYS } from "./__keys";
import { PresenceStateReturn } from "./PresenceState";

export type PresenceOptions = BoxOptions &
  PresenceStateReturn & {
    present?: boolean;
  };

export type PresenceHTMLProps = BoxHTMLProps & {
  present?: boolean;
};

export type PresenceProps = PresenceOptions & PresenceHTMLProps;

export const usePresence = createHook<PresenceOptions, PresenceHTMLProps>({
  name: "Presence",
  compose: useBox,
  keys: PRESENCE_KEYS,

  useOptions(options, htmlProps) {
    const { present: htmlPresent } = htmlProps;
    const { isPresent } = options;
    const present = htmlPresent != null ? htmlPresent : isPresent;

    return { ...options, present };
  },

  useProps(options, htmlProps) {
    const { ref } = options;
    const { ref: htmlRef, ...restHtmlProps } = htmlProps;

    return { ref: useForkRef(ref, htmlRef), ...restHtmlProps };
  },
});

export const Presence = createComponent({
  as: "div",
  memo: true,
  useHook: usePresence,
});
