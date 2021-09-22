import { clampValue, getOptimumValue, valueToPercent } from ".";

describe("Utils", () => {
  test("clampValue", () => {
    expect(clampValue(5, 1, 8)).toEqual(5);
    expect(clampValue(5, 1, 3)).toEqual(3);
    expect(clampValue(5, 6, 8)).toEqual(6);
  });

  test("valueToPercent", () => {
    expect(valueToPercent(10, 0, 100)).toEqual(10);
    expect(valueToPercent(10, 0, 50)).toEqual(20);
    expect(valueToPercent(10, 0, 1)).toEqual(1000);
    expect(valueToPercent(10, 0, 1000)).toEqual(1);
    expect(valueToPercent(0.5, 0, 100)).toEqual(0.5);
  });

  test("getOptimumValue", () => {
    expect(getOptimumValue(0, 100)).toBe(50);
    expect(getOptimumValue(100, 0)).toBe(100);
    expect(getOptimumValue(100, 500)).toBe(300);
  });
});

// Error logs are not for PRO devs 😎
// we can debug without it
const oldLog = console.error;
beforeAll(() => {
  console.error = () => {};
});

afterAll(() => {
  console.error = oldLog;
});

// class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false };
//   }
//   componentDidCatch(error: any, info: any) {
//     this.setState({ hasError: true });
//   }
//   render() {
//     if (this.state.hasError) return null;
//     return this.props.children;
//   }
// }
