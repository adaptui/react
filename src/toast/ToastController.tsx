import React from "react";
import { useTimeout } from "@chakra-ui/hooks";

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

  // document.addEventListener("touchstart", handleTouchStart, false);
  // document.addEventListener("touchmove", handleTouchMove, false);

  const [xDown, setXDown] = React.useState<number | null>(null);
  const [yDown, setYDown] = React.useState<number | null>(null);

  function getTouches(evt: React.TouchEvent) {
    return evt.touches;
  }

  function handleTouchStart(evt: React.TouchEvent) {
    const firstTouch = getTouches(evt)[0];
    setXDown(firstTouch.clientX);
    setYDown(firstTouch.clientY);
  }

  function handleTouchMove(evt: React.TouchEvent) {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        console.log("left");
        /* left swipe */
      } else {
        console.log("right");
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    setXDown(null);
    setYDown(null);
  }

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
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    role: "alert",
    className: "toast",
    style: { transform: `translateX(${0}px)` },
  };

  return <div {...props}>{children}</div>;
};
