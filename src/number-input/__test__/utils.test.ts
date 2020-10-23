import { isFloatingPointNumericCharacter, getStepFactor } from "../__utils";

describe("NumberInput Utils", () => {
  test("isFloatingPointNumericCharacter", () => {
    expect(isFloatingPointNumericCharacter("0")).toBeTruthy();
    expect(isFloatingPointNumericCharacter("1")).toBeTruthy();
    expect(isFloatingPointNumericCharacter("-")).toBeTruthy();
    expect(isFloatingPointNumericCharacter("+")).toBeTruthy();
    expect(isFloatingPointNumericCharacter(".")).toBeTruthy();
    expect(isFloatingPointNumericCharacter("e")).toBeTruthy();
    expect(isFloatingPointNumericCharacter("E")).toBeTruthy();
    expect(isFloatingPointNumericCharacter("Nope")).toBeFalsy();
    expect(isFloatingPointNumericCharacter("abcd")).toBeFalsy();
  });

  test("getStepFactor", () => {
    expect(getStepFactor({} as React.KeyboardEvent)).toBe(1);
    expect(getStepFactor({ shiftKey: true } as React.KeyboardEvent)).toBe(10);
    expect(getStepFactor({ metaKey: true } as React.KeyboardEvent)).toBe(0.1);
    expect(getStepFactor({ ctrlKey: true } as React.KeyboardEvent)).toBe(0.1);
  });
});
