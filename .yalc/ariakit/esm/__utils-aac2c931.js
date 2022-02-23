import { createContext } from 'react';
import { createStoreContext, useStore } from 'ariakit-utils/store';
import { D as DialogContext } from './dialog-context-f963dd70.js';

const MenuBarContext = createStoreContext();
const MenuContext = createStoreContext();
const MenuItemCheckedContext = /*#__PURE__*/createContext(undefined);
function useParentMenu(filter) {
  if (filter === void 0) {
    filter = [];
  }

  const parentDialog = useStore(DialogContext, ["contentElement"]);
  const parentMenu = useStore(MenuContext, [...filter, "contentElement"]);
  const hasIntermediateDialog = (parentDialog == null ? void 0 : parentDialog.contentElement) !== (parentMenu == null ? void 0 : parentMenu.contentElement);
  if (hasIntermediateDialog) return;
  return parentMenu;
}

export { MenuBarContext as M, MenuContext as a, MenuItemCheckedContext as b, useParentMenu as u };
