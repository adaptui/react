import { Matcher, screen } from "@testing-library/react";

export const isEndSelection = (label: Matcher) => {
  expect(screen.getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-selection-end",
  );
};

export const isStartSelection = (label: Matcher) => {
  expect(screen.getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-selection-start",
  );
};

export const isInSelectionRange = (label: Matcher) => {
  expect(screen.getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-range-selection",
  );
};

export const repeat = (cb: Function, times: number) => {
  for (let i = 0; i < times; i++) {
    cb();
  }
};

/**
 * Enables reading pageX/pageY from fireEvent.mouse*(..., {pageX: ..., pageY: ...}).
 */
export function installMouseEvent() {
  beforeAll(() => {
    const oldMouseEvent = MouseEvent;
    // @ts-ignore
    global.MouseEvent = class FakeMouseEvent extends MouseEvent {
      _init: { pageX: number; pageY: number };
      constructor(name: any, init: any) {
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

export function installPointerEvent() {
  beforeAll(() => {
    // @ts-ignore
    global.PointerEvent = class FakePointerEvent extends MouseEvent {
      _init: {
        pageX: number;
        pageY: number;
        pointerType: string;
        pointerId: number;
      };
      constructor(name: any, init: any) {
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
}
