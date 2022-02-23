import { memo, useCallback, useContext, useState, useRef, createContext } from 'react';
import { toArray } from './array.js';
import { useInitialValue, useWrapElement, useLazyRef, useSafeLayoutEffect } from './hooks.js';
import { shallowEqual } from './misc.js';
import { createComponent } from './system.js';
import { jsx } from 'react/jsx-runtime';

const GET_STATE = Symbol("getState");
const SUBSCRIBE = Symbol("subscribe");
const TIMESTAMP = Symbol("timestamp");
const INITIAL_CONTEXT = Symbol("initialContext");

function getState(state) {
  if (!state) return state;
  const fn = state[GET_STATE];
  if (fn) return fn();
  return state;
}

function hasSubscribe(state) {
  if (!state) return false;
  return !!state[SUBSCRIBE];
}

function getSubscribe(state) {
  if (!state) return;
  return state[SUBSCRIBE];
}

function getLatest(a, b) {
  if (!b) return a;
  if (!a) return b;
  if (!(TIMESTAMP in b)) return a;
  if (!(TIMESTAMP in a)) return b;
  if (a[TIMESTAMP] >= b[TIMESTAMP]) return a;
  return b;
}

function defineGetState(state, currentState) {
  if (currentState === void 0) {
    currentState = state;
  }

  Object.defineProperty(state, GET_STATE, {
    value: () => currentState,
    writable: true
  });
}

function defineSubscribe(state, subscribe) {
  if (!(SUBSCRIBE in state)) {
    Object.defineProperty(state, SUBSCRIBE, {
      value: subscribe
    });
  }
}

function defineTimestamp(state) {
  if (!(TIMESTAMP in state)) {
    Object.defineProperty(state, TIMESTAMP, {
      value: Date.now(),
      writable: true
    });
  }
}

function patchState(state) {
  Object.defineProperty(state, TIMESTAMP, {
    value: Date.now(),
    writable: true
  });
}

function defineInitialContext(context) {
  const initialContext = /*#__PURE__*/createContext(undefined);
  Object.defineProperty(context, INITIAL_CONTEXT, {
    value: initialContext
  });
  return initialContext;
}

function hasInitialContext(stateOrContext) {
  return stateOrContext && INITIAL_CONTEXT in stateOrContext;
}

function getInitialContext(context) {
  if (!hasInitialContext(context)) return;
  const ctx = context;
  return ctx[INITIAL_CONTEXT];
}
/**
 * Creates a context that can be passed to `useStore` and `useStoreProvider`.
 */


function createStoreContext() {
  const context = /*#__PURE__*/createContext(undefined);
  defineInitialContext(context);
  return context;
}
/**
 * Creates a type-safe component with the `as` prop, `state` prop,
 * `React.forwardRef` and `React.memo`.
 *
 * @example
 * import { Options, createMemoComponent } from "ariakit-utils/store";
 *
 * type Props = Options<"div"> & {
 *   state?: { customProp: boolean };
 * };
 *
 * const Component = createMemoComponent<Props>(
 *   ({ state, ...props }) => <div {...props} />
 * );
 *
 * <Component as="button" state={{ customProp: true }} />
 */

function createMemoComponent(render, propsAreEqual) {
  if (propsAreEqual === void 0) {
    propsAreEqual = shallowEqual;
  }

  const Role = createComponent(render);
  return /*#__PURE__*/memo(Role, (prev, next) => {
    const {
      state: prevState,
      ...prevProps
    } = prev;
    const {
      state: nextState,
      ...nextProps
    } = next;

    if (nextState && hasSubscribe(nextState)) {
      return propsAreEqual(prevProps, nextProps);
    }

    return propsAreEqual(prev, next);
  });
}
/**
 * Returns props with a `wrapElement` function that wraps an element with a
 * React Context Provider that provides a store context to consumers.
 * @example
 * import * as React from "react";
 * import { useStoreProvider } from "ariakit-utils/store";
 *
 * const StoreContext = createStoreContext();
 *
 * function Component({ state, ...props }) {
 *   const { wrapElement } = useStoreProvider({ state, ...props }, StoreContext);
 *   return wrapElement(<div {...props} />);
 * }
 */

function useStoreProvider(_ref, context) {
  let {
    state,
    ...props
  } = _ref;
  const initialValue = useInitialValue(state);
  const value = state && hasSubscribe(state) ? initialValue : state;
  defineGetState(value, state);
  const initialContext = getInitialContext(context);
  props = useWrapElement(props, element => {
    if (value && initialContext) {
      element = /*#__PURE__*/jsx(initialContext.Provider, {
        value: value,
        children: element
      });
    }

    if (state) {
      element = /*#__PURE__*/jsx(context.Provider, {
        value: state,
        children: element
      });
    }

    return element;
  }, [value, initialContext, state, context]);
  return props;
}
/**
 * Adds publishing capabilities to state so it can be passed to `useStore` or
 * `useStoreProvider` later.
 * @example
 * import { useStorePublisher } from "ariakit-utils/store";
 *
 * function useComponentState() {
 *   const state = React.useMemo(() => ({ a: "a" }), []);
 *   return useStorePublisher(state);
 * }
 */

function useStorePublisher(state) {
  const listeners = useLazyRef(() => new Set());
  useSafeLayoutEffect(() => {
    patchState(state);

    for (const listener of listeners) {
      listener(state);
    }
  }, [state]);
  const subscribe = useCallback(listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);
  defineSubscribe(state, subscribe);
  defineGetState(state);
  defineTimestamp(state);
  return state;
}
/**
 * Handles state updates on the state or context state passed as the first
 * argument based on the filter argument.
 * @example
 * import { useStore } from "ariakit-utils/store";
 *
 * const ContextState = createContextState();
 *
 * function Component({ state }) {
 *   state = useStore(state || ContextState, ["stateProp"]);
 * }
 */

function useStore(stateOrContext, filter) {
  const contextState = useContext(getContext(stateOrContext, filter));
  const externalState = hasInitialContext(stateOrContext) ? contextState : stateOrContext;
  const [internalState, setState] = useState(() => getState(externalState));
  const state = hasSubscribe(externalState) && hasSubscribe(internalState) ? getLatest(internalState, externalState) : externalState;
  const subscribe = getSubscribe(externalState);
  const prevStateRef = useRef(null);
  const deps = toArray(filter);
  const noFilter = !filter;
  useSafeLayoutEffect(() => {
    if (!subscribe || !setState) return;
    if (noFilter) return subscribe(setState);
    if (!deps.length) return;
    return subscribe(nextState => {
      const prevState = prevStateRef.current;
      prevStateRef.current = nextState;

      const filterDep = dep => {
        if (typeof dep === "function") {
          const result = dep(nextState); // TODO: We probably need different functions for:
          // useStore(context, [(nextState) => nextState.activeId === id]);
          // useStore(context, [(nextState) => nextState.booleanProp]);
          // Because in the second case we want to compare the result with the
          // previous state result.

          if (typeof result === "boolean") {
            return result || prevState && dep(prevState);
          } else if (prevState) {
            return result !== dep(prevState);
          }

          return result;
        }

        const key = dep;
        return (prevState == null ? void 0 : prevState[key]) !== nextState[key];
      };

      if (deps.some(filterDep)) {
        setState(nextState);
      }
    });
  }, [subscribe, setState, noFilter, ...deps]);
  return state;
}
const EmptyContext = /*#__PURE__*/createContext(undefined);

function getContext(stateOrContext, filter) {
  if (!hasInitialContext(stateOrContext)) {
    return EmptyContext;
  }

  if (filter) {
    return getInitialContext(stateOrContext);
  }

  return stateOrContext;
}

export { createMemoComponent, createStoreContext, useStore, useStoreProvider, useStorePublisher };
