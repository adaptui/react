'use strict';

var react = require('react');
var store = require('ariakit-utils/store');

const MenuBarContext = store.createStoreContext();
const MenuContext = store.createStoreContext();
const MenuItemCheckedContext = /*#__PURE__*/react.createContext(undefined);
function hasExpandedMenuButton(items, currentElement) {
  return !!(items != null && items.filter(item => item.ref.current !== currentElement).some(item => {
    var _item$ref$current;

    return ((_item$ref$current = item.ref.current) == null ? void 0 : _item$ref$current.getAttribute("aria-expanded")) === "true";
  }));
}

exports.MenuBarContext = MenuBarContext;
exports.MenuContext = MenuContext;
exports.MenuItemCheckedContext = MenuItemCheckedContext;
exports.hasExpandedMenuButton = hasExpandedMenuButton;
