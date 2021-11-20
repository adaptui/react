import * as React from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogDisclosure,
  DialogInitialState,
  useDialogState,
} from "../../index";

export type DialogBasicProps = DialogInitialState & {};

export const DialogBasic: React.FC<DialogBasicProps> = props => {
  const dialog = useDialogState(props);
  const searchFieldRef = React.useRef<HTMLInputElement>(null);
  const firstNameRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <DialogBackdrop {...dialog} className="backdrop" animationPresent={true}>
        <Dialog
          {...dialog}
          aria-label="Welcome"
          className="dialog"
          transitionPresent={true}
        >
          Welcome to Reakit!
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="John" />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              ref={firstNameRef}
            />
            <button onClick={dialog.hide}>close</button>
          </div>
        </Dialog>
      </DialogBackdrop>
      <div>
        <p>The search input will receive the focus after closing the dialog.</p>
        <input type="text" placeholder="Search…" ref={searchFieldRef} />
      </div>
    </>
  );
};

export default DialogBasic;
