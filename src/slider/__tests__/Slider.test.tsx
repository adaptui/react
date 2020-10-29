import * as React from "react";
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

beforeAll(() => {
  // @ts-ignore
  global.PointerEvent = class FakePointerEvent extends MouseEvent {
    _init: {
      pageX: number;
      pageY: number;
      pointerType: string;
      pointerId: number;
    };
    constructor(name: string, init: any) {
      super(name, init);
      this._init = init;
    }
    get pointerType() {
      return this._init.pointerType;
    }
    get pointerId() {
      return this._init.pointerId;
    }
    get pageX() {
      return this._init.pageX;
    }
    get pageY() {
      return this._init.pageY;
    }
  };
});
afterAll(() => {
  // @ts-ignore
  delete global.PointerEvent;
});

/**
 * Enables reading pageX/pageY from fireEvent.mouse*(..., {pageX: ..., pageY: ...}).
 */
function installMouseEvent() {
  beforeAll(() => {
    const oldMouseEvent = MouseEvent;
    // @ts-ignore
    global.MouseEvent = class FakeMouseEvent extends MouseEvent {
      _init: { pageX: number; pageY: number };
      constructor(name: string, init: any) {
        super(name, init);
        this._init = init;
      }
      get pageX() {
        return this._init.pageX;
      }
      get pageY() {
        return this._init.pageY;
      }
    };
    // @ts-ignore
    global.MouseEvent.oldMouseEvent = oldMouseEvent;
  });
  afterAll(() => {
    // @ts-ignore
    global.MouseEvent = global.MouseEvent.oldMouseEvent;
  });
}

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
  // installPointerEvent();

  it("should drag and change slider value", () => {
    const onStart = jest.fn();
    const onEnd = jest.fn();
    const { getByTestId: testId } = render(
      <SliderComponent onChangeStart={onStart} onChangeEnd={onEnd} />,
    );

    const sliderValue = testId("slider-value");
    const sliderThumb = testId("slider-thumb");

    expect(sliderValue).toHaveTextContent("50");

    fireEvent.pointerDown(sliderThumb, { clientX: 10, pageX: 10 });
    fireEvent.pointerMove(sliderThumb, { clientX: 20, pageX: 20 });
    fireEvent.pointerUp(sliderThumb, { clientX: 40, pageX: 40 });

    // expect(onStart).toBeCalledTimes(1);
    // expect(onEnd).toBeCalledTimes(1);

    expect(sliderValue).toHaveTextContent("50");
  });
});
