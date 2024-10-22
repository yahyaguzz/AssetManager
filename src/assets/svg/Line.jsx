import React from "react";

const LineSvg = ({ size, color, ...props }) => {
  const width = size || 8;
  const height = width * (8 / 3);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="8" y1="1.5" y2="1.5" stroke="black" strokeWidth="3" />
    </svg>
  );
};

export default LineSvg;
