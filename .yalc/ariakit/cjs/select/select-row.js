'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var system = require('ariakit-utils/system');
var composite_compositeRow = require('../composite/composite-row.js');
var __utils = require('../__utils-87932646.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select row.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectRow({ state });
 * <SelectPopover state={state}>
 *   <Role {...props}>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </Role>
 * </SelectPopover>
 * ```
 */
const useSelectRow = system.createHook(_ref => {
  var _state;

  let {
    state,
    ...props
  } = _ref;
  const context = react.useContext(__utils.SelectContext);
  state = state || context;
  const popupRole = dom.getPopupRole((_state = state) == null ? void 0 : _state.contentElement);
  const role = popupRole === "grid" ? "row" : "presentation";
  props = {
    role,
    ...props
  };
  props = composite_compositeRow.useCompositeRow({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a select row.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectRow>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </SelectRow>
 *   <SelectRow>
 *     <SelectItem value="Banana" />
 *     <SelectItem value="Grape" />
 *   </SelectRow>
 * </SelectPopover>
 * ```
 */

const SelectRow = system.createComponent(props => {
  const htmlProps = useSelectRow(props);
  return system.createElement("div", htmlProps);
});

exports.SelectRow = SelectRow;
exports.useSelectRow = useSelectRow;
