import React from "react";
import { useTimeout } from "@chakra-ui/hooks";
import { useGesture } from "react-use-gesture";

interface ToastControllerProps {
  id: string;
  onRequestRemove: (id: string) => void;
  duration?: number;
  autoDismiss?: boolean;
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
    className: "toast",
    style: { transform: `translateX(${x}px)` },
    ...bind(),
  };

  return <div {...props}>{children}</div>;
};
