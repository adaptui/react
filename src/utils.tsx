import { css, keyframes } from "emotion";
import React, { CSSProperties } from "react";
import { isUndefined, cx } from "@chakra-ui/utils";

export const progressStyle: CSSProperties = {
  background: "rgb(237, 242, 247)",
  height: "0.75rem",
  width: "400px",
  overflow: "hidden",
  position: "relative",
};

export const labelStyles: CSSProperties = {
  top: "50%",
  left: "50%",
  width: "100%",
  textAlign: "center",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  fontWeight: "bold",
  fontSize: "0.75em",
  lineHeight: 1,
};

export const progressBarStyle = (percent: any) => {
  return css({
    transition: "all 0.3s",
    backgroundColor: "#3182ce",
    width: percent != null ? `${percent}%` : undefined,
    height: "100%",
  });
};

export function generateStripe(
  size = "1rem",
  color = "rgba(255, 255, 255, 0.15)",
) {
  return {
    backgroundImage: `linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${size} ${size}`,
  };
}

export const spin = keyframes({
  "0%": {
    strokeDasharray: "1, 400",
    strokeDashoffset: "0",
  },
  "50%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-100",
  },
  "100%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-260",
  },
});

export const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export function useFakeProgression(type: "progress" | "meter" = "progress") {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const clearId = setInterval(() => {
      setValue(prevValue => prevValue + 5);
    }, 500);

    if (value === 100) {
      if (type === "progress") {
        clearInterval(clearId);
      }
      if (type === "meter") {
        setValue(5);
      }
    }

    return () => {
      clearInterval(clearId);
    };
  }, [value, type]);

  return value;
}

export const createCircularExample = ({
  stateHook: useStateHook,
  component: Component,
}: any) => {
  return (props: any) => {
    const {
      size = "48px",
      value,
      capIsRound,
      thickness = "10px",
      color = "#0078d4",
      trackColor = "#edebe9",
      label = false,
    } = props;

    const progress = useStateHook({ value });

    const determinant = progress.isIndeterminate
      ? undefined
      : (progress.percent ?? 0) * 2.64;

    const strokeDasharray = isUndefined(determinant)
      ? undefined
      : `${determinant} ${264 - determinant}`;

    const indicatorStyles = progress.isIndeterminate
      ? css({
          animation: `${spin} 1.5s linear infinite`,
        })
      : css({
          strokeDashoffset: 66,
          strokeDasharray,
          transition: `stroke-dasharray 0.6s ease 0s, stroke 0.6s ease`,
        });

    const rootStyles = css({
      display: "inline-block",
      position: "relative",
      verticalAlign: "middle",
    });

    const svgStyles = css({
      width: size,
      height: size,
      animation: progress.isIndeterminate
        ? `${rotate} 2s linear infinite`
        : undefined,
    });

    const labelStyles = css({
      fontSize: "14px",
      top: "50%",
      left: "50%",
      width: "100%",
      textAlign: "center",
      position: "absolute",
      transform: "translate(-50%, -50%)",
    });

    return (
      <Component {...progress} className={rootStyles}>
        <svg viewBox="0 0 100 100" className={svgStyles}>
          <circle
            cx={50}
            cy={50}
            r={42}
            fill="transparent"
            stroke={trackColor}
            strokeWidth={thickness}
          />
          <circle
            cx={50}
            cy={50}
            r={42}
            fill="transparent"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap={capIsRound ? "round" : undefined}
            className={indicatorStyles}
          />
        </svg>
        {label && <div className={labelStyles}>{`${progress.value}%`}</div>}
      </Component>
    );
  };
};

export const createLinearExamples = ({
  stateHook: useStateHook,
  component: Component,
  type,
}: any) => {
  return () => {
    const Default = () => {
      const value = useFakeProgression(type);
      const progress = useStateHook({ value });

      return (
        <div style={progressStyle}>
          <Component
            {...progress}
            className={progressBarStyle(progress.percent)}
          />
        </div>
      );
    };

    const WithLabel = () => {
      const value = useFakeProgression(type);
      const progress = useStateHook({ value });

      return (
        <div style={progressStyle}>
          <div style={labelStyles}>{progress.value}</div>
          <Component
            {...progress}
            className={progressBarStyle(progress.percent)}
          />
        </div>
      );
    };

    const WithStripe = () => {
      const value = useFakeProgression(type);
      const progress = useStateHook({ value });

      const stripStyles = css({
        ...generateStripe(),
      });

      return (
        <div style={progressStyle}>
          <Component
            {...progress}
            className={cx(progressBarStyle(progress.percent), stripStyles)}
          />
        </div>
      );
    };

    const WithAnimatedStripe = () => {
      const value = useFakeProgression(type);
      const progress = useStateHook({ value });

      const stripe = keyframes({
        from: { backgroundPosition: "1rem 0" },
        to: { backgroundPosition: "0 0" },
      });

      const stripStyles = css({
        ...generateStripe(),
        animation: `${stripe} 1s linear infinite`,
      });

      return (
        <div style={progressStyle}>
          <Component
            {...progress}
            className={cx(progressBarStyle(progress.percent), stripStyles)}
          />
        </div>
      );
    };

    return { Default, WithLabel, WithStripe, WithAnimatedStripe };
  };
};
