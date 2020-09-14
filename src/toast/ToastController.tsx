import React from "react";
import { useTimeout } from "@chakra-ui/hooks";
import { useGesture } from "react-use-gesture";

interface ToastControllerProps {
  id: string;
  duration?: number;
  autoDismiss?: boolean;
  onRequestRemove: (id: string) => void;
}

export const ToastController: React.FC<ToastControllerProps> = ({
  id,
  duration = 0,
  autoDismiss,
  onRequestRemove,
  children,
}) => {
  const [delay, setDelay] = React.useState<number | null>(duration);
  const [x, setX] = React.useState(0);

  const bind = useGesture({
    onDrag: ({ down, movement: [x] }: any) => {
      if (!down) setX(0);

      setX(x);
      setDelay(null);

      if (x > 100 || x < -100) {
        onRequestRemove(id);
      }
    },
    onMouseUp: () => setX(0),
  });

  const onMouseEnter = React.useCallback(() => {
    autoDismiss && setDelay(null);
  }, [autoDismiss]);

  const onMouseLeave = React.useCallback(() => {
    autoDismiss && setDelay(duration);
  }, [autoDismiss, duration]);

  useTimeout(() => {
    if (autoDismiss) {
      onRequestRemove(id);
    }
  }, delay);

  const props = {
    id,
    onMouseLeave,
    onMouseEnter,
    role: "alert",
    className: "toast",
    style: { transform: `translateX(${x}px)` },
    ...bind(),
  };

  return <div {...props}>{children}</div>;
};
