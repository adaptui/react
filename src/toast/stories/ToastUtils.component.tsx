import React from "react";
import { useToast, Placements as IPlacements } from "renderless-components";

const randomType = (): string => {
  return ["error", "warning", "success"].splice(Math.random() * 3, 1)[0];
};

export const Variants: React.FC = () => {
  const { show } = useToast();

  const variants = ["error", "success", "warning"];

  return (
    <div>
      {variants.map(variant => {
        return (
          <button
            onClick={() => {
              show({ type: variant, content: `This is ${variant}` });
            }}
          >
            {variant}
          </button>
        );
      })}
      <button
        onClick={() => {
          show({
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

export const Placements: React.FC = () => {
  const { show } = useToast();

  const placements = [
    "top-left",
    "top-right",
    "top-center",
    "bottom-left",
    "bottom-right",
    "bottom-center",
  ];

  return (
    <div>
      {placements.map(placement => {
        return (
          <button
            onClick={() => {
              show({
                type: randomType(),
                content: `This is ${placement}`,
                placement: placement as IPlacements,
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
