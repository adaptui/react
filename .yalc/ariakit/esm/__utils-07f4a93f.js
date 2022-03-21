import { createContext } from 'react';
import { createStoreContext } from 'ariakit-utils/store';

const MenuBarContext = createStoreContext();
const MenuContext = createStoreContext();
const MenuItemCheckedContext = /*#__PURE__*/createContext(undefined);
function hasExpandedMenuButton(items, currentElement) {
  return !!(items != null && items.filter(item => item.ref.current !== currentElement).some(item => {
    var _item$ref$current;

    return ((_item$ref$current = item.ref.current) == null ? void 0 : _item$ref$current.getAttribute("aria-expanded")) === "true";
  }));
}

export { MenuContext as M, MenuBarContext as a, MenuItemCheckedContext as b, hasExpandedMenuButton as h };
