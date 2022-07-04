import { useRef } from "react";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { useForkRef } from "ariakit-utils";
import { As, Options, Props } from "ariakit-utils/types";
import { useDateSegment as useAriaDateSegment } from "@react-aria/datepicker";
import { mergeProps } from "@react-aria/utils";
import { DateSegment as DateSegmentState } from "@react-stately/datepicker";

import { DateFieldBaseState } from "./datefield-base-state";

export const useDateSegment = createHook<DateSegmentOptions>(
  ({ state, segment, ...props }) => {
    const ref = useRef<HTMLElement>(null);

    props = { ...props, ref: useForkRef(ref, props.ref) };
    const { segmentProps } = useAriaDateSegment(segment, state, ref);
    props = mergeProps(segmentProps, props);

    return props;
  },
);

export const DateSegment = createComponent<DateSegmentOptions>(props => {
  const htmlProps = useDateSegment(props);

  return createElement("div", htmlProps);
});

export type DateSegmentOptions<T extends As = "div"> = Options<T> & {
  segment: DateSegmentState;
  /**
   * Object returned by the `useDateFieldBaseState` hook.
   */
  state: DateFieldBaseState;
};

export type DateSegmentProps<T extends As = "div"> = Props<
  DateSegmentOptions<T>
>;
