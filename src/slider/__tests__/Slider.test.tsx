import * as React from "react";
import { axe, render, press } from "reakit-test-utils";

import {
  Slider,
  SliderThumb,
  SliderTrack,
  useSliderState,
  SliderFilledTrack,
  SliderStateProps,
} from "..";
import {
  sliderHorizontalStyle,
  sliderHorizontalTrackStyle,
  sliderHorizontalFilledTractStyle,
  sliderHorizontalThumbStyle,
} from "../stories/styles";

export const SliderComp = (props: SliderStateProps) => {
  const slider = useSliderState(props);

  return (
    <Slider {...slider} data-testid="slider" style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        data-testid="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />
      <input type="hidden" value={slider.state.value}></input>
    </Slider>
  );
};

describe("Slider", () => {
  it("should render correctly", () => {
    const { getByTestId: testId } = render(<SliderComp />);

    expect(testId("slider-thumb")).not.toHaveFocus();
    press.Tab();
    expect(testId("slider-thumb")).toHaveFocus();
  });

  it("should have proper keyboard navigation", () => {
    const { getByTestId: testId } = render(<SliderComp min={0} max={100} />);

    expect(testId("slider-thumb")).not.toHaveFocus();
    press.Tab();
    expect(testId("slider-thumb")).toHaveFocus();

    press.ArrowRight();
    press.ArrowRight();
    press.ArrowRight();
    expect(testId("slider-input")).toHaveValue("53");
    press.ArrowLeft();
    press.ArrowLeft();
    press.ArrowLeft();
    expect(testId("slider-input")).toHaveValue("50");
    press.PageUp();
    expect(testId("slider-input")).toHaveValue("60");
    press.PageDown();
    expect(testId("slider-input")).toHaveValue("50");
    press.Home();
    expect(testId("slider-input")).toHaveValue("0");
    press.End();
    expect(testId("slider-input")).toHaveValue("100");
  });

  it("should behave properly on reverse: true", () => {
    const { getByTestId: testId } = render(
      <SliderComp isReversed min={0} max={100} />,
    );

    expect(testId("slider-thumb")).not.toHaveFocus();
    press.Tab();
    expect(testId("slider-thumb")).toHaveFocus();

    press.ArrowRight();
    press.ArrowRight();
    press.ArrowRight();
    expect(testId("slider-input")).toHaveValue("47");
    press.ArrowLeft();
    press.ArrowLeft();
    press.ArrowLeft();
    expect(testId("slider-input")).toHaveValue("50");
    press.PageUp();
    expect(testId("slider-input")).toHaveValue("40");
    press.PageDown();
    expect(testId("slider-input")).toHaveValue("50");
    press.Home();
    expect(testId("slider-input")).toHaveValue("0");
    press.End();
    expect(testId("slider-input")).toHaveValue("100");
  });

  it("should behave proper min, max values", () => {
    const { getByTestId: testId } = render(<SliderComp min={-50} max={50} />);

    expect(testId("slider-thumb")).not.toHaveFocus();
    press.Tab();
    expect(testId("slider-thumb")).toHaveFocus();

    // middle
    expect(testId("slider-input")).toHaveValue("0");

    press.Home();
    expect(testId("slider-input")).toHaveValue("-50");
    press.End();
    expect(testId("slider-input")).toHaveValue("50");
  });

  it("should behave proper step", () => {
    const { getByTestId: testId } = render(<SliderComp step={25} />);

    expect(testId("slider-thumb")).not.toHaveFocus();
    press.Tab();
    expect(testId("slider-thumb")).toHaveFocus();

    expect(testId("slider-input")).toHaveValue("50");

    press.ArrowLeft();
    expect(testId("slider-input")).toHaveValue("25");
    press.ArrowRight();
    expect(testId("slider-input")).toHaveValue("50");
  });

  it("should behave properly on disabled", () => {
    const { getByTestId: testId } = render(<SliderComp isDisabled />);

    expect(testId("slider-thumb")).not.toHaveFocus();
    expect(testId("slider")).toHaveAttribute("aria-disabled");
    press.Tab();
    expect(testId("slider-thumb")).toHaveFocus();

    press.ArrowLeft();
    expect(testId("slider-input")).toHaveValue("50");
  });

  it("should behave properly on readonly", () => {
    const { getByTestId: testId } = render(<SliderComp isReadOnly />);

    expect(testId("slider-thumb")).not.toHaveFocus();
    expect(testId("slider-thumb")).toHaveAttribute("aria-readonly");
    press.Tab();
    expect(testId("slider-thumb")).toHaveFocus();

    press.ArrowLeft();
    expect(testId("slider-input")).toHaveValue("50");
  });

  test("Slider renders with no a11y violations", async () => {
    const { container } = render(<SliderComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
