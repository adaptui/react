import { renderHook } from "@testing-library/react-hooks";

import { ToastOptions } from "../CreateToastContext.types";
import { Content } from "../stories/Utils.component";
import { useToastState } from "../ToastState";
import { ActionType, DefaultToast } from "../ToastTypes";

const createToast = <T extends DefaultToast>(
  content: Content,
  opts?: ToastOptions<T>,
) =>
  ({
    content,
    visible: true,
    reverseOrder: true,
    animationDuration: 100,
    ...opts,
  } as unknown as T);

describe("Toast State Reducer", () => {
  it("should pass smoke test", () => {
    const {
      result: { current },
    } = renderHook(() => useToastState());

    expect(current).toMatchInlineSnapshot(`
      Object {
        "dispatch": [Function],
        "toasts": Array [],
      }
    `);
  });

  it("should add new toast", () => {
    const { result } = renderHook(() => useToastState());
    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world", { id: "1" }),
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Hello world",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
    ]);
  });

  it("should limit number of toasts when adding toast with maxToasts", () => {
    const { result } = renderHook(() => useToastState());
    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      maxToasts: 2,
      toast: createToast("Hello world", { id: "1" }),
    });
    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      maxToasts: 2,
      toast: createToast("Hello world", { id: "2" }),
    });
    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      maxToasts: 2,
      toast: createToast("Hello world", { id: "3" }),
    });

    expect(result.current.toasts).toHaveLength(2);
  });

  it("should obey toast reverse order", () => {
    const { result } = renderHook(() => useToastState());
    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world", { id: "1", reverseOrder: false }),
    });
    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world", { id: "2", reverseOrder: false }),
    });
    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world", { id: "3", reverseOrder: false }),
    });

    expect(result.current.toasts[0].id).toBe("3");
    expect(result.current.toasts[1].id).toBe("2");
    expect(result.current.toasts[2].id).toBe("1");
  });

  it("should upsert toast", () => {
    const { result } = renderHook(() => useToastState());
    result.current.dispatch({
      type: ActionType.UPSERT_TOAST,
      toast: createToast("Hello world", { id: "1" }),
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Hello world",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
    ]);

    result.current.dispatch({
      type: ActionType.UPSERT_TOAST,
      toast: createToast("Upserted toast", { id: "1" }),
    });

    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Upserted toast",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
    ]);
  });

  it("should remove a toast", () => {
    const { result } = renderHook(() => useToastState());

    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world 1", { id: "1" }),
    });

    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world 2", { id: "2" }),
    });

    expect(result.current.toasts).toHaveLength(2);

    result.current.dispatch({ type: ActionType.REMOVE_TOAST, toastId: "1" });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].id).toBe("2");
  });

  it("should dismiss a toast", () => {
    const { result } = renderHook(() => useToastState());

    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world", { id: "1" }),
    });

    expect(result.current.toasts[0].visible).toBeTruthy();

    result.current.dispatch({
      type: ActionType.DISMISS_TOAST,
      toastId: "1",
    });

    expect(result.current.toasts[0].visible).toBeFalsy();
  });

  it("should update a toast", () => {
    const { result } = renderHook(() =>
      useToastState<DefaultToast & { content: string }>(),
    );

    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world", { id: "1" }),
    });

    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Hello world",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
    ]);

    result.current.dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: {
        id: "1",
        content: "Hello Updated Toast",
        visible: false,
        animationDuration: 500,
        reverseOrder: false,
      },
    });

    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Hello Updated Toast",
        animationDuration: 500,
        reverseOrder: false,
        visible: false,
      },
    ]);
  });

  it("should update a toast with field", () => {
    const { result } = renderHook(() => useToastState());

    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world", { id: "1" }),
    });

    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Hello world",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
    ]);

    result.current.dispatch({
      type: ActionType.UPDATE_FIELD_TOAST,
      field: "animationDuration",
      fieldValue: 100,
      toast: { animationDuration: 500, visible: false, reverseOrder: true },
    });

    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Hello world",
        animationDuration: 500,
        reverseOrder: true,
        visible: false,
      },
    ]);
  });

  it("should update all toasts", () => {
    const { result } = renderHook(() =>
      useToastState<DefaultToast & { content: string }>(),
    );

    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world", { id: "1" }),
    });
    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: createToast("Hello world 2", { id: "2" }),
    });

    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Hello world",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
      {
        id: "2",
        content: "Hello world 2",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
    ]);

    result.current.dispatch({
      type: ActionType.UPDATE_ALL_TOAST,
      toast: { content: "Updated all" },
    });

    expect(result.current.toasts).toStrictEqual([
      {
        id: "1",
        content: "Updated all",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
      {
        id: "2",
        content: "Updated all",
        animationDuration: 100,
        reverseOrder: true,
        visible: true,
      },
    ]);
  });
});
