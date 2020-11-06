import { wait } from "reakit-test-utils";
import { renderHook, act } from "@testing-library/react-hooks";

import { useToastState } from "..";

beforeEach(() => {
  jest.useFakeTimers();
  jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((cb: any) => cb());
});

afterEach(() => {
  (window.requestAnimationFrame as any).mockRestore();
});

describe("ToastState", () => {
  it("should render correctly", () => {
    const state = renderHook(() => useToastState({})).result;

    expect(state.current).toMatchInlineSnapshot(`
      Object {
        "hideToast": [Function],
        "isToastVisible": [Function],
        "removeToast": [Function],
        "showToast": [Function],
        "sortedToasts": Object {},
        "toasts": Object {},
        "toggleToast": [Function],
      }
    `);
  });

  it("should add a new toast", () => {
    const { result } = renderHook(() => useToastState({}));

    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({ type: "primary", content: "Hello world" });
    });
    expect(Object.values(result.current.toasts)).toMatchObject([
      {
        autoDismiss: undefined,
        content: "Hello world",
        isVisible: true,
        placement: "bottom-center",
        timeout: undefined,
        type: "primary",
      },
    ]);
  });

  it("should toggle toast", () => {
    const { result } = renderHook(() => useToastState({}));

    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({ type: "primary", content: "Hello world" });
    });

    const id = Object.values(result.current.toasts)[0].id;

    act(() => {
      result.current.toggleToast({ id, isVisible: false });
    });
    expect(result.current.toasts[id]).toMatchObject({ isVisible: false });
  });

  it("should remove toast", () => {
    const { result } = renderHook(() => useToastState({}));

    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({ type: "primary", content: "Hello world" });
    });
    expect(Object.values(result.current.toasts)).toHaveLength(1);
    const id = Object.values(result.current.toasts)[0].id;

    act(() => {
      result.current.removeToast(id);
    });
    expect(result.current.toasts).toStrictEqual({});
  });

  it("should hide toast", () => {
    const { result } = renderHook(() => useToastState({ animationTimeout: 5 }));
    let id = "";

    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({ type: "primary", content: "Hello world" });
    });
    expect(Object.values(result.current.toasts)).toHaveLength(1);
    id = Object.values(result.current.toasts)[0].id;

    act(() => {
      result.current.hideToast(id);
    });
    expect(Object.values(result.current.toasts)).toMatchObject([
      {
        autoDismiss: undefined,
        content: "Hello world",
        isVisible: false,
        placement: "bottom-center",
        timeout: undefined,
        type: "primary",
      },
    ]);

    // Wait for animation timeout and after that toast should be removed
    wait(
      () => {
        expect(result.current.toasts).toStrictEqual({});
      },
      { timeout: 5 },
    );
  });

  it("should test getToastToRender", () => {
    const { result } = renderHook(() => useToastState({}));

    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({
        type: "primary",
        placement: "top-center",
        content: "Hello world 1",
      });
      result.current.showToast({
        type: "primary",
        placement: "bottom-center",
        content: "Hello world 2",
      });
      result.current.showToast({
        type: "primary",
        placement: "bottom-left",
        content: "Hello world 3",
      });
      result.current.showToast({
        type: "primary",
        placement: "bottom-left",
        content: "Hello world 4",
      });
      result.current.showToast({
        type: "primary",
        placement: "top-right",
        content: "Hello world 5",
      });
    });

    const sortedToasts = result.current.sortedToasts;
    expect(sortedToasts["top-center"]).toHaveLength(1);
    expect(sortedToasts["bottom-center"]).toHaveLength(1);
    expect(sortedToasts["bottom-left"]).toHaveLength(2);
    expect(sortedToasts["top-right"]).toHaveLength(1);

    expect(sortedToasts["bottom-left"][0]).toMatchObject({
      content: "Hello world 3",
      placement: "bottom-left",
    });
    expect(sortedToasts["bottom-left"][1]).toMatchObject({
      content: "Hello world 4",
      placement: "bottom-left",
    });
  });
});
