import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../../../utils/graphQL/query";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button, Icon } from "semantic-ui-react";
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
} from "./helpers";
import TaskDetail from "../../common/TaskDetail";
import formatDate from "../../../utils/formatDate";
import "./calendar.scss";
Calendar.propTypes = {
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired,
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func,
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Calendar({
  yearAndMonth = [2021, 11],
  onYearAndMonthChange,
  setCurrentId,
  renderDay = () => null,
}) {
  const { data } = useQuery(GET_TASKS);
  const [year, month] = yearAndMonth;
  const [isCurrentMonth, checkIsCurrentMonth] = useState(true);
  const [monthString, setMontString] = useState(months[month - 1]);

  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
    setMontString(months[nextMonth - 1]);
    if (
      nextYear === new Date().getFullYear() &&
      nextMonth === new Date().getMonth() + 1
    ) {
      checkIsCurrentMonth(true);
    } else checkIsCurrentMonth(false);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
    setMontString(months[nextMonth - 1]);
    if (
      nextYear === new Date().getFullYear() &&
      nextMonth === new Date().getMonth() + 1
    ) {
      checkIsCurrentMonth(true);
    } else checkIsCurrentMonth(false);
  };

  const getTask = (task, date) => {
    if (formatDate(task.date) === date) {
      return (
        <TaskDetail
          task={task}
          setCurrentId={setCurrentId}
          rerouting="upcoming"
        />
      );
    }
  };

  return (
    <>
      <div className="navigationHeader">
        <div className="controller">
          <Button.Group size="large">
            {!isCurrentMonth && (
              <Button
                icon
                labelPosition="left"
                color="black"
                onClick={() => handleMonthNavBackButtonClick()}
              >
                <Icon name="left arrow" />
                Prev
              </Button>
            )}

            <Button
              icon
              labelPosition="right"
              color="black"
              onClick={() => handleMonthNavForwardButtonClick()}
            >
              Next
              <Icon name="right arrow" />
            </Button>
          </Button.Group>
        </div>
      </div>
      <div className="calendarLabel">
        {monthString} {year}
      </div>
      <div className="calendar">
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={classNames("day-of-week-header-cell", {
                "weekend-day": [6, 0].includes(index),
              })}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="days-grid">
          {calendarGridDayObjects.map((day) => (
            <div
              key={day.dateString}
              className={classNames("day-grid-item-container", {
                "weekend-day": isWeekendDay(day.dateString),
                "current-month": day.isCurrentMonth,
              })}
            >
              <div className="day-content-wrapper">
                {renderDay(day)}
                {data && data.tasks.map((t) => getTask(t, day.dateString))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired,
};
export function CalendarDayHeader({ calendarDayObject }) {
  return (
    <div className="day-grid-item-header">{calendarDayObject.dayOfMonth}</div>
  );
}
