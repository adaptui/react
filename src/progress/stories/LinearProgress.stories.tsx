import React from "react";
import { Meta } from "@storybook/react";

import { StyledProgress } from "./Progress";

export default {
  title: "Progress/Linear",
} as Meta;

export const Default = () => {
  return <StyledProgress />;
};

// const examples = createLinearExamples({
//   stateHook: useProgressState,
//   component: Progress,
// })();

// export const Default = examples.Default;
// export const WithLabel = examples.WithLabel;
// export const WithStripe = examples.WithStripe;
// export const WithAnimatedStripe = examples.WithAnimatedStripe;

// export const WhenIsIndeterminate = () => {
//   const progress = useProgressState({ value: undefined });

//   const progressAnim = keyframes({
//     "0%": { left: "-40%" },
//     "100%": { left: "100%" },
//   });

//   const indeterminateStyles = css({
//     ...(progress.isIndeterminate && {
//       position: "absolute",
//       willChange: "left",
//       minWidth: "50%",
//       width: "100%",
//       height: "100%",
//       backgroundImage:
//         "linear-gradient( to right, transparent 0%, #D53F8C 50%, transparent 100% )",
//       animation: `${progressAnim} 1s ease infinite normal none running`,
//     }),
//   });

//   return (
//     <div style={progressStyle}>
//       <Progress
//         {...progress}
//         style={{ ...progressBarStyle, backgroundColor: "none" }}
//         className={indeterminateStyles}
//       />
//     </div>
//   );
// };

// export const WhenIsIndeterminateStripe = () => {
//   const progress = useProgressState();

//   const progressAnim = keyframes({
//     "0%": { left: "-40%" },
//     "100%": { left: "100%" },
//   });

//   const indeterminateStyles = css({
//     ...(progress.isIndeterminate && {
//       position: "absolute",
//       willChange: "left",
//       minWidth: "50%",
//       width: "100%",
//       height: "100%",
//       ...generateStripe(),
//       animation: `${progressAnim} 1s ease infinite normal none running`,
//     }),
//   });

//   return (
//     <div style={progressStyle}>
//       <Progress
//         {...progress}
//         style={{ ...progressBarStyle, backgroundColor: "#D53F8C" }}
//         className={indeterminateStyles}
//       />
//     </div>
//   );
// };
