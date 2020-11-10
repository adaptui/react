import { wait } from "reakit-test-utils";
import { renderHook, act } from "@testing-library/react-hooks";

import { useToastState } from "..";
import { cleanup } from "@testing-library/react-hooks";

beforeEach(() => {
  jest.useFakeTimers();
  jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((cb: any) => cb());
});

afterEach(() => {
  cleanup();
  (window.requestAnimationFrame as any).mockRestore();
});

describe("ToastState", () => {
  it("should render correctly", () => {
    const state = renderHook(() => useToastState({})).result;

    state.current.showToast({ content: "hello world" });
    state.current.showToast({ content: "hello world 2" });
    state.current.showToast({
      content: "hello world 3",
      autoDismiss: true,
      timeout: 5000,
      type: "warning",
      placement: "top-right",
    });

    expect(state.current).toMatchSnapshot();
  });

  it("should add a new toast", () => {
    const { result } = renderHook(() => useToastState({}));

    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({ type: "primary", content: "Hello world" });
    });

    expect(result.current.toasts).toMatchInlineSnapshot(`
      Object {
        "toast-1": Object {
          "autoDismiss": undefined,
          "content": "Hello world",
          "id": "toast-1",
          "isVisible": true,
          "placement": "bottom-center",
          "timeout": undefined,
          "type": "primary",
        },
      }
    `);
  });

  it("should toggle toast", () => {
    const { result } = renderHook(() => useToastState({}));
    const toastId = "toast-1";
    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({ type: "primary", content: "Hello world" });
    });

    act(() => {
      result.current.toggleToast({ id: toastId, isVisible: false });
    });

    expect(result.current.toasts[toastId]).toMatchObject({
      isVisible: false,
    });
  });

  it("should remove toast", () => {
    const { result } = renderHook(() => useToastState({}));
    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({ type: "primary", content: "Hello world" });
    });
    expect(Object.values(result.current.toasts)).toHaveLength(1);

    act(() => {
      result.current.removeToast("toast-1");
    });
    expect(result.current.toasts).toStrictEqual({});
  });

  it("should hide toast", () => {
    const { result } = renderHook(() => useToastState({ animationTimeout: 5 }));

    expect(result.current.toasts).toStrictEqual({});

    act(() => {
      result.current.showToast({ type: "primary", content: "Hello world" });
    });
    expect(Object.values(result.current.toasts)).toHaveLength(1);

    act(() => {
      result.current.hideToast("toast-1");
    });

    expect(result.current.toasts).toMatchInlineSnapshot(`
      Object {
        "toast-1": Object {
          "autoDismiss": undefined,
          "content": "Hello world",
          "id": "toast-1",
          "isVisible": false,
          "placement": "bottom-center",
          "timeout": undefined,
          "type": "primary",
        },
      }
    `);

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

    expect(result.current.sortedToasts).toMatchSnapshot();
  });
});
