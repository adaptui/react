# Progress

`Progress` component provides a graphical status for tasks that take some amount
of time to load. It follows
[WAI-ARIA Progressbar Pattern](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

<!-- ADD_TOC -->

## Usage

<!-- ADD_EXAMPLE src/progress/stories/templates/ProgressBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Progress Basic
js: src/progress/stories/templates/ProgressBasicJsx.ts
css: src/progress/stories/templates/ProgressBasicCss.ts
-->
<!-- CODESANDBOX
link_title: Progress Basic TS
tsx: src/progress/stories/templates/ProgressBasicTsx.ts
css: src/progress/stories/templates/ProgressBasicCss.ts
-->

## Other Examples

<!-- CODESANDBOX
link_title: Progress Linear
js: src/progress/stories/templates/LinearProgressJsx.ts
deps: ['@emotion/css']
-->
<!-- CODESANDBOX
link_title: Progress Linear TS
tsx: src/progress/stories/templates/LinearProgressTsx.ts
deps: ['@emotion/css']
-->

<!-- CODESANDBOX
link_title: Progress Circular
js: src/progress/stories/templates/CircularProgressJsx.ts
deps: ['@emotion/css']
-->
<!-- CODESANDBOX
link_title: Progress Circular TS
tsx: src/progress/stories/templates/CircularProgressTsx.ts
deps: ['@emotion/css']
-->

## Accessibility Requirement

- If the `Progress` is describing the loading progress of a particular region of
  a page, you should use `aria-describedby` to point to the status, and set the
  `aria-busy `attribute to `true` on the region until it is finished loading.

<!-- ADD_COMPOSITION src/progress -->

<!-- ADD_PROPS src/progress -->
