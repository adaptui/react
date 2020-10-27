import * as React from "react";
import { axe, render, press } from "reakit-test-utils";

import {
  Slider,
  SliderThumb,
  SliderTrack,
  SliderInput,
  useSliderState,
  SliderStateProps,
  SliderFilledTrack,
} from "..";
import {
  sliderHorizontalStyle,
  sliderHorizontalTrackStyle,
  sliderHorizontalThumbStyle,
  sliderHorizontalFilledTractStyle,
} from "../stories/styles";
import { repeat } from "../../utils/test-utils";

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
      <SliderInput data-testid="slider-input" {...slider} name="slider" />
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

    const sliderInput = testId("slider-input");
    const sliderThumb = testId("slider-thumb");

    expect(sliderThumb).not.toHaveFocus();
    press.Tab();
    expect(sliderThumb).toHaveFocus();

    repeat(press.ArrowRight, 3);
    expect(sliderInput).toHaveValue("53");
    repeat(press.ArrowLeft, 3);
    expect(sliderInput).toHaveValue("50");
    press.PageUp();
    expect(sliderInput).toHaveValue("60");
    press.PageDown();
    expect(sliderInput).toHaveValue("50");
    press.Home();
    expect(sliderInput).toHaveValue("0");
    press.End();
    expect(sliderInput).toHaveValue("100");
  });

  it("should behave properly on reverse: true", () => {
    const { getByTestId: testId } = render(
      <SliderComp isReversed min={0} max={100} />,
    );

    const sliderInput = testId("slider-input");
    const sliderThumb = testId("slider-thumb");

    expect(sliderThumb).not.toHaveFocus();
    press.Tab();
    expect(sliderThumb).toHaveFocus();

    repeat(press.ArrowRight, 3);
    expect(sliderInput).toHaveValue("47");
    repeat(press.ArrowLeft, 3);
    expect(sliderInput).toHaveValue("50");
    press.PageUp();
    expect(sliderInput).toHaveValue("40");
    press.PageDown();
    expect(sliderInput).toHaveValue("50");
    press.Home();
    expect(sliderInput).toHaveValue("0");
    press.End();
    expect(sliderInput).toHaveValue("100");
  });

  it("should behave proper min, max values", () => {
    const { getByTestId: testId } = render(<SliderComp min={-50} max={50} />);

    const sliderInput = testId("slider-input");
    const sliderThumb = testId("slider-thumb");

    expect(sliderThumb).not.toHaveFocus();
    press.Tab();
    expect(sliderThumb).toHaveFocus();

    // middle
    expect(sliderInput).toHaveValue("0");

    press.Home();
    expect(sliderInput).toHaveValue("-50");
    press.End();
    expect(sliderInput).toHaveValue("50");
  });

  it("should behave proper step", () => {
    const { getByTestId: testId } = render(<SliderComp step={25} />);

    const sliderInput = testId("slider-input");
    const sliderThumb = testId("slider-thumb");

    expect(sliderThumb).not.toHaveFocus();
    press.Tab();
    expect(sliderThumb).toHaveFocus();

    expect(sliderInput).toHaveValue("50");

    press.ArrowLeft();
    expect(sliderInput).toHaveValue("25");
    press.ArrowRight();
    expect(sliderInput).toHaveValue("50");
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
    const sliderThumb = testId("slider-thumb");

    expect(sliderThumb).not.toHaveFocus();
    expect(sliderThumb).toHaveAttribute("aria-readonly");
    press.Tab();
    expect(sliderThumb).toHaveFocus();

    press.ArrowLeft();
    expect(testId("slider-input")).toHaveValue("50");
  });

  test("Slider renders with no a11y violations", async () => {
    const { container } = render(<SliderComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
