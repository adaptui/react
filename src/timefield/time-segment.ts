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

import { TimeFieldBaseState } from "./timefield-base-state";

export const useTimeSegment = createHook<TimeSegmentOptions>(
  ({ state, segment, ...props }) => {
    const ref = useRef<HTMLElement>(null);
    props = { ...props, ref: useForkRef(ref, props.ref) };

    const { segmentProps } = useAriaDateSegment(segment, state, ref);
    props = mergeProps(segmentProps, props);

    return props;
  },
);

export const TimeSegment = createComponent<TimeSegmentOptions>(props => {
  const htmlProps = useTimeSegment(props);

  return createElement("div", htmlProps);
});

export type TimeSegmentOptions<T extends As = "div"> = Options<T> & {
  /**
   * Current segment state return from `state.segments`.
   */
  segment: DateSegmentState;
  /**
   * Object returned by the `useTimeFieldBaseState` hook.
   */
  state: TimeFieldBaseState;
};

export type TimeSegmentProps<T extends As = "div"> = Props<
  TimeSegmentOptions<T>
>;
