import { disableTextSelection, restoreTextSelection } from "./textSelection";
import React, { HTMLAttributes, useMemo, useRef } from "react";
import { useGlobalListeners } from "./useGlobalListeners";

export interface BaseMoveEvent {
  pointerType: "mouse" | "pen" | "touch" | "keyboard";
}

export interface MoveStartEvent extends BaseMoveEvent {
  type: "movestart";
}

export interface MoveMoveEvent extends BaseMoveEvent {
  type: "move";
  deltaX: number;
  deltaY: number;
}

export interface MoveEndEvent extends BaseMoveEvent {
  type: "moveend";
}

export type MoveEvent = MoveStartEvent | MoveMoveEvent | MoveEndEvent;

export interface MoveProps {
  onMoveStart?: (e: MoveStartEvent) => void;
  onMove: (e: MoveMoveEvent) => void;
  onMoveEnd?: (e: MoveEndEvent) => void;
}

export function useMove(props: MoveProps): HTMLAttributes<HTMLElement> {
  const { onMoveStart, onMove, onMoveEnd } = props;

  const state = useRef<{
    didMove: boolean;
    lastPosition: { pageX: number; pageY: number } | null;
    id: number | null;
  }>({ didMove: false, lastPosition: null, id: null });

  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();

  const moveProps = useMemo(() => {
    const moveProps: HTMLAttributes<HTMLElement> = {};

    const start = () => {
      disableTextSelection();
      state.current.didMove = false;
    };
    const move = (
      pointerType: BaseMoveEvent["pointerType"],
      deltaX: number,
      deltaY: number,
    ) => {
      if (!state.current.didMove) {
        state.current.didMove = true;
        onMoveStart?.({
          type: "movestart",
          pointerType,
        });
      }
      onMove({
        type: "move",
        pointerType,
        deltaX: deltaX,
        deltaY: deltaY,
      });
    };
    const end = (pointerType: BaseMoveEvent["pointerType"]) => {
      restoreTextSelection();
      if (state.current.didMove) {
        onMoveEnd?.({
          type: "moveend",
          pointerType,
        });
      }
    };

    if (typeof PointerEvent === "undefined") {
      const onMouseMove = (e: MouseEvent) => {
        if (e.button === 0) {
          move(
            "mouse",
            e.pageX - state.current.lastPosition.pageX,
            e.pageY - state.current.lastPosition.pageY,
          );
          state.current.lastPosition = { pageX: e.pageX, pageY: e.pageY };
        }
      };
      const onMouseUp = (e: MouseEvent) => {
        if (e.button === 0) {
          end("mouse");
          removeGlobalListener(window, "mousemove", onMouseMove, false);
          removeGlobalListener(window, "mouseup", onMouseUp, false);
        }
      };
      moveProps.onMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0) {
          start();
          e.stopPropagation();
          e.preventDefault();
          state.current.lastPosition = { pageX: e.pageX, pageY: e.pageY };
          addGlobalListener(window, "mousemove", onMouseMove, false);
          addGlobalListener(window, "mouseup", onMouseUp, false);
        }
      };

      const onTouchMove = (e: TouchEvent) => {
        // @ts-ignore
        const touch = [...e.changedTouches].findIndex(
          ({ identifier }) => identifier === state.current.id,
        );
        if (touch >= 0) {
          const { pageX, pageY } = e.changedTouches[touch];
          move(
            "touch",
            pageX - state.current.lastPosition.pageX,
            pageY - state.current.lastPosition.pageY,
          );
          state.current.lastPosition = { pageX, pageY };
        }
      };
      const onTouchEnd = (e: TouchEvent) => {
        // @ts-ignore
        const touch = [...e.changedTouches].findIndex(
          ({ identifier }) => identifier === state.current.id,
        );
        if (touch >= 0) {
          end("touch");
          state.current.id = null;
          removeGlobalListener(window, "touchmove", onTouchMove);
          removeGlobalListener(window, "touchend", onTouchEnd);
          removeGlobalListener(window, "touchcancel", onTouchEnd);
        }
      };
      moveProps.onTouchStart = (e: React.TouchEvent) => {
        if (e.changedTouches.length === 0 || state.current.id != null) {
          return;
        }

        const { pageX, pageY, identifier } = e.changedTouches[0];
        start();
        e.stopPropagation();
        e.preventDefault();
        state.current.lastPosition = { pageX, pageY };
        state.current.id = identifier;
        addGlobalListener(window, "touchmove", onTouchMove, false);
        addGlobalListener(window, "touchend", onTouchEnd, false);
        addGlobalListener(window, "touchcancel", onTouchEnd, false);
      };
    } else {
      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerId === state.current.id) {
          // @ts-ignore
          const pointerType: BaseMoveEvent["pointerType"] =
            e.pointerType || "mouse";

          // Problems with PointerEvent#movementX/movementY:
          // 1. it is always 0 on macOS Safari.
          // 2. On Chrome Android, it's scaled by devicePixelRatio, but not on Chrome macOS
          move(
            pointerType,
            e.pageX - state.current.lastPosition.pageX,
            e.pageY - state.current.lastPosition.pageY,
          );
          state.current.lastPosition = { pageX: e.pageX, pageY: e.pageY };
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (e.pointerId === state.current.id) {
          // @ts-ignore
          const pointerType: BaseMoveEvent["pointerType"] =
            e.pointerType || "mouse";
          end(pointerType);
          state.current.id = null;
          removeGlobalListener(window, "pointermove", onPointerMove, false);
          removeGlobalListener(window, "pointerup", onPointerUp, false);
          removeGlobalListener(window, "pointercancel", onPointerUp, false);
        }
      };

      moveProps.onPointerDown = (e: React.PointerEvent) => {
        if (e.button === 0 && state.current.id == null) {
          start();
          e.stopPropagation();
          e.preventDefault();
          state.current.lastPosition = { pageX: e.pageX, pageY: e.pageY };
          state.current.id = e.pointerId;
          addGlobalListener(window, "pointermove", onPointerMove, false);
          addGlobalListener(window, "pointerup", onPointerUp, false);
          addGlobalListener(window, "pointercancel", onPointerUp, false);
        }
      };
    }

    const triggetKeyboardMove = (deltaX: number, deltaY: number) => {
      start();
      move("keyboard", deltaX, deltaY);
      end("keyboard");
    };

    moveProps.onKeyDown = e => {
      switch (e.key) {
        case "Left":
        case "ArrowLeft":
          e.preventDefault();
          e.stopPropagation();
          triggetKeyboardMove(-1, 0);
          break;
        case "Right":
        case "ArrowRight":
          e.preventDefault();
          e.stopPropagation();
          triggetKeyboardMove(1, 0);
          break;
        case "Up":
        case "ArrowUp":
          e.preventDefault();
          e.stopPropagation();
          triggetKeyboardMove(0, -1);
          break;
        case "Down":
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          triggetKeyboardMove(0, 1);
          break;
      }
    };

    return moveProps;
  }, [
    state,
    onMoveStart,
    onMove,
    onMoveEnd,
    addGlobalListener,
    removeGlobalListener,
  ]);

  return moveProps;
}
