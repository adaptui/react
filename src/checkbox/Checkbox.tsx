import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import { ClickableHTMLProps, ClickableOptions, useClickable } from "reakit";
import { removeIndexFromArray, useForkRef, useLiveRef } from "reakit-utils";
import { warning } from "reakit-warning";

import { CHECKBOX_KEYS } from "./__keys";
import { CheckboxStateReturn } from "./CheckboxState";
import { fireChange, getChecked, useIndeterminateState } from "./helpers";

export type CheckboxOptions = ClickableOptions &
  Pick<Partial<CheckboxStateReturn>, "state" | "setState"> & {
    /**
     * Checkbox's value is going to be used when multiple checkboxes share the
     * same state. Checking a checkbox with value will add it to the state
     * array.
     */
    value?: string | number;

    /**
     * Checkbox's checked state. If present, it's used instead of `state`.
     */
    checked?: boolean;
  };

export type CheckboxHTMLProps = ClickableHTMLProps &
  React.InputHTMLAttributes<any> & {
    value?: string | number;
  };

export type CheckboxProps = CheckboxOptions & CheckboxHTMLProps;

export const useCheckbox = createHook<CheckboxOptions, CheckboxHTMLProps>({
  name: "Checkbox",
  compose: useClickable,
  keys: CHECKBOX_KEYS,

  useOptions(options, htmlProps) {
    const { unstable_clickOnEnter = false, ...restOptions } = options;
    const { value, checked } = htmlProps;

    return {
      unstable_clickOnEnter,
      value,
      checked: getChecked({ checked, ...options }),
      ...restOptions,
    };
  },

  useProps(options, htmlProps) {
    const { state, setState, value, checked, disabled } = options;
    const {
      ref: htmlRef,
      onChange: htmlOnChange,
      onClick: htmlOnClick,
      ...restHtmlProps
    } = htmlProps;
    const ref = React.useRef<HTMLInputElement>(null);
    const [isNativeCheckbox, setIsNativeCheckbox] = React.useState(true);
    const onChangeRef = useLiveRef(htmlOnChange);
    const onClickRef = useLiveRef(htmlOnClick);

    React.useEffect(() => {
      const element = ref.current;

      if (!element) {
        warning(
          true,
          "Can't determine whether the element is a native checkbox because `ref` wasn't passed to the component",
        );
        return;
      }

      if (element.tagName !== "INPUT" || element.type !== "checkbox") {
        setIsNativeCheckbox(false);
      }
    }, []);

    useIndeterminateState(ref, options);

    const onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const element = event.currentTarget;

        if (disabled) {
          event.stopPropagation();
          event.preventDefault();

          return;
        }

        if (onChangeRef.current) {
          // If component is NOT rendered as a native input, it will not have
          // the `checked` property. So we assign it for consistency.
          if (!isNativeCheckbox) {
            element.checked = !element.checked;
          }

          onChangeRef.current(event);
        }

        if (!setState) return;

        if (typeof value === "undefined") {
          setState(!checked);
        } else {
          const stateProp = Array.isArray(state) ? state : [];
          const index = stateProp.indexOf(value);

          if (index === -1) {
            setState([...stateProp, value]);
          } else {
            setState(removeIndexFromArray(stateProp, index));
          }
        }
      },
      [
        disabled,
        onChangeRef,
        setState,
        value,
        isNativeCheckbox,
        checked,
        state,
      ],
    );

    const onClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onClickRef.current?.(event);

        if (event.defaultPrevented) return;

        if (isNativeCheckbox) return;

        fireChange(event.currentTarget, onChange);
      },
      [isNativeCheckbox, onChange, onClickRef],
    );

    return {
      ref: useForkRef(ref, htmlRef),
      role: !isNativeCheckbox ? "checkbox" : undefined,
      type: isNativeCheckbox ? "checkbox" : undefined,
      value: isNativeCheckbox ? value : undefined,
      checked: checked,
      "aria-checked": state === "indeterminate" ? "mixed" : checked,
      onChange,
      onClick,
      ...restHtmlProps,
    };
  },
});

export const Checkbox = createComponent({
  as: "input",
  memo: true,
  useHook: useCheckbox,
});
