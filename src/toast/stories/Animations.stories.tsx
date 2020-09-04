import React from "react";
import { Meta } from "@storybook/react";
import { useTransition, animated } from "react-spring";
import { CSSTransition } from "react-transition-group";

import { ToastProvider, TToastWrapper } from "../";
import Demo, { getTransform } from "./Demo";

import "./style.css";

export default {
  title: "Component/Toast",
} as Meta;

const CSSTransitionAnimationWrapper: TToastWrapper = ({
  isVisible,
  children,
}) => {
  return (
    <CSSTransition in={isVisible} timeout={500} classNames="alert">
      {children}
    </CSSTransition>
  );
};

export const CSSTransitionAnimation: React.FC = () => {
  return (
    <ToastProvider
      autoDismiss={true}
      placement="bottom-center"
      animationTimeout={500}
      toastWrapper={CSSTransitionAnimationWrapper}
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

const SpringAnimationWrapper: TToastWrapper = ({
  placement,
  isVisible,
  children,
}) => {
  const translate = getTransform(placement, 50);

  const transitions = useTransition(isVisible, null, {
    from: { opacity: 0, maxHeight: 0, transform: translate.from },
    enter: {
      opacity: 1,
      maxHeight: 200,
      transform: translate.enter,
    },
    leave: { opacity: 0, maxHeight: 0, transform: translate.leave },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div style={props} key={key}>
              {children}
            </animated.div>
          ),
      )}
    </>
  );
};

export const ReactSpringAnimation: React.FC = () => {
  return (
    <ToastProvider
      autoDismiss={true}
      placement="bottom-center"
      animationTimeout={500}
      toastWrapper={SpringAnimationWrapper}
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
