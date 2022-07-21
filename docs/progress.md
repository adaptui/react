# Progress

`Progress` component provides a graphical status for tasks that take some amount
of time to load. It follows
[WAI-ARIA Progressbar Pattern](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/progress/stories/templates/ProgressBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Progress Basic
js: src/progress/stories/templates/ProgressBasicJsx.ts
css: src/progress/stories/templates/ProgressBasicCss.ts
-->

<!-- CODESANDBOX
link_title: Progress Linear
js: src/progress/stories/templates/LinearProgressJsx.ts
deps: ['@emotion/css']
-->

<!-- CODESANDBOX
link_title: Progress Circular
js: src/progress/stories/templates/CircularProgressJsx.ts
deps: ['@emotion/css']
-->

## Accessibility Requirement

- If the `Progress` is describing the loading progress of a particular region of
  a page, you should use `aria-describedby` to point to the status, and set the
  `aria-busy `attribute to `true` on the region until it is finished loading.

<!-- INJECT_COMPOSITION src/progress -->

## Props

### `ProgressOptions`

| Name        | Type                                                                                                                                                                             | Description                                     |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| **`as`**    | <code>T \| undefined</code>                                                                                                                                                      |                                                 |
| **`state`** | <code title="{ value: number \| null; min: number; max: number; isIndeterminate: boolean; percent: number \| null; }">{ value: number \| null; min: number; max: numbe...</code> | Object returned by the `useProgressState` hook. |

### `ProgressStateProps`

| Name        | Type                        | Description                                                                                       |
| :---------- | :-------------------------- | :------------------------------------------------------------------------------------------------ |
| **`value`** | <code>number \| null</code> | The `value` of the progress indicator.If `null` the progress bar will be in `indeterminate` state |
| **`min`**   | <code>number</code>         | The minimum value of the progress                                                                 |
| **`max`**   | <code>number</code>         | The maximum value of the                                                                          |
