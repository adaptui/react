# Toast

`Toast` component provides a way to add notifications to the app with complete
freedom of styling them. It follows
[WAI-ARIA Alert Patter](https://www.w3.org/TR/wai-aria-practices-1.2/#alert) for
the
[accessibility properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-0)

## Usage

<!-- IMPORT_EXAMPLE src/toast/stories/__js/ToastBasic.component.jsx -->

We can utilize the `toastWrapper` prop to add animations and other wrappers
around the toast.

Example:

```jsx
<ToastProvider
  animationTimeout={500}
  toastWrapper={({ id, isVisible, children }) => (
    <CSSTransition className="fadeIn" in={isVisible} timeout={500}>
      {children}
    </CSSTransition>
  )}
  toastTypes={{
    primary: ({ content }) => <span>{content}</span>,
  }}
>
  <ToastTriggers />
</ToastProvider>
```

We also have to add the `animationTimeout` inorder to specify a delay before
removing the toast from the state, this would ensure the CSS or any other
animations has the chance to finish without being interrupted.

<!-- CODESANDBOX
link_title: Toast Basic
js: src/toast/stories/__js/ToastBasic.component.jsx
-->

<!-- CODESANDBOX
link_title: Toast Styled
js: src/toast/stories/__js/ToastStyled.component.jsx
utils: src/toast/stories/__js/Utils.component.jsx
css: src/toast/stories/ToastStyled.css
-->

<!-- CODESANDBOX
link_title: Toast CSS Animated
js: src/toast/stories/__js/ToastCSSAnimated.component.jsx
utils: src/toast/stories/__js/Utils.component.jsx
css: src/toast/stories/ToastStyled.css
deps: ["react-transition-group", "@chakra-ui/utils"]
-->

<!-- CODESANDBOX
link_title: Toast React Spring
js: src/toast/stories/__js/ToastReactSpring.component.jsx
utils: src/toast/stories/__js/Utils.component.jsx
css: src/toast/stories/ToastStyled.css
deps: ["@react-spring/web", "@chakra-ui/utils"]
-->
