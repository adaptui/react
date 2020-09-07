import { useInterval } from "@chakra-ui/hooks";
import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";

const FLOATING_POINT_REGEX = /^[Ee0-9\+\-\.]$/;

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

/**
 * When click and hold on a button - the speed of auto changing the value.
 */
const CONTINUOUS_CHANGE_INTERVAL = 50;

/**
 * When click and hold on a button - the delay before auto changing the value.
 */
const CONTINUOUS_CHANGE_DELAY = 300;

type Action = "increment" | "decrement";

/**
 * React hook used in the number input to spin it's
 * value on long press of the spin buttons
 *
 * @param increment the function to increment
 * @param decrement the function to decrement
 */
export function useSpinner(
  increment: Function,
  decrement: Function,
  isAtMin: boolean,
  isAtMax: boolean,
) {
  /**
   * To keep incrementing/decrementing on press, we call that `spinning`
   */
  const [isSpinning, setIsSpinning] = useState(false);

  // This state keeps track of the action ("increment" or "decrement")
  const [action, setAction] = useState<Action | null>(null);

  // To increment the value the first time you mousedown, we call that `runOnce`
  const [runOnce, setRunOnce] = useState(true);

  // Store the timeout instance id in a ref, so we can clear the timeout later
  const timeoutRef = useRef<any>(null);

  // Clears the timeout from memory
  const removeTimeout = () => clearTimeout(timeoutRef.current);

  /**
   * useInterval hook provides a performant way to
   * update the state value at specific interval
   */
  useInterval(
    () => {
      if (action === "increment") {
        increment();
      }
      if (action === "decrement") {
        decrement();
      }
    },
    isSpinning ? CONTINUOUS_CHANGE_INTERVAL : null,
  );

  // Function to activate the spinning and increment the value
  const up = useCallback(() => {
    // increment the first fime
    if (runOnce) {
      increment();
    }

    // after a delay, keep incrementing at interval ("spinning up")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false);
      setIsSpinning(true);
      setAction("increment");
    }, CONTINUOUS_CHANGE_DELAY);
  }, [increment, runOnce]);

  // Function to activate the spinning and increment the value
  const down = useCallback(() => {
    // decrement the first fime
    if (runOnce) {
      decrement();
    }

    // after a delay, keep decrementing at interval ("spinning down")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false);
      setIsSpinning(true);
      setAction("decrement");
    }, CONTINUOUS_CHANGE_DELAY);
  }, [decrement, runOnce]);

  // Function to stop spinng (useful for mouseup, keyup handlers)
  const stop = useCallback(() => {
    setRunOnce(true);
    setIsSpinning(false);
    removeTimeout();
  }, []);

  /**
   * If the component unmounts while spinning,
   * let's clear the timeout as well
   */
  useEffect(() => {
    return () => {
      removeTimeout();
    };
  }, []);

  return { up, down, stop };
}
