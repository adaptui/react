import * as React from "react";

import { Action, ActionType, DefaultToast, State } from "./ToastTypes";

const TOAST_LIMIT = 20;

const reducer = <T extends DefaultToast>(
  state: State<T>,
  action: Action<T>,
): State<T> => {
  switch (action.type) {
    case ActionType.ADD_TOAST: {
      const maxToasts = action.maxToasts || TOAST_LIMIT;

      return {
        ...state,
        toasts: action.toast.reverseOrder
          ? [...state.toasts, action.toast].slice(-maxToasts)
          : [action.toast, ...state.toasts].slice(-maxToasts),
      };
    }

    case ActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case ActionType.UPDATE_FIELD_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(t =>
          t[action.field] === action.fieldValue ? { ...t, ...action.toast } : t,
        ),
      };

    case ActionType.UPDATE_ALL_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(t => ({ ...t, ...action.toast })),
      };

    case ActionType.UPSERT_TOAST:
      const { toast } = action;
      return state.toasts.find(t => t.id === toast.id)
        ? reducer(state, { type: ActionType.UPDATE_TOAST, toast })
        : reducer(state, { type: ActionType.ADD_TOAST, toast });

    case ActionType.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === action.toastId || action.toastId === undefined
            ? {
                ...t,
                visible: false,
              }
            : t,
        ),
      };

    case ActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId),
      };
  }
};

const initialState = { toasts: [] };

export const useToastState = <T extends DefaultToast>(): StateReturnType<T> => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<State<T>, Action<T>>
  >(reducer, initialState);

  return { toasts: state.toasts, dispatch };
};

export interface StateReturnType<T> {
  toasts: T[];
  dispatch: React.Dispatch<Action<T>>;
}
