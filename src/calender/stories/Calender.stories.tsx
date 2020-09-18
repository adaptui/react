import React from "react";
import { Meta } from "@storybook/react";
import { format, getDate } from "date-fns";

import "./style.css";
import {
  Calender,
  CalenderBody,
  CalenderCell,
  CalenderRow,
  useCalenderState,
} from "../";

export default {
  title: "Component/Calender",
} as Meta;

export const Default = () => {
  const state = useCalenderState();

  return (
    <>
      <Calender aria-label="Calendar grid" className="calendar" {...state}>
        <section className="calender__header">
          <div className="calender__header--buttons">
            <button aria-label="previous year" onClick={state.previousYear}>
              {"<<"}
            </button>
            <button aria-label="previous month" onClick={state.previousMonth}>
              {"<"}
            </button>
          </div>
          <h3 aria-live="polite" className="header__date">
            {format(state.startDate, "MMMM yyyy")}
          </h3>
          <div className="calender__header--buttons">
            <button aria-label="next month" onClick={state.nextMonth}>
              {">"}
            </button>
            <button aria-label="next year" onClick={state.nextYear}>
              {">>"}
            </button>
          </div>
        </section>

        <CalenderBody {...state} className="calender__table">
          <tr className="calender__table--header__weeks">
            {state.weeksDays.map(day => (
              <th>
                <div key={day} aria-label={day}>
                  <abbr title={day}>{day.slice(0, 3)}</abbr>
                </div>
              </th>
            ))}
          </tr>
          {state.weeks.map((dates, i) => {
            return (
              <CalenderRow {...state} key={i}>
                {dates.map(day => {
                  return (
                    <CalenderCell
                      {...state}
                      key={day.date.toString()}
                      disabled={day.type == "disabled"}
                      className={"calender__table--cell"}
                      date={day.date}
                    >
                      {getDate(day.date)}
                    </CalenderCell>
                  );
                })}
              </CalenderRow>
            );
          })}
        </CalenderBody>
      </Calender>
    </>
  );
};
