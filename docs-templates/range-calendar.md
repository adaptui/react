# RangeCalendar

`RangeCalendar` component provides a way to a range of dates while allowing you
to style them however. All the date, month & year calculations are done
internally using
[@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html)
to provide the ease of use. It follows the
[Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) for the keyboard
navigaiton & focus management. Supports all the features as React Aria's
[useRangeCalendar](https://react-spectrum.adobe.com/react-aria/useRangeCalendar.html#features).

<!-- ADD_TOC -->

## Usage

<!-- ADD_EXAMPLE src/range-calendar/stories/templates/RangeCalendarBasicJsx.ts -->

<!-- CODESANDBOX
link_title: RangeCalendar
js: src/range-calendar/stories/templates/RangeCalendarBasicJsx.ts
css: src/range-calendar/stories/templates/RangeCalendarBasicCss.ts
files: [src/calendar/stories/templates/UtilsJsx.ts]
-->
<!-- CODESANDBOX
link_title: RangeCalendar TS
tsx: src/range-calendar/stories/templates/RangeCalendarBasicTsx.ts
css: src/range-calendar/stories/templates/RangeCalendarBasicCss.ts
files: [src/calendar/stories/templates/UtilsTsx.ts]
-->

You can customize and style the ranges with CSS attribute selectors

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

## Other Examples

<!-- CODESANDBOX
link_title: Range Calendar Styled
js: src/range-calendar/stories/templates/RangeCalendarStyledJsx.ts
css: src/range-calendar/stories/templates/RangeCalendarBasicCss.ts
files: [src/calendar/stories/templates/UtilsJsx.ts]
-->
<!-- CODESANDBOX
link_title: Range Calendar Styled TS
tsx: src/range-calendar/stories/templates/RangeCalendarStyledTsx.ts
css: src/range-calendar/stories/templates/RangeCalendarBasicCss.ts
files: [src/calendar/stories/templates/UtilsTsx.ts]
-->

<!-- ADD_COMPOSITION src/range-calendar -->

<!-- ADD_PROPS src/range-calendar -->
