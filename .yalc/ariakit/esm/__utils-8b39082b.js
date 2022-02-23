import { createContext } from 'react';
import { createStoreContext } from 'ariakit-utils/store';

const ComboboxContext = createStoreContext();
const ComboboxItemValueContext = /*#__PURE__*/createContext(undefined);

export { ComboboxContext as C, ComboboxItemValueContext as a };
