import { createComponent, createHook, useCreateElement } from "reakit-system";
import { useWarning } from "reakit-warning";
import { useId } from "@chakra-ui/hooks";
import {
  ariaAttr,
  callAllHandlers,
  dataAttr,
  mergeRefs,
} from "@chakra-ui/utils";

import { UseSliderReturn } from "./SliderState";
import { SLIDER_THUMB_KEYS } from "./__keys";
import { BoxHTMLProps, useBox } from "reakit";

export type useSliderThumbOptions = UseSliderReturn & {
  /**
   * The base `id` to use for the sliderThumb and it's components
   */
  id?: string;
  /**
   * Function that returns the `aria-valuetext` for screen readers.
   * It's mostly used to generate a more human-readable
   * representation of the value for assistive technologies
   */
  getAriaValueText?(value: number): string;
};

export const useSliderThumb = createHook<useSliderThumbOptions, BoxHTMLProps>({
  name: "useSliderThumb",
  keys: SLIDER_THUMB_KEYS,
  compose: [useBox],

  useProps(
    options,
    {
      ref: htmlRef,
      style: htmlStyle,
      onFocus: htmlOnFocus,
      onBlur: htmlOnBlur,
      onKeyDown: htmlOnKeyDown,
      "aria-valuetext": ariaValueText,
      ...htmlProps
    },
  ) {
    const id = useId(options.id, "slider-thumb");

    /**
     * ARIA (Optional): To define a human readable representation of the value,
     * we allow users pass aria-valuetext.
     */
    const valueText =
      options.getAriaValueText?.(options.state.value) ?? ariaValueText;

    return {
      id,
      ref: mergeRefs(htmlRef, options.refs.thumbRef),
      role: "slider",
      tabIndex: 0,
      "aria-valuetext": valueText,
      "aria-valuemin": options.state.min,
      "aria-valuemax": options.state.max,
      "aria-valuenow": options.state.value,
      "aria-orientation": options.state.orientation,
      "data-active": dataAttr(options.state.isDragging),
      "aria-disabled": ariaAttr(options.state.isDisabled),
      "aria-readonly": ariaAttr(options.state.isReadOnly),
      onKeyDown: callAllHandlers(htmlOnKeyDown, options.handlers.onKeyDown),
      onFocus: callAllHandlers(htmlOnFocus, options.handlers.onFocus),
      onBlur: callAllHandlers(htmlOnBlur, options.handlers.onBlur),
      style: { ...options.styles.thumbStyle, ...htmlStyle },
      ...htmlProps,
    };
  },
});

export const SliderThumb = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderThumb,
  useCreateElement: (type, props, children) => {
    useWarning(
      props.role !== "slider",
      "You should provide a valid `role` attribute to SliderThumb component.",
    );

    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
    );
    return useCreateElement(type, props, children);
  },
});
