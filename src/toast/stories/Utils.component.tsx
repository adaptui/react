import * as React from "react";
import type { MutableRefObject } from "react";

import { Toast, ToastPlacement } from "../index";

export type SortedToastList = Record<ToastPlacement, Toast[]>;

export function getPlacementSortedToasts(toasts: Toast[]) {
  const sortedToasts = {};

  for (const key in toasts) {
    const toast = toasts[key];
    const { placement = "bottom-right" } = toast;
    sortedToasts[placement] || (sortedToasts[placement] = []);
    sortedToasts[placement].push(toast);
  }

  return sortedToasts as SortedToastList;
}

export const TriggerButton: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = props => {
  const { className, ...rest } = props;

  return (
    <button
      className={`inline-flex items-center justify-center w-auto h-10 px-4 text-sm font-medium text-white align-middle transition-all bg-gray-800 rounded-lg appearance-none select-none whitespace-nowrap min-w-10 ${className}`}
      {...rest}
    />
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
  const { placement = "bottom-right", ...rest } = props;

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
          : getTranslate(toast.placement || "bottom-right"),
        opacity: toast.visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

// Styles from https://jossmac.github.io/react-toast-notifications/
export const Alert: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    toast: Toast;
    hideToast: (toastId?: string | undefined) => void;
  }
> = props => {
  const { toast, hideToast, children, ...rest } = props;

  return (
    <AlertWrapper type={toast.type || "info"} {...rest}>
      {children}
      <AlertContent>{toast.content}</AlertContent>
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
  React.HTMLAttributes<HTMLDivElement> & { type: string }
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

export const AlertIndicator: React.FC<{ toast: Toast }> = props => {
  const { toast, ...rest } = props;

  return (
    <div
      style={{
        backgroundColor: typeStyles[toast.type || "info"].indicator,
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
          animation: `shrink ${toast.duration}ms linear`,
          animationPlayState: toast.pausedAt ? "paused" : "running",
          backgroundColor: "rgba(0,0,0,0.1)",
          bottom: 0,
          height: 0,
          left: 0,
          opacity: toast.duration !== Infinity ? 1 : 0,
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
  hideToast: (toastId?: string | undefined) => void;
}> = props => {
  const { toast, hideToast, ...rest } = props;
  return (
    <button
      style={{
        cursor: "pointer",
        flexShrink: 0,
        padding: "8px",
      }}
      onClick={() => hideToast(toast.id)}
      {...rest}
    >
      <CloseIcon />
      <div className="sr-only">Close</div>
    </button>
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

/**
 * a type-safe version of the `usePrevious` hook described here:
 * @see {@link https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state}
 */
export function usePrevious<T>(
  value: T,
): MutableRefObject<T | undefined>["current"] {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
