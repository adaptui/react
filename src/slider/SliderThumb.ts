/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
import { useId } from "@chakra-ui/hooks";
import { useWarning } from "reakit-warning";
import { BoxHTMLProps, useBox } from "reakit";
import { createComponent, createHook, useCreateElement } from "reakit-system";
import {
  ariaAttr,
  callAllHandlers,
  dataAttr,
  mergeRefs,
} from "@chakra-ui/utils";

import { SLIDER_THUMB_KEYS } from "./__keys";
import { UseSliderReturn } from "./SliderState";

export type useSliderThumbOptions = UseSliderReturn & {
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

export const useSliderThumb = createHook<useSliderThumbOptions, BoxHTMLProps>({
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
      ...htmlProps,
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
      ref: mergeRefs(htmlRef, refs.thumbRef),
      style: { ...htmlStyle, ...styles.thumbStyle },
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
