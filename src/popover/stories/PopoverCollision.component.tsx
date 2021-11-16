import * as React from "react";

import { Arrow } from "../Arrow";
import { ArrowContent } from "../ArrowContent";
import { Popover } from "../Popover";
import { PopoverContent } from "../PopoverContent";
import { PopoverDisclosure } from "../PopoverDisclosure";
import { usePopoverState } from "../PopoverState";
import { ALIGN_OPTIONS, SIDE_OPTIONS } from "../popper-core";

export const PopoverCollision = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "200vw",
        height: "200vh",
      }}
    >
      <Demo />
    </div>
  );
};

const Demo = ({ disableCollisions = false }) => {
  const state = usePopoverState({
    enableCollisionsDetection: !disableCollisions,
  });
  const {
    sideIndex,
    setSideIndex,
    alignIndex,
    setAlignIndex,
    collisionTolerance,
    setCollisionTolerance,
    sideOffset,
    setSideOffset,
    alignOffset,
    setAlignOffset,
    arrowOffset,
    setArrowOffset,
  } = state;

  return (
    <>
      <PopoverDisclosure
        {...state}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          backgroundColor: "#ccc",
        }}
      >
        Anchor
      </PopoverDisclosure>

      <Popover {...state}>
        <PopoverContent
          {...state}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 180,
            height: 180,
            backgroundColor: "hotpink",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 10,
              }}
            >
              side
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <select
                value={sideIndex}
                onChange={event => setSideIndex(Number(event.target.value))}
                style={{ marginBottom: 10 }}
              >
                {SIDE_OPTIONS.map((side, index) => (
                  <option key={side} value={index}>
                    {side}
                  </option>
                ))}
              </select>
              align
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <select
                value={alignIndex}
                onChange={event => setAlignIndex(Number(event.target.value))}
                style={{ marginBottom: 10 }}
              >
                {ALIGN_OPTIONS.map((align, index) => (
                  <option key={align} value={index}>
                    {align}
                  </option>
                ))}
              </select>
              arrowOffset
              <input
                type="number"
                min="-50"
                max="50"
                step="1"
                value={arrowOffset}
                onChange={event => setArrowOffset(Number(event.target.value))}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              offset
              <input
                type="number"
                min="-20"
                max="20"
                step="1"
                value={sideOffset}
                onChange={event => setSideOffset(Number(event.target.value))}
                style={{ marginBottom: 10 }}
              />
              offset
              <input
                type="number"
                min="-20"
                max="20"
                step="1"
                value={alignOffset}
                onChange={event => setAlignOffset(Number(event.target.value))}
                style={{ marginBottom: 10 }}
              />
              tolerance
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={collisionTolerance}
                onChange={event =>
                  setCollisionTolerance(Number(event.target.value))
                }
              />
            </div>
          </div>
        </PopoverContent>

        <Arrow {...state}>
          <ArrowContent
            {...state}
            style={{
              width: 20,
              height: 10,
              borderBottomLeftRadius: 9999,
              borderBottomRightRadius: 9999,
              backgroundColor: "hotpink",
            }}
          />
        </Arrow>
      </Popover>
    </>
  );
};
