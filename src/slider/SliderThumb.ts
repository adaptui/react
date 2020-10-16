/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
import { useId } from "@chakra-ui/hooks";
import { useForkRef } from "reakit-utils";
import { useWarning } from "reakit-warning";
import { BoxHTMLProps, useBox } from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";
import { createComponent, createHook, useCreateElement } from "reakit-system";

import { SLIDER_THUMB_KEYS } from "./__keys";
import { dataAttr, ariaAttr } from "../utils";
import { SliderStateReturn } from "./SliderState";

export type SliderThumbOptions = SliderStateReturn & {
  /**
   * The base `id` to use for the sliderThumb
   */
  id?: string;
  /**
   * Function that returns the `aria-valuetext` for screen readers.
   * It's mostly used to generate a more human-readable
   * representation of the value for assistive technologies
   */
  getAriaValueText?(value: number): string;
};

export type SliderThumbHTMLProps = BoxHTMLProps;

export type SliderThumbProps = SliderThumbOptions & SliderThumbHTMLProps;

export const useSliderThumb = createHook<
  SliderThumbOptions,
  SliderThumbHTMLProps
>({
  name: "SliderThumb",
  compose: useBox,
  keys: SLIDER_THUMB_KEYS,

  useProps(
    options,
    {
      ref: htmlRef,
      style: htmlStyle,
      onKeyDown: htmlOnKeyDown,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-valuetext": ariaValueText,
      ...htmlProps
    },
  ) {
    const { state, handlers, styles, refs } = options;
    const id = useId(options.id, "slider-thumb");

    /**
     * ARIA (Optional): To define a human readable representation of the value,
     * we allow users pass aria-valuetext.
     */
    const valueText = options.getAriaValueText?.(state.value) ?? ariaValueText;

    return {
      id,
      tabIndex: 0,
      role: "slider",
      "aria-valuetext": valueText,
      "aria-valuemin": state.min,
      "aria-valuemax": state.max,
      "aria-valuenow": state.value,
      "aria-orientation": state.orientation,
      "data-active": dataAttr(state.isDragging),
      "aria-disabled": ariaAttr(state.isDisabled),
      "aria-readonly": ariaAttr(state.isReadOnly),
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabel ? undefined : ariaLabelledBy,
      onKeyDown: callAllHandlers(htmlOnKeyDown, handlers.onKeyDown),
      ref: useForkRef(htmlRef, refs.thumbRef),
      style: { ...styles.thumbStyle, ...htmlStyle },
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
