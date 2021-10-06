import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import {
  CompositeItemHTMLProps,
  CompositeItemOptions,
  useCompositeItem,
} from "reakit";
import { useForkRef, useLiveRef } from "reakit-utils";
import { warning } from "reakit-warning/warning";

import { RADIO_KEYS } from "./__keys";
import { fireChange, getChecked, useInitialChecked } from "./helpers";
import { RadioStateReturn } from "./RadioState";

export type RadioOptions = CompositeItemOptions &
  Pick<Partial<RadioStateReturn>, "state" | "setState"> & {
    /**
     * Same as the `value` attribute.
     */
    value: string | number;

    /**
     * Same as the `checked` attribute.
     */
    checked?: boolean;

    /**
     * @private
     */
    unstable_checkOnFocus?: boolean;
  };

export type RadioHTMLProps = CompositeItemHTMLProps &
  React.InputHTMLAttributes<any>;

export type RadioProps = RadioOptions & RadioHTMLProps;

export const useRadio = createHook<RadioOptions, RadioHTMLProps>({
  name: "Radio",
  compose: useCompositeItem,
  keys: RADIO_KEYS,

  useOptions(
    { unstable_clickOnEnter = false, unstable_checkOnFocus = true, ...options },
    { value, checked },
  ) {
    return {
      checked,
      unstable_clickOnEnter,
      unstable_checkOnFocus,
      ...options,
      value: options.value ?? value,
    };
  },

  useProps(
    options,
    {
      ref: htmlRef,
      onChange: htmlOnChange,
      onClick: htmlOnClick,
      ...htmlProps
    },
  ) {
    const {
      currentId,
      id,
      disabled,
      setState,
      value,
      unstable_moves,
      unstable_checkOnFocus,
      baseId,
    } = options;
    const ref = React.useRef<HTMLInputElement>(null);
    const [isNativeRadio, setIsNativeRadio] = React.useState(true);
    const checked = getChecked(options);
    const isCurrentItemRef = useLiveRef(currentId === id);
    const onChangeRef = useLiveRef(htmlOnChange);
    const onClickRef = useLiveRef(htmlOnClick);

    useInitialChecked(options);

    React.useEffect(() => {
      const element = ref.current;
      if (!element) {
        warning(
          true,
          "Can't determine whether the element is a native radio because `ref` wasn't passed to the component",
        );
        return;
      }
      if (element.tagName !== "INPUT" || element.type !== "radio") {
        setIsNativeRadio(false);
      }
    }, []);

    const onChange = React.useCallback(
      (event: React.ChangeEvent) => {
        onChangeRef.current?.(event);

        if (event.defaultPrevented) return;
        if (disabled) return;

        setState?.(value);
      },
      [disabled, onChangeRef, setState, value],
    );

    const onClick = React.useCallback(
      (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        onClickRef.current?.(event);

        if (event.defaultPrevented) return;
        if (isNativeRadio) return;

        fireChange(event.currentTarget, onChange);
      },
      [onClickRef, isNativeRadio, onChange],
    );

    React.useEffect(() => {
      const element = ref.current;
      if (!element) return;

      if (unstable_moves && isCurrentItemRef.current && unstable_checkOnFocus) {
        fireChange(element, onChange);
      }
    }, [unstable_moves, unstable_checkOnFocus, onChange, isCurrentItemRef]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: !isNativeRadio ? "radio" : undefined,
      type: isNativeRadio ? "radio" : undefined,
      value: isNativeRadio ? value : undefined,
      name: isNativeRadio ? baseId : undefined,
      "aria-checked": checked,
      checked,
      onChange,
      onClick,
      ...htmlProps,
    };
  },
});

export const Radio = createComponent({
  as: "input",
  memo: true,
  useHook: useRadio,
});
