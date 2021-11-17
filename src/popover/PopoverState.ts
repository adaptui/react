import * as React from "react";

import {
  DialogActions,
  DialogInitialState,
  DialogState,
  useDialogState,
} from "../dialog";

import { getPlacementData, PlacementData } from "./popper-core";
import { useRect } from "./useRect";
import { useSize } from "./useSize";

export type PopoverState = DialogState &
  PlacementData & {
    side: "top" | "bottom" | "left" | "right";
    align: "start" | "center" | "end";
    sideOffset: number;
    alignOffset: number;
    arrowOffset: number;
    collisionTolerance: number;
    anchor: HTMLDivElement | null;
    popper: HTMLDivElement | null;
    arrow: HTMLDivElement | null;
  };

export type PopoverActions = DialogActions & {
  setSide: React.Dispatch<React.SetStateAction<PopoverState["side"]>>;
  setAlign: React.Dispatch<React.SetStateAction<PopoverState["align"]>>;
  setSideOffset: React.Dispatch<React.SetStateAction<number>>;
  setAlignOffset: React.Dispatch<React.SetStateAction<number>>;
  setArrowOffset: React.Dispatch<React.SetStateAction<number>>;
  setCollisionTolerance: React.Dispatch<React.SetStateAction<number>>;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  setPopper: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  setArrow: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

export type PopoverStateReturn = PopoverState & PopoverActions;

export type PopoverInitialState = DialogInitialState &
  Partial<
    Pick<
      PopoverState,
      | "side"
      | "align"
      | "sideOffset"
      | "alignOffset"
      | "arrowOffset"
      | "collisionTolerance"
    >
  > & {
    enableCollisionsDetection?: boolean;
  };

export const usePopoverState = (
  props: PopoverInitialState = {},
): PopoverStateReturn => {
  const {
    enableCollisionsDetection,
    side: initialSide = "bottom",
    align: initialAlign = "center",
    sideOffset: initialSideOffset = 5,
    alignOffset: initialAlignOffset = 0,
    arrowOffset: initialArrowOffset = 20,
    collisionTolerance: initialCollisionTolerance = 0,
    modal = false,
    ...restProps
  } = props;
  const dialog = useDialogState({ modal, ...restProps });

  const [side, setSide] = React.useState(initialSide);
  const [align, setAlign] = React.useState(initialAlign);
  const [sideOffset, setSideOffset] = React.useState(initialSideOffset);
  const [alignOffset, setAlignOffset] = React.useState(initialAlignOffset);
  const [arrowOffset, setArrowOffset] = React.useState(initialArrowOffset);
  const [collisionTolerance, setCollisionTolerance] = React.useState(
    initialCollisionTolerance,
  );

  const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);
  const anchorRect = useRect(anchor);

  const [popper, setPopper] = React.useState<HTMLDivElement | null>(null);
  const popperSize = useSize(popper);

  const [arrow, setArrow] = React.useState<HTMLDivElement | null>(null);
  const arrowSize = useSize(arrow);

  const windowSize = useWindowSize();
  const collisionBoundariesRect = windowSize
    ? DOMRect.fromRect({ ...windowSize, x: 0, y: 0 })
    : undefined;

  const placementData = getPlacementData({
    popperSize,
    anchorRect,
    arrowSize,
    arrowOffset,
    side,
    sideOffset,
    align,
    alignOffset,
    shouldAvoidCollisions: enableCollisionsDetection,
    collisionBoundariesRect,
    collisionTolerance,
  });

  return {
    ...placementData,
    ...dialog,
    side,
    align,
    sideOffset,
    alignOffset,
    arrowOffset,
    collisionTolerance,
    anchor,
    popper,
    arrow,
    setSide,
    setAlign,
    setSideOffset,
    setAlignOffset,
    setArrowOffset,
    setCollisionTolerance,
    setAnchor,
    setPopper,
    setArrow,
  };
};

const WINDOW_RESIZE_DEBOUNCE_WAIT_IN_MS = 100;

function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<
    { width: number; height: number } | undefined
  >(undefined);

  React.useEffect(() => {
    let debounceTimerId: number;

    function updateWindowSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    function handleResize() {
      window.clearTimeout(debounceTimerId);
      debounceTimerId = window.setTimeout(
        updateWindowSize,
        WINDOW_RESIZE_DEBOUNCE_WAIT_IN_MS,
      );
    }

    updateWindowSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
