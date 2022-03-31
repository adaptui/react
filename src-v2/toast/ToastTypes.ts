export interface DefaultToast {
  id: string;
  visible: boolean;
  reverseOrder: boolean;
  animationDuration: number;
}

export type TimerToast = DefaultToast & {
  createdAt: number;
  pauseDuration: number;
  pausedAt: number | null;
  autoDismiss: boolean;
  dismissDuration: number;
};

export interface State<T> {
  toasts: T[];
}

export enum ActionType {
  ADD_TOAST,
  UPSERT_TOAST,
  UPDATE_TOAST,
  UPDATE_FIELD_TOAST,
  UPDATE_ALL_TOAST,
  DISMISS_TOAST,
  REMOVE_TOAST,
}

export type Action<T> =
  | {
      type: ActionType.ADD_TOAST;
      toast: T;
      maxToasts?: number;
    }
  | {
      type: ActionType.UPSERT_TOAST;
      toast: T;
    }
  | {
      type: ActionType.UPDATE_TOAST;
      toast: Partial<T>;
    }
  | {
      type: ActionType.UPDATE_FIELD_TOAST;
      field: keyof T;
      fieldValue: any;
      toast: Partial<T>;
    }
  | {
      type: ActionType.UPDATE_ALL_TOAST;
      toast: Partial<T>;
    }
  | {
      type: ActionType.DISMISS_TOAST;
      toastId?: string;
    }
  | {
      type: ActionType.REMOVE_TOAST;
      toastId?: string;
    };
