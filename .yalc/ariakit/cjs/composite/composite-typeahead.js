'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var events = require('ariakit-utils/events');
var hooks = require('ariakit-utils/hooks');
var misc = require('ariakit-utils/misc');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-57ccda4f.js');

let chars = "";

function clearChars() {
  chars = "";
}

function isValidTypeaheadEvent(event) {
  const target = event.target;
  if (target && dom.isTextField(target)) return false; // If the spacebar is pressed, we'll only consider it a valid typeahead event
  // if there were already other characters typed.

  if (event.key === " " && chars.length) return true;
  return event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey && // Matches any letter or number of any language.
  /^[\p{Letter}\p{Number}]$/u.test(event.key);
}

function isSelfTargetOrItem(event, items) {
  if (events.isSelfTarget(event)) return true;
  const target = event.target;
  if (!target) return false;
  const isItem = items.some(item => item.ref.current === target);
  return isItem;
}

function getEnabledItems(items) {
  return items.filter(item => !item.disabled);
}

function itemTextStartsWith(item, text) {
  var _item$ref$current;

  const itemText = (_item$ref$current = item.ref.current) == null ? void 0 : _item$ref$current.textContent;
  if (!itemText) return false;
  return misc.normalizeString(itemText).toLowerCase().startsWith(text.toLowerCase());
}

function getSameInitialItems(items, char, activeId) {
  if (!activeId) return items;
  const activeItem = items.find(item => item.id === activeId);
  if (!activeItem) return items;
  if (!itemTextStartsWith(activeItem, char)) return items; // Typing "oo" will match "oof" instead of moving to the next item.

  if (chars !== char && itemTextStartsWith(activeItem, chars)) return items; // If we're looping through the items, we'll want to reset the chars so "oo"
  // becomes just "o".

  chars = char; // flipItems will put the previous items at the end of the list so we can loop
  // through them.

  return __utils.flipItems(items.filter(item => itemTextStartsWith(item, chars)), activeId).filter(item => item.id !== activeId);
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to add typeahead functionality to composite components.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeTypeahead({ state });
 * <Composite state={state} {...props}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */


const useCompositeTypeahead = system.createHook(_ref => {
  var _state3, _state4, _state5;

  let {
    state,
    typeahead = true,
    ...props
  } = _ref;
  const context = react.useContext(__utils.CompositeContext);
  state = state || context;
  const onKeyDownCaptureProp = hooks.useEventCallback(props.onKeyDownCapture);
  const cleanupTimeoutRef = react.useRef(0); // We have to listen to the event in the capture phase because the event
  // might be handled by a child component. For example, the space key may
  // trigger a click event on a child component. We need to prevent this
  // behavior if the character is a valid typeahead key.

  const onKeyDownCapture = react.useCallback(event => {
    var _state, _state2;

    onKeyDownCaptureProp(event);
    if (event.defaultPrevented) return;
    if (!typeahead) return;
    if (!((_state = state) != null && _state.items)) return;
    if (!isValidTypeaheadEvent(event)) return clearChars();
    let items = getEnabledItems(state.items);
    if (!isSelfTargetOrItem(event, items)) return clearChars();
    event.preventDefault(); // We need to clear the previous cleanup timeout so we can append the
    // pressed char to the existing one.

    window.clearTimeout(cleanupTimeoutRef.current); // Schedule a new cleanup timeout. After a short delay we'll reset the
    // characters so the next one counts as a new start character.

    cleanupTimeoutRef.current = window.setTimeout(() => {
      chars = "";
    }, 500); // Always consider the lowercase version of the key.

    const char = event.key.toLowerCase();
    chars += char;
    items = getSameInitialItems(items, char, (_state2 = state) == null ? void 0 : _state2.activeId);
    const item = items.find(item => itemTextStartsWith(item, chars));

    if (item) {
      state.move(item.id);
    } else {
      // Immediately clear the characters so the next keypress starts a new
      // search.
      clearChars();
    }
  }, [onKeyDownCaptureProp, typeahead, (_state3 = state) == null ? void 0 : _state3.items, (_state4 = state) == null ? void 0 : _state4.activeId, (_state5 = state) == null ? void 0 : _state5.move]);
  props = { ...props,
    onKeyDownCapture
  };
  return props;
});
/**
 * A component that adds typeahead functionality to composite components.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite} as={CompositeTypeahead}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */

const CompositeTypeahead = system.createComponent(props => {
  const htmlProps = useCompositeTypeahead(props);
  return system.createElement("div", htmlProps);
});

exports.CompositeTypeahead = CompositeTypeahead;
exports.useCompositeTypeahead = useCompositeTypeahead;
