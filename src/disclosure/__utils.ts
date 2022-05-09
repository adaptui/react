// https://github.com/mui-org/material-ui/blob/da362266f7c137bf671d7e8c44c84ad5cfc0e9e2/packages/material-ui/src/styles/transitions.js#L89-L98
export function getAutoSizeDuration(size: number | string): number {
  if (!size || typeof size === "string") {
    return 0;
  }

  const constant = size / 36;

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export function getElementHeight(
  el: React.RefObject<HTMLElement> | { current?: { scrollHeight: number } },
): string | number {
  if (!el?.current) {
    return "auto";
  }

  return el.current.scrollHeight;
}

export function getElementWidth(
  el: React.RefObject<HTMLElement> | { current?: { scrollWidth: number } },
): string | number {
  if (!el?.current) {
    return "auto";
  }

  return el.current.scrollWidth;
}
