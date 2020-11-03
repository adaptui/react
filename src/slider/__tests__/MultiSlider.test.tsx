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

export const MultiSliderComponent = (
  props: SliderInitialState & {
    origin?: number;
    onChange?: (values: number[]) => void;
  },
) => {
  const { reversed, origin: originProp, onChange, ...rest } = props;

  const state = useSliderState({ reversed: reversed, ...rest });
  const origin = originProp ?? state.min ?? 0;
  const {
    values,
    getValuePercent,
    getThumbValueLabel,
    getThumbPercent,
  } = state;

  const isVertical = false;
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
      aria-label="styled-slider"
    >
      <div className="slider-label">
        <label className="label" htmlFor="styled-slider">
          Multi slider
        </label>
        <div className="value" data-testid="slider-value">
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
                width: !isVertical ? trackWidth : "",
                height: isVertical ? trackWidth : "",
                left: !reversed && !isVertical && trackLeft ? trackLeft : "",
                right: reversed ? trackRight : "",
                bottom:
                  isVertical && isRange ? `${getThumbPercent(0) * 100}%` : "",
              }}
            />
          ) : null}
        </SliderTrack>

        {[...new Array(values.length).keys()].map(index => {
          return (
            <div
              className="slider-thumb"
              key={`thumb-${index}`}
              style={{
                right: reversed
                  ? `calc(${getThumbPercent(index) * 100}% - 7px)`
                  : "",
                left:
                  !reversed && !isVertical
                    ? `calc(${getThumbPercent(index) * 100}% - 7px)`
                    : "",
                bottom: isVertical
                  ? `calc(${getThumbPercent(index) * 100}% - 7px)`
                  : "",
              }}
            >
              <SliderThumb
                {...state}
                index={index}
                className="slider-thumb-handle"
                data-testid={`slider-thumb-${index}`}
              >
                <VisuallyHidden>
                  <SliderInput
                    index={index}
                    aria-label={`Thumb-${index}`}
                    data-testid={`slider-input-${index}`}
                    {...state}
                  />
                </VisuallyHidden>
              </SliderThumb>
            </div>
          );
        })}
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

  it("should drag and change multiple slider values", () => {
    const onChange = jest.fn();
    const onChangeStart = jest.fn();
    const onChangeEnd = jest.fn();
    const { getByTestId: testId } = render(
      <MultiSliderComponent
        onChange={onChange}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        values={[25, 50, 75]}
        min={0}
        max={100}
        step={1}
      />,
    );

    const sliderValue = testId("slider-value");
    const thumb0 = testId("slider-thumb-0");
    const thumb1 = testId("slider-thumb-1");
    const thumb2 = testId("slider-thumb-2");

    expect(sliderValue).toHaveTextContent("[25,50,75]");

    fireEvent.mouseDown(thumb0, { clientX: 10, pageX: 10 });
    expect(onChangeStart).toHaveBeenLastCalledWith([25, 50, 75]);
    expect(onChangeEnd).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith([25, 50, 75]);

    // Let's drag the first thumb0 exceeding thumb1
    fireEvent.mouseMove(thumb0, { clientX: 20, pageX: 20 });
    expect(onChange).toHaveBeenLastCalledWith([35, 50, 75]);

    fireEvent.mouseMove(thumb0, { clientX: 40, pageX: 40 });
    expect(onChange).toHaveBeenLastCalledWith([50, 50, 75]);

    fireEvent.mouseMove(thumb0, { clientX: 100, pageX: 100 }); // should not increase anymore
    expect(onChange).toHaveBeenLastCalledWith([50, 50, 75]);
    fireEvent.mouseUp(thumb0);
    expect(onChangeEnd).toHaveBeenLastCalledWith([50, 50, 75]);
    expect(sliderValue).toHaveTextContent("[50,50,75]");

    // Let's drag the second thumb now
    // Let's drag the first thumb1 exceeding thumb2
    fireEvent.mouseDown(thumb1, { clientX: 10, pageX: 10 });
    expect(onChange).toHaveBeenLastCalledWith([50, 50, 75]);

    fireEvent.mouseMove(thumb1, { clientX: 20, pageX: 20 });
    expect(onChange).toHaveBeenLastCalledWith([50, 60, 75]);

    fireEvent.mouseMove(thumb1, { clientX: 40, pageX: 40 });
    expect(onChange).toHaveBeenLastCalledWith([50, 75, 75]);

    fireEvent.mouseMove(thumb1, { clientX: 100, pageX: 100 }); // should not increase anymore
    expect(onChange).toHaveBeenLastCalledWith([50, 75, 75]);

    // Drag on opposite direction
    fireEvent.mouseMove(thumb1, { clientX: -100, pageX: -100 }); // should not increase anymore
    expect(onChange).toHaveBeenLastCalledWith([50, 50, 75]);

    fireEvent.mouseUp(thumb1);
    expect(onChangeEnd).toHaveBeenLastCalledWith([50, 50, 75]);
    expect(sliderValue).toHaveTextContent("[50,50,75]");
  });

  test("Check limits: drag first thumb to 5 then drag the second thumb to opposite direction", () => {
    const onChange = jest.fn();
    const onChangeStart = jest.fn();
    const onChangeEnd = jest.fn();
    const { getByTestId: testId } = render(
      <MultiSliderComponent
        onChange={onChange}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        values={[25, 50]}
        min={0}
        max={100}
        step={1}
      />,
    );

    const sliderValue = testId("slider-value");
    const thumb0 = testId("slider-thumb-0");
    const thumb1 = testId("slider-thumb-1");

    expect(sliderValue).toHaveTextContent("25 to 50");

    fireEvent.mouseDown(thumb0, { clientX: 10, pageX: 10 });
    expect(onChangeStart).toHaveBeenLastCalledWith([25, 50]);
    expect(onChangeEnd).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith([25, 50]);

    // Let's drag the first thumb0 to 5
    fireEvent.mouseMove(thumb0, { clientX: -10, pageX: -10 });
    expect(onChange).toHaveBeenLastCalledWith([5, 50]);

    fireEvent.mouseUp(thumb0);
    expect(onChangeEnd).toHaveBeenLastCalledWith([5, 50]);
    expect(sliderValue).toHaveTextContent("5 to 50");

    // Now drag the second thumb to 5 and try to check the limits
    fireEvent.mouseDown(thumb1, { clientX: 10, pageX: 10 });
    expect(onChangeStart).toHaveBeenLastCalledWith([5, 50]);

    fireEvent.mouseMove(thumb1, { clientX: -15, pageX: -15 });
    expect(onChange).toHaveBeenLastCalledWith([5, 25]);

    fireEvent.mouseMove(thumb1, { clientX: -100, pageX: -100 });
    expect(onChange).toHaveBeenLastCalledWith([5, 5]);

    fireEvent.mouseUp(thumb0);
    expect(onChangeEnd).toHaveBeenLastCalledWith([5, 5]);
    expect(sliderValue).toHaveTextContent("5 to 5");
  });

  test("stress test with 50 thumbs", () => {
    const { getByTestId: testId } = render(
      <MultiSliderComponent
        values={[...new Array(50).keys()]}
        min={0}
        max={50}
        step={1}
      />,
    );

    const sliderValue = testId("slider-value");

    expect(sliderValue).toHaveTextContent([...new Array(50).keys()].toString());
  });

  it("supports isDisabled", () => {
    const { getByTestId: testId } = render(
      <MultiSliderComponent
        isDisabled={true}
        values={[10, 50]}
        min={0}
        max={50}
        step={1}
      />,
    );

    const sliderValue = testId("slider-value");
    const sliderInput0 = testId("slider-input-0");
    const sliderInput1 = testId("slider-input-1");

    expect(sliderValue).toHaveTextContent("10 to 50");
    expect(sliderInput0).toBeDisabled();
    expect(sliderInput1).toBeDisabled();
  });
});
