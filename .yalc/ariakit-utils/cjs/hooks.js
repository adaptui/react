'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('./dom.js');
var misc = require('./misc.js');

const useReactId = typeof react.useId === "function" ? react.useId : undefined;
const useReactDeferredValue = typeof react.useDeferredValue === "function" ? react.useDeferredValue : undefined;
/**
 * `React.useLayoutEffect` that fallbacks to `React.useEffect` on server side.
 */

const useSafeLayoutEffect = dom.canUseDOM ? react.useLayoutEffect : react.useEffect;
/**
 * Returns a value that never changes even if the argument is updated.
 * @example
 * function Component({ prop }) {
 *   const initialProp = useInitialValue(prop);
 * }
 */

function useInitialValue(value) {
  const [initialValue] = react.useState(value);
  return initialValue;
}
/**
 * Returns a value that is lazily initiated and never changes.
 * @example
 * function Component() {
 *   const set = useLazyRef(() => new Set());
 * }
 */

function useLazyRef(init) {
  const ref = react.useRef();

  if (ref.current === undefined) {
    ref.current = init();
  }

  return ref.current;
}
/**
 * Creates a `React.RefObject` that is constantly updated with the incoming
 * value.
 * @example
 * function Component({ prop }) {
 *   const propRef = useLiveRef(prop);
 * }
 */

function useLiveRef(value) {
  const ref = react.useRef(value);
  useSafeLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
/**
 * Creates a memoized callback function that is constantly updated with the
 * incoming callback.
 * @example
 * function Component(props) {
 *   const onClick = useEventCallback(props.onClick);
 *   React.useEffect(() => {}, [onClick]);
 * }
 */

function useEventCallback(callback) {
  // @ts-ignore
  const ref = react.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  useSafeLayoutEffect(() => {
    ref.current = callback;
  });
  return react.useCallback( // @ts-ignore
  function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
/**
 * Merges React Refs into a single memoized function ref so you can pass it to
 * an element.
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useForkRef(internalRef, ref)} />;
 * });
 */

function useForkRef() {
  for (var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    refs[_key2] = arguments[_key2];
  }

  return react.useMemo(() => {
    if (!refs.some(Boolean)) return;
    return value => {
      refs.forEach(ref => {
        misc.setRef(ref, value);
      });
    };
  }, refs);
}
/**
 * Returns the ref element's ID.
 */

function useRefId(ref, deps) {
  const [id, setId] = react.useState(undefined);
  useSafeLayoutEffect(() => {
    var _ref$current;

    setId(ref == null ? void 0 : (_ref$current = ref.current) == null ? void 0 : _ref$current.id);
  }, deps);
  return id;
}
/**
 * Generates a unique ID. Uses React's useId if available.
 */

function useId(defaultId) {
  if (useReactId) {
    const reactId = useReactId();
    if (defaultId) return defaultId;
    return reactId;
  }

  const [id, setId] = react.useState(defaultId);
  useSafeLayoutEffect(() => {
    if (defaultId || id) return;
    const random = Math.random().toString(36).substr(2, 6);
    setId("id-" + random);
  }, [defaultId, id]);
  return defaultId || id;
}
/**
 * Uses React's useDeferredValue if available.
 */

function useDeferredValue(value) {
  if (useReactDeferredValue) {
    return useReactDeferredValue(value);
  }

  const [deferredValue, setDeferredValue] = react.useState(value);
  react.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setDeferredValue(value);
    });
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return deferredValue;
}
/**
 * Returns the tag name by parsing an element ref and the `as` prop.
 * @example
 * function Component(props) {
 *   const ref = React.useRef();
 *   const tagName = useTagName(ref, "button"); // div
 *   return <div ref={ref} {...props} />;
 * }
 */

function useTagName(ref, type) {
  const [tagName, setTagName] = react.useState(() => stringOrUndefined(type));
  useSafeLayoutEffect(() => {
    var _ref$current2;

    setTagName((ref == null ? void 0 : (_ref$current2 = ref.current) == null ? void 0 : _ref$current2.tagName.toLowerCase()) || stringOrUndefined(type));
  }, [ref, type]);
  return tagName;
}

function stringOrUndefined(type) {
  if (typeof type === "string") {
    return type;
  }

  return;
}
/**
 * A `React.useEffect` that will not run on the first render.
 */


function useUpdateEffect(effect, deps) {
  const mounted = react.useRef(false);
  react.useEffect(() => {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
  }, deps);
}
/**
 * A `React.useLayoutEffect` that will not run on the first render.
 */

function useUpdateLayoutEffect(effect, deps) {
  const mounted = react.useRef(false);
  useSafeLayoutEffect(() => {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
  }, deps);
}
/**
 * A custom version of `React.useState` that uses the `state` and `setState`
 * arguments. If they're not provided, it will use the internal state.
 */

function useControlledState(defaultState, state, setState) {
  const [localState, setLocalState] = react.useState(defaultState);
  const nextState = state !== undefined ? state : localState;
  const stateRef = useLiveRef(state);
  const setStateRef = useLiveRef(setState);
  const nextStateRef = useLiveRef(nextState);
  const setNextState = react.useCallback(prevValue => {
    const setStateProp = setStateRef.current;

    if (setStateProp) {
      if (isSetNextState(setStateProp)) {
        setStateProp(prevValue);
      } else {
        const nextValue = misc.applyState(prevValue, nextStateRef.current);
        nextStateRef.current = nextValue;
        setStateProp(nextValue);
      }
    }

    if (stateRef.current === undefined) {
      setLocalState(prevValue);
    }
  }, []);
  defineSetNextState(setNextState);
  return [nextState, setNextState];
}
const SET_NEXT_STATE = Symbol("setNextState");

function isSetNextState(arg) {
  return arg[SET_NEXT_STATE] === true;
}

function defineSetNextState(arg) {
  if (!isSetNextState(arg)) {
    Object.defineProperty(arg, SET_NEXT_STATE, {
      value: true
    });
  }
}
/**
 * A React hook similar to `useState` and `useReducer`, but with the only
 * purpose of re-rendering the component.
 */


function useForceUpdate() {
  return react.useReducer(() => ({}), {});
}
/**
 * Returns an event callback similar to `useEventCallback`, but this also
 * accepts a boolean value, which will be turned into a function.
 */

function useBooleanEventCallback(booleanOrCallback) {
  return useEventCallback(typeof booleanOrCallback === "function" ? booleanOrCallback : () => booleanOrCallback);
}
/**
 * Returns props with an additional `wrapElement` prop.
 */

function useWrapElement(props, callback, deps) {
  if (deps === void 0) {
    deps = [];
  }

  const wrapElement = react.useCallback(element => {
    if (props.wrapElement) {
      element = props.wrapElement(element);
    }

    return callback(element);
  }, [...deps, props.wrapElement]);
  return { ...props,
    wrapElement
  };
}

exports.useBooleanEventCallback = useBooleanEventCallback;
exports.useControlledState = useControlledState;
exports.useDeferredValue = useDeferredValue;
exports.useEventCallback = useEventCallback;
exports.useForceUpdate = useForceUpdate;
exports.useForkRef = useForkRef;
exports.useId = useId;
exports.useInitialValue = useInitialValue;
exports.useLazyRef = useLazyRef;
exports.useLiveRef = useLiveRef;
exports.useRefId = useRefId;
exports.useSafeLayoutEffect = useSafeLayoutEffect;
exports.useTagName = useTagName;
exports.useUpdateEffect = useUpdateEffect;
exports.useUpdateLayoutEffect = useUpdateLayoutEffect;
exports.useWrapElement = useWrapElement;
