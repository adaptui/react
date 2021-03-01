export type Renderable = JSX.Element | string | number | null;

export type ValueFunction<Value, Arg> = (arg: Arg) => Value;

export type ValueOrFunction<Value, Arg> = Value | ValueFunction<Value, Arg>;

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
  visible: boolean;
  pauseDuration: number;
  content: Content;
  pausedAt?: number;
  type?: ToastTypes;
  placement?: ToastPlacement;
  duration?: number;
  reverseOrder?: boolean;
}

export type ToastOptions = Partial<
  Pick<Toast, "id" | "duration" | "type" | "placement" | "reverseOrder">
>;

export type DefaultToastOptions = Omit<ToastOptions, "id">;
