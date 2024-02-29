import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DatePicker = ({
  selectedDate,
  onDateChange,
  dateFormat = 'MM/DD/YYYY',
  minDate,
  maxDate,
  className,
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = firstDay.getDay();
    const endDay = lastDay.getDate();

    const newCalendar = Array(endDay)
      .fill(0)
      .map((_, index) => {
        const day = index + 1;
        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);

        return {
          date: currentDate,
          day,
          isCurrentMonth: currentDate >= firstDay && currentDate <= lastDay,
          isSelected: isSameDay(currentDate, selectedDate),
          isDisabled: (minDate && currentDate < minDate) || (maxDate && currentDate > maxDate),
        };
      });

    setCalendar(newCalendar);
  };

  const handleDateClick = (date) => {
    if (!date.isDisabled) {
      onDateChange(date.date);
    }
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div className={`datepicker ${className}`}>
      <div className="header">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <div className="month-year">
          {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, index) => (
            <tr key={index}>
                
              {week.map((day) => (
                <td
                  key={day.date}
                  onClick={() => handleDateClick(day)}
                  className={`${day.isCurrentMonth ? 'current-month' : 'other-month'} ${
                    day.isSelected ? 'selected' : ''
                  } ${day.isDisabled ? 'disabled' : ''}`}
                >
                  {day.date.getDate()}
                </td>
              ))}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
};

export default DatePicker;
