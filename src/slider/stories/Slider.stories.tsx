import React from "react";
import { Meta, Story } from "@storybook/react";
import { VisuallyHidden } from "reakit";

import "./index.css";
import {
  useSliderState,
  SliderInitialState,
  SliderTrack,
  SliderThumb,
  SliderInput,
} from "../index";

export default {
  title: "Slider",
  argTypes: {
    label: {
      control: { type: "text" },
      defaultValue: "Styled",
      table: {
        type: { summary: "Label for the slider" },
        defaultValue: { summary: "Styled" },
      },
    },
    showTip: {
      control: { type: "boolean" },
      defaultValue: false,
      table: {
        type: { summary: "Show tip for the slider thumb" },
        defaultValue: { summary: "false" },
      },
    },
    origin: {
      control: { type: "number" },
      defaultValue: 0,
      table: {
        type: { summary: "Origin for the slider thumb" },
        defaultValue: { summary: "0" },
      },
    },
    values: {
      control: { type: "array" },
      defaultValue: [50],
      table: {
        type: { summary: "The `value` of the slider indicator." },
        defaultValue: { summary: "[50]" },
      },
    },
    min: {
      control: { type: "number" },
      defaultValue: 0,
      table: {
        type: { summary: "The minimum value of the slider" },
        defaultValue: { summary: "0" },
      },
    },
    step: {
      control: { type: "number" },
      defaultValue: 1,
      table: {
        type: {
          summary: "The step in which increments/decrements have to be made",
        },
        defaultValue: { summary: "1" },
      },
    },
    max: {
      control: { type: "number" },
      defaultValue: 100,
      table: {
        type: { summary: "The maximum value of the slider" },
        defaultValue: { summary: "100" },
      },
    },
    orientation: {
      control: { type: "radio", options: ["vertical", "horizontal"] },
      defaultValue: "horizontal",
      table: {
        type: { summary: "Orientation of the slider" },
        defaultValue: { summary: "horizontal" },
      },
    },
    isReversed: {
      control: { type: "boolean" },
      defaultValue: false,
      table: {
        type: { summary: "If true, Slider will render reversed" },
        defaultValue: { summary: "false" },
      },
    },
    formatOptions: {
      control: { type: "object" },
      defaultValue: {},
      table: {
        type: { summary: "Intl format options" },
        defaultValue: { summary: "object" },
      },
    },
    isDisabled: {
      control: { type: "boolean" },
      defaultValue: false,
      table: {
        type: { summary: "If `true`, the slider will be disabled" },
        defaultValue: { summary: "false" },
      },
    },
    onChangeStart: { action: "Value Change Started" },
    onChange: { action: "Value Changed" },
    onChangeEnd: { action: "Value Change Stopped" },
  },
} as Meta;

interface ChakraSliderProps extends SliderInitialState {
  label?: string;
  isReversed?: boolean;
  showTip?: boolean;
  origin?: number;
  onChange?: (values: number[]) => void;
}

const Base: Story<ChakraSliderProps> = args => {
  const { label, isReversed, origin: originProp, onChange, ...rest } = args;
  const origin = originProp ?? args.min ?? 0;

  const state = useSliderState({ reversed: isReversed, ...rest });
  const {
    values,
    getValuePercent,
    getThumbValueLabel,
    getThumbPercent,
  } = state;

  const isVertical = args.orientation === "vertical";
  const isRange = values.length === 2;
  const isMulti = values.length > 2;

  const labelValue = !isRange
    ? getThumbValueLabel(0)
    : `${state.getThumbValueLabel(0)} to ${state.getThumbValueLabel(1)}`;
  const trackWidth = !isRange
    ? `${
        (getValuePercent(Math.max(values[0], origin)) -
          getValuePercent(Math.min(values[0], origin))) *
        100
      }%`
    : `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`;
  const trackLeft = !isRange
    ? `${getValuePercent(Math.min(values[0], origin)) * 100}%`
    : `${getThumbPercent(0) * 100}%`;
  const trackRight = !isRange ? "0px" : `${getThumbPercent(0) * 100}%`;

  React.useEffect(() => {
    onChange?.(values);
  }, [onChange, values]);

  return (
    <div
      className="chakra-slider-group"
      role="group"
      aria-labelledby="styled-slider"
    >
      <div className="slider-label">
        <label className="label" htmlFor="styled-slider">
          {`${args.label ? args.label : "Styled"} Slider`}
        </label>

        <div className="value">
          {!isMulti ? labelValue : JSON.stringify(state.values)}
        </div>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack {...state} className="slider-track-container">
          <div className="slider-track" />
          {!isMulti ? (
            <div
              className="slider-filled-track"
              style={{
                width: !isVertical && trackWidth,
                height: isVertical && trackWidth,
                left: !isReversed && !isVertical && trackLeft,
                right: isReversed && trackRight,
                bottom: isVertical && isRange && `${getThumbPercent(0) * 100}%`,
              }}
            />
          ) : null}
        </SliderTrack>

        {[...new Array(values.length).keys()].map(index => {
          return (
            <div
              className="slider-thumb"
              style={{
                right:
                  isReversed && `calc(${getThumbPercent(index) * 100}% - 7px)`,
                left:
                  !isReversed &&
                  !isVertical &&
                  `calc(${getThumbPercent(index) * 100}% - 7px)`,
                bottom:
                  isVertical && `calc(${getThumbPercent(index) * 100}% - 7px)`,
              }}
            >
              <SliderThumb
                {...state}
                index={index}
                className="slider-thumb-handle"
              >
                <VisuallyHidden>
                  <SliderInput
                    index={index}
                    id="styled-slider"
                    aria-label={`Thumb-${index}`}
                    aria-labelledby="styled-slider"
                    {...state}
                  />
                </VisuallyHidden>
              </SliderThumb>
              {args.showTip && (
                <div className="slider-thumb-tip">
                  {getThumbValueLabel(index)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Default = Base.bind({});

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  label: "Thumb Tipped",
  showTip: true,
};

export const Origin = Base.bind({});
Origin.args = {
  label: "Origin Changed",
  showTip: true,
  values: [0],
  origin: 0,
  min: -50,
  max: 50,
};

export const Reversed = Base.bind({});
Reversed.args = {
  label: "Reversed",
  isReversed: true,
};

export const Vertical = Base.bind({});
Vertical.args = {
  label: "Vertical",
  orientation: "vertical",
};

export const MinMax = Base.bind({});
MinMax.args = {
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Base.bind({});
Step.args = {
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  label: "Default Valued",
  values: [80],
};

export const FormatOptions = Base.bind({});
FormatOptions.args = {
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Base.bind({});
Disabled.args = {
  label: "Disabled",
  isDisabled: true,
};

export const Range = Base.bind({});
Range.args = {
  label: "Range",
  values: [25, 75],
};

export const Multi = Base.bind({});
Multi.args = {
  label: "Range",
  values: [25, 50, 75],
};

export const Multis = Base.bind({});
Multis.args = {
  label: "Range",
  values: [20, 40, 60, 80],
};
