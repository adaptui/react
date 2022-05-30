# Calendar

`Calendar` component provides a way to select a date or a range of dates while
allowing you to style them however. All the date, month & year calculations are
done internally to provide the ease of use. It follows the
[Grid Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#grid) for the
keyboard navigaiton & focus management.

<!-- INJECT_TOC -->

## Usage

### Base Calendar

<!-- IMPORT_EXAMPLE src/calendar/stories/templates/CalendarBasicJsx.ts -->

### Range Calendar

Converting a normal calendar to a range calendar is as easy as just swaping out
the hook to range calendar hook.

You'll need to import the `useRangeCalendarState` hook from the `@adaptui/react`
first

```diff
- const state = useCalendarState(props);
+ const state = useRangeCalendarState(props);
```

Also we can customize and style the ranges with CSS attribute selectors

```css
[data-is-range-selection] > span {
  /* styles for any cells between start-end (inclusive) */
}
[data-is-selection-start] > span {
  /* styles for first selected range cell */
}
[data-is-selection-end] > span {
  /* styles for end selected range cell */
}

/* only applied if cell date is first or last of the month*/
[data-is-range-start] > span {
  /**/
}
[data-is-range-end] > span {
  /**/
}
```

<!-- CODESANDBOX
link_title: Calendar
js: src/calendar/stories/templates/CalendarBasicJsx.ts
css: src/calendar/stories/templates/CalendarBasicCss.ts
utils: src/calendar/stories/templates/UtilsJsx.ts
-->

<!-- CODESANDBOX
link_title: Range Calendar
js: src/calendar/stories/templates/CalendarRangeJsx.ts
css: src/calendar/stories/templates/CalendarRangeCss.ts
utils: src/calendar/stories/templates/UtilsJsx.ts
-->

<!-- INJECT_COMPOSITION src/calendar -->

<!-- INJECT_PROPS src/calendar -->
