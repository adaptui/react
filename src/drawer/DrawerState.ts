import {
  DialogActions,
  DialogInitialState,
  DialogState,
  useDialogState,
} from "../dialog";

export type DrawerState = DialogState & {};

export type DrawerActions = DialogActions & {};

export type DrawerInitialState = DialogInitialState;

export type DrawerStateReturn = DrawerState & DrawerActions;

export function useDrawerState(
  props: DrawerInitialState = {},
): DrawerStateReturn {
  const dialog = useDialogState(props);

  return {
    ...dialog,
  };
}
