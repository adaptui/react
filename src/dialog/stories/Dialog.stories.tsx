import React from "react";
import { Meta } from "@storybook/react";
import { Button, Portal } from "reakit";
import {
  useDialogState,
  Dialog,
  useDialog,
  DialogDisclosure,
  useDialogDisclosure,
  DialogBackdrop,
  useDialogBackdrop,
} from "../index";

export default {
  title: "Component/Dialog",
  component: Dialog,
} as Meta;

export function Component() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <Dialog {...dialog} aria-label="Welcome">
        Welcome to Reakit!
      </Dialog>
    </>
  );
}

export function Backdrop() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <DialogBackdrop {...dialog}>
        <Dialog {...dialog} aria-label="Welcome">
          Welcome to Reakit!
        </Dialog>
      </DialogBackdrop>
    </>
  );
}

export function InitialFocus() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <Dialog {...dialog} tabIndex={0} aria-label="Welcome">
        <Button onClick={dialog.hide}>Close</Button>
      </Dialog>
    </>
  );
}

export function AlternateInitialFocus() {
  const dialog = useDialogState();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (dialog.visible && ref.current) {
      ref.current.focus();
    }
  }, [dialog.visible]);

  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <Dialog {...dialog} aria-label="Welcome">
        <Button>By default, initial focus would go here</Button>
        <br />
        <br />
        <Button ref={ref}>But now it goes here</Button>
      </Dialog>
    </>
  );
}

export function NonModalDialogs() {
  const dialog = useDialogState({ modal: false });
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <Dialog
        {...dialog}
        aria-label="Welcome"
        style={{ position: "static", transform: "none" }}
      >
        Focus is not trapped within me.
      </Dialog>
    </>
  );
}

export function ChatDialog() {
  const dialog = useDialogState({ modal: false });
  return (
    <>
      <DialogDisclosure {...dialog}>Open chat</DialogDisclosure>
      <Portal>
        <Dialog
          {...dialog}
          aria-label="Welcome"
          hideOnClickOutside={false}
          style={{
            transform: "none",
            top: "auto",
            left: "auto",
            bottom: 0,
            right: 16,
            width: 200,
            height: 300,
          }}
        >
          <Button onClick={dialog.hide}>Close chat</Button>
        </Dialog>
      </Portal>
    </>
  );
}

export function NestedDialogs() {
  const dialog1 = useDialogState();
  const dialog2 = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog1}>Open dialog</DialogDisclosure>
      <Dialog {...dialog1} aria-label="Test">
        <p>
          Press <kbd>ESC</kbd> to close me.
        </p>
        <div style={{ display: "grid", gridGap: 16, gridAutoFlow: "column" }}>
          <Button onClick={dialog1.hide}>Close dialog</Button>
          <DialogDisclosure {...dialog2}>Open nested dialog</DialogDisclosure>
        </div>
        <Dialog {...dialog2} aria-label="Nested">
          <Button onClick={dialog2.hide}>Close nested dialog</Button>
        </Dialog>
      </Dialog>
    </>
  );
}
