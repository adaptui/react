/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import ReactDOM from "react-dom";
import { VisuallyHidden } from "reakit";
import React, { Fragment, useImperativeHandle, useRef, useState } from "react";

/* Inspired by https://github.com/AlmeroSteyn/react-aria-live */
const liveRegionAnnouncer = React.createRef();
let node: any = null;
let clearTimeoutId: any = null;
const LIVEREGION_TIMEOUT_DELAY = 1000;

type TAriaLive = "assertive" | "off" | "polite" | undefined;

/**
 * Announces the message using screen reader technology.
 */
export function announce(
  message: string,
  assertiveness: TAriaLive = "assertive",
  timeout = LIVEREGION_TIMEOUT_DELAY,
) {
  ensureInstance(announcer =>
    announcer.announce(message, assertiveness, timeout),
  );
}

/**
 * Stops all queued announcements.
 */
export function clearAnnouncer(assertiveness: TAriaLive) {
  ensureInstance(announcer => announcer.clear(assertiveness));
}

/**
 * Removes the announcer from the DOM.
 */
export function destroyAnnouncer() {
  if (liveRegionAnnouncer.current) {
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
    node = null;
  }
}

/**
 * Ensures we only have one instance of the announcer so that we don't have elements competing.
 */
function ensureInstance(callback: (announcer: any) => void) {
  if (!liveRegionAnnouncer.current) {
    node = document.createElement("div");
    document.body.appendChild(node);
    ReactDOM.render(
      <LiveRegionAnnouncer ref={liveRegionAnnouncer} />,
      node,
      () => callback(liveRegionAnnouncer.current),
    );
  } else {
    callback(liveRegionAnnouncer.current);
  }
}

export const LiveRegionAnnouncer = React.forwardRef((props, ref) => {
  const [assertiveMessage, setAssertiveMessage] = useState("");
  const [politeMessage, setPoliteMessage] = useState("");

  const clear = (assertiveness: TAriaLive) => {
    if (!assertiveness || assertiveness === "assertive") {
      setAssertiveMessage("");
    }

    if (!assertiveness || assertiveness === "polite") {
      setPoliteMessage("");
    }
  };

  const announce = (
    message: string,
    assertiveness: TAriaLive = "assertive",
    timeout = LIVEREGION_TIMEOUT_DELAY,
  ) => {
    if (clearTimeoutId) {
      clearTimeout(clearTimeoutId);
      clearTimeoutId = null;
    }

    if (assertiveness === "assertive") {
      setAssertiveMessage(message);
    } else {
      setPoliteMessage(message);
    }

    if (message !== "") {
      clearTimeoutId = setTimeout(() => {
        clear(assertiveness);
      }, timeout);
    }
  };

  useImperativeHandle(ref, () => ({
    announce,
    clear,
  }));

  return (
    <Fragment>
      <MessageAlternator aria-live="assertive" message={assertiveMessage} />
      <MessageAlternator aria-live="polite" message={politeMessage} />
    </Fragment>
  );
});

function MessageAlternator({
  message = "",
  "aria-live": ariaLive,
}: {
  message: string;
  "aria-live": TAriaLive;
}) {
  const messagesRef = useRef(["", ""]);
  const indexRef = useRef(0);

  if (message !== messagesRef.current[indexRef.current]) {
    messagesRef.current[indexRef.current] = "";
    indexRef.current = (indexRef.current + 1) % 2;
    messagesRef.current[indexRef.current] = message;
  }

  return (
    <Fragment>
      <MessageBlock aria-live={ariaLive} message={messagesRef.current[0]} />
      <MessageBlock aria-live={ariaLive} message={messagesRef.current[1]} />
    </Fragment>
  );
}

function MessageBlock({
  message = "",
  "aria-live": ariaLive,
}: {
  message: string;
  "aria-live": TAriaLive;
}) {
  return (
    <VisuallyHidden
      data-testid={`announcer-${ariaLive}`}
      aria-live={ariaLive}
      aria-relevant="additions"
      aria-atomic="true"
    >
      {message}
    </VisuallyHidden>
  );
}
