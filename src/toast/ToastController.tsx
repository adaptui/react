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
    onDrag: ({ down, movement: [x] }) => {
      down && setX(x);

      if (x > 100 || x < -100) {
        onRequestRemove(id);
      } else {
        !down && setX(0);
      }
    },
    onMouseUp: () => setX(0),
  });

  React.useEffect(() => {
    setDelay(duration);
  }, [duration]);

  const onMouseEnter = React.useCallback(() => {
    setDelay(null);
  }, []);

  const onMouseLeave = React.useCallback(() => {
    setDelay(duration);
  }, [duration]);

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
