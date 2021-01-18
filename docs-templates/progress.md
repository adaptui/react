# Progress

`Progress` component provides a graphical status for tasks that take some amount
of time to load. It follows
[WAI-ARIA Progressbar Pattern](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/progress/stories/__js/ProgressBasic.component.jsx -->

<!-- CODESANDBOX
link_title: Progress Basic
js: src/progress/stories/__js/ProgressBasic.component.jsx
css: src/progress/stories/ProgressBasic.css
-->

<!-- CODESANDBOX
link_title: Progress Linear
js: src/progress/stories/__js/LinearProgress.component.jsx
deps: ['@emotion/css']
-->

<!-- CODESANDBOX
link_title: Progress Circular
js: src/progress/stories/__js/CircularProgress.component.jsx
deps: ['@emotion/css']
-->

## Accessibility Requirement

- If the `Progress` is describing the loading progress of a particular region of
  a page, you should use `aria-describedby` to point to the status, and set the
  `aria-busy `attribute to `true` on the region until it is finished loading.

<!-- INJECT_COMPOSITION src/progress -->

<!-- INJECT_PROPS src/progress -->
