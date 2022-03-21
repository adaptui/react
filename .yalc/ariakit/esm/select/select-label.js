import { useCallback } from 'react';
import { useId, useEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { queueMicrotask } from 'ariakit-utils/misc';
import { createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label for the `Select` component. Since it's
 * not a native select element, we can't use the native label element. The
 * `SelectLabel` component will move focus and click on the `Select` component
 * when the user clicks on the label.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectLabel({ state });
 * <Role {...props}>Favorite fruit</Role>
 * <Select state={state} />
 * ```
 */
const useSelectLabel = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const id = useId(props.id);
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return; // queueMicrotask will guarantee that the focus and click events will be
    // triggered only after the current event queue is flushed (which
    // includes this click event).

    queueMicrotask(() => {
      const select = state.selectRef.current;
      select == null ? void 0 : select.focus();
      select == null ? void 0 : select.click();
    });
  }, [onClickProp, state.selectRef]);
  props = {
    id,
    ...props,
    ref: useForkRef(state.labelRef, props.ref),
    onClick,
    style: {
      cursor: "default",
      ...props.style
    }
  };
  return props;
});
/**
 * A component that renders a label for the `Select` component. Since it's not a
 * native select element, we can't use the native label element. The
 * `SelectLabel` component will move focus and click on the `Select` component
 * when the user clicks on the label.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState({ defaultValue: "Apple" });
 * <SelectLabel state={select}>Favorite fruit</SelectLabel>
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */

const SelectLabel = createMemoComponent(props => {
  const htmlProps = useSelectLabel(props);
  return createElement("div", htmlProps);
});

export { SelectLabel, useSelectLabel };
