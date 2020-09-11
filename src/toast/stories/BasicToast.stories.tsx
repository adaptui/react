import React from "react";
import { Meta } from "@storybook/react";

import { ToastProvider } from "../index";
import Demo from "./Demo";
import "./style.css";

export default {
  title: "Component/Toast/Base",
} as Meta;

export const Default: React.FC = () => {
  return (
    <ToastProvider
      autoDismiss={true}
      placement="bottom-center"
      toastTypes={{
        error: ({ remove, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#f02c2d" }}>
              {content} <button onClick={() => remove(id)}>x</button>
            </div>
          );
        },
        success: ({ remove, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#01c24e" }}>
              {content} <button onClick={() => remove(id)}>x</button>
            </div>
          );
        },
        warning: ({ remove, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#ef5013" }}>
              {content} <button onClick={() => remove(id)}>x</button>
            </div>
          );
        },
      }}
    >
      <Demo />
    </ToastProvider>
  );
};
