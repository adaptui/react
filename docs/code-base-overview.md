# Codebase Overview

_If you are not interested in renderless-component's codebase you can ignore
this documentation_

Let's get a basic overview of our codebase and how our code is stuctured.

Our codebase consists of few important folders

#### [/src](/src)

This is where we keep all our components in respective subfolders.

#### [/src/[component]/\_\_tests\_\_](/src/accordion/__tests__)

Tests for the specific components

#### [/src/[component]/stories](/src/accordion/stories)

Storybook examples

#### [/docs-templates](/docs-templates)

Template for docs which is used for automatically gene

---

### Generated Content.

We have code and docs generation scripts in our workflow which you should be
aware of for reducing any confusion.

We generate:

- keys for reakit components in [\_\_keys.ts](/src/accordion/__keys.ts) file for
  each component.

  Command: `yarn keys`

- Transpile typescript examples to javascript to provide both examples in
  storybook.

  Command: `yarn generatejs`

- Documentation generation, we auto generate proptypes, composition, and inject
  examples in docs with special scripts.

  Command: `yarn docsgen`

### Docs generation guide

For our component API documentation we auto generate them by parsing the
typescript code and extracting information about them.

We have [docs-templates](/docs-templates) which holds the templates for the
docs.

See example for [accordion](/docs-templates/Accordion.md)

#### Props

We can use **&lt;!-- INJECT_PROPS src/accordion -->** markdown comment with this
`INJECT_PROPS` syntax and it will inject the prop types in that place

#### Composition

Composition docs are auto generated Same as before can use

**&lt;!-- INJECT_COMPOSITION src/accordion -->** and it will inject the
composition for the specified component

#### Examples

For the specified component Example injection
`<!-- IMPORT_EXAMPLE src/accordion/AccordionBasic.jsx -->` will inject the
example code.

#### Sandbox links

And finally Sandbox links are also dynamically generated! We can just add this
yaml like markdown comment and it will replace the comment with dynamic sandbox
link

```md
[Open On CodeSandbox](https://codesandbox.io/s/9qc1x)
```

### NPM Scripts

- `storybook` - opens storybook
- `storybook-build` - builds storybook
- `build` - bundles the library
- `test` - runs tests
- `tsd` - runs tests for typescript type check
- `keys` - generates keys for components
- `docsgen` - generates docs for components
- `generatejs` - transpiles ts examples to js
