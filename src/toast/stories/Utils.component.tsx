import * as React from "react";
import { Dict, isFunction, objectKeys } from "@chakra-ui/utils";

import {
  createToastStore,
  DefaultToastOptions,
  TimerToast,
  useToastTimer,
} from "../../index";

export interface Toast extends TimerToast {
  content?: Content;
  placement: ToastPlacement;
}

export type Renderable = JSX.Element | string | number | null;

export type ValueFunction<Value, Arg> = (arg: Arg) => Value;

export type ValueOrFunction<Value, Arg> = Value | ValueFunction<Value, Arg>;

export type ContentType = {
  toast: Toast;
  handlers: useToastsReturnType;
};

export type Content = ValueOrFunction<Renderable, ContentType> | Dict;

export type ToastPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/* =========================================================================
  Toast Provider
  ========================================================================== */
const defaultOptions: DefaultToastOptions<Toast> = {
  animationDuration: 300,
  pausedAt: null,
  pauseDuration: 0,
  placement: "bottom-center",
  autoDismiss: false,
  dismissDuration: 3000,
};

const [ToastProvider, useToastStore, useCreateToast, useToastHandlers] =
  createToastStore<Toast, Content>(defaultOptions);

export { ToastProvider, useCreateToast, useToastHandlers, useToastStore };

/* =========================================================================
  ToastBarHelpers
  ========================================================================== */
export const useToasts = () => {
  const { toasts } = useToastStore();
  const { updateToast, removeToast, ...restHanlders } = useToastHandlers();
  const visibleToasts = toasts.filter(t => t.visible);
  const sortedToasts = getPlacementSortedToasts(toasts);
  const timerHandlers = useToastTimer(visibleToasts, updateToast, removeToast);

  return {
    toasts: sortedToasts,
    ...timerHandlers,
    removeToast,
    ...restHanlders,
  };
};

export type useToastsReturnType = ReturnType<typeof useToasts>;

/* =========================================================================
  Components - Trigger
  ========================================================================== */
export const TriggerButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> =
  props => {
    const { style, ...rest } = props;

    return (
      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
          height: "1rem",
          minWidth: "1rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          paddingRight: "0.5rem",
          paddingLeft: "0.5rem",
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 500,
          boxShadow: "none",
          border: "none",
          color: "white",
          verticalAlign: "middle",
          transition: "all 0.3s ease",
          background: "black",
          borderRadius: "6px",
          appearance: "none",
          whiteSpace: "nowrap",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          cursor: "pointer",
          ...style,
        }}
        {...rest}
      />
    );
  };

const contents = [
  "Amet soufflé carrot cake tootsie roll jelly-o chocolate cake.",
  "Chocolate bar gummies sweet roll macaroon powder sweet tart croissant.",
  "Pastry ice cream bear claw cupcake topping caramels jelly beans chocolate cheesecake.",
  "Candy canes pastry cake tart powder.",
  "Tootsie roll bear claw sesame snaps candy cheesecake caramels cookie.",
  "Lemon drops donut marzipan gummi bears cotton candy cotton candy jelly-o carrot cake.",
  "Lemon drops pastry apple pie biscuit tart tootsie roll.",
  "Brownie icing chupa chups cake cookie halvah gummi bears halvah.",
  "Sesame snaps donut gingerbread marshmallow topping powder.",
  "Biscuit chocolate cheesecake pudding candy canes tart halvah sweet.",
  "Sugar plum cake candy carrot cake.",
  "Ice cream marzipan liquorice candy canes sesame snaps danish soufflé lollipop candy canes.",
  "Lemon drops cotton candy pudding.",
  "Pie cake soufflé cupcake jujubes sugar plum.",
  "Liquorice lollipop oat cake.",
];
const types = ["info", "success", "warning", "error"];
const placements = [
  { placement: "top-left", reverseOrder: false },
  { placement: "top-center", reverseOrder: false },
  { placement: "top-right", reverseOrder: false },
  { placement: "bottom-left", reverseOrder: true },
  { placement: "bottom-center", reverseOrder: true },
  { placement: "bottom-right", reverseOrder: true },
];

export function getRandomItems(items: any) {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export function getRandomContent() {
  return getRandomItems(contents);
}

export function getRandomType() {
  return getRandomItems(types);
}

export function getRandomPlacement() {
  return getRandomItems(placements);
}

/* =========================================================================
  Components - Alert
  ========================================================================== */

export const ToastBar = () => {
  const handlers = useToasts();
  const { toasts } = handlers;

  return (
    <>
      {objectKeys(toasts).map(placement => {
        const toastsList = toasts[placement];

        return (
          <ToastContainer key={placement} placement={placement}>
            {toastsList.map(toast => {
              const { content } = toast;
              return (
                <React.Fragment key={toast.id}>
                  {isFunction(content) ? content({ toast, handlers }) : content}
                </React.Fragment>
              );
            })}
          </ToastContainer>
        );
      })}
    </>
  );
};

const placememtStyles = {
  "top-left": { top: 10, left: 20 },
  "top-center": { top: 10, left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: 10, right: 20 },
  "bottom-left": { bottom: 10, left: 20 },
  "bottom-center": { bottom: 10, left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: 10, right: 20 },
};

export const ToastContainer: React.FC<Pick<Toast, "placement">> = props => {
  const { placement, ...rest } = props;

  return (
    <div
      style={{
        boxSizing: "border-box",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "fixed",
        zIndex: 9999,
        ...placememtStyles[placement],
      }}
      {...rest}
    />
  );
};

function getTranslate(placement: ToastPlacement) {
  const pos = placement.split("-");
  const relevantPlacement = pos[1] === "center" ? pos[0] : pos[1];
  const translateMap = {
    right: "translate3d(120%, 0, 0)",
    left: "translate3d(-120%, 0, 0)",
    bottom: "translate3d(0, 120%, 0)",
    top: "translate3d(0, -120%, 0)",
  };

  return translateMap[relevantPlacement];
}

export const ToastWrapper: React.FC<{ toast: Toast }> = props => {
  const { toast, children } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{
        transition: "all 0.3s ease",
        transform: toast.visible
          ? "translate3d(0,0,0)"
          : getTranslate(toast.placement),
        opacity: toast.visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

// Styles from https://jossmac.github.io/react-toast-notifications/
export type AlertType = "info" | "success" | "error" | "warning";
export const Alert: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    toast: Toast;
    hideToast: (toastId: string) => void;
    type?: AlertType;
    content: any;
  }
> = props => {
  const { toast, type = "info", content, hideToast, children, ...rest } = props;

  return (
    <AlertWrapper type={type} {...rest}>
      {children}
      <AlertContent>{content}</AlertContent>
      <CloseButton toast={toast} hideToast={hideToast} />
    </AlertWrapper>
  );
};

const typeStyles = {
  info: {
    bg: "white",
    color: "rgb(80, 95, 121)",
    indicator: "rgb(38, 132, 255)",
  },
  success: {
    bg: "rgb(227, 252, 239)",
    color: "rgb(0, 102, 68)",
    indicator: "rgb(54, 179, 126)",
  },
  error: {
    bg: "rgb(255, 235, 230)",
    color: "rgb(191, 38, 0)",
    indicator: "rgb(255, 86, 48)",
  },
  warning: {
    bg: "rgb(255, 250, 230)",
    color: "rgb(255, 139, 0)",
    indicator: "rgb(255, 171, 0)",
  },
};

export const AlertWrapper: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { type: AlertType }
> = props => {
  const { type, ...rest } = props;

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        width: "360px",
        padding: "8px",
        backgroundColor: typeStyles[type].bg,
        color: typeStyles[type].color,
        borderRadius: "4px",
        marginBottom: "20px",
        boxShadow: "rgb(0 0 0 / 18%) 0px 3px 8px",
      }}
      {...rest}
    />
  );
};

export const AlertIndicator: React.FC<{
  toast: Toast;
  type?: AlertType;
}> = props => {
  const { toast, type = "info", ...rest } = props;

  return (
    <div
      style={{
        backgroundColor: typeStyles[type].indicator,
        borderTopLeftRadius: "4px",
        borderBottomLeftRadius: "4px",
        color: "rgb(227, 252, 239)",
        flexShrink: 0,
        paddingBottom: "8px",
        paddingTop: "8px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        width: "4px",
        borderRadius: "4px",
      }}
      {...rest}
    >
      <div
        style={{
          animation: `shrink ${toast.dismissDuration}ms linear`,
          animationPlayState: toast.pausedAt ? "paused" : "running",
          backgroundColor: "rgba(0,0,0,0.1)",
          bottom: 0,
          height: 0,
          left: 0,
          opacity: toast.autoDismiss ? 1 : 0,
          position: "absolute",
          width: "100%",
        }}
      ></div>
    </div>
  );
};

export const AlertContent: React.FC<{}> = props => {
  return (
    <div style={{ flexGrow: 1, lineHeight: 1.5, padding: "8px" }} {...props} />
  );
};

export const CloseButton: React.FC<{
  toast: Toast;
  hideToast: (toastId: string) => void;
}> = props => {
  const { toast, hideToast, ...rest } = props;

  return (
    <TriggerButton
      style={{
        cursor: "pointer",
        flexShrink: 0,
        background: "transparent",
        color: "black",
        alignSelf: "center",
      }}
      onClick={() => hideToast(toast.id)}
      {...rest}
    >
      <CloseIcon />
      <div className="sr-only">Close</div>
    </TriggerButton>
  );
};

export const CloseIcon: React.FC<{}> = props => {
  return (
    <svg
      aria-hidden="true"
      height="20"
      width="20"
      viewBox="0 0 14 16"
      style={{
        display: "inline-block",
        verticalAlign: "text-top",
        fill: "currentcolor",
      }}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
      />
    </svg>
  );
};

/* =========================================================================
  Helpers
  ========================================================================== */
export type SortedToastList = Record<ToastPlacement, Toast[]>;

export const getPlacementSortedToasts = (toasts: Toast[]) =>
  toasts.reduce((acc, curr) => {
    if (!acc[curr.placement]) acc[curr.placement] = [];
    acc[curr.placement].push(curr);
    return acc;
  }, {} as SortedToastList);
