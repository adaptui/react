import { AnyObject } from "ariakit-utils/types";
import { FormState } from "./form-state";
export declare const FormContext: import("react").Context<FormState<AnyObject> | undefined>;
export declare function hasMessages(object: AnyObject): boolean;
export declare function get<T>(values: AnyObject, path: StringLike | string[], defaultValue?: T): T;
export declare function set<T extends AnyObject | unknown[]>(values: T, path: StringLike | string[], value: unknown): T;
export declare function setAll<T extends AnyObject, V>(values: T, value: V): DeepMap<T, V>;
export declare function createNames(): any;
/**
 * An object or primitive value that can be converted to a string.
 */
export declare type StringLike = {
    toString: () => string;
    valueOf: () => string;
};
/**
 * Maps through an object `T` or array and defines the leaf values to the given
 * type `V`.
 * @template T Object
 * @template V Value
 */
export declare type DeepMap<T, V> = {
    [K in keyof T]: T[K] extends AnyObject ? DeepMap<T[K], V> : V;
};
/**
 * Similar to `Partial<T>`, but recursively maps through the object and makes
 * nested object properties optional.
 * @template T Object
 */
export declare type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends AnyObject ? DeepPartial<T[K]> : T[K];
};
/**
 * Maps through the values object `T` and defines all properties into a string
 * like type. That is, a type that is an object that can contain other
 * properties but can also be converted into a string with the path name.
 * @template T Values object
 */
export declare type Names<T> = {
    [K in keyof T]: T[K] extends Array<infer U> ? U extends AnyObject ? {
        [key: number]: Names<U>;
    } & StringLike : {
        [key: number]: U & StringLike;
    } & StringLike : T[K] extends AnyObject ? Names<T[K]> : StringLike;
};
