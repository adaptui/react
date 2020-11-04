import "./Toast.css";
import React from "react";
import { Meta } from "@storybook/react";
import { CodeSandboxTemplate } from "storybook-addon-preview";

import {
  cssTemplate,
  appUtilsTemplate,
  appUtilsTemplateJs,
  appTemplateCssAnimation,
  appTemplateJsCssAnimation,
} from "./templates";
import { App as CSSAnimatedToast } from "./ToastCSSAnimated.component";

function joinStrs(strs: string[]) {
  return `[${strs.map(str => `"${str}"`).join(", ")}]`;
}

const TOAST_CODESANDBOX_TEMPLATE = (dependencies: string[]) =>
  new Function(`
var previews = arguments[0];
return {
    framework: "react",
    files: {
        "src/App.tsx": previews["React"][0],
        "src/styles.css": previews["CSS"] ? previews["CSS"][0] : "",
        "src/ToastUtils.component.tsx": previews["Utils.tsx"] ? previews["Utils.tsx"][0] : "",
    },
    userDependencies: ${joinStrs(dependencies)},
};`) as CodeSandboxTemplate;

export default {
  component: CSSAnimatedToast,
  title: "Toast/CSSAnimatedToast",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateJsCssAnimation,
        language: "jsx",
        copy: true,
        codesandbox: TOAST_CODESANDBOX_TEMPLATE([
          "renderless-components@alpha",
          "react-transition-group",
        ]),
      },
      {
        tab: "React",
        template: appTemplateCssAnimation,
        language: "tsx",
        copy: true,
        codesandbox: TOAST_CODESANDBOX_TEMPLATE([
          "renderless-components@alpha",
          "react-transition-group",
        ]),
      },
      {
        tab: "CSS",
        template: cssTemplate,
        language: "css",
        copy: true,
        codesandbox: TOAST_CODESANDBOX_TEMPLATE([
          "renderless-components@alpha",
          "react-transition-group",
        ]),
      },
      {
        tab: "Utils.tsx",
        template: appUtilsTemplate,
        language: "tsx",
        copy: true,
        codesandbox: TOAST_CODESANDBOX_TEMPLATE([
          "renderless-components@alpha",
          "react-transition-group",
        ]),
      },
      {
        tab: "utils.jsx",
        template: appUtilsTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: TOAST_CODESANDBOX_TEMPLATE([
          "renderless-components@alpha",
          "react-transition-group",
        ]),
      },
    ],
  },
} as Meta;

export const Default = () => <CSSAnimatedToast />;

// const SpringAnimationWrapper: TToastWrapper = ({
//   placement,
//   isVisible,
//   children,
// }) => {
//   const translate = getTransform(placement, 50);

//   const transitions = useTransition(isVisible, null, {
//     from: { opacity: 0, maxHeight: 0, transform: translate.from },
//     enter: {
//       opacity: 1,
//       maxHeight: 200,
//       transform: translate.enter,
//     },
//     leave: { opacity: 0, maxHeight: 0, transform: translate.leave },
//   });

//   return (
//     <>
//       {transitions.map(
//         ({ item, key, props }) =>
//           item && (
//             <animated.div style={props} key={key}>
//               {children}
//             </animated.div>
//           ),
//       )}
//     </>
//   );
// };

// export const ReactSpringAnimation: React.FC = () => {
//   return (
//     <ToastProvider
//       autoDismiss={true}
//       placement="bottom-center"
//       animationTimeout={500}
//       toastWrapper={SpringAnimationWrapper}
//       toastTypes={{
//         error: ({ remove, content, id }) => {
//           return (
//             <div className="toast" style={{ backgroundColor: "#f02c2d" }}>
//               {content} <button onClick={() => remove(id)}>x</button>
//             </div>
//           );
//         },
//         success: ({ remove, content, id }) => {
//           return (
//             <div className="toast" style={{ backgroundColor: "#01c24e" }}>
//               {content} <button onClick={() => remove(id)}>x</button>
//             </div>
//           );
//         },
//         warning: ({ remove, content, id }) => {
//           return (
//             <div className="toast" style={{ backgroundColor: "#ef5013" }}>
//               {content} <button onClick={() => remove(id)}>x</button>
//             </div>
//           );
//         },
//       }}
//     >
//       <Demo />
//     </ToastProvider>
//   );
// };
