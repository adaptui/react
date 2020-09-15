import React from "react";
import { useToast, ToastProvider } from "../";

const randomType = (): string => {
  return ["error", "warning", "success"].splice(Math.random() * 3, 1)[0];
};

const SomeDeepNestedComp = () => {
  const { show } = useToast();

  return (
    <div>
      <button
        onClick={() => {
          show({
            type: "error",
            content: "This is error",
            autoDismiss: false,
          });
        }}
      >
        Error (autoDismiss: false)
      </button>
      <button
        onClick={() => {
          show({ type: "success", content: "This is success" });
        }}
      >
        Success
      </button>
      <button
        onClick={() => {
          show({ type: "warning", content: "This is warning" });
        }}
      >
        Warning
      </button>
      <button
        onClick={() => {
          show({
            content: () => (
              <p style={{ fontFamily: "Impact", color: "black" }}>
                This is Custom
              </p>
            ),
          });
        }}
      >
        Custom
      </button>
    </div>
  );
};

const PlacementDemo = () => {
  const { show } = useToast();

  return (
    <div>
      <button
        onClick={() => {
          show({
            type: randomType(),
            content: "This is top-left",
            placement: "top-left",
          });
        }}
      >
        top-left
      </button>
      <button
        onClick={() => {
          show({
            type: randomType(),
            content: "This is top-right",
            placement: "top-right",
          });
        }}
      >
        top-right
      </button>
      <button
        onClick={() => {
          show({
            type: randomType(),
            content: "This is top-center",
            placement: "top-center",
          });
        }}
      >
        top-center
      </button>
      <button
        onClick={() => {
          show({
            type: randomType(),
            content: "This is bottom-left",
            placement: "bottom-left",
          });
        }}
      >
        bottom-left
      </button>
      <button
        onClick={() => {
          show({
            type: randomType(),
            content: "This is bottom-right",
            placement: "bottom-right",
          });
        }}
      >
        bottom-right
      </button>
      <button
        onClick={() => {
          show({
            type: randomType(),
            content: "This is bottom-center",
            placement: "bottom-center",
          });
        }}
      >
        bottom-center
      </button>
    </div>
  );
};

const Demo = () => {
  return (
    <>
      <SomeDeepNestedComp />
      <br />
      <PlacementDemo />
    </>
  );
};

// Animation util
export const getTransform = (placement: string, pixels: number) => {
  const pos = { from: "", enter: "", leave: "" };
  pos.enter = `translate(0, 0)`;

  if (placement === "bottom-center") {
    pos.from = `translate(0, ${pixels}px)`;
    pos.leave = `translate(0, ${pixels}px)`;
    return pos;
  }
  if (placement === "top-center") {
    pos.from = `translate(0, ${-pixels}px)`;
    pos.leave = `translate(0, ${-pixels}px)`;
    return pos;
  }
  if (["bottom-left", "top-left"].includes(placement)) {
    pos.from = `translate(${-pixels}px, 0)`;
    pos.leave = `translate(${-pixels}px, 0)`;
    return pos;
  }
  if (["bottom-right", "top-right"].includes(placement)) {
    pos.from = `translate(${pixels}px, 0)`;
    pos.leave = `translate(${pixels}px, 0)`;
    return pos;
  }

  return pos;
};

export default Demo;
