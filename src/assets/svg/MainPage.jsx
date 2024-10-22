import React from "react";

const MainPageSvg = ({ size, color }) => {
  const width = size || 40;
  const height = width;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.8333 6.25V18.75H44.5V6.25H27.8333ZM27.8333 43.75H44.5V22.9167H27.8333V43.75ZM7 43.75H23.6667V31.25H7V43.75ZM7 27.0833H23.6667V6.25H7V27.0833Z"
        fill={color || "#A35CFF"}
      />
    </svg>
  );
};
export default MainPageSvg;
