# Codebase Overview

_Proceed if you are interested in contributing to AdaptUI React component's
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

- javascript examples from Typescript examples to provide both examples in
  storybook and docs

  Command: `yarn preview`

- proptypes, composition, csb links and addings examples in the docs using
  scripts.

  Command: `yarn docs`

## Docs generation guide

For our component API documentation, we auto generate them by parsing the
typescript code and extracting information from them.

We have [docs-templates](./docs-templates) which holds the templates for the
docs.

See example for [accordion](./docs-templates/Accordion.md)

### Props

- `ADD_PROPS` syntax will inject the prop types in its place
- Usage: `<!-- ADD_PROPS src/accordion -->` as markdown comment.

### Composition

- `ADD_COMPOSITION` will inject the composition in the specified component
- Usage: `<!-- ADD_COMPOSITION src/accordion -->` as markdown comment.

### Examples

- `ADD_EXAMPLE` will inject the examples from the components as code.
- Usage: `<!-- ADD_EXAMPLE src/accordion/stories/templates/AccordionBasicJsx.ts -->` as markdown
  comment.

### Sandbox links

And finally Sandbox links are also dynamically generated! We can just add this
yaml as markdown comment and it will replace the comment with dynamic sandbox
link

- `CODESANDBOX` with the links to the files will generate the csb links.
- Usage:
  ```md
  <!-- CODESANDBOX
  link_title: Calendar
  js: src/calendar/stories/templates/CalendarBasicJsx.ts
  css: src/calendar/stories/templates/CalendarBasicCss.ts
  files: [src/calendar/stories/templates/UtilsJsx.ts]
  -->
  ```

## NPM Scripts

- `storybook` - opens storybook
- `storybook-build` - builds storybook
- `build` - bundles the library
- `test` - runs tests
- `docs` - generates docs for components
- `preview` - transpiles ts examples to both js & ts string
- `commit` - to commit with [gacp](https://github.com/vivaxy/gacp)
- `lint` - to lint the `src` with [ESLint](https://eslint.org/)
- `format` - to format the `src` with [Prettier](https://prettier.io/)

## Component Docs

- [Accordion](./accordion.md)
- [Breadcrumbs](./breadcrumb.md)
- [Calendar](./calendar.md)
- [RangeCalendar](./range-calendar.md)
- [DateField](./datefield.md)
- [DatePicker](./datepicker.md)
- [DateRangePicker](./daterange-picker.md)
- [TimeField](./timefield.md)
- [Drawer](./drawer.md)
- [Disclosure](./disclosure.md)
- [Link](./link.md)
- [Meter](./meter.md)
- [Number field](./numberfield.md)
- [Pagination](./pagination.md)
- [Progress](./progress.md)
- [Slider](./slider.md)
- [Toast](./toast.md)
