import React from "react";
import { useTimeout } from "@chakra-ui/hooks";

interface ToastControllerProps {
  id: string;
  duration?: number;
  autoDismiss?: boolean;
  dragThreshold?: number;
  onRequestRemove: (id: string) => void;
}

export const ToastController: React.FC<ToastControllerProps> = ({
  id,
  duration = 0,
  autoDismiss,
  onRequestRemove,
  dragThreshold = 100,
  children,
}) => {
  const [delay, setDelay] = React.useState<number | null>(duration);

  const [active, setActive] = React.useState<boolean>(false);
  const [currentX, setCurrentX] = React.useState<number>(0);
  const [initialX, setInitialX] = React.useState<number>(0);
  const [xOffset, setXOffset] = React.useState<number>(0);
  const [posX, setPosX] = React.useState<number>(0);

  const dragStart = React.useCallback(
    (e: React.TouchEvent) => {
      setInitialX(e.touches[0].clientX - xOffset);

      setActive(true);
    },
    [xOffset],
  );

  const dragEnd = React.useCallback(() => {
    active && setPosX(0);

    setInitialX(currentX);
    setActive(false);
  }, [active, currentX]);

  const drag = React.useCallback(
    (e: React.TouchEvent) => {
      if (active) {
        e.preventDefault();

        setCurrentX(e.touches[0].clientX - initialX);
        setXOffset(currentX);
        setPosX(currentX);
      }
    },
    [active, currentX, initialX],
  );

  React.useEffect(() => {
    if (posX > dragThreshold || posX < -dragThreshold) {
      setActive(false);
      onRequestRemove(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posX]);

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
    onTouchStart: dragStart,
    onTouchEnd: dragEnd,
    onTouchMove: drag,
    role: "alert",
    className: "toast",
    style: {
      transform: `translateX(${posX}px)`,
      ...(active && { transition: "none" }),
    },
  };

  return <div {...props}>{children}</div>;
};
