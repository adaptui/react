import React from "react";

import { useToast } from "@renderlesskit/react";

const randomType = () => {
  return ["error", "warning", "success"].splice(Math.random() * 3, 1)[0];
};

export const Variants: React.FC = () => {
  const { showToast } = useToast();

  const variants = ["error", "success", "warning"];

  return (
    <div>
      {variants.map(variant => {
        return (
          <button
            key={variant}
            onClick={() => {
              showToast({ type: variant, content: `This is ${variant}` });
            }}
          >
            {variant}
          </button>
        );
      })}
      <button
        onClick={() => {
          showToast({
            type: "error",
            content: "This is error",
            autoDismiss: false,
          });
        }}
      >
        autoDismiss: false
      </button>
      <button
        onClick={() => {
          showToast({
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

export const Placements: React.FC = () => {
  const { showToast } = useToast();

  const placements = [
    "top-left",
    "top-right",
    "top-center",
    "bottom-left",
    "bottom-right",
    "bottom-center",
  ] as const;

  return (
    <div>
      {placements.map(placement => {
        return (
          <button
            key={placement}
            onClick={() => {
              showToast({
                type: randomType(),
                content: `This is ${placement}`,
                placement,
              });
            }}
          >
            {placement}
          </button>
        );
      })}
    </div>
  );
};
