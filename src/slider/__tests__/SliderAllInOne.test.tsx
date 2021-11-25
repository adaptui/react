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

import * as React from "react";
import { VisuallyHidden } from "reakit";
import { fireEvent, render } from "reakit-test-utils";
import { cleanup, screen } from "@testing-library/react";

import {
  SliderGroup,
  SliderInitialState,
  SliderInput,
  SliderLabel,
  SliderOutput,
  SliderThumb,
  SliderThumbInitialState,
  SliderTrack,
  useSliderState,
  useSliderThumbState,
} from "../../index";
import { installMouseEvent } from "../../utils/test-utils";

export type SliderAllInOneProps = SliderInitialState & {
  /**
   * Label for the slider
   *
   * @default Styled
   */
  label?: string;

  /**
   * Origin on the slider, calculated based on min & max
   */
  origin?: number;
};

export const SliderAllInOne: React.FC<SliderAllInOneProps> = args => {
  const { label, origin: originProp, ...rest } = args;
  const origin = originProp ?? args.minValue ?? 0;

  const slider = useSliderState(rest);
  const { baseState, orientation } = slider;
  const { getThumbValueLabel, getThumbPercent, getValuePercent, values } =
    baseState;

  const isVertical = orientation === "vertical";
  const isRange = values.length === 2;
  const isMulti = values.length > 2;

  const labelValue = !isRange
    ? getThumbValueLabel(0)
    : `${getThumbValueLabel(0)} to ${getThumbValueLabel(1)}`;
  const trackWidth = !isRange
    ? `${
        (getValuePercent(Math.max(values[0], origin)) -
          getValuePercent(Math.min(values[0], origin))) *
        100
      }%`
    : `${(getThumbPercent(1) - getThumbPercent(0)) * 100}%`;
  const trackLeft = !isRange
    ? `${getValuePercent(Math.min(values[0], origin)) * 100}%`
    : `${getThumbPercent(0) * 100}%`;

  return (
    <SliderGroup className="chakra-slider-group" {...slider}>
      <div className="slider-label">
        <SliderLabel className="label" {...slider}>
          {`${label ? label : "Styled"} Slider`}
        </SliderLabel>
        <SliderOutput
          className="value"
          data-testid="testid-slider-value"
          {...slider}
        >
          {!isMulti ? labelValue : JSON.stringify(values)}
        </SliderOutput>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack {...slider} className="slider-track-container">
          <div className="slider-track" />
          {!isMulti ? (
            <div
              className="slider-filled-track"
              style={{
                width: !isVertical ? trackWidth : "",
                height: isVertical ? trackWidth : "",
                left: !isVertical && trackLeft ? trackLeft : "",
                bottom:
                  isVertical && isRange ? `${getThumbPercent(0) * 100}%` : "",
              }}
            />
          ) : null}
        </SliderTrack>

        {[...new Array(values.length).keys()].map(index => (
          <Thumb
            index={index}
            key={`thumb-${index}`}
            sliderState={slider}
            aria-label={`Thumb-${index}`}
          />
        ))}
      </div>
    </SliderGroup>
  );
};

export default SliderAllInOne;

export type SliderThumbProps = SliderThumbInitialState & {};
export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index, sliderState } = props;
  const { orientation, baseState } = sliderState;
  const { getThumbPercent } = baseState;

  const isVertical = orientation === "vertical";

  return (
    <div
      className="slider-thumb"
      style={{
        left: !isVertical ? `calc(${getThumbPercent(index) * 100}% - 7px)` : "",
        bottom: isVertical
          ? `calc(${getThumbPercent(index) * 100}% - 7px)`
          : "",
      }}
    >
      <SliderThumb
        {...sliderThumb}
        className="slider-thumb-handle"
        data-testid={`testid-slider-thumb-${index}`}
      >
        <VisuallyHidden>
          <SliderInput
            {...sliderThumb}
            data-testid={`testid-slider-input-${index}`}
          />
        </VisuallyHidden>
      </SliderThumb>
    </div>
  );
};

afterEach(cleanup);

describe("SliderAllInOne", () => {
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
    const onChangeEnd = jest.fn();
    render(
      <SliderAllInOne
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        defaultValue={[25, 50, 75]}
        minValue={0}
        maxValue={100}
        step={1}
      />,
    );

    const sliderValue = screen.getByTestId("testid-slider-value");
    const thumb0 = screen.getByTestId("testid-slider-thumb-0");
    const thumb1 = screen.getByTestId("testid-slider-thumb-1");

    expect(sliderValue).toHaveTextContent("[25,50,75]");

    fireEvent.mouseDown(thumb0, { clientX: 10, pageX: 10 });
    expect(onChangeEnd).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();

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
    const onChangeEnd = jest.fn();
    render(
      <SliderAllInOne
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        defaultValue={[25, 50]}
        minValue={0}
        maxValue={100}
        step={1}
      />,
    );

    const sliderValue = screen.getByTestId("testid-slider-value");
    const thumb0 = screen.getByTestId("testid-slider-thumb-0");
    const thumb1 = screen.getByTestId("testid-slider-thumb-1");

    expect(sliderValue).toHaveTextContent("25 to 50");

    fireEvent.mouseDown(thumb0, { clientX: 10, pageX: 10 });
    expect(onChangeEnd).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();

    // Let's drag the first thumb0 to 5
    fireEvent.mouseMove(thumb0, { clientX: -10, pageX: -10 });
    expect(onChange).toHaveBeenLastCalledWith([5, 50]);

    fireEvent.mouseUp(thumb0);
    expect(onChangeEnd).toHaveBeenLastCalledWith([5, 50]);
    expect(sliderValue).toHaveTextContent("5 to 50");

    // Now drag the second thumb to 5 and try to check the limits
    fireEvent.mouseDown(thumb1, { clientX: 10, pageX: 10 });

    fireEvent.mouseMove(thumb1, { clientX: -15, pageX: -15 });
    expect(onChange).toHaveBeenLastCalledWith([5, 25]);

    fireEvent.mouseMove(thumb1, { clientX: -100, pageX: -100 });
    expect(onChange).toHaveBeenLastCalledWith([5, 5]);

    fireEvent.mouseUp(thumb0);
    expect(onChangeEnd).toHaveBeenLastCalledWith([5, 5]);
    expect(sliderValue).toHaveTextContent("5 to 5");
  });

  test("stress test with 50 thumbs", () => {
    render(
      <SliderAllInOne
        defaultValue={[...new Array(50).keys()]}
        minValue={0}
        maxValue={50}
        step={1}
      />,
    );

    const sliderValue = screen.getByTestId("testid-slider-value");

    expect(sliderValue).toHaveTextContent([...new Array(50).keys()].toString());
  });

  it("supports isDisabled", () => {
    render(
      <SliderAllInOne
        isDisabled={true}
        defaultValue={[10, 50]}
        minValue={0}
        maxValue={50}
        step={1}
      />,
    );

    const sliderValue = screen.getByTestId("testid-slider-value");
    const sliderInput0 = screen.getByTestId("testid-slider-input-0");
    const sliderInput1 = screen.getByTestId("testid-slider-input-1");

    expect(sliderValue).toHaveTextContent("10 to 50");
    expect(sliderInput0).toBeDisabled();
    expect(sliderInput1).toBeDisabled();
  });
});
