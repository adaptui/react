import { createContext } from 'react';
import { createStoreContext } from 'ariakit-utils/store';

const SelectItemCheckedContext = /*#__PURE__*/createContext(false);
const SelectContext = createStoreContext();
function findFirstEnabledItemWithValue(items) {
  return items.find(item => item.value != null && !item.disabled);
}
function findEnabledItemWithValueById(items, id) {
  return items.find(item => item.value != null && item.id === id && !item.disabled);
}
function findEnabledItemByValue(items, value) {
  return items.find(item => item.value === value && !item.disabled);
}

export { SelectContext as S, findEnabledItemByValue as a, findEnabledItemWithValueById as b, SelectItemCheckedContext as c, findFirstEnabledItemWithValue as f };
