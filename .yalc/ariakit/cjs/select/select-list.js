'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var events = require('ariakit-utils/events');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_composite = require('../composite/composite.js');
var composite_compositeTypeahead = require('../composite/composite-typeahead.js');
var __utils = require('../__utils-87932646.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select list.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectList({ state });
 * <Role {...props}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </Role>
 * ```
 */
const useSelectList = system.createHook(_ref => {
  let {
    state,
    resetOnEscape = true,
    hideOnEnter = true,
    focusOnMove = true,
    composite = true,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const id = hooks.useId(props.id);
  const [defaultValue, setDefaultValue] = react.useState(state.value);
  const multiSelectable = Array.isArray(state.value); // Stores the intial value so we can reset it later when Escape is pressed

  react.useEffect(() => {
    if (state.mounted) return;
    setDefaultValue(state.value);
  }, [state.mounted, state.value]);
  resetOnEscape = resetOnEscape && !multiSelectable;
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const resetOnEscapeProp = hooks.useBooleanEventCallback(resetOnEscape);
  const hideOnEnterProp = hooks.useBooleanEventCallback(hideOnEnter);
  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape" && resetOnEscapeProp(event)) {
      state.setValue(defaultValue);
    }

    if (event.key === " " || event.key === "Enter") {
      if (events.isSelfTarget(event) && hideOnEnterProp(event)) {
        event.preventDefault();
        state.hide();
      }
    }
  }, [onKeyDownProp, resetOnEscapeProp, state.setValue, defaultValue, hideOnEnterProp, state.hide]);
  props = store.useStoreProvider({
    state,
    ...props
  }, __utils.SelectContext);
  const labelId = hooks.useRefId(state.labelRef);
  const style = state.mounted ? props.style : { ...props.style,
    display: "none"
  };
  props = {
    id,
    role: composite ? "listbox" : undefined,
    hidden: !state.mounted,
    "aria-labelledby": labelId,
    "aria-multiselectable": multiSelectable ? true : undefined,
    ...props,
    ref: hooks.useForkRef(id ? state.setContentElement : null, ref, props.ref),
    style,
    onKeyDown
  };
  props = composite_composite.useComposite({
    state,
    ...props,
    composite,
    focusOnMove: state.visible && !state.animating && focusOnMove
  });
  props = composite_compositeTypeahead.useCompositeTypeahead({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a select list. The `role` prop is set to `listbox`
 * by default, but can be overriden by any other valid select popup role
 * (`listbox`, `menu`, `tree`, `grid` or `dialog`). The `aria-labelledby` prop
 * is set to the select input element's `id` by default.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectList state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectList>
 * ```
 */

const SelectList = system.createComponent(props => {
  const htmlProps = useSelectList(props);
  return system.createElement("div", htmlProps);
});

exports.SelectList = SelectList;
exports.useSelectList = useSelectList;
