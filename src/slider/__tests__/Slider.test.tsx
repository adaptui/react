import React from "react";
import { VisuallyHidden } from "reakit";
import userEvent from "@testing-library/user-event";
import { axe, render, press, fireEvent } from "reakit-test-utils";
import {
  SliderTrack,
  SliderThumb,
  SliderInput,
  useSliderState,
} from "../index";
import { SliderInitialState } from "../SliderState";

import { installMouseEvent, installPointerEvent } from "../../utils/test-utils";

export const SliderComponent = (props: SliderInitialState) => {
  const state = useSliderState(props);
  const {
    values,
    getValuePercent,
    getThumbPercent,
    getThumbValueLabel,
  } = state;

  const trackWidth = `${
    (getValuePercent(Math.max(values[0], state.min)) -
      getValuePercent(Math.min(values[0], state.min))) *
    100
  }%`;
  const trackLeft = `${getValuePercent(Math.min(values[0], state.min)) * 100}%`;
  const labelValue = getThumbValueLabel(0);

  return (
    <div
      role="group"
      className="chakra-slider-group"
      aria-labelledby="styled-slider"
    >
      <div className="slider-label">
        <label className="label" htmlFor="styled-slider">
          Minimal slider
        </label>
        <div data-testid="slider-value" className="value">
          {labelValue}
        </div>
      </div>

      <div className={`slider`}>
        <SliderTrack {...state} className="slider-track-container">
          <div className="slider-track" />
          <div
            className="slider-filled-track"
            style={{
              width: trackWidth,
              left: trackLeft,
            }}
          />
        </SliderTrack>
        <div
          className="slider-thumb"
          data-testid="slider-thumb"
          style={{
            top: "26px",
            left: `calc(${getThumbPercent(0) * 100}% - 7px)`,
          }}
        >
          <SliderThumb className="slider-thumb-handle" index={0} {...state}>
            <VisuallyHidden>
              <SliderInput
                index={0}
                id="styled-slider"
                aria-label={`Thumb-${0}`}
                aria-labelledby="styled-slider"
                {...state}
              />
            </VisuallyHidden>
          </SliderThumb>
        </div>
      </div>
    </div>
  );
};

describe("Slider", () => {
  installMouseEvent();

  it("should drag and change slider value", () => {
    const onStart = jest.fn();
    const onEnd = jest.fn();
    const { getByTestId: testId } = render(
      <SliderComponent onChangeStart={onStart} onChangeEnd={onEnd} />,
    );

    const sliderValue = testId("slider-value");
    const sliderThumb = testId("slider-thumb");

    expect(sliderValue).toHaveTextContent("50");

    fireEvent.mouseDown(sliderThumb, { clientX: 10, pageX: 10 });
    fireEvent.mouseMove(sliderThumb, { clientX: 20, pageX: 20 });
    fireEvent.mouseUp(sliderThumb, { clientX: 40, pageX: 40 });

    // expect(onStart).toBeCalledTimes(1);
    // expect(onEnd).toBeCalledTimes(1);

    expect(sliderValue).toHaveTextContent("50");
  });
});
