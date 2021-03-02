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
  reverseOrder: boolean;
  pausedAt: number | null;
  type: ToastTypes;
  placement: ToastPlacement;
  autoDismiss: boolean;
  dismissDuration: number;
  animationDuration: number;
}

type ConfigurableToastOptions = Pick<
  Toast,
  | "id"
  | "autoDismiss"
  | "dismissDuration"
  | "type"
  | "placement"
  | "reverseOrder"
  | "animationDuration"
>;

export type CreateToastOptions = Partial<ConfigurableToastOptions>;

export type DefaultToastOptions = Omit<ConfigurableToastOptions, "id">;

export type ToastOptions = Partial<DefaultToastOptions>;
