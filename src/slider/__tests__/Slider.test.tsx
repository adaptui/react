// IMPORTANT Reference:
// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/slider/test/useSliderThumb.test.js

/**
 
NOTES on Testing slider component.

### The Error: 
TypeError : Class constructor MouseEvent cannot be invoed with "new"
https://github.com/kulshekhar/ts-jest/issues/571#issuecomment-719352005


## Why this error is happening:
https://stackoverflow.com/questions/51860043/javascript-es6-typeerror-class-constructor-client-cannot-be-invoked-without-ne


### Possible Solutions:
Accordion to some github issues setting target: "ES2015" should fix the issues but did not worked in this project for some reason


## Solution: 
Adding env preset in the babel config and setting the targets to node: "current" seems to be fixing the issue, 
note that we are only setting this on test env.
```js
env: {
  test: {
    presets: [["@babel/env", { targets: { node: "current" } }]],
  },
},
```

Now our project had custom babel-(DASH)-config.js file because of storybook config, but jest won't pick that file up
So i had to rename the file to babel.config.js which seems to be working 

Along the way i also stumbed upon this bug too: https://github.com/facebook/jest/issues/9292
This possibly was because of wrong jest config.
*/

import React from "react";
import { VisuallyHidden } from "reakit";
import { axe, render, press, fireEvent } from "reakit-test-utils";
import {
  SliderTrack,
  SliderThumb,
  SliderInput,
  useSliderState,
} from "../index";
import { SliderInitialState } from "../SliderState";

import { installMouseEvent } from "../../utils/test-utils";
import { cleanup } from "@testing-library/react";

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
      aria-label="styled-slider"
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
          style={{
            top: "26px",
            left: `calc(${getThumbPercent(0) * 100}% - 7px)`,
          }}
        >
          <SliderThumb
            className="slider-thumb-handle"
            data-testid="slider-thumb"
            index={0}
            {...state}
          >
            <VisuallyHidden>
              <SliderInput
                index={0}
                id="styled-slider"
                aria-label={`Thumb-${0}`}
                {...state}
              />
            </VisuallyHidden>
          </SliderThumb>
        </div>
      </div>
    </div>
  );
};
afterEach(cleanup);

describe("Slider", () => {
  // IMPORTANT!
  // We need to mock HTMLElement.offsetWidth & offsetHeight,
  // since without them we cannot click on a target with specific clientX/pageX
  let widthStub: jest.SpyInstance<number, []>,
    heightStub: jest.SpyInstance<number, []>;
  beforeAll(() => {
    widthStub = jest
      .spyOn(window.HTMLElement.prototype, "offsetWidth", "get")
      .mockImplementation(() => 100);
    heightStub = jest
      .spyOn(window.HTMLElement.prototype, "offsetHeight", "get")
      .mockImplementation(() => 100);
  });
  afterAll(() => {
    widthStub.mockReset();
    heightStub.mockReset();
  });

  // Now let's mock the mouse event
  installMouseEvent();

  // installPointerEvent();
  it("should drag and change slider value", () => {
    const onStart = jest.fn();
    const onEnd = jest.fn();
    const { getByTestId: testId } = render(
      <SliderComponent
        onChangeStart={onStart}
        onChangeEnd={onEnd}
        min={0}
        max={100}
        step={1}
      />,
    );

    const sliderValue = testId("slider-value");
    const sliderThumb = testId("slider-thumb");

    expect(sliderValue).toHaveTextContent("50");

    fireEvent.mouseDown(sliderThumb, { clientX: 10, pageX: 10 });
    expect(onStart).toHaveBeenLastCalledWith([50]);
    expect(onEnd).not.toHaveBeenCalled();

    fireEvent.mouseMove(sliderThumb, { clientX: 20, pageX: 20 });
    expect(onEnd).not.toHaveBeenCalled();
    expect(sliderValue).toHaveTextContent("60");

    fireEvent.mouseMove(sliderThumb, { clientX: 30, pageX: 30 });
    expect(onEnd).not.toHaveBeenCalled();
    expect(sliderValue).toHaveTextContent("70");

    fireEvent.mouseMove(sliderThumb, { clientX: 40, pageX: 40 });
    fireEvent.mouseUp(sliderThumb, { clientX: 40, pageX: 40 });
    expect(onStart).toHaveBeenLastCalledWith([50]);
    expect(onEnd).toHaveBeenLastCalledWith([80]);
    expect(sliderValue).toHaveTextContent("80");
  });

  it("should work with reversed input", () => {
    const onStart = jest.fn();
    const onEnd = jest.fn();
    const { getByTestId: testId } = render(
      <SliderComponent
        reversed={true}
        onChangeStart={onStart}
        onChangeEnd={onEnd}
        min={0}
        max={100}
        step={1}
      />,
    );

    const sliderValue = testId("slider-value");
    const sliderThumb = testId("slider-thumb");

    expect(sliderValue).toHaveTextContent("50");

    fireEvent.mouseDown(sliderThumb, { clientX: 10, pageX: 10 });
    expect(onStart).toHaveBeenLastCalledWith([50]);
    expect(onEnd).not.toHaveBeenCalled();

    fireEvent.mouseMove(sliderThumb, { clientX: 20, pageX: 20 });
    expect(onEnd).not.toHaveBeenCalled();
    expect(sliderValue).toHaveTextContent("40");

    fireEvent.mouseMove(sliderThumb, { clientX: 30, pageX: 30 });
    expect(onEnd).not.toHaveBeenCalled();
    expect(sliderValue).toHaveTextContent("30");

    fireEvent.mouseMove(sliderThumb, { clientX: 40, pageX: 40 });
    fireEvent.mouseUp(sliderThumb, { clientX: 40, pageX: 40 });
    expect(onStart).toHaveBeenLastCalledWith([50]);
    expect(onEnd).toHaveBeenLastCalledWith([20]);
    expect(sliderValue).toHaveTextContent("20");
  });

  it("should have proper min/max values", () => {
    const onStart = jest.fn();
    const onEnd = jest.fn();
    const { getByTestId: testId } = render(
      <SliderComponent
        onChangeStart={onStart}
        onChangeEnd={onEnd}
        min={50}
        max={80}
        step={1}
      />,
    );

    const sliderValue = testId("slider-value");
    const sliderThumb = testId("slider-thumb");

    expect(sliderValue).toHaveTextContent("65");

    fireEvent.mouseDown(sliderThumb, { clientX: 10, pageX: 10 });
    expect(onStart).toHaveBeenLastCalledWith([65]);
    expect(onEnd).not.toHaveBeenCalled();

    fireEvent.mouseMove(sliderThumb, { clientX: 20, pageX: 20 });
    expect(onEnd).not.toHaveBeenCalled();
    expect(sliderValue).toHaveTextContent("68");

    fireEvent.mouseMove(sliderThumb, { clientX: 30, pageX: 30 });
    expect(onEnd).not.toHaveBeenCalled();
    expect(sliderValue).toHaveTextContent("71");

    fireEvent.mouseMove(sliderThumb, { clientX: 40, pageX: 40 });
    expect(onEnd).not.toHaveBeenCalled();
    expect(sliderValue).toHaveTextContent("74");

    fireEvent.mouseMove(sliderThumb, { clientX: 140, pageX: 140 });
    fireEvent.mouseUp(sliderThumb, { clientX: 140, pageX: 140 });
    expect(onStart).toHaveBeenLastCalledWith([65]);
    expect(onEnd).toHaveBeenLastCalledWith([80]);
    expect(sliderValue).toHaveTextContent("80");
  });
});
