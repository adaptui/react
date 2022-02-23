'use strict';

var react = require('react');
var store = require('ariakit-utils/store');
var dialogContext = require('./dialog-context-f7057db5.js');

const MenuBarContext = store.createStoreContext();
const MenuContext = store.createStoreContext();
const MenuItemCheckedContext = /*#__PURE__*/react.createContext(undefined);
function useParentMenu(filter) {
  if (filter === void 0) {
    filter = [];
  }

  const parentDialog = store.useStore(dialogContext.DialogContext, ["contentElement"]);
  const parentMenu = store.useStore(MenuContext, [...filter, "contentElement"]);
  const hasIntermediateDialog = (parentDialog == null ? void 0 : parentDialog.contentElement) !== (parentMenu == null ? void 0 : parentMenu.contentElement);
  if (hasIntermediateDialog) return;
  return parentMenu;
}

exports.MenuBarContext = MenuBarContext;
exports.MenuContext = MenuContext;
exports.MenuItemCheckedContext = MenuItemCheckedContext;
exports.useParentMenu = useParentMenu;
