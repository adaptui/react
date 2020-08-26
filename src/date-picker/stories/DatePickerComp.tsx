import * as React from "react";
import { useDayzed, DateObj } from "dayzed";
import { monthNamesShort, weekdayNamesShort } from "./__utils";
import { createOnKeyDown } from "@chakra-ui/utils";

export const DatePickerComp = (props: any) => {
  const daysRef = React.useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDayzed({
    date: selectedDate,
    onDateSelected: (dateObj: DateObj, _: React.SyntheticEvent) => {
      setSelectedDate(dateObj.date);
    },
    showOutsideDays: true,
  });

  function getKeyOffset(number: any) {
    if (daysRef.current) {
      const e = document.activeElement;
      const days = Array.from(daysRef.current?.childNodes);
      days.forEach((el, i) => {
        const newNodeKey = i + number;
        if (el == e) {
          if (newNodeKey <= days.length - 1 && newNodeKey >= 0) {
            days[newNodeKey].focus();
          } else {
            days[0].focus();
          }
        }
      });
    }
  }

  const handleOnKeyDown = createOnKeyDown({
    stopPropagation: true,
    keyMap: {
      ArrowDown: () => {
        getKeyOffset(7);
      },
      ArrowUp: () => {
        getKeyOffset(-7);
      },
      ArrowLeft: () => {
        getKeyOffset(-1);
      },
      ArrowRight: () => {
        getKeyOffset(1);
      },
    },
  });

  if (calendars.length) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div>
          <button {...getBackProps({ calendars })}>Back</button>
          <button {...getForwardProps({ calendars })}>Next</button>
        </div>
        {calendars.map(calendar => (
          <div
            key={`${calendar.month}${calendar.year}`}
            style={{
              display: "inline-block",
              width: "50%",
              padding: "0 10px 30px",
              boxSizing: "border-box",
            }}
          >
            <div>
              {monthNamesShort[calendar.month]} {calendar.year}
            </div>
            {weekdayNamesShort.map(weekday => (
              <div
                key={`${calendar.month}${calendar.year}${weekday}`}
                style={{
                  display: "inline-block",
                  width: "calc(100% / 7)",
                  border: "none",
                  background: "transparent",
                }}
              >
                {weekday}
              </div>
            ))}
            <div ref={daysRef}>
              {calendar.weeks.map((week, weekIndex) =>
                week.map((dateObj, index) => {
                  const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                  if (!dateObj) {
                    return (
                      <div
                        key={key}
                        style={{
                          display: "inline-block",
                          width: "calc(100% / 7)",
                          border: "none",
                          background: "transparent",
                        }}
                      />
                    );
                  }
                  const { date, selected, selectable, today } = dateObj;
                  let background = today ? "cornflowerblue" : "";
                  background = selected ? "purple" : background;
                  background = !selectable ? "teal" : background;

                  return (
                    <button
                      style={{
                        display: "inline-block",
                        width: "calc(100% / 7)",
                        border: "none",
                        background,
                      }}
                      key={key}
                      {...getDateProps({ dateObj })}
                      onKeyDown={handleOnKeyDown}
                    >
                      {selectable ? date.getDate() : "X"}
                    </button>
                  );
                }),
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
