import React from "react";
import mockDate from "mockdate";
import { cleanup, renderHook } from "@testing-library/react-hooks";

import { Toast } from "../ToastTypes";
import { useCreateToast } from "../Toasters";
import { ToastProvider } from "../ToastProvider";
import { State, ActionType, Action, toastReducer } from "../ToastState";

beforeEach(() => {
  mockDate.set(new Date(1614683631209));
});
afterEach(cleanup);

const defaultState = { toasts: [] };

const renderToastHook = (initialState: State<Toast> = defaultState) => {
  return renderHook(
    () => {
      const values = React.useReducer<
        React.Reducer<State<Toast>, Action<Toast>>
      >(toastReducer, initialState);
      return {
        state: values[0],
        dispatch: values[1],
      };
    },
    { wrapper: ToastProvider },
  );
};

describe("ToastState reducer", () => {
  expect.assertions(1);
  it("should have initial state", () => {
    const { result } = renderToastHook();

    expect(result.current.state).toEqual({ toasts: [] });
  });

  it("should add a new toast", async () => {
    const { result } = renderToastHook();

    const {
      result: { current: toast },
    } = renderHook(() => useCreateToast(), { wrapper: ToastProvider });

    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: toast("Hello world", {
        autoDismiss: false,
        dismissDuration: Infinity,
      }),
    });

    expect(result.current.state).toEqual({
      toasts: [
        {
          animationDuration: 0,
          autoDismiss: false,
          content: "Hello world",
          createdAt: 1614683631209,
          dismissDuration: Infinity,
          id: "1",
          pauseDuration: 0,
          pausedAt: null,
          placement: "bottom-center",
          reverseOrder: false,
          type: "info",
          visible: false,
        },
      ],
    });
  });

  it("should add a new toast in reverse order", async () => {
    const initialState: State<Toast> = {
      toasts: [
        {
          animationDuration: 0,
          autoDismiss: false,
          content: "Hello world",
          createdAt: 1614683631209,
          dismissDuration: Infinity,
          id: "a",
          pauseDuration: 0,
          pausedAt: null,
          placement: "bottom-center",
          reverseOrder: false,
          type: "info",
          visible: false,
        },
        {
          animationDuration: 0,
          autoDismiss: false,
          content: "Hello world",
          createdAt: 1614683631209,
          dismissDuration: Infinity,
          id: "b",
          pauseDuration: 0,
          pausedAt: null,
          placement: "bottom-center",
          reverseOrder: false,
          type: "info",
          visible: false,
        },
      ],
    };
    const { result } = renderToastHook(initialState);

    const {
      result: { current: toast },
    } = renderHook(() => useCreateToast(), { wrapper: ToastProvider });

    result.current.dispatch({
      type: ActionType.ADD_TOAST,
      toast: toast("Helo world", {
        reverseOrder: true,
        autoDismiss: false,
        dismissDuration: Infinity,
      }),
    });

    expect(result.current.state).toMatchSnapshot();
  });

  it("should remove a toast", async () => {
    const initialState: State<Toast> = {
      toasts: [
        {
          animationDuration: 0,
          autoDismiss: false,
          content: "Hello world",
          createdAt: 1614683631209,
          dismissDuration: Infinity,
          id: "1",
          pauseDuration: 0,
          pausedAt: null,
          placement: "bottom-center",
          reverseOrder: false,
          type: "info",
          visible: false,
        },
      ],
    };

    const { result } = renderToastHook(initialState);

    expect(result.current.state.toasts.length).toEqual(1);

    result.current.dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId: "1",
    });

    expect(result.current.state.toasts.length).toEqual(0);
  });

  it("should update a toast", async () => {
    const initialState: State<Toast> = {
      toasts: [
        {
          animationDuration: 0,
          autoDismiss: false,
          content: "Hello world",
          createdAt: 1614683631209,
          dismissDuration: Infinity,
          id: "1",
          pauseDuration: 0,
          pausedAt: null,
          placement: "bottom-center",
          reverseOrder: false,
          type: "info",
          visible: false,
        },
      ],
    };

    const { result } = renderToastHook(initialState);

    expect(result.current.state.toasts[0].content).toEqual("Hello world");

    result.current.dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: { id: "1", content: "Updated!" },
    });

    expect(result.current.state.toasts[0].content).toEqual("Updated!");
  });

  it("should dissmiss a toast", async () => {
    const initialState: State<Toast> = {
      toasts: [
        {
          animationDuration: 0,
          autoDismiss: false,
          content: "Hello world",
          createdAt: 1614683631209,
          dismissDuration: Infinity,
          id: "1",
          pauseDuration: 0,
          pausedAt: null,
          placement: "bottom-center",
          reverseOrder: false,
          type: "info",
          visible: true,
        },
      ],
    };

    const { result } = renderToastHook(initialState);

    expect(result.current.state.toasts[0].visible).toBe(true);

    result.current.dispatch({
      type: ActionType.DISMISS_TOAST,
      toastId: "1",
    });

    expect(result.current.state.toasts[0].visible).toBe(false);
  });

  it("should upsert a toast", async () => {
    const initialState: State<Toast> = {
      toasts: [
        {
          animationDuration: 0,
          autoDismiss: false,
          content: "Hello world",
          createdAt: 1614683631209,
          dismissDuration: Infinity,
          id: "1",
          pauseDuration: 0,
          pausedAt: null,
          placement: "bottom-center",
          reverseOrder: false,
          type: "info",
          visible: true,
        },
      ],
    };

    const { result } = renderToastHook(initialState);

    const {
      result: { current: toast },
    } = renderHook(() => useCreateToast(), { wrapper: ToastProvider });

    result.current.dispatch({
      type: ActionType.UPSERT_TOAST,
      toast: toast("Second toast"),
    });

    expect(result.current.state.toasts.length).toBe(2);

    result.current.dispatch({
      type: ActionType.UPSERT_TOAST,
      toast: toast("Upserted toast", { id: "1" }),
    });

    expect(result.current.state.toasts.length).toBe(2);
    expect(result.current.state.toasts[1].content).toBe("Upserted toast");
  });
});
