import React from "react";
import { warn } from "@chakra-ui/utils";

import { Booleanish } from "./types";

// Null Assertion
export const isNull = (value: any): value is null => value == null;

export function clamp(value: number, min = -Infinity, max = Infinity): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Clamps a value to ensure it stays within the min and max range.
 *
 * @param value the value to clamp
 * @param min the minimum value
 * @param max the maximum value
 *
 * @see https://github.com/chakra-ui/chakra-ui/blob/c38892760257b9bbf1b63c05f7f9ccf1684a90b0/packages/utils/src/number.ts
 */
export function clampValue(value: number, min: number, max: number) {
  if (isNull(value)) return value;

  warn({
    condition: max < min,
    message: "clamp: max cannot be less than min",
  });

  return Math.min(Math.max(value, min), max);
}

/**
 * The candidate optimum point is the midpoint between the minimum value and
 * the maximum value.
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element:attr-meter-high-8:~:text=boundary.-,The%20optimum%20point
 */
export function getOptimumValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2;
}

/**
 * Convert a value to percentage based on lower and upper bound values
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 */
export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}

// Function assertions
export function isFunction(value: any): value is Function {
  return typeof value === "function";
}

export function isTouch() {
  return Boolean(
    "ontouchstart" in window ||
      window.navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0,
  );
}

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? "" : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined;

export interface CreateContextOptions {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean;
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string;
  /**
   * The display name of the context
   */
  name?: string;
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
export function createContext<ContextType>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name,
  } = options;

  const Context = React.createContext<ContextType | undefined>(undefined);

  Context.displayName = name;

  function useContext() {
    const context = React.useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<
    ContextType
  >;
}

export const cx = (...classNames: any[]) =>
  classNames.filter(Boolean).join(" ");

export * from "./date";
