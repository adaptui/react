import React from "react";
import { CSSTransition } from "react-transition-group";

import { Variants, Placements } from "./Utils.component";
import { ToastProvider, ToastWrapper } from "renderless-components";

const CSSTransitionAnimationWrapper: ToastWrapper = ({
  isVisible,
  children,
}) => {
  return (
    <CSSTransition in={isVisible} timeout={500} classNames="alert">
      {children}
    </CSSTransition>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider
      autoDismiss={true}
      placement="bottom-center"
      animationTimeout={500}
      toastWrapper={CSSTransitionAnimationWrapper}
      toastTypes={{
        error: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#f02c2d" }}>
              {content} <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
        success: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#01c24e" }}>
              {content} <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
        warning: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#ef5013" }}>
              {content} <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
      }}
    >
      <Variants />
      <br />
      <Placements />
    </ToastProvider>
  );
};

export default App;
