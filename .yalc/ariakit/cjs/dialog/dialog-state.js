'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var disclosure_disclosureState = require('../disclosure/disclosure-state.js');

/**
 * Provides state for the `Dialog` components.
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <button onClick={dialog.toggle}>Open dialog</button>
 * <Dialog state={dialog}>Content</Dialog>
 * ```
 */

function useDialogState(props) {
  if (props === void 0) {
    props = {};
  }

  const disclosure = disclosure_disclosureState.useDisclosureState(props);
  return disclosure;
}

exports.useDialogState = useDialogState;
