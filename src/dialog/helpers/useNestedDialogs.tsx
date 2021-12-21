import * as React from "react";
import { removeItemFromArray } from "reakit-utils/removeItemFromArray";

import { DialogOptions } from "../Dialog";

type DialogRef = React.RefObject<HTMLElement>;

const DialogContext = React.createContext<{
  visible?: boolean;
  addDialog?: (ref: DialogRef) => void;
  removeDialog?: (ref: DialogRef) => void;
  showDialog?: (ref: DialogRef) => void;
  hideDialog?: (ref: DialogRef) => void;
}>({});

export function useNestedDialogs(dialogRef: DialogRef, options: DialogOptions) {
  const context = React.useContext(DialogContext);

  const [dialogs, setDialogs] = React.useState<Array<DialogRef>>([]);
  const [visibleModals, setVisibleModals] = React.useState(dialogs);

  const addDialog = React.useCallback(
    (ref: DialogRef) => {
      context.addDialog?.(ref);
      setDialogs(prevDialogs => [...prevDialogs, ref]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.addDialog],
  );

  const removeDialog = React.useCallback(
    (ref: DialogRef) => {
      context.removeDialog?.(ref);
      setDialogs(prevDialogs => removeItemFromArray(prevDialogs, ref));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.removeDialog],
  );

  const showDialog = React.useCallback(
    (ref: DialogRef) => {
      context.showDialog?.(ref);
      setVisibleModals(prevDialogs => [...prevDialogs, ref]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.showDialog],
  );

  const hideDialog = React.useCallback(
    (ref: DialogRef) => {
      context.hideDialog?.(ref);
      setVisibleModals(prevDialogs => removeItemFromArray(prevDialogs, ref));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.hideDialog],
  );

  // If it's a nested dialog, add it to context
  React.useEffect(() => {
    if (options.unstable_orphan) return undefined;
    context.addDialog?.(dialogRef);
    return () => {
      context.removeDialog?.(dialogRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.unstable_orphan,
    context.addDialog,
    dialogRef,
    context.removeDialog,
  ]);

  React.useEffect(() => {
    if (options.unstable_orphan) return undefined;
    if (!options.modal) return undefined;
    if (!options.visible) return undefined;
    context.showDialog?.(dialogRef);
    return () => {
      context.hideDialog?.(dialogRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.unstable_orphan,
    options.modal,
    options.visible,
    context.showDialog,
    dialogRef,
    context.hideDialog,
  ]);

  // Close all nested dialogs when parent dialog closes
  React.useEffect(() => {
    if (
      context.visible === false &&
      options.visible &&
      !options.unstable_orphan
    ) {
      options.hide?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.visible, options.visible, options.hide, options.unstable_orphan]);

  // Provider
  const providerValue = React.useMemo(
    () => ({
      visible: options.visible,
      addDialog,
      removeDialog,
      showDialog,
      hideDialog,
    }),
    [options.visible, addDialog, removeDialog, showDialog, hideDialog],
  );

  const wrap = React.useCallback(
    (element: React.ReactNode) => (
      <DialogContext.Provider value={providerValue}>
        {element}
      </DialogContext.Provider>
    ),
    [providerValue],
  );

  return { dialogs, visibleModals, wrap };
}
