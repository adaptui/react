export type Renderable = JSX.Element | string | number | null;

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> =
  | TValue
  | ValueFunction<TValue, TArg>;
export type Content = ValueOrFunction<Renderable, Toast>;

export type ToastTypes = "info" | "success" | "warning" | "error";

export type ToastPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface Toast {
  createdAt: number;
  id: string;
  content: Content;
  visible: boolean;
  reverseOrder: boolean;
  pauseDuration: number;
  type: ToastTypes;
  placement: ToastPlacement;
  duration?: number;
  pausedAt?: number;
}

export type ToastOptions = Partial<
  Pick<Toast, "id" | "duration" | "type" | "placement" | "reverseOrder">
>;
