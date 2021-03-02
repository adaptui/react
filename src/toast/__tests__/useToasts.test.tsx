import React from "react";
import mockDate from "mockdate";
import { cleanup, renderHook } from "@testing-library/react-hooks";

import { useToasts } from "../Toasts";
import { ToastProvider } from "../ToastProvider";

beforeEach(() => {
  jest.useFakeTimers();
  mockDate.set(new Date(1614683631209));
});
afterEach(cleanup);

const renderUseToasts = () => {
  return renderHook(
    () => {
      return useToasts();
    },
    { wrapper: ToastProvider },
  );
};

describe("useToasts", () => {
  it("should test all the function", () => {
    const { result } = renderUseToasts();

    result.current.upsertToast("Hello world");

    expect(result.current.toasts).toEqual([
      {
        animationDuration: 0,
        autoDismiss: true,
        content: "Hello world",
        createdAt: 1614683631209,
        dismissDuration: 3000,
        id: "1",
        pauseDuration: 0,
        pausedAt: null,
        placement: "bottom-center",
        reverseOrder: false,
        type: "info",
        visible: false,
      },
    ]);

    result.current.updateToast("1", { content: "Updated", visible: true });
    expect(result.current.toasts[0].visible).toBe(true);
    expect(result.current.toasts[0].content).toBe("Updated");

    result.current.dismissToast("1");
    expect(result.current.toasts[0].visible).toBe(false);
  });

  // TODO: Fix this
  it.skip("should pauseTimer & resumeTimer", async () => {
    mockDate.reset();

    const { result, waitFor, waitForNextUpdate } = renderUseToasts();

    result.current.upsertToast("Hello world", {
      autoDismiss: false,
      dismissDuration: 100000,
    });

    await waitForNextUpdate();
    // await waitFor(() => {}, { timeout: 1000 });
    expect(result.current.toasts.length).toBe(0);
  });
});
