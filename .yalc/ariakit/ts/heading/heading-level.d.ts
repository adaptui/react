import { ReactNode } from "react";
import { HeadingLevels } from "./__utils";
/**
 * A component that sets the heading level for the children. It doesn't render
 * any HTML element, just sets the `level` prop on the context.
 * @see https://ariakit.org/components/heading
 * @example
 * ```jsx
 * <HeadingLevel>
 *   <Heading>Heading 1</Heading>
 *   <HeadingLevel>
 *     <Heading>Heading 2</Heading>
 *   </HeadingLevel>
 * </HeadingLevel>
 * ```
 */
export declare function HeadingLevel({ level, children }: HeadingLevelProps): JSX.Element;
export declare type HeadingLevelProps = {
    /**
     * The heading level. By default, it'll increase the level by 1 based on the
     * context.
     */
    level?: HeadingLevels;
    children?: ReactNode;
};
