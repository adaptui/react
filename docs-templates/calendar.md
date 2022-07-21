# Calendar

`Calendar` component provides a way to select a date or a range of dates while
allowing you to style them however. All the date, month & year calculations are
done internally to provide the ease of use. It follows the
[Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) for the keyboard
navigaiton & focus management. Support all the features as React Aria's
[useCalendar](https://react-spectrum.adobe.com/react-aria/useCalendar.html#features)
&
[useRangeCalendar](https://react-spectrum.adobe.com/react-aria/useRangeCalendar.html#features)

<!-- ADD_TOC -->

## Usage

### Base Calendar

<!-- ADD_EXAMPLE src/calendar/stories/templates/CalendarBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Calendar
js: src/calendar/stories/templates/CalendarBasicJsx.ts
css: src/calendar/stories/templates/CalendarBasicCss.ts
files: [src/calendar/stories/templates/UtilsJsx.ts]
-->
<!-- CODESANDBOX
link_title: Calendar TS
tsx: src/calendar/stories/templates/CalendarBasicTsx.ts
css: src/calendar/stories/templates/CalendarBasicCss.ts
files: [src/calendar/stories/templates/UtilsTsx.ts]
-->

### Range Calendar

Converting a normal calendar to a range calendar is as easy as just swaping out
the hook to range calendar hook.

You'll need to import the `useRangeCalendarState` hook from the `@adaptui/react`
first

```diff
- const state = useCalendarBaseState(props);
+ const state = useRangeCalendarBaseState(props);
- const calendar = useCalendarState({ ...props, state });
+ const calendar = useRangeCalendarState({ ...props, state });

return (
-   <Calendar state={calendar}>
+   <RangeCalendar state={calendar}>
      ...
-   </Calendar>
+   </RangeCalendar>
  );
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
link_title: Range Calendar
js: src/calendar/stories/templates/CalendarRangeJsx.ts
css: src/calendar/stories/templates/CalendarRangeCss.ts
files: [src/calendar/stories/templates/UtilsJsx.ts]
-->
<!-- CODESANDBOX
link_title: Range Calendar TS
tsx: src/calendar/stories/templates/CalendarRangeTsx.ts
css: src/calendar/stories/templates/CalendarRangeCss.ts
files: [src/calendar/stories/templates/UtilsTsx.ts]
-->

## Other Examples

<!-- CODESANDBOX
link_title: Calendar Styled
js: src/calendar/stories/templates/CalendarStyledJsx.ts
css: src/calendar/stories/templates/CalendarBasicCss.ts
files: [src/calendar/stories/templates/UtilsJsx.ts]
-->
<!-- CODESANDBOX
link_title: Calendar Styled TS
tsx: src/calendar/stories/templates/CalendarStyledTsx.ts
css: src/calendar/stories/templates/CalendarBasicCss.ts
files: [src/calendar/stories/templates/UtilsTsx.ts]
-->

<!-- CODESANDBOX
link_title: Calendar Range Styled
js: src/calendar/stories/templates/CalendarRangeStyledJsx.ts
css: src/calendar/stories/templates/CalendarRangeCss.ts
files: [src/calendar/stories/templates/UtilsJsx.ts]
-->
<!-- CODESANDBOX
link_title: Calendar Range Styled TS
tsx: src/calendar/stories/templates/CalendarRangeStyledTsx.ts
css: src/calendar/stories/templates/CalendarRangeCss.ts
files: [src/calendar/stories/templates/UtilsTsx.ts]
-->

<!-- ADD_COMPOSITION src/calendar -->

<!-- ADD_PROPS src/calendar -->
