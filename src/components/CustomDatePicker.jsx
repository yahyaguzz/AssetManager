import React, { useState } from "react";
import { tr } from "date-fns/locale/tr";
import DatePicker, { registerLocale } from "react-datepicker";
import { getDate, getMonth, getYear } from "date-fns/fp";
import DownArrowSvg from "../assets/svg/DownArrow";

registerLocale("tr", tr);

const range = (start, end, step = 1) => {
  return Array.from(
    { length: Math.ceil((end - start) / step) },
    (_, i) => start + i * step
  );
};

const years = range(2000, getYear(new Date()) + 1, 1);
const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

function CustomDatePicker({ onChangeDate, customInput }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (date) => {
    setSelectedDate(date);
    onChangeDate(date);
  };

  return (
    <DatePicker
      calendarClassName={`bg-white backdrop-blur-sm hover:cursor-default bg-opacity-80 rounded-2xl border-1 border-custom-primary-500 border-opacity-50 overflow-hidden`}
      selected={selectedDate}
      onCalendarOpen={() => setIsOpen(true)}
      onCalendarClose={() => setIsOpen(false)}
      onChange={onChange}
      dateFormat="d MMMM yyyy"
      locale="tr"
      customInput={customInput(isOpen)}
      dayClassName={(date) => {
        const isSelectedDate = date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear();

        return `sm:mx-1 hover:drop-shadow-sm transition-all duration-300
             ${isSelectedDate
            ? `rounded-full bg-custom-primary-400 bg-opacity-90 font-bold`
            : "bg-gray-100 bg-opacity-70 rounded-md"
          }`;
      }}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className={`flex justify-around sm:p-2 py-2 drop-shadow-sm`}>
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="hover:scale-110 transition-all duration-300"
          >
            <DownArrowSvg
              className="w-5 h-5"
              style={{
                transform: `rotate(90deg)`,
                filter: "invert(100%) brightness(110) saturate(1000%)",
              }}
            />
          </button>
          <select
            className="bg-white bg-opacity-90 rounded-md py-1 px-2"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="bg-white bg-opacity-90 rounded-md py-1 px-2"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="hover:scale-110 transition-all duration-300"
          >
            <DownArrowSvg
              className="w-5 h-5"
              style={{
                transform: `rotate(270deg)`,
                filter: "invert(100%) brightness(110) saturate(1000%)",
              }}
            />
          </button>
        </div>
      )}
    />
  );
}

export default CustomDatePicker;
