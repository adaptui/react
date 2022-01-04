import { createHook } from "reakit-system";

export type Hook<O = any, P = any> = {
  (options?: O, htmlProps?: P, unstable_ignoreUseOptions?: boolean): P;
  unstable_propsAreEqual: (prev: O & P, next: O & P) => boolean;
  __keys: ReadonlyArray<any>;
  __useOptions: (options: O, htmlProps: P) => O;
};

export type CreateHook<O, P> = {
  name?: string;
  compose?: Hook | Hook[];
  useState?: { (): any; __keys: ReadonlyArray<any> };
  useOptions?: (options: O, htmlProps: P) => O;
  useProps?: (options: O, htmlProps: P) => P;
  useComposeOptions?: (options: O, htmlProps: P) => O;
  useComposeProps?: (options: O, htmlProps: P) => P;
  propsAreEqual?: (prev: O & P, next: O & P) => boolean;
  keys?: ReadonlyArray<string>;
};

export function createComposableHook<O, P>(options: CreateHook<O, P>) {
  const composableHook = (newOptions?: CreateHook<O, P>) => {
    return createHook({ ...options, ...newOptions });
  };

  return composableHook;
}
