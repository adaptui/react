import {
  countDecimalPlaces,
  StringOrNumber,
  toPrecision,
} from "@chakra-ui/utils";
import { KeyboardEvent } from "react";

export function parse(value: StringOrNumber) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ""));
}

export function getDecimalPlaces(value: number, step: number) {
  return Math.max(countDecimalPlaces(step), countDecimalPlaces(value));
}

export function cast(value: StringOrNumber, step: number, precision?: number) {
  const decimalPlaces = getDecimalPlaces(parse(value), step);
  return toPrecision(parse(value), precision ?? decimalPlaces);
}

const FLOATING_POINT_REGEX = /^[Ee0-9+\-.]$/;

/**
 * Determine if a character is a DOM floating point character
 * @see https://www.w3.org/TR/2012/WD-html-markup-20120329/datatypes.html#common.data.float
 */
export function isFloatingPointNumericCharacter(character: string) {
  return FLOATING_POINT_REGEX.test(character);
}

/**
 * Determine if the event is a valid numeric keyboard event.
 * We use this so we can prevent non-number characters in the input
 */
export function isValidNumericKeyboardEvent(event: React.KeyboardEvent) {
  if (event.key == null) return true;

  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;

  if (isModifierKey) {
    return true;
  }

  const isSingleCharacterKey = event.key.length === 1;

  if (!isSingleCharacterKey) {
    return true;
  }

  return isFloatingPointNumericCharacter(event.key);
}

export function getStepFactor(event: KeyboardEvent) {
  let ratio = 1;

  if (event.metaKey || event.ctrlKey) {
    ratio = 0.1;
  }

  if (event.shiftKey) {
    ratio = 10;
  }

  return ratio;
}

export * from "./useSpinner";
