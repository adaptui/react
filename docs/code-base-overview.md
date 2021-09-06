# Codebase Overview

_Proceed if you are interested in contributing to renderless-component's
codebase_

Let's get a basic overview of our codebase and how our code is stuctured.

Our codebase consists of few important folders,

#### [/src](/src)

This is where we keep all our components in respective subfolders.

#### [/src/[component]/\_\_tests\_\_](/src/accordion/__tests__)

Tests for the specific components

#### [/src/[component]/stories](/src/accordion/stories)

Storybook examples

#### [/docs-templates](/docs-templates)

Template for docs which is used for automatically generated content

---

## Generated Content.

We have code and docs generation scripts in our workflow which you should be
aware of for reducing any confusion.

We generate:

- keys for reakit components in [\_\_keys.ts](/src/accordion/__keys.ts) file for
  each component.

  Command: `yarn keys`

- javascript examples from Typescript examples to provide both examples in
  storybook.

  Command: `yarn generatejs`

- proptypes, composition, csb links and inject examples in the docs with special
  scripts.

  Command: `yarn docsgen`

## Docs generation guide

For our component API documentation, we auto generate them by parsing the
typescript code and extracting information from them.

We have [docs-templates](/docs-templates) which holds the templates for the
docs.

See example for [accordion](/docs-templates/Accordion.md)

### Props

- `INJECT_PROPS` syntax will inject the prop types in its place
- Usage: `<!-- INJECT_PROPS src/accordion -->` as markdown comment.

### Composition

- `INJECT_COMPOSITION` will inject the composition in the specified component
- Usage: `<!-- INJECT_COMPOSITION src/accordion -->` as markdown comment.

### Examples

- `IMPORT_EXAMPLE` will inject the examples from the components as code.
- Usage: `<!-- IMPORT_EXAMPLE src/accordion/stories/templates/AccordionBasicJsx.ts -->` as markdown
  comment.

### Sandbox links

And finally Sandbox links are also dynamically generated! We can just add this
yaml as markdown comment and it will replace the comment with dynamic sandbox
link

- `CODESANDBOX` with the links to the files will generate the csb links.
- Usage:
  ```md
  <!-- CODESANDBOX
  link_title: Accordion Example
  js: src/accordion/stories/templates/AccordionBasicJsx.ts
  css: src/accordion/stories/AccordionStyled.css
  -->
  ```

## NPM Scripts

- `storybook` - opens storybook
- `storybook-build` - builds storybook
- `build` - bundles the library
- `test` - runs tests
- `tsd` - runs tests for typescript type check
- `keys` - generates keys for components
- `docs` - generates docs for components
- `generatejs` - transpiles ts examples to js
- `commit` - to commit with [gacp](https://github.com/vivaxy/gacp)
- `lint` - to lint the `src` with [ESLint](https://eslint.org/)

## Component Docs

- [Accordion](accordion.md)
- [Breadcrumbs](breadcrumb.md)
- [Calendar](calendar.md)
- [Date Picker](datepicker.md)
- [Drawer](drawer.md)
- [Link](Link.md)
- [Meter](meter.md)
- [Number Input](number-input.md)
- [Pagination](pagination.md)
- [Picker Base](picker-base.md)
- [Progress](progress.md)
- [Segment](segment.md)
- [Select](select.md)
- [Slider](slider.md)
- [Time Picker](timepicker.md)
- [Toast](toast.md)
