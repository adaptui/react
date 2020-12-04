import * as React from "react";

import { ToastProvider, useToast } from "@renderlesskit/react";

export const App: React.FC = () => {
  return (
    <ToastProvider
      autoDismiss={true}
      placement="bottom-center"
      toastTypes={{
        success: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#01c24e" }}>
              <span style={{ padding: "0.5rem", color: "white" }}>
                {content}
              </span>
              <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
        error: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#f02c2d" }}>
              <span style={{ padding: "0.5rem", color: "white" }}>
                {content}
              </span>
              <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
      }}
    >
      <ToastTriggers />
    </ToastProvider>
  );
};

export default App;

const ToastTriggers = () => {
  const { showToast } = useToast();

  return (
    <>
      <button
        onClick={() => {
          showToast({ type: "success", content: "Success" });
        }}
      >
        Notify Success
      </button>
      <button
        onClick={() => {
          showToast({
            type: "error",
            content: "Error",
            placement: "top-right",
          });
        }}
      >
        Notify Failure
      </button>
    </>
  );
};
