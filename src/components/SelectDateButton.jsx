import React, { forwardRef, useEffect, useState } from "react";
import CalendarSvg from "../assets/svg/Calendar.jsx";
import DownArrowSvg from "../assets/svg/DownArrow.jsx";

const SelectDateButton = forwardRef(({ value: date, onClick, isOpenCalendar }, ref) => {
  return (
    <div
      className="bg-white shadow-md rounded-xl grid grid-cols-12 gap-1 px-3 sm:gap-2 font-sans hover:shadow-lg transition-transform duration-500 cursor-pointer"
      onClick={onClick}
      ref={ref}
      style={{ height: "100%" }}
    >
      <div className="col-span-2 flex justify-center items-center">
        <CalendarSvg className=" bg-[#2D9CDB26] rounded-xl p-0.5" />
      </div>
      <div className="grid grid-rows-12 col-span-8 text-customGray-700">
        <div className="row-span-6 font-medium pl-3">Tarih Seç</div>
        <div className="row-span-6 font-thin text-sm pl-3">{date}</div>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <DownArrowSvg style={{
          transform: isOpenCalendar ? `rotate(180deg)` : "",
          transition: "transform 300ms ease",
        }} />
      </div>
    </div>
  );
});

export default SelectDateButton;
